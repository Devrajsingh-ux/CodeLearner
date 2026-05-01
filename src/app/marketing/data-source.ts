"use client";

import { useEffect, useState } from "react";
import type { Testimonial, Track } from "@/types";
import {
  MOCK_ACTIVE_LEARNERS,
  MOCK_COURSES,
  MOCK_PLATFORM_STATS,
  MOCK_TESTIMONIALS,
} from "@/app/marketing/mock-data";

type MarketingDataSource = "mock" | "api" | "hybrid";

type MarketingStats = {
  activeLearners: number;
  courseTracks: number;
  completionRate: number;
  jobPlacements: number;
};

type MarketingData = {
  activeLearners: number;
  platformStats: MarketingStats;
  courses: Track[];
  testimonials: Testimonial[];
};

const SOURCE =
  (process.env.NEXT_PUBLIC_MARKETING_DATA_SOURCE as MarketingDataSource | undefined) ||
  "hybrid";

const DEFAULT_DATA: MarketingData = {
  activeLearners: MOCK_ACTIVE_LEARNERS,
  platformStats: MOCK_PLATFORM_STATS,
  courses: MOCK_COURSES,
  testimonials: MOCK_TESTIMONIALS,
};

let cachedData: MarketingData | null = null;
let inFlightRequest: Promise<MarketingData> | null = null;

function normalizeCoursesResponse(payload: unknown): Track[] {
  const data = payload as { tracks?: Track[]; courses?: Track[] };
  if (Array.isArray(data.tracks)) return data.tracks;
  if (Array.isArray(data.courses)) return data.courses;
  return [];
}

function normalizeTestimonialsResponse(payload: unknown): Testimonial[] {
  const data = payload as { testimonials?: Testimonial[] };
  return Array.isArray(data.testimonials) ? data.testimonials : [];
}

function normalizeStatsResponse(payload: unknown): MarketingStats {
  const data = payload as Partial<MarketingStats>;
  return {
    activeLearners: Number(data.activeLearners || 0),
    courseTracks: Number(data.courseTracks || 0),
    completionRate: Number(data.completionRate || 0),
    jobPlacements: Number(data.jobPlacements || 0),
  };
}

async function loadMarketingDataFromApi(): Promise<MarketingData> {
  const [statsResp, coursesResp, testimonialsResp] = await Promise.allSettled([
    fetch("/api/platform/stats", { cache: "no-store" }).then((r) => r.json()),
    fetch("/api/courses", { cache: "no-store" }).then((r) => r.json()),
    fetch("/api/testimonials", { cache: "no-store" }).then((r) => r.json()),
  ]);

  const stats =
    statsResp.status === "fulfilled"
      ? normalizeStatsResponse(statsResp.value)
      : DEFAULT_DATA.platformStats;

  const courses =
    coursesResp.status === "fulfilled"
      ? normalizeCoursesResponse(coursesResp.value)
      : DEFAULT_DATA.courses;

  const testimonials =
    testimonialsResp.status === "fulfilled"
      ? normalizeTestimonialsResponse(testimonialsResp.value)
      : DEFAULT_DATA.testimonials;

  const platformStats = {
    ...DEFAULT_DATA.platformStats,
    ...stats,
    courseTracks: stats.courseTracks || courses.length,
  };

  return {
    activeLearners: platformStats.activeLearners || DEFAULT_DATA.activeLearners,
    platformStats,
    courses: courses.length > 0 ? courses : DEFAULT_DATA.courses,
    testimonials,
  };
}

async function getMarketingData(): Promise<MarketingData> {
  if (SOURCE === "mock") {
    return DEFAULT_DATA;
  }

  if (cachedData) return cachedData;
  if (inFlightRequest) return inFlightRequest;

  inFlightRequest = loadMarketingDataFromApi()
    .then((apiData) => {
      if (SOURCE === "api") {
        cachedData = apiData;
        return apiData;
      }

      const hybrid: MarketingData = {
        activeLearners: apiData.activeLearners || DEFAULT_DATA.activeLearners,
        platformStats: {
          ...DEFAULT_DATA.platformStats,
          ...apiData.platformStats,
        },
        courses: apiData.courses.length > 0 ? apiData.courses : DEFAULT_DATA.courses,
        testimonials:
          apiData.testimonials.length > 0 ? apiData.testimonials : DEFAULT_DATA.testimonials,
      };

      cachedData = hybrid;
      return hybrid;
    })
    .catch(() => DEFAULT_DATA)
    .finally(() => {
      inFlightRequest = null;
    });

  return inFlightRequest;
}

export function useMarketingData() {
  const [data, setData] = useState<MarketingData>(DEFAULT_DATA);
  const [isLoading, setIsLoading] = useState(SOURCE !== "mock");

  useEffect(() => {
    let cancelled = false;

    if (SOURCE === "mock") {
      setData(DEFAULT_DATA);
      setIsLoading(false);
      return;
    }

    getMarketingData()
      .then((resolved) => {
        if (!cancelled) setData(resolved);
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return {
    source: SOURCE,
    data,
    isLoading,
  };
}

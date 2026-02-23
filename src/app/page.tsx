import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { Features } from "@/components/home/Features";
import { Stats } from "@/components/home/Stats";
import { CoursesSection } from "@/components/home/CoursesSection";
import { Testimonials } from "@/components/home/Testimonials";
import { CTA } from "@/components/home/CTA";

export const metadata: Metadata = {
  title: "CodeLearn — Master Coding. Build the Future.",
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <Stats />
      <Features />
      <CoursesSection />
      <Testimonials />
      <CTA />
    </>
  );
}

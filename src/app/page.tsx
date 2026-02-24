import type { Metadata } from "next";
import { CoursesSection } from "@/components/home/CoursesSection";
import { CTA } from "@/components/home/CTA";
import { Features } from "@/components/home/Features";
import { Hero } from "@/components/home/Hero";
import { Stats } from "@/components/home/Stats";
import { Testimonials } from "@/components/home/Testimonials";

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

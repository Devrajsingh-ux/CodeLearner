import type { Metadata } from "next";
import { CoursesSection } from "@/app/marketing/CoursesSection";
import { CTA } from "@/app/marketing/CTA";
import { Features } from "@/app/marketing/Features";
import { Hero } from "@/app/marketing/Hero";
import { Stats } from "@/app/marketing/Stats";
import { Testimonials } from "@/app/marketing/Testimonials";

export const metadata: Metadata = {
  title: "Zentax — Master Coding. Build the Future.",
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

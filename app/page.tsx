
"use client";

import { useState } from "react";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import Projects from "@/components/sections/Projects";
import BeyondDesign from "@/components/sections/BeyondDesign";

export default function Home() {
  const [transitionProgress, setTransitionProgress] = useState(0);

  return (
    <>
      <Navbar />

      <main>
        <Hero onProgressChange={setTransitionProgress} />

        <Projects transitionProgress={transitionProgress} />

        <BeyondDesign />
      </main>

      <Footer />
    </>
  );
}


"use client";

import { useState } from "react";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

import Hero from "@/components/sections/Hero";
import Projects from "@/components/sections/Projects";
import BeyondDesign from "@/components/sections/BeyondDesign";
import Manifesto from "@/components/sections/Manifesto";
import ServicesProcess from "@/components/sections/ServicesProcess";
import Team from "@/components/sections/Team";
import FAQ from "@/components/sections/FAQ";

export default function Home() {
  const [transitionProgress, setTransitionProgress] = useState(0);
  const [manifestoProgress, setManifestoProgress] = useState(0);

  return (
    <>
      <Navbar />

      <main>
        <Hero onProgressChange={setTransitionProgress} />

        <Projects transitionProgress={transitionProgress} />

        <BeyondDesign
          onTransitionProgressChange={setManifestoProgress}
        />

        <Manifesto transitionProgress={manifestoProgress} />

        <ServicesProcess />

        <Team />

        <FAQ />
      </main>

      <Footer />
    </>
  );
}

"use client";
import React from "react";
import { AuroraBackground } from "./ui/aurora-background";
import { Cover } from "@/components/ui/cover";
import { motion } from "framer-motion";
import { FeaturesSectionDemo } from "./feature";
import Hero from "./hero";
import { Favourites } from "./favourites";
import { BestSeller } from "./best";
import Filler from "./filler";
import Footer from "./footer";
// import { Main } from "./main";
function HomeComponent() {
  return (
    <div>
      {/* <Main/> */}
      <Hero/>
      <Favourites/>
      <Filler/>
      <BestSeller/>
      <Footer/>
    </div>

  );
}

export default HomeComponent;

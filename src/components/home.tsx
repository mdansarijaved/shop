"use client";
import React from "react";
import { AuroraBackground } from "./ui/aurora-background";
import { Cover } from "@/components/ui/cover";
import { motion } from "framer-motion";
import { FeaturesSectionDemo } from "./feature";
import Hero from "./hero";
import { Popular } from "./popular";
function HomeComponent() {
  return (
    <div>
      <Hero/>
      <Popular/>
    </div>

  );
}

export default HomeComponent;

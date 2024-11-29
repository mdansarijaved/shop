import React from "react";
import Hero from "./hero";
import { Favourites } from "./favourites";
import { BestSeller } from "./best";
import Filler from "./filler";
import Footer from "./footer";
import Socials from "./socials";
function HomeComponent() {
  return (
    <div>
      <Hero />
      <div className="px-5 md:px-10 lg:px-16 xl:px-20 space-y-20">
        <Favourites />
        <Filler />
        <BestSeller />
      </div>
    </div>
  );
}

export default HomeComponent;

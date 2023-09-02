import React from "react";
import Bio from "./content/writing/Bio";

const Card = () => {
  return (
    <div className="px-5">
      <h1>
        <div className="mt-10 font-bold text-black text-3xl">Matt Stokes</div>
      </h1>
      <div>
        <div className="pt-2">Engineer + Designer + Developer</div>
        <div className="pt-8">
          <Bio></Bio>
        </div>
        <div className="border-b pt-10">

        </div>
      </div>
    </div>
  );
};

export default Card;

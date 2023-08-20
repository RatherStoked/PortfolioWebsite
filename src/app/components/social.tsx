import React from "react";
import Image from "next/image";
import medium from "./content/SVG/medium.svg";
import linkedin from "./content/SVG/linkedin.svg";
import X from "./content/SVG/X.svg";
import vsco from "./content/SVG/vsco.svg"

const Social = () => {
  return (
    <div className="pt-10 px-5 flex flex-row">
      <div className="pr-5">
        <a href="https://medium.com/@stokedmatt" target="_blank" rel="noopener noreferrer">
          <Image
            src={medium}
            width={50}
            height={50}
            alt="Medium link"
            className="border p-2 rounded-lg hover:blur-xs"
          />
        </a>
      </div>
      <div className="pr-5">
        <div className="border rounded-lg">
          <a href="https://www.linkedin.com/in/matt-stokes-096810189/" target="_blank" rel="noopener noreferrer">
            <Image
              src={linkedin}
              width={50}
              height={50}
              alt="Linkedin Link"
              className="p-2 hover:blur-xs"
            />
          </a>
        </div>
      </div>
      <div className="pr-5">
        <a href="https://twitter.com/ratherstoked" target="_blank" rel="noopener noreferrer">
          <Image
            src={X}
            width={50}
            height={50}
            alt="X.com link (prev. Twitter)"
            className="border p-2 rounded-lg hover:blur-xs"
          />
        </a>
      </div>
      <div className="pr-5">
        <a href="https://vsco.co/cropubiquity/gallery" target="_blank" rel="noopener noreferrer">
          <Image
            src={vsco}
            width={50}
            height={50}
            alt="vsco (photography)"
            className="border p-2 rounded-lg hover:blur-xs"
          />
        </a>
      </div>
    </div>
  );
};

export default Social;

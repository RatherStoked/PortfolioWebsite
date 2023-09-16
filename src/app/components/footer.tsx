import React, { useState } from "react";
import Image from "next/image";
import linkedin from "./content/SVG/linkedin.svg";
import mail from "./content/SVG/mail.svg";

const Footer = () => {
  const [isContactOpen, setIsContactOpen] = useState(false);

  const openContact = () => {
    setIsContactOpen(true);
  };

  const closeContact = () => {
    setIsContactOpen(false);
  };

  return (
    <div className="pt-5 pl-5 flex relative">
      <div className="pr-4">
        <a
          href="/MattStokesResume.pdf"
          title="Open PDF"
          target="_blank"
          rel="noopener noreferrer"
          className="border text-xs rounded text-gray-500 py-2 px-2 hover:blur-xs transition h-8 flex items-center"
        >
          PDF
        </a>
      </div>
      <div className="pr-4 relative">
        <button
          onClick={openContact}
          className="border text-xs rounded text-gray-500 py-2 px-2 hover:blur-xs transition h-8 flex items-center"
        >
          Contact
        </button>
        {isContactOpen && (
          <div className="contact-popup fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center">
            <div
              onClick={closeContact}
              className="fixed top-0 left-0 right-0 bottom-0 bg-gray-500 bg-opacity-50 z-10"
            />
            <div className="contact-popup-content border border-gray-300 bg-white p-8 rounded-lg shadow-lg z-20 w-[400px]">
              <h2 className="text-xl font-semibold mb-4 pb-5 border-b">
                Contact Me
              </h2>
              <p className="pb-5">
                I am always excited to chat. The best ways to reach me are email
                or connecting on Linkedin.
              </p>
              <div className="flex" style={{ fontSize: 0 }}>
                <a
                  href="https://www.linkedin.com/in/matt-stokes-096810189/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    src={linkedin}
                    width={50}
                    height={50}
                    alt="Linkedin Link"
                    className="p-2 hover:blur-xs"
                  />
                </a>
                <a
                  href="mailto:mail.mattstokes@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    src={mail}
                    width={50}
                    height={50}
                    alt="Email Link"
                    className="p-2 hover:blur-xs"
                  />
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Footer;

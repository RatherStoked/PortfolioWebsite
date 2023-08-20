"use client";
import "./globals.css";
import React, { useState, useEffect, ReactNode } from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import Card from "./components/introcard";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import Social from "./components/social";
import Gallery from "./components/gallery";
import ArticleGallery from "./components/articleGallery";
import SkillCard from "./components/skillCard";

type ContainerProps = {
  children: ReactNode;
};

const Page = () => {
  const [screenWidth, setScreenWidth] = useState(0);

  // Function to update the screen width
  const updateScreenWidth = () => {
    setScreenWidth(window.innerWidth);
  };

  // Update the screen width when the component mounts and on window resize
  useEffect(() => {
    updateScreenWidth();
    window.addEventListener("resize", updateScreenWidth);
    return () => {
      window.removeEventListener("resize", updateScreenWidth);
    };
  }, []);

  const Container = ({ children }: ContainerProps) => (
    <div className="font-mono bg-transparent border rounded-lg p-4 fixed top-10 left-10 right-10 bottom-10 overflow-y-scroll overflow-x-hidden">
      {children}
    </div>
  );

  const showStandardLayout = screenWidth >= 768;

  return (
    <>
      <html lang="en" className="bg-white custom-scrollbar cursor-custom">
        {showStandardLayout ? (
          <Container>
            <div className="flex">
              <aside className="max-h-96 sticky top-0 min-w-fit">
                <Navbar />
                <Card />
                {/* <Tags /> */}
                <Social />
                <SkillCard />
                <Footer />
              </aside>
              <div className="flex-row">
                {/* <Navi pages={pages} /> */}
                <main>
                  <Gallery />
                  <ArticleGallery />
                </main>
              </div>
            </div>
          </Container>
        ) : (
          <div>
            <Navbar />
            <Card />
            <Social />
            <SkillCard />
            <div className="border-b pb-10 pl-5"></div>
            <Gallery />
            <ArticleGallery />
            <div className="border-b pb-10 pl-5"></div>
            <Footer />
          </div>
        )}
      </html>
    </>
  );
};

export default Page;

{
  /*
<html lang="en" className="bg-white custom-scrollbar cursor-custom">
  <Container>
    <div className="flex flex-col md:flex-row">
      <aside className="max-h-96 sticky top-0 min-w-fit md:w-1/4">
      </aside>
      <div className="flex-row md:w-3/4">
      </div>
    </div>
    <Gallery />
  </Container>
</html>
 */
}

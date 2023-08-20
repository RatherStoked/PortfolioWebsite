"use client";
import "./globals.css";
import React, { useState, useEffect, ReactNode } from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import Card from "./components/card";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import Social from "./components/social";
import Gallery from "./components/gallery";
import ArticleGallery from "./components/articleGallery";


type ContainerProps = {
  children: ReactNode;
};

const page = () => {

  const Container = ({ children }: ContainerProps) => (
    <div className="font-mono bg-transparent border rounded-lg p-4 fixed top-10 left-10 right-10 bottom-10 overflow-y-scroll overflow-x-hidden">
      {children}
    </div>
  );

  return (
    <>
      <html lang="en" className="bg-white custom-scrollbar">
        <Container>
          <div className="flex">
            <aside className="max-h-96 sticky top-0 min-w-fit">
              <Navbar />
              <Card />
              {/* <Tags /> */}
              <Social />
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
      </html>
    </>
  );
}

export default page

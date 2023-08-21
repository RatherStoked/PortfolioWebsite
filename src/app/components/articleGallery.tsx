import React from "react";
const articleNumber = 6;

const GalleryComponent = () => {
  return (
    <div className="border-b cursor-point pt-1 hover:pb-3 hover:font-bold">
    <h2 className="text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
      ante ipsum</h2>
  </div>
  );
}

const ArticleGallery = () => {
  return (
    <div className="pl-5 pt-5">
      <h1 className="font-bold text-xl pb-2">Articles&#40;{articleNumber}&#41;</h1>
      <GalleryComponent />
      <GalleryComponent />
      <GalleryComponent />
      <GalleryComponent />
      <GalleryComponent />
      <GalleryComponent />
    </div>
  );
};

export default ArticleGallery;

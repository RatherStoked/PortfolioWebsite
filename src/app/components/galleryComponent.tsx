import React, { useState } from "react";

interface GalleryComponentProps {
  articleName: string;
  dateCreated: string;
  link: string;
  maxWords?: number; 
}

const GalleryComponent: React.FC<GalleryComponentProps> = ({
  articleName,
  dateCreated,
  link,
  maxWords = 6, 
}) => {
  const [showFullTitle, setShowFullTitle] = useState(false);

 
  const words = articleName.split(" ");
  const truncatedTitle = words.slice(0, maxWords).join(" ");
  const isTruncated = words.length > maxWords;

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="block border-b cursor-pointer pt-1 hover:pb-3 hover:font-bold"
      onMouseEnter={() => setShowFullTitle(true)}
      onMouseLeave={() => setShowFullTitle(false)}
    >
      <h2 className="text-sm">
        {showFullTitle ? articleName : `${truncatedTitle}${isTruncated ? "..." : ""}`}
      </h2>
      <p className="text-sm">
        {dateCreated}
      </p>
    </a>
  );
};

export default GalleryComponent;

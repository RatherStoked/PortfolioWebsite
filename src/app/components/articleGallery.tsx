import React from "react";
import GalleryComponent from "./galleryComponent";

const articleNumber = 5;

const ArticleGallery = () => {
  const articles = [
    {
      articleName: "Medicinal Drug Administration Review",
      dateCreated: "2023-01-28",
      link: "https://medium.com/patchtb/medicinal-drug-administration-38cf40026701",
    },
    {
      articleName: "Exploring Transdermal Patches and their Effectiveness Against Bacterial Infections",
      dateCreated: "2022-05-8",
      link: "https://medium.com/patchtb/transdermal-patches-and-their-effectiveness-against-bacterial-infections-8556b87194c6",
    },
    {
      articleName: "Intro To Blockchain Development with React.js and Solidity",
      dateCreated: "2022-27-3",
      link: "https://medium.com/geekculture/crypto-jam-with-a-jar-5e1a8e254d",
    },
    {
      articleName: "Introduction to the Smart Contract Mechanism",
      dateCreated: "2021-06-12",
      link: "https://medium.com/geekculture/smart-contracts-what-are-they-and-how-do-they-work-2a5de5ec4cab",
    },
    {
      articleName: "Hash Functions: Introduction and Use Cases",
      dateCreated: "2021-14-11",
      link: "https://medium.com/patchtb/transdermal-patches-and-their-effectiveness-against-bacterial-infections-8556b87194c6",
    },
  ];

  return (
    <div className="pl-5 pt-5">
      <h1 className="font-bold text-xl pb-2">Articles&#40;{articleNumber}&#41;</h1>
      {articles.map((article, index) => (
        <GalleryComponent
          key={index}
          articleName={article.articleName}
          dateCreated={article.dateCreated}
          link={article.link}
        />
      ))}
    </div>
  );
};

export default ArticleGallery;

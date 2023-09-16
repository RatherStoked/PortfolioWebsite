// projectData.ts
type Project = {
    id: number;
    title: string;
    description: string;
    imageUrl: string;
    date: string;
    body: string;
    images: string[];
    link: string;
  };
  
  export const projectData: Project = {
    
    id: 3,
    title: "Project 3",
    description: "Description for Project 3",
    imageUrl: "project3.jpg", // Replace with actual image URL
    date: "2022-12-1 - 2023-05-2",
    body: "Body text for Project 3...",
    images: ["image4.jpg", "image5.jpg", "image6.jpg"],
    link: "",
  };
  
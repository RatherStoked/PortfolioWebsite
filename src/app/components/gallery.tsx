// Gallery.tsx
import React, { useState, useEffect } from "react";
import ProjectDetail from "./projectDetail"; // Import your ProjectDetail component
import { projectData } from "./content/projects/projectData"; // Import the project data

type Project = {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  date: string;
  body: string;
  images: string[];
};

const Gallery = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Define your array of projects within the Gallery component
  const projects: Project[] = [
    {
      id: 1,
      title: "3D Printed Transdermal Microneedles",
      description: "Taking a novel approach to AMR bacterial infection treatment through the use of self-administrating medicinal drug patches.",
      imageUrl: "project1.jpg", // Replace with actual image URL
      date: "2022-27-3 - 2023-13-2",
      body: "Body text for Project 1...",
      images: ["image1.jpg", "image2.jpg"],
    },
    {
      id: 2,
      title: "Project 2",
      description: "Description for Project 2",
      imageUrl: "", // Replace with actual image URL
      date: "2022-05-2 - present",
      body: "Body text for Project 2...",
      images: ["image3.jpg"],
    },
    {
      id: 3,
      title: "Project 3",
      description: "Description for Project 2",
      imageUrl: "", // Replace with actual image URL
      date: "2022-05-2 - present",
      body: "Body text for Project 2...",
      images: ["image3.jpg"],
    },
    {
      id: 4,
      title: "Project 4",
      description: "Description for Project 2",
      imageUrl: "", // Replace with actual image URL
      date: "2022-05-2 - present",
      body: "Body text for Project 2...",
      images: ["image3.jpg"],
    },
  ];

  // Add the dynamically loaded project data to the projects array
  if (!projects.find((project) => project.id === projectData.id)) {
    projects.push(projectData);
  }

  const handleCardClick = (project: Project) => {
    setSelectedProject(project);
  };

  const closePopup = () => {
    setSelectedProject(null);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectedProject &&
        event.target instanceof HTMLElement &&
        !event.target.closest(".popup-container")
      ) {
        closePopup();
      }
    };

    window.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, [selectedProject]);

  return (
    <div>
      <h1 className="font-bold text-xl pb-2 pl-5 pt-10">
        Projects ({projects.length})
      </h1>

      <div className="grid grid-cols-3 gap-4">
        {projects.map((project) => (
          <div
            key={project.id}
            className="max-w-md border rounded-md m-5 shadow transition hover:shadow-lg cursor-pointer"
            onClick={() => handleCardClick(project)}
          >
            <div className="p-4">
              <time className="block text-xs text-gray-500">
                {project.date}
              </time>

              <a href="#" className="mt-2 block text-lg font-medium text-black">
                {project.title}
              </a>

              <p className="mt-2 text-sm text-gray-700">
                {project.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {selectedProject && (
        <div 
        onClick={closePopup}
        className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50 popup-container">
            <ProjectDetail
              title={selectedProject.title}
              body={selectedProject.body}
              images={selectedProject.images}
            />
        </div>
      )}
    </div>
  );
};

export default Gallery;

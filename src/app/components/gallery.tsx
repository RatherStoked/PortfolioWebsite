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
  link: string;
};

const Gallery = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Define your array of projects within the Gallery component
  const projects: Project[] = [
    {
      id: 1,
      title: "Patch: 3D Printed Transdermal Microneedle Patches",
      description:
        "Taking a novel approach to AMR bacterial infection treatment through the use of self-administrating medicinal drug patches.",
      imageUrl: "/images/Unfolded.png", // Replace with actual image URL
      date: "2021 - 2023",
      body: "As the technical lead and presenter of a team of student researchers, I worked on finding ways to combat Anti-Microbial Resistant Bacterial Infections through the use of Transdermal Patches and micro-needle arrays. During the course of the project, I created six different designs for the microneedle cores and arrays. I incorporated microfluidic principles to enable the dispensing of fluids through microchannels. Additionally, I created a unique dispensing system that, when combined with a rate-controlling polymer membrane, could release a packet of low-viscosity liquid at a consistent rate for adjustable time periods.",
      link: "https://mattstokes.notion.site/Patch-5502d72740514391bfd161fbdc95f6c7?pvs=4",
      images: ["/images/Unfolded.png"],
    },
    {
      id: 2,
      title: "3D Myoelectric Prosthetics",
      description: "Designing and building myoelectric prosthetics",
      imageUrl: "", // Replace with actual image URL
      date: "2018 - present",
      body: "I have been designing and building transradial prosthetics for almost 5 years. I began in grade 9 with clunky elbow-actuated designs. Before moving to working with Myo-electrics and a much sleeker design in my upper years of highschool (A hand component from these years pictured below). Most recently my work in the domain has included a study concerning the usage of ultrasound-sourced medical imagery, processed through a Convolutional Neural Network for high DOF manipulation; and V3 of my 11-dof prosthetic design, which will mark the 17th design iteration and 5th fully-redesigned and printed iteration since my first prosthetic. ",
      images: ["/images/prosthetic.jpg"],
      link: "",
    },
    {
      id: 3,
      title: "Foodle: Decentralized Solution to Urban Food Insecurity",
      description: "Blockchain-based social app for food sharing and redistribution in urban communities.",
      imageUrl: "", // Replace with actual image URL
      date: "2020 - 2021",
      body: "After competing in a 24hr youth hackathon with the Foodle concept, I decided the concept was interesting and impactful enough to spin out into a standalone project. I launched the MVP through a Discord community where I recruited 2 sets of people from 2 different communities in Vancouver through door-to-door networking, eventually growing to 32 members. The two categories of food redistribution were fresh produce and canned/containerized food. By the end of the 3-month experiment, we managed to distribute a total of $500 worth of produce and $140 worth of canned/containerized food. ",
      images: ["/images/Foodle.png"],
      link: "",
    },
    {
      id: 4,
      title: "Serial-Parallelized Bipedal Research Platform",
      description: "Serial-Parallelized Bipedal Research Platform",
      imageUrl: "", // Replace with actual image URL
      date: "2024 - present",
      body: "",
      images: ["/images/"],
      link: "",
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

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
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
          className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50"
        >
          <div className="popup-container">
            <ProjectDetail
              title={selectedProject.title}
              body={selectedProject.body}
              images={selectedProject.images}
              link={selectedProject.link}
              date={selectedProject.date}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;

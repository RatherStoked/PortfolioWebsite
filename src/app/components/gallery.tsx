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
      title: "General Physical Intelligence Robotic Platform",
      description: "Cheap, Fully capable general purpose robot for VLM and RL-based training and research.",
      imageUrl: "/images/Bracket_Bot_AlohaArms_hq5.png", // Replace with actual image URL
      date: "2024 - present",
      body: "I designed, built and ROS2-integrated this robotic platform over a 52 hour period (without sleep). It has 2x 7dof Arms and a linear arm stage with 1000N of force output. It is currently being used to finetune a locally-run PI0 model to allow for a fully autonomous, video base reasoning to action pipeline.",
      images: ["/images/biped_shaded.png"],
      link: "",
    },
    {
      id: 2,
      title: "Serial-Parallelized Bipedal Research Platform",
      description: "Working on cost-effective, well designed hardware for the open-source community.",
      imageUrl: "/images/Biped_wireframe.png", // Replace with actual image URL
      date: "2024 - present",
      body: "Currently designing a Serial Parallelized Bipedal Research platform, aimed at providing a high-quality open-source, biomimetic biped to the robotics community. V1 design is based around a Disney Imagineering research paper exploring the Serial Parallelized Bipedal mechanism for applications in biomimetic movement. Major advantage to this design is a distributed vertical load between two parallel chains, resulting in hip-pitch actuator and knee-pitch actuator acting in one chain, collaborating to generate higher torque in both dimensions. ",
      images: ["/images/biped_shaded.png"],
      link: "",
    },
    {
      id: 3,
      title: "Rotary CNC Mill",
      description: "An automated Lathe, designed to incorporate lego-technics electrical components with largely 3d printed mechanical components.",
      imageUrl: "/images/CNC_Wireframe.png", // Replace with actual image URL
      date: "2023 - 2023",
      body: "Lead mechanical design for a small team during my 1A system design course. Despite being limited to largely lego and 3d-printed components/hardware, we managed to develop a fully functional CNC Lathe, which could take any given profile and radially engrave it into EVA foam without and user input. ",
      images: ["images/IMG_9343-ezgif.com-video-to-gif-converter.gif"],
      link: "",
    },
    {
      id: 4,
      title: "3D Myoelectric Prosthetics",
      description: "Designing and building myoelectric prosthetics",
      imageUrl: "/images/Prosthetic_wireframe.png", // Replace with actual image URL
      date: "2018 - present",
      body: "I have been designing and building transradial prosthetics for almost 5 years. I began in grade 9 with clunky elbow-actuated designs. Before moving to working with Myo-electrics and a much sleeker design in my upper years of highschool (A hand component from these years pictured below). Most recently my work in the domain has included a study concerning the usage of ultrasound-sourced medical imagery, processed through a Convolutional Neural Network for high DOF manipulation; and V3 of my 11-dof prosthetic design, which will mark the 17th design iteration and 5th fully-redesigned and printed iteration since my first prosthetic. ",
      images: ["/images/prosthetic.jpg"],
      link: "",
    },
    {
      id: 5,
      title: "Patch: 3D Printed Transdermal Microneedle Patches",
      description:
        "Taking a novel approach to AMR bacterial infection treatment through the use of self-administrating medicinal drug patches.",
      imageUrl: "/images/Patch_Wireframe.png", // Replace with actual image URL
      date: "2021 - 2023",
      body: "As the technical lead and presenter of a team of student researchers, I worked on finding ways to combat Anti-Microbial Resistant Bacterial Infections through the use of Transdermal Patches and micro-needle arrays. During the course of the project, I created six different designs for the microneedle cores and arrays. I incorporated microfluidic principles to enable the dispensing of fluids through microchannels. Additionally, I created a unique dispensing system that, when combined with a rate-controlling polymer membrane, could release a packet of low-viscosity liquid at a consistent rate for adjustable time periods.",
      link: "https://mattstokes.notion.site/Patch-5502d72740514391bfd161fbdc95f6c7?pvs=4",
      images: ["/images/Unfolded.png"],
    },

    {
      id: 6,
      title: "Foodle: Decentralized Solution to Urban Food Insecurity",
      description: "Blockchain-based social app for food sharing and redistribution in urban communities.",
      imageUrl: "/images/foodle_wireframe.png", // Replace with actual image URL
      date: "2020 - 2021",
      body: "After competing in a 24hr youth hackathon with the Foodle concept, I decided the concept was interesting and impactful enough to spin out into a standalone project. I launched the MVP through a Discord community where I recruited 2 sets of people from 2 different communities in Vancouver through door-to-door networking, eventually growing to 32 members. The two categories of food redistribution were fresh produce and canned/containerized food. By the end of the 3-month experiment, we managed to distribute a total of $500 worth of produce and $140 worth of canned/containerized food. ",
      images: ["/images/Foodle.png"],
      link: "",
    },
    {
      id: 7,
      title: "Mini-Whoop FPV Drone",
      description: "Weekend design sprint.",
      imageUrl: "/images/oxcart_drone.png", // Replace with actual image URL
      date: "2017 - 2017",
      body: "One of my more complete multi-component assemblies from when I was first starting out with CAD in fusion 360 at age 15.",
      images: ["/images/Drone_shaded.png"],
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

              <img src={project.imageUrl} alt="" className="mt-4 rounded-md" />

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

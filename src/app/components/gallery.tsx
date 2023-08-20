import React from "react";
import ProjectCard from "./content/projects/projectcard";

const projectNumber = 8;

const gallery = () => {
  return (
    <div>
      <h1 className="font-bold text-xl pb-2 pl-5 pt-10">
        Projects&#40;{projectNumber}&#41;
      </h1>

      <div className="grid grid-cols-3">
        <ProjectCard></ProjectCard>
        <ProjectCard></ProjectCard>
        <ProjectCard></ProjectCard>
        <ProjectCard></ProjectCard>
        <ProjectCard></ProjectCard>
        <ProjectCard></ProjectCard>
        <ProjectCard></ProjectCard>
        <ProjectCard></ProjectCard>
      </div>
    </div>
  );
};

export default gallery;

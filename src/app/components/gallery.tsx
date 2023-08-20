import React from 'react';
import ProjectCard from './content/projects/projectcard';

const gallery = () => {
  return (
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
  )
}

export default gallery
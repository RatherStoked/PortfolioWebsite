import React from "react";

interface ProjectCardProps {
  title: string;
  description: string;
  imageUrl: string;
  date: string; // Add a date prop
  onClick: () => void; // Include the onClick prop
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  imageUrl,
  date,
}) => {
  return (
    <div className="max-w-md border rounded-md m-5 shadow transition hover:shadow-lg">
      <div className="p-4">
        <time className="block text-xs text-gray-500">{date}</time>

        <a href="#" className="mt-2 block text-lg font-medium text-black">
          {title}
        </a>

        <p className="mt-2 text-sm text-gray-700 line-clamp-3">
          {description}
        </p>
        <div>
          {imageUrl}
        </div>

      </div>
    </div>
  );
};

export default ProjectCard;

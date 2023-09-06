import React from "react";

const ProjectCard = () => {
  return (
    <div className="max-w-md border rounded-md m-5 shadow transition hover:shadow-lg">
      <div className="p-4">
        <time className="block text-xs text-gray-500">10th Oct 2022</time>

        <a href="#" className="mt-2 block text-lg font-medium text-black">
          This
        </a>

        <p className="mt-2 text-sm text-gray-700 line-clamp-3">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
          ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia
          Curae; Integer cursus varius quam, in pulvinar risus fermentum in.
        </p>
      </div>
    </div>
  );
};

export default ProjectCard;

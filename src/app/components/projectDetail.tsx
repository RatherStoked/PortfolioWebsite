// ProjectDetail.tsx
import React from "react";

type ProjectDetailProps = {
  title: string;
  body: string;
  images: string[];
};

const ProjectDetail: React.FC<ProjectDetailProps> = ({ title, body, images }) => {
  return (
    <div className="max-w-xl border bg-white rounded-md shadow overflow-auto">
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{title}</h2>
        <p className="text-gray-700 mb-4">{body}</p>
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Image ${index + 1}`}
            className="mb-2"
          />
        ))}
      </div>
    </div>
  );
};

export default ProjectDetail;

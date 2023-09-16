import React from "react";

type ProjectDetailProps = {
  title: string;
  body: string;
  images: string[];
  link: string;
  date: string;
};

const ProjectDetail: React.FC<ProjectDetailProps> = ({ title, body, images, link, date }) => {
  const openLinkInNewTab = () => {
    window.open(link, "_blank", "noopener noreferrer");
  };

  return (
    <div className="max-w-2xl border bg-white rounded-md shadow overflow-y-auto max-h-2xl">
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2 border-b pb-5">{title}</h2>
        <p className="block text-xs text-gray-500">{date}</p>
        <p className="text-gray-700 pb-5">{body}</p>
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Image ${index + 1}`}
            className="mb-2"
          />
        ))}
        {link && (
          <button onClick={openLinkInNewTab} className="border rounded p-2">Learn More</button>
        )}
      </div>
    </div>
  );
};

export default ProjectDetail;

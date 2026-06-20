"use client";
import { Project } from "@/types";

type Props = { project: Project; onClose: () => void };

export default function ProjectModal({ project, onClose }: Props) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50" onClick={onClose}>
      <div
        className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-start mb-4">
          <div>
            <time className="text-xs text-gray-400 dark:text-zinc-500">{project.date}</time>
            <h2 className="text-lg font-bold mt-1 dark:text-zinc-100">{project.title}</h2>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:text-zinc-500 dark:hover:text-zinc-300 text-2xl leading-none ml-4">×</button>
        </div>

        <p className="text-sm text-gray-700 dark:text-zinc-300 mb-4">{project.body}</p>

        <div className="flex flex-col gap-3">
          {project.images.map((img, i) => (
            <div key={i} className="h-72 w-full overflow-hidden rounded-md bg-white dark:bg-zinc-900">
              <img src={img} alt="" className="w-full h-full object-contain dark:invert dark:brightness-[0.85]" />
            </div>
          ))}
        </div>

        {project.link && (
          <a href={project.link} target="_blank" rel="noopener noreferrer" className="mt-4 inline-block border dark:border-zinc-700 text-xs rounded text-gray-500 dark:text-zinc-400 py-2 px-3 hover:blur-xs transition">
            Learn more →
          </a>
        )}
      </div>
    </div>
  );
}

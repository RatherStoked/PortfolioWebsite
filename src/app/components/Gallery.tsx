"use client";
import { useState } from "react";
import { Project } from "@/types";
import ProjectModal from "./ProjectModal";

type Props = { projects: Project[] };

export default function Gallery({ projects }: Props) {
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <div>
      <h2 className="font-bold text-xl pb-2 pl-5 pt-10 dark:text-zinc-100">
        Projects ({projects.length})
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 px-5 auto-rows-fr">
        {projects.map((project) =>
          project.comingSoon ? (
            <div
              key={project.id}
              onClick={() => setSelected(project)}
              className="border border-dashed border-gray-200 dark:border-zinc-700 rounded-md flex flex-col bg-white dark:bg-zinc-900 cursor-pointer hover:shadow-md transition-shadow"
            >
              <div className="h-72 shrink-0 overflow-hidden rounded-t-md bg-gray-50 dark:bg-zinc-800 flex items-center justify-center">
                <span className="text-xs text-gray-300 dark:text-zinc-600 tracking-widest uppercase">coming soon</span>
              </div>
              <div className="p-4 flex flex-col flex-1">
                <time className="block text-xs text-gray-300 dark:text-zinc-600">{project.date}</time>
                <p className="mt-1 text-sm font-semibold text-gray-300 dark:text-zinc-600 line-clamp-2">{project.title}</p>
              </div>
            </div>
          ) : (
          <div
            key={project.id}
            onClick={() => setSelected(project)}
            className="border border-gray-200 dark:border-zinc-800 rounded-md cursor-pointer hover:shadow-md transition-shadow flex flex-col bg-white dark:bg-zinc-900"
          >
            <div className="h-72 shrink-0 overflow-hidden rounded-t-md bg-white dark:bg-zinc-900">
              <img src={project.imageUrl} alt="" className="w-full h-full object-contain dark:invert dark:brightness-[0.85]" />
            </div>
            <div className="p-4 flex flex-col flex-1 bg-white dark:bg-zinc-900">
              <time className="block text-xs text-gray-400 dark:text-zinc-500">{project.date}</time>
              <p className="mt-1 text-sm font-semibold line-clamp-2 dark:text-zinc-100">{project.title}</p>
              <p className="mt-1 text-xs text-gray-500 dark:text-zinc-400 line-clamp-3">{project.description}</p>
            </div>
          </div>
          )
        )}
      </div>

      {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}

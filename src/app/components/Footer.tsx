"use client";
import { useState } from "react";

type Props = { resumeUrl: string; email?: string; linkedin?: string };

export default function Footer({ resumeUrl, email, linkedin }: Props) {
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <div className="pt-5 pl-5 flex relative">
      <a href={resumeUrl} target="_blank" rel="noopener noreferrer" className="border dark:border-zinc-600 text-xs rounded text-gray-500 dark:text-zinc-400 py-2 px-2 hover:blur-xs transition h-8 flex items-center mr-4">
        Resume
      </a>
      <button
        onClick={() => setContactOpen(true)}
        className="border dark:border-zinc-600 text-xs rounded text-gray-500 dark:text-zinc-400 py-2 px-2 hover:blur-xs transition h-8 flex items-center"
      >
        Contact
      </button>

      {contactOpen && (
        <div className="fixed inset-0 flex justify-center items-center z-50">
          <div onClick={() => setContactOpen(false)} className="fixed inset-0 bg-gray-500/50 dark:bg-black/70" />
          <div className="relative border dark:border-zinc-700 bg-white dark:bg-zinc-900 p-8 rounded-lg shadow-lg z-10 w-[400px]">
            <h2 className="text-xl font-semibold mb-4 pb-5 border-b dark:border-zinc-700 dark:text-zinc-100">Contact Me</h2>
            <p className="pb-5 text-sm dark:text-zinc-300">
              I am always excited to chat. Best ways to reach me are email or LinkedIn.
            </p>
            <div className="flex gap-4">
              {linkedin && (
                <a href={linkedin} target="_blank" rel="noopener noreferrer">
                  <img src="/icons/linkedin.svg" width={40} height={40} alt="LinkedIn" className="hover:opacity-50 transition dark:invert" />
                </a>
              )}
              {email && (
                <a href={`mailto:${email}`}>
                  <img src="/icons/mail.svg" width={40} height={40} alt="Email" className="hover:opacity-50 transition dark:invert" />
                </a>
              )}
            </div>
            <button onClick={() => setContactOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:text-zinc-500 dark:hover:text-zinc-300 text-xl">×</button>
          </div>
        </div>
      )}
    </div>
  );
}

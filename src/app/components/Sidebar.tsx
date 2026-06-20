import { Profile } from "@/types";

type Props = { profile: Profile };

const SOCIALS = [
  { key: "medium",   alt: "Medium",   icon: "/icons/medium.svg" },
  { key: "linkedin", alt: "LinkedIn", icon: "/icons/linkedin.svg" },
  { key: "twitter",  alt: "X",        icon: "/icons/X.svg" },
  { key: "vsco",     alt: "VSCO",     icon: "/icons/vsco.svg" },
] as const;

export default function Sidebar({ profile }: Props) {
  const { name, tagline, bio, socials } = profile;

  return (
    <div className="px-5">
      <h1 className="mt-10 font-bold text-black dark:text-zinc-100 text-3xl">{name}</h1>
      <p className="pt-2 text-sm text-gray-600 dark:text-zinc-400">{tagline}</p>
      <p className="pt-8 text-sm leading-relaxed text-gray-700 dark:text-zinc-300">{bio}</p>

      <div className="flex gap-2 pt-6">
        {SOCIALS.map(({ key, alt, icon }) => {
          const url = socials[key];
          if (!url) return null;
          return (
            <a key={key} href={url} target="_blank" rel="noopener noreferrer">
              <img
                src={icon}
                width={28}
                height={28}
                alt={alt}
                className="hover:opacity-50 transition dark:invert dark:brightness-[0.85]"
              />
            </a>
          );
        })}
      </div>

      <div className="border-b dark:border-zinc-700 pt-8" />
    </div>
  );
}

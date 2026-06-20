export type Project = {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  date: string;
  body: string;
  images: string[];
  link: string;
  comingSoon?: boolean;
};

export type Article = {
  id: number;
  title: string;
  date: string;
  link: string;
};

export type Profile = {
  name: string;
  tagline: string;
  bio: string;
  resumeUrl: string;
  socials: {
    medium?: string;
    linkedin?: string;
    twitter?: string;
    vsco?: string;
    email?: string;
  };
};

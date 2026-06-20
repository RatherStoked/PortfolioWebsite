import { getProjects, getArticles, getProfile } from "@/lib/getData";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Gallery from "./components/Gallery";
import ArticleGallery from "./components/ArticleGallery";
import Footer from "./components/Footer";

export default function Page() {
  const projects = getProjects();
  const articles = getArticles();
  const profile = getProfile();

  return (
    <div className="font-mono bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-500 rounded-lg p-4 fixed top-10 left-10 right-10 bottom-10 overflow-y-scroll overflow-x-hidden transition-colors duration-200">
      <div className="flex">
        <aside className="sticky top-0 max-h-screen w-96 shrink-0 pr-4 overflow-y-auto">
          <Navbar />
          <Sidebar profile={profile} />
          <div className="mt-8">
            <Footer resumeUrl={profile.resumeUrl} email={profile.socials.email} linkedin={profile.socials.linkedin} />
          </div>
        </aside>
        <main className="flex-1 min-w-0 border-l border-gray-200 dark:border-zinc-700 pl-4">
          <Gallery projects={projects} />
          <ArticleGallery articles={articles} />
        </main>
      </div>
    </div>
  );
}

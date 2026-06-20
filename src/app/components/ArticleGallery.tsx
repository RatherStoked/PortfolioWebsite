import { Article } from "@/types";

type Props = { articles: Article[] };

export default function ArticleGallery({ articles }: Props) {
  return (
    <div className="pl-5 pt-8 pb-10">
      <h2 className="font-bold text-xl pb-2 dark:text-zinc-100">Articles ({articles.length})</h2>
      <div className="flex flex-col">
        {articles.map((article) => (
          <a key={article.id} href={article.link} target="_blank" rel="noopener noreferrer" className="flex justify-between items-baseline text-sm py-2 border-b dark:border-zinc-700 border-gray-100 hover:text-gray-500 dark:text-zinc-300 dark:hover:text-zinc-500 transition-colors">
            <span>{article.title}</span>
            <time className="text-xs text-gray-400 dark:text-zinc-500 ml-4 shrink-0">{article.date}</time>
          </a>
        ))}
      </div>
    </div>
  );
}

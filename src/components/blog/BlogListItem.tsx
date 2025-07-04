import React from "react"
import Link from "@docusaurus/Link"
import clsx from "clsx"
import {BlogAuthor} from "@site/src/theme/BlogAuthor"
import {Author} from "@docusaurus/plugin-content-blog"

export interface BlogListItemProps {
  date: string
  title: string
  description: string
  authors: Author[]
  permalink: string
}

const BlogListItem: React.FC<BlogListItemProps> = ({date, title, description, authors, permalink}) => {
  return (
    <Link to={permalink} className="flex flex-col overflow-hidden !text-black !no-underline">
      <div className="flex flex-col flex-1 p-3 md:py-12 md:px-6 gap-2 md:gap-3 border border-dashed border-tailCall-lightMode---primary-400 dark:border-tailCall-darkMode---primary-400">
        <span className="hidden md:flex text-content-mini text-tailCall-lightMode---neutral-500 dark:text-tailCall-darkMode---neutral-500">
          {new Date(date).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
            timeZone: "UTC",
          })}
        </span>
        <div className="flex flex-col flex-1 gap-1 md:gap-2">
          <span className={clsx("text-title-small line-clamp-2 text-tailCall-lightMode---primary-300 dark:text-tailCall-darkMode---primary-300")}>{title}</span>
          <span className="flex-1 text-content-tiny md:text-content-small line-clamp-1 md:line-clamp-3 text-tailCall-lightMode---neutral-600 dark:text-tailCall-darkMode---neutral-600 blog-post-content-desc">
            {description}
          </span>
        </div>
        {authors[0] && <BlogAuthor author={authors[0]} containerClassName="mt-auto" textClassName="text-tailCall-lightMode---neutral-400 dark:text-tailCall-darkMode---neutral-400" />}
      </div>
    </Link>
  )
}

export default BlogListItem

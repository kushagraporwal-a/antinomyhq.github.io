import React from "react"
import clsx from "clsx"
import {translate} from "@docusaurus/Translate"
import {usePluralForm} from "@docusaurus/theme-common"
import {useDateTimeFormat} from "@docusaurus/theme-common/internal"
import {useBlogPost} from "@docusaurus/plugin-content-blog/client"
import type {Props} from "@theme/BlogPostItem/Header/Info"

import styles from "./styles.module.css"
import Link from "@docusaurus/Link"

// Very simple pluralization: probably good enough for now
function useReadingTimePlural() {
  const {selectMessage} = usePluralForm()
  return (readingTimeFloat: number) => {
    const readingTime = Math.ceil(readingTimeFloat)
    return selectMessage(
      readingTime,
      translate(
        {
          id: "theme.blog.post.readingTime.plurals",
          description:
            'Pluralized label for "{readingTime} min read". Use as much plural forms (separated by "|") as your language support (see https://www.unicode.org/cldr/cldr-aux/charts/34/supplemental/language_plural_rules.html)',
          message: "One min read|{readingTime} min read",
        },
        {readingTime},
      ),
    )
  }
}

function ReadingTime({readingTime}: {readingTime: number}) {
  const readingTimePlural = useReadingTimePlural()
  return <>{readingTimePlural(readingTime)}</>
}

function DateTime({date, formattedDate}: {date: string; formattedDate: string}) {
  return <time dateTime={date}>{formattedDate}</time>
}

function Spacer() {
  return <>{" · "}</>
}

export default function BlogPostItemHeaderInfo({className}: Props): JSX.Element {
  const {metadata} = useBlogPost()
  const {date, readingTime, tags} = metadata

  const tagsExists = tags.length > 0

  const dateTimeFormat = useDateTimeFormat({
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  })

  const formatDate = (blogDate: string) => dateTimeFormat.format(new Date(blogDate))

  return (
    <div
      className={clsx(
        styles.container,
        "margin-vert--md text-tailCall-lightMode---neutral-500 dark:text-tailCall-darkMode---neutral-500",
        className,
      )}
    >
      <DateTime date={date} formattedDate={formatDate(date)} />
      {typeof readingTime !== "undefined" && (
        <>
          <Spacer />
          <ReadingTime readingTime={readingTime} />
        </>
      )}
      {tagsExists && (
        <div className="w-full flex flex-wrap gap-2 mt-4">
          {tags.map((tag) => {
            return (
              <Link
                key={tag.permalink}
                to={tag.permalink}
                className="border border-1 border-solid border-tailCall-lightMode---primary-600 bg-white dark:bg-tailCall-darkMode---primary-800 text-tailCall-lightMode---neutral-900 dark:text-white !no-underline px-5 py-2 rounded-full cursor-pointer"
              >
                {tag.label}
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}

import {translate} from "@docusaurus/Translate"
import {usePluralForm} from "@docusaurus/theme-common"

// Very simple pluralization: probably good enough for now
export function useReadingTimePluralForBlogs() {
  const {selectMessage} = usePluralForm()
  return (readingTimeFloat: number | undefined) => {
    if (readingTimeFloat) {
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
}

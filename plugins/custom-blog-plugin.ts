import {PluginOptions, BlogContent} from "@docusaurus/plugin-content-blog"
import {LoadContext, PluginContentLoadedActions} from "@docusaurus/types"

import * as blogPluginExports from "@docusaurus/plugin-content-blog"
const defaultBlogPlugin = blogPluginExports.default

async function blogPluginEnhanced(context: LoadContext, options: PluginOptions) {
  const blogPluginInstance = await defaultBlogPlugin(context, options)

  return {
    ...blogPluginInstance,
    async contentLoaded({content, actions}: {content: BlogContent; actions: PluginContentLoadedActions}) {
      if (blogPluginInstance.contentLoaded) {
        await blogPluginInstance.contentLoaded({content, actions})
      }

      const {setGlobalData} = actions
      const recentBlogPostsLimit = 10

      // Handle empty blog posts array safely
      const blogPosts = content.blogPosts || []
      const recentBlogPosts = [...blogPosts].splice(0, recentBlogPostsLimit)
      const recentBlogPostsMetadata = recentBlogPosts.map((blog) => {
        const {
          date,
          title,
          frontMatter: {description},
          authors,
          permalink,
        } = blog.metadata

        return {
          date,
          title,
          description,
          authors,
          permalink,
        }
      })
      const blogTags = content.blogTags || {}
      setGlobalData({recentBlogPostsMetadata, blogTags, totalBlogPosts: blogPosts.length})
    },
  }
}

module.exports = {
  ...blogPluginExports,
  default: blogPluginEnhanced,
}

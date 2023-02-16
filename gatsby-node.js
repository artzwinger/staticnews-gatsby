const path = require(`path`)
const chunk = require(`lodash/chunk`)

// This is a simple debugging tool
// dd() will prettily dump to the terminal and kill the process
// const { dd } = require(`dumper.js`)

/**
 * See https://www.gatsbyjs.com/docs/node-apis/#createPages for more info.
 */
exports.createPages = async gatsbyUtilities => {
    // Query our posts from the GraphQL server
    const posts = await getPosts(gatsbyUtilities)
    const tags = await getTags(gatsbyUtilities)

    // If there are no posts, don't do anything
    if (!posts.length) {
        return
    }

    // If there are posts, create pages for them
    await createIndividualBlogPostPages({ posts, gatsbyUtilities })
    await createBlogPostArchive({ posts, gatsbyUtilities })
    await createTagPage({ tags, gatsbyUtilities })
}

/**
 * This function creates all the individual blog pages in this site
 */
const createIndividualBlogPostPages = async ({ posts, gatsbyUtilities }) =>
    Promise.all(
        posts.map(({ previous, post, next }) =>
            // See https://www.gatsbyjs.com/docs/actions#createPage for more info
            gatsbyUtilities.actions.createPage({
                path: `/${post.slug}/`,

                // use the blog post template as the page component
                component: path.resolve(`./src/templates/blog-post.js`),

                // `context` is available in the template as a prop and
                // as a variable in GraphQL.
                context: {
                    // we need to add the post id here
                    // so our blog post template knows which blog post
                    // the current page is (when you open it in a browser)
                    id: post.id,

                    // We also use the next and previous id's to query them and add links!
                    previousPostId: previous ? previous.id : null,
                    nextPostId: next ? next.id : null,
                },
            })
        )
    )

/**
 * This function creates all the individual blog pages in this site
 */
async function createBlogPostArchive({ posts, gatsbyUtilities }) {
    const postsPerPage = 8

    const postsChunkedIntoArchivePages = chunk(posts, postsPerPage)
    const totalPages = postsChunkedIntoArchivePages.length

    return Promise.all(
        postsChunkedIntoArchivePages.map(async (_posts, index) => {
            const pageNumber = index + 1

            const getPagePath = page => {
                if (page > 0 && page <= totalPages) {
                    // Since our homepage is our blog page
                    // we want the first page to be "/" and any additional pages
                    // to be numbered.
                    // "/blog/2" for example
                    return page === 1 ? `/` : `/${page}/`
                }

                return null
            }

            // createPage is an action passed to createPages
            // See https://www.gatsbyjs.com/docs/actions#createPage for more info
            await gatsbyUtilities.actions.createPage({
                path: getPagePath(pageNumber),

                // use the blog post archive template as the page component
                component: path.resolve(`./src/templates/blog-post-archive.js`),

                // `context` is available in the template as a prop and
                // as a variable in GraphQL.
                context: {
                    // the index of our loop is the offset of which posts we want to display
                    // so for page 1, 0 * 10 = 0 offset, for page 2, 1 * 10 = 10 posts offset,
                    // etc
                    offset: index * postsPerPage,

                    page: pageNumber,

                    // We need to tell the template how many posts to display too
                    postsPerPage,

                    nextPagePath: getPagePath(pageNumber + 1),
                    previousPagePath: getPagePath(pageNumber - 1),
                },
            })
        })
    )
}

async function createTagPage({ tag, gatsbyUtilities }) {
    const postsPerPage = 8

    const postsChunkedIntoArchivePages = chunk(tag.posts, postsPerPage)
    const totalPages = postsChunkedIntoArchivePages.length

    return Promise.all(
        postsChunkedIntoArchivePages.map(async (_posts, index) => {
            const pageNumber = index + 1

            const getPagePath = page => {
                if (page > 0 && page <= totalPages) {
                    return page === 1 ? `/${tag.slug}/` : `/${tag.slug}/${page}/`
                }

                return null
            }

            // createPage is an action passed to createPages
            // See https://www.gatsbyjs.com/docs/actions#createPage for more info
            await gatsbyUtilities.actions.createPage({
                path: getPagePath(pageNumber),

                // use the blog post archive template as the page component
                component: path.resolve(`./src/templates/tag-page.js`),

                context: {
                    offset: index * postsPerPage,

                    tag,

                    page: pageNumber,

                    // We need to tell the template how many posts to display too
                    postsPerPage,
                    tagSlug: tag.slug,

                    nextPagePath: getPagePath(pageNumber + 1),
                    previousPagePath: getPagePath(pageNumber - 1),
                },
            })
        })
    )
}

async function getPosts({ graphql, reporter }) {
    const graphqlResult = await graphql(`
    query Posts {
      # Query all posts sorted by date
      allPost(sort: { foreign_created_at: DESC }) {
        edges {
          previous {
            id
          }
          # note: this is a GraphQL alias. It renames "node" to "post" for this query
          # We're doing this because this "node" is a post! It makes our code more readable further down the line.
          post: node {
            id
            slug
          }
          next {
            id
          }
        }
      }
    }
  `)

    if (graphqlResult.errors) {
        reporter.panicOnBuild(
            `There was an error loading your blog posts`,
            graphqlResult.errors
        )
        return
    }

    return graphqlResult.data.allPost.edges
}

async function getTags({ graphql, reporter }) {
    const graphqlResult = await graphql(`
    query Tags {
      allTag(sort: { slug: DESC }) {
        edges {
          previous {
            id
          }
          tag: node {
            id
            name
            slug
            posts {
              id
            }
          }
          next {
            id
          }
        }
      }
    }
  `)

    if (graphqlResult.errors) {
        reporter.panicOnBuild(
            `There was an error loading your tags`,
            graphqlResult.errors
        )
        return
    }

    return graphqlResult.data.allTag.edges
}
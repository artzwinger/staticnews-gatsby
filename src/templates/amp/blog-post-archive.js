import React from "react"
import {graphql, Link} from "gatsby"
import parse from "html-react-parser"

import Layout from "../../components/layout"
import Seo from "../../components/seo"

const BlogIndex = ({
                       data,
                       pageContext: {nextPagePath, previousPagePath, page},
                   }) => {
    const posts = data.allPost.nodes
    const defaultTitle = data.site.siteMetadata.title
    let title = `Все новости | ${defaultTitle}`
    if (page > 1) {
        title = `Страница ${page} | ${title}`
    }
    if (!posts.length) {
        return (
            <Layout isHomePage>
                <Seo title={title}/>
                <p>
                    No blog posts found. Add posts to your WordPress site and they'll
                    appear here!
                </p>
            </Layout>
        )
    }

    return (
        <Layout isHomePage>
            <Seo title={title}/>

            <div className="posts">
                {posts.map(post => {
                    const title = post.title

                    const {
                        src,
                        srcWebp,
                        presentationWidth,
                        presentationHeight
                    } = post.featured_image.childImageSharp.fluid

                    return (
                        <div key={post.slug} className="post">
                            <article
                                className="post-list-item"
                                itemScope
                                itemType="http://schema.org/NewsArticle"
                            >
                                <header>
                                    <amp-img
                                        src={srcWebp}
                                        width={presentationWidth}
                                        height={presentationHeight}
                                        alt={post.title}
                                        layout="responsive"
                                    >
                                        <div fallback>
                                            <amp-img
                                                src={src}
                                                width={presentationWidth}
                                                height={presentationHeight}
                                                alt={post.title}
                                                layout="responsive"
                                            />
                                        </div>
                                    </amp-img>
                                    <div className="archive-post-tag-links">
                                        {post.foreign_tags.map((tag) => <div className="tag-link">
                                            <Link className="" to={`/${tag.slug}/`}>
                                                {tag.name}
                                            </Link>
                                        </div>)}
                                    </div>
                                    <h2>
                                        <Link to={`/${post.slug}`} itemProp="url">
                                            <span itemProp="headline">{parse(title)}</span>
                                        </Link>
                                    </h2>
                                    <small itemProp="datePublished">{post.foreign_created_at}</small>
                                </header>
                                <section itemProp="description">{parse(post.description)}</section>
                            </article>
                        </div>
                    )
                })}
            </div>
            <div className="archive-nav">
                <div className="list-nav">
                    {previousPagePath && (
                        <div className="primary-button">
                            <Link to={previousPagePath}>Предыдущая страница</Link>
                        </div>
                    )}
                    {nextPagePath &&
                        <div className="primary-button"><Link to={nextPagePath}>Следующая страница</Link></div>}
                </div>
            </div>
        </Layout>
    )
}

    export default BlogIndex

    export const pageQuery = graphql`
  query PostArchive($offset: Int!, $postsPerPage: Int!) {
    site {
      siteMetadata {
        title
      }
    }
    allPost(sort: {foreign_created_at: DESC}, limit: $postsPerPage, skip: $offset) {
      nodes {
        description
        slug
        foreign_created_at(formatString: "MMMM DD, YYYY", locale: "ru")
        title
        foreign_tags {
          name
          slug
        }
        featured_image {
          childImageSharp {
            fluid {
              src
              srcWebp
              presentationWidth
              presentationHeight
            }
          }
        }
      }
    }
  }
`

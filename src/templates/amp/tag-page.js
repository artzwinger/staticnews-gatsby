import React from "react"
import {graphql, Link} from "gatsby"
import parse from "html-react-parser"

import Layout from "../../components/layout"
import Seo from "../../components/seo"
import {AmpImage} from "../../components/AmpImage";
import {ForeignTags} from "../../components/ForeignTags";

const BlogIndex = ({
                       data,
                       pageContext: {nextPagePath, previousPagePath, page, tag},
                   }) => {
    const posts = data.allPost.nodes
    const defaultTitle = data.site.siteMetadata.title
    let title = `${tag.name} | ${defaultTitle}`
    if (page > 1) {
        title = `Страница ${page} | ${tag.name} | ${title}`
    }
    if (!posts.length) {
        return (
            <Layout isHomePage>
                <Seo title={title}/>
                <p>
                    По этому тегу пока нет постов. Как вы сюда попали?
                </p>
            </Layout>
        )
    }

    return (
        <Layout isHomePage isAmp={true}>
            <Seo title={title} description={title} meta={
                [{
                    name: 'yandex',
                    content: 'noindex'
                }]
            }/>

            <div className="posts">
                {posts.map(post => {
                    const title = post.title

                    return (
                        <div key={post.slug} className="post">
                            <article
                                className="post-list-item"
                                itemScope
                                itemType="http://schema.org/NewsArticle"
                            >
                                <header>
                                    {AmpImage(post)}
                                    <div className="archive-post-tag-links">
                                        {ForeignTags(post)}
                                    </div>
                                    <h2>
                                        <Link to={`/amp/${post.slug}/`} itemProp="url">
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
                        <div className="primary-button next-page"><Link to={nextPagePath}>Следующая страница</Link></div>}
                </div>
            </div>
        </Layout>
    )
}

export default BlogIndex

export const pageQuery = graphql`
  query TagPage($offset: Int!, $postsPerPage: Int!, $tagSlug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    allPost(
      sort: {foreign_created_at: DESC}, limit: $postsPerPage, skip: $offset,
      filter: {foreign_tags: {elemMatch: {slug: {eq: $tagSlug}}}}
    ) {
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

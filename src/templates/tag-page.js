import React from "react"
import {graphql, Link} from "gatsby"
import parse from "html-react-parser"

import Layout from "../components/layout"
import {ForeignTags} from "../components/ForeignTags";
import {HeadComponent} from "../components/HeadComponent";

const BlogIndex = ({
                       data,
                       pageContext: {nextPagePath, previousPagePath},
                   }) => {
    const posts = data.allPost.nodes
    if (!posts.length) {
        return (
            <Layout isHomePage>
                <p>
                    По этому тегу нет постов. Как вы сюда попали?
                </p>
            </Layout>
        )
    }

    return (
        <Layout isHomePage>
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
                                    {post.image_url &&
                                        <img src={post.image_url} width={289} height={192} alt={post.title}/>}
                                    <div className="archive-post-tag-links">
                                        {ForeignTags({post})}
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
                        <div className="primary-button next-page"><Link to={nextPagePath}>Следующая страница</Link>
                        </div>}
                </div>
            </div>
        </Layout>
    )
}

export const Head = ({
                         data: {site: {siteMetadata: {title, description}}},
                         pageContext: {page, tag}
                     }) => {
    return <HeadComponent title={title} page={page} tag={tag} description={description}/>
}

export default BlogIndex

export const pageQuery = graphql`
  query TagPage($offset: Int!, $postsPerPage: Int!, $tagSlug: String!) {
    site {
      siteMetadata {
        title
        description
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
        image_url
        foreign_tags {
          name
          slug
        }
      }
    }
  }
`

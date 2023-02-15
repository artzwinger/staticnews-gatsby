import React from "react"
import {graphql, Link} from "gatsby"
import parse from "html-react-parser"

import Layout from "../components/layout"
import Seo from "../components/seo"
import {GatsbyImage} from "gatsby-plugin-image";

const BlogIndex = ({
                       data,
                       pageContext: {nextPagePath, previousPagePath},
                   }) => {
    const posts = data.allPost.nodes

    if (!posts.length) {
        return (
            <Layout isHomePage>
                <Seo title="All posts"/>
                <p>
                    No blog posts found. Add posts to your WordPress site and they'll
                    appear here!
                </p>
            </Layout>
        )
    }

    return (
        <Layout isHomePage>
            <Seo title="All posts"/>

            <div className="posts">
                {posts.map(post => {
                    const title = post.title

                    const featured_image = {
                        data: post.featured_image?.childImageSharp?.gatsbyImageData,
                        alt: post.title,
                    }

                    return (
                        <div key={post.slug} className="post">
                            <article
                                className="post-list-item"
                                itemScope
                                itemType="http://schema.org/Article"
                            >
                                <header>
                                    {featured_image?.data && (
                                        <GatsbyImage
                                            width={289}
                                            height={192}
                                            layout="constrained"
                                            image={featured_image.data}
                                            alt={featured_image.alt}
                                            style={{marginBottom: 50}}
                                        />
                                    )}
                                    <h2>
                                        <Link to={`/${post.slug}`} itemProp="url">
                                            <span itemProp="headline">{parse(title)}</span>
                                        </Link>
                                    </h2>
                                    <small>{post.foreign_created_at}</small>
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
    allPost(sort: {foreign_created_at: DESC}, limit: $postsPerPage, skip: $offset) {
      nodes {
        description
        slug
        foreign_created_at(formatString: "MMMM DD, YYYY")
        title
        featured_image {
          childImageSharp {
            gatsbyImageData(
              quality: 100
              placeholder: DOMINANT_COLOR
              layout: CONSTRAINED
              width: 290
              height: 192
            )
          }
        }
      }
    }
  }
`

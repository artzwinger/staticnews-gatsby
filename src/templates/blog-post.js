import React from "react"
import {Link, graphql} from "gatsby"
import {GatsbyImage} from "gatsby-plugin-image"
import parse from "html-react-parser"

import Layout from "../components/layout"
import Seo from "../components/seo"

const BlogPostTemplate = ({data: {previous, next, post}}) => {
    const featured_image = {
        data: post.featured_image?.childImageSharp?.gatsbyImageData,
        alt: post.title,
    }

    return (
        <Layout>
            <Seo title={post.title} description={post.description}/>

            <article
                className="blog-post"
                itemScope
                itemType="http://schema.org/Article"
            >
                <header>
                    <h1 itemProp="headline">{parse(post.title)}</h1>

                    <p>{post.date}</p>
                    <div className="post-img-container">
                        {/* if we have a featured image for this post let's display it */}
                        {featured_image?.data && (
                            <GatsbyImage
                                width={586}
                                height={390}
                                layout="constrained"
                                image={featured_image.data}
                                alt={featured_image.alt}
                                style={{marginBottom: 50}}
                            />
                        )}
                    </div>
                </header>

                {!!post.content && (
                    <section itemProp="articleBody">{parse(post.content)}</section>
                )}
            </article>

            <nav className="list-nav">
                {previous && (<div className="primary-button">
                        <Link to={`/${previous.slug}`} rel="prev">
                            ← {parse(previous.title)}
                        </Link>
                    </div>
                )}

                {next && (<div className="primary-button">
                        <Link to={`/${next.slug}`} rel="next">
                            {parse(next.title)} →
                        </Link>
                    </div>
                )}
            </nav>
        </Layout>
    )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostById(
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    post: post(id: { eq: $id }) {
      id
      content
      title
      description
      foreign_created_at(formatString: "MMMM DD, YYYY")
      featured_image {
        childImageSharp {
          gatsbyImageData(
            quality: 100
            placeholder: DOMINANT_COLOR
            layout: CONSTRAINED
            width: 586
            height: 390
            formats: [WEBP]
          )
        }
      }
    }
    previous: post(id: { eq: $previousPostId }) {
      slug
      title
    }
    next: post(id: { eq: $nextPostId }) {
      slug
      title
    }
  }
`

import React from "react"
import {graphql, Link} from "gatsby"
import parse from "html-react-parser"

import Layout from "../../components/layout"
import Seo from "../../components/seo"

const BlogPostTemplate = ({data: {previous, next, post}}) => {
    const renderImage = () => {
        if (!post.featured_image) {
            return null;
        }
        const {
            src,
            srcWebp,
            presentationWidth,
            presentationHeight
        } = post.featured_image.childImageSharp.fluid
        return <>
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
        </>
    };

    return (
        <Layout>
            <Seo title={post.title} description={post.description}/>

            <article
                className="blog-post"
            >
                <header>
                    <h1 itemProp="headline">{parse(post.title)}</h1>
                    <div className="post-info">
                        <h6 itemProp="author">{parse(post.author)}</h6>
                        <small itemProp="datePublished">{post.foreign_created_at}</small>
                        <div className="post-tag-links">
                            {post.foreign_tags.map((tag) => <div className="tag-link" key={`post-tag-link-${tag.slug}`}>
                                <Link className="" to={`/amp/${tag.slug}/`}>
                                    {tag.name}
                                </Link>
                            </div>)}
                        </div>
                    </div>
                    <div className="post-img-container">
                        {renderImage()}
                    </div>
                </header>

                {!!post.content && (
                    <section itemProp="articleBody">{parse(post.content)}</section>
                )}

                {post.source_link &&
                    <div className="source-link">
                        <Link to={post.source_link}>
                            Источник: {post.source_link}
                        </Link>
                    </div>
                }
            </article>

            <nav className="list-nav">
                {previous && (<div className="primary-button">
                        <Link to={`/amp/${previous.slug}/`} rel="prev">
                            ← {parse(previous.title)}
                        </Link>
                    </div>
                )}

                {next && (<div className="primary-button">
                        <Link to={`/amp/${next.slug}/`} rel="next">
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
      foreign_created_at(formatString: "MMMM DD, YYYY", locale: "ru")
      foreign_tags {
        name
        slug
      }
      source_link
      author
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

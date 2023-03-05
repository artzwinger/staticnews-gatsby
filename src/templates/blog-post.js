import React from "react"
import {graphql, Link} from "gatsby"
import parse from "html-react-parser"

import Layout from "../components/layout"
import {ForeignTags} from "../components/ForeignTags";
import {SourceLink} from "../components/SourceLink";
import {HeadComponent} from "../components/HeadComponent";

const BlogPostTemplate = ({data: {previous, next, post}}) => {
    return (
        <Layout>
            <article
                className="blog-post"
                itemScope
                itemType="http://schema.org/NewsArticle"
            >
                <header>
                    <h1 itemProp="headline">{parse(post.title)}</h1>
                    <div className="post-info">
                        <span itemProp="author">{parse(post.author)}</span>
                        <small itemProp="datePublished">{post.foreign_created_at}</small>
                        <div className="post-tag-links">
                            {ForeignTags({post})}
                        </div>
                    </div>
                    <div className="post-img-container">
                        {post.image_url && <img src={post.image_url} width={586} height={390} alt={post.title}/>}
                    </div>
                </header>

                {!!post.content && (
                    <section itemProp="articleBody">{parse(post.content)}</section>
                )}

                <SourceLink post={post}/>
            </article>

            <nav className="list-nav">
                {previous && (<div className="primary-button">
                        <Link to={`/${previous.slug}`} rel="prev">
                            ← {parse(previous.title)}
                        </Link>
                    </div>
                )}

                {next && (<div className="primary-button next-page">
                        <Link to={`/${next.slug}`} rel="next">
                            {parse(next.title)} →
                        </Link>
                    </div>
                )}
            </nav>
        </Layout>
    )
}

export const Head = ({data: {post}}) => {
    return <HeadComponent title={post.title} description={post.description}/>
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
      image_url
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

import React from "react"
import {graphql, Link, useStaticQuery} from "gatsby"
import '../css/style.css'

const Layout = ({isHomePage, children}) => {
    const data = useStaticQuery(graphql`
            query Tags {
              site {
                siteMetadata {
                  name
                }
              }
              allTag {
                nodes {
                  name
                  slug
                }
              }
            }`)
    const siteName = data.site.siteMetadata.name
    const tags = data.allTag.nodes
    return (
        <div className="global-wrapper" data-is-root-path={isHomePage}>
            <header className="global-header">
                {isHomePage ? (
                    <h1 className="main-heading">
                        <Link to="/">{siteName}</Link>
                    </h1>
                ) : (
                    <Link className="header-link-home" to="/">
                        {siteName}
                    </Link>
                )}
                <div className="header-tags">
                    {tags.map((tag) => <div className="tag-link" key={`head-tag-link-${tag.slug}`}>
                        <Link className="" to={`/${tag.slug}/`}>
                            {tag.name}
                        </Link>
                    </div>)}
                </div>
            </header>

            <main>{children}</main>

            <footer className="global-footer">
                © {new Date().getFullYear()}, все права защищены
            </footer>
        </div>
    )
}

export default Layout

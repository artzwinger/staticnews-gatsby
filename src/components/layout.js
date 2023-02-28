import React, {useState} from "react"
import {graphql, Link, useStaticQuery} from "gatsby"
import '../css/style.css'
import {HeaderTags} from "./HeaderTags";

const Layout = ({isHomePage, children, isAmp = false}) => {
    const [open, setOpen] = useState(false)
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
    const ampMetrika = {
        "vars": {
            "counterId": "92558241"
        }
    }
    const ampMetrikaJson = JSON.stringify(ampMetrika, null, 2)
        .replace('\\', '')
        .replace('&quot', '"')

    return <>
        {isAmp && <amp-analytics type="metrika">
            <script type="application/json" dangerouslySetInnerHTML={{__html: ampMetrikaJson}}/>
        </amp-analytics>}
        <div className="global-wrapper" onClick={() => setOpen(false)} data-is-root-path={isHomePage}>
            <div itemScope itemType="https://schema.org/WebSite">
                <meta itemProp="url" content="https://www.fastfastnews.ru/"/>
                <meta itemProp="name" content={siteName}/>
            </div>
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
                <HeaderTags tags={tags} isAmp={isAmp} open={open} setOpen={setOpen}/>
            </header>

            <main>{children}</main>

            <footer className="global-footer">
                © {new Date().getFullYear()}, все права защищены
            </footer>
        </div>
    </>
}

export default Layout

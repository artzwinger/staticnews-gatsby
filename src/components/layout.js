import React from "react"
import {Link} from "gatsby"

const Layout = ({isHomePage, children}) => {
    return (
        <div className="global-wrapper" data-is-root-path={isHomePage}>
            <header className="global-header">
                {isHomePage ? (
                    <h1 className="main-heading">
                        <Link to="/">static site</Link>
                    </h1>
                ) : (
                    <Link className="header-link-home" to="/">
                        static site
                    </Link>
                )}
            </header>

            <main>{children}</main>

            <footer>
                © {new Date().getFullYear()}, all rights reserved
            </footer>
        </div>
    )
}

export default Layout

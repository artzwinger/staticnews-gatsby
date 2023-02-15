import React from "react"
import {Link} from "gatsby"
import '../css/style.css'

const Layout = ({isHomePage, children}) => {
    return (
        <div className="global-wrapper" data-is-root-path={isHomePage}>
            <header className="global-header">
                {isHomePage ? (
                    <h1 className="main-heading">
                        <Link to="/">авто новости</Link>
                    </h1>
                ) : (
                    <Link className="header-link-home" to="/">
                        авто новости
                    </Link>
                )}
            </header>

            <main>{children}</main>

            <footer className="global-footer">
                © {new Date().getFullYear()}, все права защищены
            </footer>
        </div>
    )
}

export default Layout

import * as React from "react"
import {Link} from "gatsby"

const pageStyles = {
    color: "#232129",
    padding: "96px",
    fontFamily: "-apple-system, Roboto, sans-serif, serif",
}
const headingStyles = {
    marginTop: 0,
    marginBottom: '1rem',
    maxWidth: 320,
}

const paragraphStyles = {
    marginBottom: '1rem',
}
const linkStyles = {
    display: 'block',
    fontSize: "1.25rem",
    textDecoration: 'underline',
    marginTop: '1rem',
}

const NotFoundPage = () => {
    return (
        <main style={pageStyles}>
            <h1 style={headingStyles}>Страница не найдена</h1>
            <p style={paragraphStyles}>
                😔 к сожалению, мы не смогли ничего найти по этому запросу.
                <Link style={linkStyles} to="/">На главную</Link>.
            </p>
        </main>
    )
}

export default NotFoundPage

export const Head = () => <title>Not found</title>

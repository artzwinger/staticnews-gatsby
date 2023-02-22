import React from "react";

export const HeadComponent = ({title, description, isAmp = false, tag, page, isArchive = false}) => {
    const pageTitle = getTitle({title, page, isArchive, tag})
    const pageDescription = getTitle({description, page, isArchive, tag})
    return <>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription}/>

        <meta name="twitter:title" content={pageTitle}/>
        <meta name="twitter:card" content='summary'/>
        <meta name="twitter:description" content={pageDescription}/>

        <meta property="og:title" content={pageTitle}/>
        <meta property="og:description" content={pageDescription}/>

        {isAmp && <meta name='yandex' content='noindex'/>}
    </>
}

const getTitle = ({title, page, isArchive, tag}) => {
    let pageTitle = title
    if (isArchive) {
        pageTitle = `Все новости | ${pageTitle}`
    }
    if (tag) {
        pageTitle = `${tag.name} | ${title}`
    }
    if (page > 1) {
        pageTitle = `Страница ${page} | ${pageTitle}`
    }
    return pageTitle
}

const pageDescription = ({description, page, isArchive, tag}) => {
    let pageDescription = description
    if (isArchive) {
        pageDescription = `Все новости | ${pageDescription}`
    }
    if (tag) {
        pageDescription = `${tag.name} | ${description}`
    }
    if (page > 1) {
        pageDescription = `Страница ${page} | ${pageDescription}`
    }
    return pageDescription
}
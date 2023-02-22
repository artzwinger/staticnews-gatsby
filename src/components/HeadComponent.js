import React from "react";

export const HeadComponent = ({title, description, isAmp = false}) => {
    return <>
        <title>{title}</title>
        <meta name="description" content={description}/>

        <meta name="twitter:title" content={title}/>
        <meta name="twitter:card" content='summary'/>
        <meta name="twitter:description" content={description}/>

        <meta property="og:title" content={title}/>
        <meta property="og:description" content={description}/>

        {isAmp && <meta name='yandex' content='noindex'/>}
    </>
}
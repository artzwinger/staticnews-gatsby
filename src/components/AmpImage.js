import React from "react";

export const AmpImage = (post) => {
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
            <amp-img
                fallback=""
                src={src}
                width={presentationWidth}
                height={presentationHeight}
                alt={post.title}
                layout="responsive"
            />
        </amp-img>
    </>
};
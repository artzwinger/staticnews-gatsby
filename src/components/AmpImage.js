import React from "react";

export const AmpImage = (post) => {
    if (!post.featured_image?.original?.src) {
        return null;
    }
    const {
        src,
        height,
        width
    } = post.featured_image.original
    return <>
        <amp-img
            src={src}
            width={width}
            height={height}
            alt={post.title}
            layout="responsive"
        />
    </>
};
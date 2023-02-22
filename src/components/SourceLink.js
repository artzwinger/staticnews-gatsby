import React from "react";
import {Link} from "gatsby";

export const SourceLink = ({post}) => {
    if (!post.source_link) {
        return null
    }
    const domain = new URL(post.source_link)
    return <div className="source-link">
        <Link to={post.source_link}>
            Источник: {domain.hostname}
        </Link>
    </div>
};
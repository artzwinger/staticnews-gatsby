import React from "react";
import {Link} from "gatsby";

export const ForeignTags = (post, isAmp = false) => {
    if (!post.foreign_tags) {
        return null;
    }
    return post.foreign_tags.map((tag) => <div className="tag-link" key={`${post.id}-${tag.slug}-link`}>
        <Link className="" to={isAmp ? `/amp/${tag.slug}/` : `/${tag.slug}/`}>
            {tag.name}
        </Link>
    </div>)
};
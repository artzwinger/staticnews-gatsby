import React from "react";
import {Link} from "gatsby";

export const AmpTags = ({tags}) => {
    return <>
        <button className="hamburger-menu" on="tap:sidebar1.toggle">
            <svg viewBox="0 0 100 80" width="40" height="40">
                <rect width="100" height="20"></rect>
                <rect y="30" width="100" height="20"></rect>
                <rect y="60" width="100" height="20"></rect>
            </svg>
        </button>
        <amp-sidebar id="sidebar1" layout="nodisplay" side="right">
            <ul>
                {tags.map((tag) => <li className="tag-link" key={`head-tag-link-${tag.slug}`}>
                    <Link className="" to={`/amp/${tag.slug}/`}>
                        {tag.name}
                    </Link>
                </li>)}
            </ul>
        </amp-sidebar>
    </>
};
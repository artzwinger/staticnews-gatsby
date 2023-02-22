import React, {useState} from "react";
import {AmpTags} from "./AmpTags";
import {Link} from "gatsby";

export const HeaderTags = ({tags, isAmp = false, open, setOpen}) => {
    if (isAmp) {
        return <AmpTags tags={tags}></AmpTags>
    }
    tags = [...new Map(tags.map(item => [item['slug'], item])).values()] // unique tags by slug
    return <div className={'header-tags-container'} onClick={(e) => e.stopPropagation()}>
        <div className={"hamburger-menu"} onClick={() => setOpen(!open)}>
            <svg viewBox="0 0 100 80" width="40" height="40">
                <rect width="100" height="20"></rect>
                <rect y="30" width="100" height="20"></rect>
                <rect y="60" width="100" height="20"></rect>
            </svg>
        </div>
        <div className={"header-tags"}>
            {tags.map((tag) => <div className="tag-link" key={`head-tag-link-${tag.slug}`}>
                <Link className="" to={isAmp ? `/amp/${tag.slug}/` : `/${tag.slug}/`}>
                    {tag.name}
                </Link>
            </div>)}
        </div>
        <div className={"sidebar-tags" + (open ? ' open' : '')}>
            {tags.map((tag) => <div className="tag-link" key={`head-tag-link-${tag.slug}`}>
                <Link className="" to={isAmp ? `/amp/${tag.slug}/` : `/${tag.slug}/`}>
                    {tag.name}
                </Link>
            </div>)}
        </div>
    </div>
};
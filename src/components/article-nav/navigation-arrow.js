import {Link} from "gatsby";
import React from "react";
import classNames from "classnames";
import "./navigation-arrow.scss";

export const NavigationArrow = (props) => {

    return <div className={classNames("pagination-nav", {"arrow-left" : props.direction === "LEFT"}, {"arrow-right" : props.direction === "RIGHT"})}>
        {props.displayLink && (
            <Link to={props.post.fields.slug} className="link no-box-shadow">
                <div className="nav-arrow" style={{fontSize: 40,textAlign:'left'}}>
                    {
                        props.direction === 'LEFT'?"←":"→"
                    }
                </div>
                <div className="nav-more-info">
                    <span className="article-title" style={{alignSelf: 'center'}} >
                        <span>{props.post.frontmatter.title}</span>
                    </span>
                    <img alt={props.alt} src={props.post.frontmatter.preview.childImageSharp.fixed.src} />
                </div>
            </Link>
        )}
    </div>

};

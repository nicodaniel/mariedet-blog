import Link from "gatsby-link";
import {ArticlePreview} from "./article-preview";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import classNames from "classnames";

export const ArticleTopic = (props) => {

    const styles = makeStyles((theme) => ({
        layoutColumn: {
            [theme.breakpoints.up('xs')]: {
                flex: '0 0 33%',
            },
            [theme.breakpoints.down('xs')]: {
                flex: '0 0 45%',
            }
        }
    }));


    return <div className="article-by-topics">
            <div className="article-by-topics-header">
                <span className="capital-letters font1">{props.topic}</span>
                {props.showLink?<Link className="link no-text-decoration box-shadow" to={`/topic/${props.topic}`} style={{float:"right"}}>See All in {props.topic}</Link>:null}
            </div>
            <div className="article-by-topics-content">
                <div className="article-list" style={{display: 'flex',flexWrap: 'wrap'}} key={'article-list'}>
                    {props.posts.map((node, index) => {
                        return (
                            <div className={classNames(styles().layoutColumn ,"article-preview-container")} key={index}>
                                <ArticlePreview
                                    articleKey={node.node.fields.slug}
                                    img={node.node.frontmatter.preview?.childImageSharp?.fluid}
                                    date={node.node.frontmatter.date}
                                    description={node.node.frontmatter.description}
                                />
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
};

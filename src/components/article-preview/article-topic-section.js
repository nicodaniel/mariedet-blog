import Link from "gatsby-link";
import {ArticlePreview} from "./article-preview";
import React from "react";

export class ArticleTopic extends React.Component{

    render(){
        return <div className="article-by-topics">
            <div className="article-by-topics-header">
                <span className="capital-letters font1">{this.props.topic}</span>
                {this.props.showLink?<Link className="link no-text-decoration box-shadow" to={`/topic/${this.props.topic}`} style={{float:"right"}}>See All in {this.props.topic}</Link>:null}
            </div>
            <div className="article-by-topics-content">
                <div className="article-list" style={{display: 'flex',flexWrap: 'wrap'}} key={'article-list'}>
                    {this.props.posts.map((node, index) => {
                        return (
                            <div className="article-preview-container" key={index}>
                                <ArticlePreview
                                    articleKey={node.node.fields.slug}
                                    img={node.node.frontmatter.preview?.childImageSharp?.fixed}
                                    date={node.node.frontmatter.date}
                                    description={node.node.frontmatter.description}
                                />
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    }
}

import React from "react";
import Image from "gatsby-image";
import { rhythm } from "../../utils/typography"
import {Link} from "gatsby";
import "./article-topic.scss"

export class ArticlePreview extends React.Component {
    render() {
        return (
            <Link to={this.props.articleKey}  style={{ boxShadow: `none` }}>
                <article key={this.props.articleKey} style={{marginRight: 20}} className="article-preview">
                    <div className="image-container">
                        <Image
                            fluid={this.props.img}
                            alt={"article image"}
                            style={{
                                marginRight: rhythm(1 / 2),
                                marginBottom: 0
                            }}
                        />
                        <div className="image-overlay"></div>
                    </div>
                    <header>
                        <small className="font2" style={{color: 'grey', fontSize: 15, fontWeight: 400}}>{this.props.date}</small>
                    </header>
                    <section style={{color: 'black'}} className="article-title">
                        <span>{this.props.description}</span>
                    </section>
                </article>
            </Link>
        );
    }
}

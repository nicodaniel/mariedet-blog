import React from "react";
import Image from "gatsby-image";
import { rhythm } from "../../utils/typography"
import {Link} from "gatsby";
import "./article-topic.scss"

export class ArticlePreview extends React.Component {
    render() {
        const IMG_WIDTH = 223;
        const IMG_HEIGHT = 167;
        return (
            <Link to={this.props.articleKey}  style={{ boxShadow: `none` }}>
                <article key={this.props.articleKey} style={{width: 223, marginRight: 20}} className="article-preview">
                    <div className="image-container">
                        <Image
                            fixed={this.props.img}
                            alt={"article image"}
                            style={{
                                marginRight: rhythm(1 / 2),
                                marginBottom: 0,
                                width: IMG_WIDTH,
                                height: IMG_HEIGHT
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

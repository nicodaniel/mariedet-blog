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
                <article key={this.props.articleKey} style={{width: 223, marginRight: 20}}>
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
                    <header style={{fontFamily : 'baskerville-urw'}}>
                        <small style={{color: 'grey', fontFamily : 'baskerville', fontSize: 15, fontWeight: 400}}>{this.props.date}</small>
                    </header>
                    <section style={{color: 'black', fontFamily : 'baskerville', fontSize: 20, lineHeight: '24px', fontWeight: 400, letterSpacing: 0.18}}>
                        <span>{this.props.description}</span>
                    </section>
                </article>
            </Link>
        );
    }
}

import React from "react"
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import "./carousel-viewer.scss";
import Link from "gatsby-link";
import Image from "gatsby-image";



export class CarouselViewer extends React.Component {
    render() {
        return (
            <Carousel  showArrows={true} autoPlay={true} showIndicators={true} showThumbs={false}>
                {
                    this.props.data.map((d, index) => {
                        return <Link style={{color:'black'}} to={d.fields.slug} key={index}>
                                    <div key={index}>
                                        <Image fluid={d.frontmatter.preview.childImageSharp.fluid} alt="carousel img" />
                                        <div className="carousel-text-container">
                                        <span className="capital-letters article-topic font1"
                                              style={{fontSize: '10'}}>{d.frontmatter.topic}</span>
                                            <span className="article-title">{d.frontmatter.title}</span>
                                            <span className="article-date"><small>{d.frontmatter.date}</small></span>
                                        </div>
                                    </div>
                                </Link>
                    })
                }
            </Carousel>
        );
    }
}

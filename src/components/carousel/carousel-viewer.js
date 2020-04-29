import React from "react"
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import "./carousel-viewer.scss";

export class CarouselViewer extends React.Component {
    render() {
        return (
            <Carousel showArrows={true} autoPlay={false} showIndicators={true} showThumbs={false}>
                {
                    this.props.data.map((d, index) => {
                        return <div key={index}>
                            <img src={d.preview.childImageSharp.fixed.src} alt="carousel img" />
                            <div className="carousel-text-container">
                                <span className="capital-letters article-topic"
                                      style={{fontFamily: 'Montserrat', fontSize: '10'}}>{d.topic}</span>
                                <span className="article-title">{d.title}</span>
                                <span className="article-date"><small>{d.date}</small></span>
                            </div>
                        </div>
                    })
                }
            </Carousel>
        );
    }
}
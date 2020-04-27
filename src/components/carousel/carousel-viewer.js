import React from "react"
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import "./carousel-viewer.scss";

export class CarouselViewer extends React.Component {
    render() {
        return (
            <Carousel showArrows={true} autoPlay={true} showIndicators={true} showThumbs={false}>
                {
                    this.props.images.filter(img => img !== null).map((img, index) => {
                        return <div key={index}>
                            <img src={img.src} alt="carousel img" />
                        </div>
                    })
                }
            </Carousel>
        );
    }
}

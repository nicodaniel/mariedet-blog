import React from "react";
import "./social-feed.scss"

export class SocialFeed extends React.Component {

    render(){
        const IMG_WIDTH = 185;
        const MARGIN = '9px';

        return <div className="social-feed-section">
            <div className="social-feed-title">
                <h1 className="text-align-center">follow me</h1>
            </div>

            <div className="social-feed-images">
                <div className="social-feed-images-container">
                    {this.props.instagram.edges.map((edge) => {
                        return <div className='image-container' style={{height: '194px'}}>
                            <img src={edge.node.localFile.childImageSharp.fixed.src}
                                 alt="social-img"
                                 style={{marginRight: MARGIN, marginBottom: MARGIN}}
                                 width={IMG_WIDTH}
                                 height={IMG_WIDTH} />
                        </div>
                    })}
                </div>
            </div>
        </div>
    }

}

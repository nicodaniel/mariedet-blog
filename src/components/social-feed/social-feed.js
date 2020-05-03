import React from "react";
import "./social-feed.scss"

export const SocialFeed = (props) => {
    const [dimensions, setDimensions] = React.useState({
        height: typeof window !== 'undefined' && window.innerHeight,
        width: typeof window !== 'undefined' && window.innerWidth
    });

    const tileRef = React.useRef([...Array(2)].map(() => React.createRef()));
    const imgRef = React.useRef([...Array(8)].map(() => React.createRef()));

    /* TODO this hook should be generic and available in a function comp */
    /* a hook to listen resize */
    React.useEffect(() => {
       redrawImg(tileRef, imgRef);
       const handleResizeEvent = () => setDimensions({
           height: typeof window !== 'undefined' && window.innerHeight,
           width: typeof window !== 'undefined' && window.innerWidth
       });

       window.addEventListener('resize', handleResizeEvent);

       return () => window.removeEventListener('resize', handleResizeEvent);
    });

    const IMG_WIDTH = 185;
    const MARGIN = 9;

    const redrawImg = (tiles, imgs) => {
        if(tiles && imgs){
            const positionRight = imgs.current[0].getBoundingClientRect().right;
            const positionLeft = tiles.current[1].getBoundingClientRect().left;
            const actualMargin = positionLeft - positionRight;
            const imgWidth = imgs.current[0].getAttribute("width");
            imgs.current.forEach(img => {
                if(actualMargin < MARGIN){
                    const newSize = parseInt(imgWidth) - (MARGIN - actualMargin);
                    img.setAttribute("width", newSize);
                    img.setAttribute("height", newSize);
                }else{
                    const newSize = parseInt(imgWidth) + (actualMargin - MARGIN);
                    img.setAttribute("width", newSize);
                    img.setAttribute("height", newSize);
                }
            })
        }
    };

    return <div className="social-feed-section">
        <div className="social-feed-title">
            <h1 className="text-align-center">follow me</h1>
        </div>

        <div className="social-feed-pictures">
            <div className="container">
                <div style={{display: 'flex', flexWrap: 'wrap'}}>
                    {props.instagram.edges.map((edge, index) => {
                        const imgHref = `https://www.instagram.com/p/${edge.node.id}`;
                        return <div style={{flex: '1 0 22%'}} ref={el => (index === 0 || index === 1? tileRef.current[index] = el: null)}>
                            <a className="no-box-shadow" href={imgHref}>
                                <img ref={el => (imgRef.current[index] = el)}
                                     src={edge.node.localFile.childImageSharp.fixed.src}
                                     alt="social-img"
                                     style={{marginRight: `${MARGIN}px`, marginBottom: `${MARGIN}px`, marginTop: `-5px`}}
                                     width={IMG_WIDTH}
                                     height={IMG_WIDTH} />
                            </a>
                        </div>
                    })}
                </div>
            </div>
        </div>
    </div>

};

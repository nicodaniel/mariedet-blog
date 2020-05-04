import React from "react";
import "./social-feed.scss"
import {makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import classNames from "classnames";
import * as json2mq from "json2mq";


export const SocialFeed = (props) => {
    const [dimensions, setDimensions] = React.useState({
        height: typeof window !== 'undefined' && window.innerHeight,
        width: typeof window !== 'undefined' && window.innerWidth
    });

    const tileRef = React.useRef([...Array(2)].map(() => React.createRef()));
    const imgRef = React.useRef([...Array(8)].map(() => React.createRef()));
    const containerRef = React.createRef();
    const hasTwoColumns = useMediaQuery(json2mq({maxWidth: 600-1}));

    /* TODO this hook should be generic and available in a function comp */
    /* a hook to listen resize */
    React.useEffect(() => {
        redrawImg(tileRef, imgRef, hasTwoColumns);
        const handleResizeEvent = () => setDimensions({
            height: typeof window !== 'undefined' && window.innerHeight,
            width: typeof window !== 'undefined' && window.innerWidth
        });

        window.addEventListener('resize', handleResizeEvent);

        return () => window.removeEventListener('resize', handleResizeEvent);
    });

    const IMG_WIDTH = 185;
    const MARGIN = 9;
    const MAX_WIDTH = 303;

    const redrawImg = (tiles, imgs, hasTwoColumns) => {
        if (tiles && imgs) {
            const positionRight = imgs.current[0].getBoundingClientRect().right;
            const positionLeft = tiles.current[1].getBoundingClientRect().left;
            const actualMargin = positionLeft - positionRight;
            const availableSpace = containerRef.current.getBoundingClientRect().width;
            const imgWidth = imgs.current[0].getAttribute("width");
            imgs.current.forEach(img => {
                var newSize;
                if (actualMargin < MARGIN) {
                    newSize = parseInt(imgWidth) - (MARGIN - actualMargin);
                } else {
                    newSize = parseInt(imgWidth) + (actualMargin - MARGIN);
                }
                img.setAttribute("width", newSize>MAX_WIDTH?MAX_WIDTH:availableSpace/(hasTwoColumns?2:4));
                img.setAttribute("height", newSize>MAX_WIDTH?MAX_WIDTH:availableSpace/(hasTwoColumns?2:4));
            })
        }
    };

    /**
     * we can't create more custom breakpoint with material-ui < 5 let create some media queries
     * extra media query to split xs screen size in multiple ones
     * TODO move this to a helper
     */
    const layoutXL =  useMediaQuery(json2mq({minWidth: 1920}));
    const layoutLG = useMediaQuery(json2mq({minWidth: 1280, maxWidth: 1920 -1}));
    const layoutMD = useMediaQuery(json2mq({minWidth: 960, maxWidth: 1280 -1}));
    const layoutSM = useMediaQuery(json2mq({minWidth: 600, maxWidth: 960 -1}));
    const layoutXS_LG = useMediaQuery(json2mq({minWidth: 450, maxWidth: 600 -1}));
    const layoutXS_MD =  useMediaQuery(json2mq({minWidth: 350, maxWidth: 450 -1}));
    const layoutXS = useMediaQuery(json2mq({minWidth: 280, maxWidth: 350 -1}));

    const styles = makeStyles((theme) => ({
        layoutColumn: {
            [theme.breakpoints.up('xs')]: {
                flex: '1 0 22%',
                marginRight: `${MARGIN}px`
            },
            [theme.breakpoints.down('xs')]: {
                flex: '1 0 40%',
                marginRight: `${MARGIN}px`
            }
        }
    }));

    return <div className="social-feed-section">
        <div className="social-feed-title">
            <h1 className="text-align-center">follow me</h1>
        </div>

        <div className={classNames({layoutXL: layoutXL,
            layoutLG : layoutLG,
            layoutMD : layoutMD,
            layoutSM: layoutSM,
            layoutXS_LG: layoutXS_LG,
            layoutXS_MD: layoutXS_MD,
            layoutXS: layoutXS},"social-feed-pictures")}>
            <div className="container">
                <div style={{display: 'flex', flexWrap: 'wrap'}} ref={el => (containerRef.current = el)}>
                    {props.instagram.edges.map((edge, index) => {
                        const imgHref = `https://www.instagram.com/p/${edge.node.id}`;
                        return <div className={classNames(styles().layoutColumn, "image-container")}
                                    ref={el => (index === 0 || index === 1 ? tileRef.current[index] = el : null)} key={index}>
                            <a className="no-box-shadow" href={imgHref}>
                                <img ref={el => (imgRef.current[index] = el)}
                                     src={edge.node.localFile.childImageSharp.fixed.src}
                                     alt="social-img"
                                     style={{
                                         marginRight: `${MARGIN}px`,
                                         marginBottom: `${MARGIN}px`,
                                         marginTop: `-5px`
                                     }}
                                     width={IMG_WIDTH}
                                     height={IMG_WIDTH}/>
                            </a>
                            <div className="image-overlay"></div>
                        </div>
                    })}
                </div>
            </div>
        </div>
    </div>
};

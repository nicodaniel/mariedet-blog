import React from "react";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import * as json2mq from "json2mq";
import {makeStyles} from "@material-ui/core/styles";
import {WindowResize} from "./window-resize";
import classNames from "classnames";
import {MediaQueryUtils} from "../../helpers/media-queries";
import "./picture-layout.scss";


export const PictureLayout = (props) => {
    const tileRef = React.useRef([...Array(2)].map(() => React.createRef()));
    const imgRef = React.useRef([...Array(8)].map(() => React.createRef()));
    const containerRef = React.createRef();
    const hasTwoColumns = useMediaQuery(json2mq({maxWidth: 600-1}));

    const IMG_WIDTH = 185;
    const MARGIN = props.margin;
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

    return <div className="picture-layout">
        <div className="picture-layout-title">
            <h1 className="text-align-center">{props.title}</h1>
        </div>

        <WindowResize onUseEffect={redrawImg.bind(this, tileRef, imgRef, hasTwoColumns)} >
            <div className={classNames({layoutXL:  useMediaQuery(MediaQueryUtils.get('layoutXL')),
                layoutLG : useMediaQuery(MediaQueryUtils.get('layoutLG')),
                layoutMD : useMediaQuery(MediaQueryUtils.get('layoutMD')),
                layoutSM: useMediaQuery(MediaQueryUtils.get('layoutSM')),
                layoutXS_LG: useMediaQuery(MediaQueryUtils.get('layoutXS_LG')),
                layoutXS_MD: useMediaQuery(MediaQueryUtils.get('layoutXS_MD')),
                layoutXS: useMediaQuery(MediaQueryUtils.get('layoutXS'))},"picture-layout-pictures")}>
                <div className="container">
                    <div style={{display: 'flex', flexWrap: 'wrap'}} ref={el => (containerRef.current = el)}>
                        {props.images.map((img, index) => {
                            const imgHref = `https://www.instagram.com/p/${img.nodeId}`;
                            return <div className={classNames(styles().layoutColumn, "image-container")}
                                        style={{display: 'flex'}}
                                        ref={el => (index === 0 || index === 1 ? tileRef.current[index] = el : null)} key={index}>
                                <a className="no-box-shadow" href={imgHref}>
                                    <img ref={el => (imgRef.current[index] = el)}
                                         src={img.img.src}
                                         alt={props.imageAlt}
                                         style={{marginTop: `-${MARGIN}px`, marginBottom: `${MARGIN}px`}}
                                         width={IMG_WIDTH}
                                         height={IMG_WIDTH}/>
                                </a>
                                <div className="image-overlay"></div>
                            </div>
                        })}
                    </div>
                </div>
            </div>
        </WindowResize>
    </div>


};

import React from "react";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import * as json2mq from "json2mq";
import {makeStyles} from "@material-ui/core/styles";
import {WindowResize} from "./window-resize";
import classNames from "classnames";
import {MediaQueryUtils} from "../../helpers/media-queries";
import "./picture-layout.scss";
import {CustomImage} from "./custom-image";


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
                            return <CustomImage ref={{tileRef: tileRef, imgRef: imgRef}}
                                         currentKey={index}
                                         customStyle={styles().layoutColumn}
                                         srcPath={img.img.src}
                                         imageAlt={props.imageAlt}
                                         imageNodeId={img.nodeId}
                                         margin={MARGIN}
                                         imageWidth={IMG_WIDTH} />
                        })}
                    </div>
                </div>
            </div>
        </WindowResize>
    </div>


};

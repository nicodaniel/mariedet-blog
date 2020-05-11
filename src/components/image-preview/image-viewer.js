import {Carousel} from "react-responsive-carousel";
import React from "react";
import "./image-viewer.scss";
import CloseIcon from '@material-ui/icons/Close';
import classNames from "classnames";

export const ImageViewer = (props) => {
    const [openViewer, setOpenViewer] = React.useState({show : false, index: 0});

    React.useEffect(() => {
        setOpenViewer({show : props.show.show, index: props.show.index})
    }, [props.show]);

    /**
     * Close image preview
     */
    const close = () => {
        setOpenViewer({show: false});
        props.openViewer({show: false});
    };

    /**
     * Handle keypress actions
     */
    const keyPressFunction = React.useCallback((event) => {
        // on esc keypress
        if(event.keyCode === 27) {
            close();
        }
        // right arrow
        if(event.keyCode === 39){
            setNextPageState();
        }
        //left arrow
        if(event.keyCode === 37){
            setPreviousPageState();
        }
    }, []);


    const setNextPageState = () => {
        if(openViewer.index < props.markdownProcessing.img.length -1){
            openViewer.index++;
            setOpenViewer({show : true, index: openViewer.index})
        }
    };

    const setPreviousPageState = () => {
        if(openViewer.index > 0){
            openViewer.index--;
            setOpenViewer({show : true, index: openViewer.index})
        }
    };


    /**
     * A hook to listen to key press
     */
    React.useEffect(() => {
        document.addEventListener("keydown", keyPressFunction, false);

        return () => {
            document.removeEventListener("keydown", keyPressFunction, false);
        };
    }, []);

    /**
     *
     * @param onClickHandler
     * @param hasNext
     * @param _
     * @return {*}
     */
    const renderNextArrow =  (onClickHandler, hasNext, _) => {
        return hasNext && <span onClick={onClickHandler} title="" className={"nav-link next"}>
                  →
              </span>
    };

    /**
     *
     * @param onClickHandler
     * @param hasPrevious
     * @param _
     * @return {*}
     */
    const renderPreviousArrow = (onClickHandler, hasPrevious, _) => {
        return hasPrevious && <span onClick={onClickHandler} title="" className={"nav-link previous"}>
                  ←
              </span>
    };

    return(
        <div className={classNames("image-viewer-container", {hidden: !openViewer.show})}>
            <CloseIcon onClick={close} className="close-btn" />
            <div className="image-viewer-carousel-container">
                <Carousel showArrows={true}
                          showThumbs={false}
                          showIndicators={false}
                          selectedItem={openViewer.index}
                          renderArrowNext={renderNextArrow}
                          renderArrowPrev={renderPreviousArrow}>
                    {props.markdownProcessing.img.map((img, index) => {
                        return <img className={`image-index-${index}`} srcSet={img.srcSet[3]} key={index} />
                    })}
                </Carousel>
            </div>
            <div className="overlay" onClick={close}></div>
        </div>
    )

};

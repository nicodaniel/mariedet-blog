import React from "react"
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import "./scrollTop.scss";
import Tooltip from '@material-ui/core/Tooltip';


export const ScrollTop = () => {

    const scrollToTop = () => {
        const c = document.documentElement.scrollTop || document.body.scrollTop;
        const speed = 16;
        if (c > 0) {
            window.requestAnimationFrame(scrollToTop);
            window.scrollTo(0, c - c / speed);
        }
    };

    return (
        <Tooltip title="Back to the top !" placement={"right"} arrow={true}>
            <div className="scrollTop"
                 onClick={scrollToTop}>
                <KeyboardArrowUpIcon/>
            </div>
        </Tooltip>
    );
};

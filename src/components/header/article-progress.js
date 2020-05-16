import React from "react";
import "./article-progress.scss";

export const ArticleProgress = () => {

    const [scroll, setScroll] = React.useState({scrollPosition : 0});

    const calculateScrollDistance = () => {
        const scrollTop = window.pageYOffset;
        const windowHeight = window.innerHeight;
        const docHeight = getDocHeight();

        const  totalDocScrollLength  =  docHeight  -  windowHeight;
        const  scrollPosition  =  Math.floor(scrollTop  /  totalDocScrollLength  *  100);
        setScroll({scrollPosition: scrollPosition});
    };

    React.useEffect(() => {
        window.addEventListener('scroll', calculateScrollDistance);
        return () => window.removeEventListener('scroll', calculateScrollDistance);
    });

    const getDocHeight = () => {
        return Math.max(
            document.body.scrollHeight,  document.documentElement.scrollHeight,
            document.body.offsetHeight,  document.documentElement.offsetHeight,
            document.body.clientHeight,  document.documentElement.clientHeight
        );
    };

    return (<div className="scroll-indicator" style={{width: `${scroll.scrollPosition}%`}}></div>)

};

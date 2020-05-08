import React from "react";

/**
 * Check if window has been resize
 * @params onUseEffect - call a function on window resize
 */
export const WindowResize = (props) => {
    const [dimensions, setDimensions] = React.useState({
        height: typeof window !== 'undefined' && window.innerHeight,
        width: typeof window !== 'undefined' && window.innerWidth
    });

    React.useEffect(() => {
        props.onUseEffect();
        const handleResizeEvent = () => setDimensions({
            height: typeof window !== 'undefined' && window.innerHeight,
            width: typeof window !== 'undefined' && window.innerWidth
        });

        window.addEventListener('resize', handleResizeEvent);

        return () => window.removeEventListener('resize', handleResizeEvent);
    });

    return <>{props.children}</>
};

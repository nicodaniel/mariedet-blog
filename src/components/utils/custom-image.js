import classNames from "classnames";
import React from "react";


export const CustomImage = React.forwardRef((props, ref) => {
    const { tileRef, imgRef } = ref;
    return (
        <div className={classNames(props.customStyle, "image-container")}
             style={{display: 'flex'}}
             ref={el => (props.currentKey === 0 || props.currentKey === 1 ? tileRef.current[props.currentKey] = el : null)} key={props.currentKey}>
            <a className="no-box-shadow" href={`https://www.instagram.com/p/${props.imageNodeId}`}>
                <img ref={el => (imgRef.current[props.currentKey] = el)}
                     src={props.srcPath}
                     alt={props.imageAlt}
                     style={{marginTop: `-${props.margin}px`, marginBottom: `${props.margin}px`}}
                     width={props.imageWidth}
                     height={props.imageWidth}/>
            </a>
            <div className="image-overlay"></div>
        </div>
    )
})

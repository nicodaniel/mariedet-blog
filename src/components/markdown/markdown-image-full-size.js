import React from "react";

/**
 * Process images from markdown text and put it at the bottom of the article
 * @param markdown
 * @return {*}
 * @constructor
 */
export const FullSizeMarkdownImages = (props) => {
    const imagesProperties = props.markdown.img;

    const openPopup = (index) => {
        props.setShowImageViewer({show: true, index});
    };

    return <div className="images-container" style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}>
            {imagesProperties.map((img, index) => {
                return <div key={index} cols={1} style={{marginBottom: 0}}>
                    <img className={`image-index-${index}`} style={{objectFit: 'cover', cursor: 'pointer'}} src={img.src} onClick={openPopup.bind(this, index)} />
                </div>
            })}
    </div>
};

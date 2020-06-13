import React from "react";
import classNames from "classnames";
import Alert from '@material-ui/lab/Alert';


export const layoutENUM = {
    landscape : 'landscape',
    landscape_with_effect : 'Landscape with effect',
    row: 'in a row',
};

const positionENUM = {
    vertical: "Vertical",
    horizontal: "Horizontal"
};

const marginENUM = {
    noMargin: "No margin",
    margin: "Default margin"
};

const sizeENUM = {
    normal: "Default size",
    small : "Small"
};

const LAYOUT = [layoutENUM.landscape, layoutENUM.landscape_with_effect, layoutENUM.row];
const POSITION = [positionENUM.vertical, positionENUM.horizontal];
const MARGIN = [marginENUM.noMargin, marginENUM.margin];
const SIZE = [sizeENUM.normal, sizeENUM.small];

export const GALLERY_WIDGET_PATTERN = /\{\% include gallery.html array="(\S+)" layout="(.*)" margin="(.*)" position="(.*)" size="(.*)" end="(.*)" \%\}/;

/**
 * Render images based on layout
 * @param layout
 * @param imageSrc
 * @return {*}
 */
export const renderImageLayout = (layout, position, margin, size, end, imageSrc) => {
    const layoutMargin = margin ? margin : marginENUM.margin;
    switch(layout) {
        case(layoutENUM.landscape):
            return <div className={classNames("img-preview landscape", {"with-margin": layoutMargin === marginENUM.margin})}>{renderImage(imageSrc)}</div>;
        case(layoutENUM.landscape_with_effect):
            return <div className={classNames("img-preview landscape-with-effect", {"with-margin": layoutMargin === marginENUM.margin})}>{imageSrc.map(src => {
                return <img alt="" className="parallax-img" style={{backgroundImage: `url(${src})`, width: "100%", height: "550px"}} />
            })}</div>;
        case(layoutENUM.row):
            return <div className={classNames("img-preview row", {"with-margin": layoutMargin === marginENUM.margin},
                {"vertical": position === positionENUM.vertical},
                {"small": size === sizeENUM.small},
                {"right-position": end === "end"},
                {"center-position": end === "center"})}>{renderImage(imageSrc)}</div>;
        default:
            console.warn(`This layout is not available... ${layout}`);
    }
};

const renderImage = (imageSrc) => {
    return imageSrc.map((src, index) => <div className="cell"><img className="cell-image" src={src} alt={''} title={''} /></div>)
};

export const GalleryWidget = () => {
    return {
        id: 'gallery',
        label: 'Gallery',
        fields: [{label: 'Gallery', name: 'images', widget: 'list', field: {label: 'Image', name: 'image',  widget: 'image'}},
            { name: "layout", label: "Layout", options: LAYOUT, widget: "select"},
            { name: "margin", label: "Margin", options: MARGIN, widget: "select"},
            { name: "position", label: "Direction", options: POSITION, widget: "select"},
            { name: "end", label: "Position", options: ["end", "normal", "center"], widget: "select", default: "normal"},
            { name: "size", label: "Image size", options: SIZE, widget: "select"}],
        pattern: GALLERY_WIDGET_PATTERN,
        fromBlock: function(match) {
            const images = match[1]
                .split(',')
                .filter(val => val)
                .map(image => ({ image }));
            return {
                images: images,
                layout: match[2],
                margin: match[3],
                position: match[4],
                size: match[5],
                end: match[6]
            };
        },
        toBlock: function(obj) {
            const images = obj.images || [];
            if(images.some(entry => entry?.image ? entry.image.includes('_'):entry.includes('_'))){
                console.alert('Images contains \'_\' characters that are not allowed...');
                return <Alert severity="error">This is an error alert — check it out!</Alert>;
            }else{
                return (
                    '{% include gallery.html array="' + images.map(entry => entry?.image ? entry.image:entry).join(',') + '" layout="'+obj.layout+'" margin="'+obj.margin+'" position="'+obj.position+'" size="'+obj.size+'" end="'+obj.end+'" %}'
                );
            }
        },
        toPreview: ({ images, layout, margin, position, size, end }, getAsset, fields) => {
            const listField = fields?.find(f => {
                return f.get('widget') === 'list'
            });
            const imageSrc = images.filter(img => img !== "").map(img => {
                const imgUrl = img.image;
                return getAsset(imgUrl, listField).url;
            });
            if(imageSrc.some(src => src.includes('_'))){
                return <Alert severity="error">This is an error alert — check it out!</Alert>;
            }
            if(imageSrc){
                return renderImageLayout(layout, position, margin, size, end, imageSrc);
            }
            return null;
        }
    }
};

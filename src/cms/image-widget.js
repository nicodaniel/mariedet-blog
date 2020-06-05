import React from "react";

const layoutENUM = {
    landscape : 'landscape',
    landscape_with_effect : 'Landscape with effect',
    row: 'in a row'
};

const positionENUM = {
    right: "Right",
    left: "Left",
    vertical: "Vertical",
    horizontal: "Horizontal"
};

const marginENUM = {
    noMargin: "No margin"
};

const LAYOUT = [layoutENUM.landscape, layoutENUM.landscape_with_effect, layoutENUM.row];
const POSITION = [positionENUM.right, positionENUM.left, positionENUM.vertical, positionENUM.horizontal];
const MARGIN = [marginENUM.noMargin];

export const GalleryWidget = () => {
    return {
        id: 'gallery',
        label: 'Gallery',
        fields: [{label: 'Gallery', name: 'images', widget: 'list', field: {label: 'Image', name: 'image',  widget: 'image'}},
            { name: "layout", label: "Layout", options: LAYOUT, widget: "select"},
            { name: "positioning", label: "Positioning", options: POSITION, widget: "select"}],
        pattern: /\{\% include gallery.html array="(\S+)" layout="(.*)" position="(.*)" \%\}/,
        fromBlock: function(match) {
            const images = match[1]
                .split(',')
                .filter(val => val)
                .map(image => ({ image }));
            return {
                images: images,
                layout: match[2],
                position: match[3]
            };
        },
        toBlock: function(obj) {
            const images = obj.images || [];
            return (
                '{% include gallery.html array="' + images.map(entry => entry).join(',') + '" layout="'+obj.layout+'" position="'+obj.positioning+'" %}'
            );
        },
        toPreview: ({ images, layout, position }, getAsset, fields) => {
            const listField = fields?.find(f => {
                return f.get('widget') === 'list'
            });
            const imageSrc = images.filter(img => img !== "").map(img => {
                const imgUrl = img.image;
                return getAsset(imgUrl, listField).url;
            });
            if(imageSrc){
                const imagesDOM = imageSrc.map((src, index) => <div className="cell"><img className="cell-image" src={src} alt={''} title={''} /></div>)
                switch(layout) {
                    case(layoutENUM.landscape):
                        return <div style={{padding: "4px"}} className="img-preview landscape">{imagesDOM}</div>;
                    case(layoutENUM.landscape_with_effect):
                        return <div style={{padding: "4px"}} className="img-preview landscape-with-effect">{imageSrc.map(src => {
                            return <img alt="" className="parallax-img" style={{backgroundImage: `url(${src})`, width: "100%", height: "500px"}} />
                        })}</div>;
                    case(layoutENUM.row):
                        return <div className="img-preview row">{imagesDOM}</div>;
                    default:
                        console.warn(`This layout is not available... ${layout}`);
                }
            }
            return null;
        }
    }
};

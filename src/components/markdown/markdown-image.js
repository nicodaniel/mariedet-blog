import {makeStyles} from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import React from "react";

/**
 * Process images from markdown text and create a grid layout
 * @param markdown
 * @return {*}
 * @constructor
 */
export const MarkdownImages = (props) => {
    const imagesProperties = props.markdown.img;
    const COLUMN = 3;
    const useStyles = makeStyles((theme) => ({
        root: {
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-around',
        }
    }));

    const openPopup = (index) => {
        props.setShowImageViewer({show: true, index});
    };

    const classes = useStyles();
    return <div className={classes.root}>
        <GridList cellHeight={160} className={classes.gridList} cols={COLUMN}>
            {imagesProperties.map((img, index) => {
                return <GridListTile key={index} cols={1} style={{marginBottom: 0}}>
                    <img className={`image-index-${index}`} style={{objectFit: 'cover', cursor: 'pointer'}} src={img.src} onClick={openPopup.bind(this, index)} />
                </GridListTile>
            })}
        </GridList>
    </div>
};

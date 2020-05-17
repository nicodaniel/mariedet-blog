import React from "react"
import {Link} from "gatsby";
import "./toolbar-header.scss";
import InstagramIcon from '@material-ui/icons/Instagram';
import classNames from "classnames";
import MenuIcon from "@material-ui/icons/Menu";
import IconButton from "@material-ui/core/IconButton";
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import CloseIcon from '@material-ui/icons/Close';
import "./side-panel-nav.scss";
import { makeStyles } from '@material-ui/core/styles';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import Tooltip from '@material-ui/core/Tooltip';


/**
 * Navigation header component
 */
export const ToolbarHeader = (props) => {

    const toggleDrawer = (anchor, open) => (event) => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setState({ ...state, [anchor]: open });
    };

    const styles = makeStyles((theme) => ({
        toolbarTopics: {
            [theme.breakpoints.down('sm')]: {
                display: 'none',
            }
        },
        toolbarSandwich: {
            [theme.breakpoints.up('sm')]: {
                display: 'none',
            },
            [theme.breakpoints.down('sm')]: {
                display: 'inherit',
                marginLeft: 'auto'
            }
        }
    }));

    const [state, setState] = React.useState({left: false, iconMenuHover: false});
    const classes = props.responsive ? styles() : "";

    /**
     * Display toolbar contetn
     * @param {Topics} topics - a list of topics
     * @param {boolean} displaySocialIcons
     * @return {ReactDOMElement}
     */
    const toolbarHeaderContent = (topics, displaySocialIcons) => {
        return <div className={classNames(classes.toolbarTopics, "header-nav-container-topic")}>
            {toolbarHeaderTopic(topics)}
            <span className="social-icons-container">
                {toolbarSocialIcon(displaySocialIcons)}
                {toolbarMailIcon(props.displayMailIcon)}
            </span>
        </div>
    };

    /**
     * Display toolbar topics
     * @param {Topics} topics - a list of topics
     * @return {ReactDOMElement}
     */
    const toolbarHeaderTopic = (topics) => {
        return topics.map((topic, index) => {
            return  <Link to={topic.to} key={index}>
                {topic.topicName}
            </Link>
        })
    };

    /**
     * Display social icon
     * @param {boolean} displaySocialIcons
     * @return {null | ReactDOMElement}
     **/
    const toolbarSocialIcon = (displaySocialIcons) => {
        return displaySocialIcons && <span className="social-icons"><a href="https://www.instagram.com/mariedet/"><Tooltip title="Instagram" arrow><InstagramIcon /></Tooltip></a></span>
    };

    /**
     * Display mail icon
     * @param {boolean} displayMailIcon
     * @return {null | ReactDOMElement}
     **/
    const toolbarMailIcon = (displayMailIcon) => {
        return displayMailIcon && <span className="social-icons"><a href="mailto:marie.detouche@hotmail.fr"><Tooltip title="Contact me by mail" arrow><MailOutlineIcon /></Tooltip></a></span>
    };

    return (
        <div className={classNames("header-nav", props.extraStyle)} key={"header-nav-key"}>
           {props.displayToolbarName && <Link to={'/'}><span className="blog-name">MarieDet</span></Link>}
           <div className={classNames("header-nav-container", {centered : props.centered})}>
               {toolbarHeaderContent(props.topics, props.displaySocialIcons)}

               {props.responsive && <IconButton
                   style={{backgroundColor: 'transparent', color: 'black'}}
                   onClick={toggleDrawer("left", true)}
                   className={classNames(classes.toolbarSandwich, "icon-menu")}
               >
                   <MenuIcon />
               </IconButton>}
           </div>

            {/*left panel */}
            <SwipeableDrawer
                anchor={"left"}
                open={state["left"]}
                onClose={toggleDrawer("left", false)}
                onOpen={toggleDrawer("left", true)}
            >
                {<div className="side-panel-navigation">
                    <CloseIcon className="close-icon" style={{cursor: 'pointer'}} onClick={toggleDrawer("left", false)} />
                    {toolbarHeaderTopic(props.topics)}
                    {toolbarSocialIcon(props.displaySocialIcons)}
                    {toolbarMailIcon(props.displayMailIcon)}
                </div>}
            </SwipeableDrawer>
        </div>
    );
}

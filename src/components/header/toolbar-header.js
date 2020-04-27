import React from "react"
import {Link} from "gatsby";
import "./toolbar-header.scss";
import InstagramIcon from '@material-ui/icons/Instagram';
import classNames from "classnames";

/**
 * Navigation header component
 */
export class ToolbarHeader extends React.Component {
    render() {
        const linkStyle = {
            marginRight : '15px',
            fontWeight: 700,
            fontStyle: 'normal',
            fontSize: '11px',
            letterSpacing: '.14em',
            textTransform: 'uppercase',
            textDecoration: 'none',
            boxShadow: 'none'
        };

        return (
            <div className="header-nav" key={"header-nav-key"}>
               {this.props.displayToolbarName?<Link to={'/'}><span className="blog-name">Mariedet</span></Link>:null}
               <div className={classNames("header-nav-container", {centered : this.props.centered})}>
                   {
                       this.props.topics.map((topic, index) => {
                           return  <Link style={linkStyle} to={topic.to} key={index}>
                               {topic.topicName}
                           </Link>
                       })
                   }
                   {this.props.displaySocialIcons?
                       <span className="social-icons"><a href="https://www.instagram.com/mariedet/"><InstagramIcon /></a></span>:null
                   }
               </div>
            </div>
        );
    }
}

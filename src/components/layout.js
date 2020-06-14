import React from "react"
import { ToolbarHeader } from "./header/toolbar-header"
import {ArticleProgress} from "./header/article-progress"
import "../pages/index.scss"
import classNames from "classnames";

const {TOPICS} = require(`../../constants`);

/**
 * Layout of the application, each page follow this structure
 * @param {Location} location - where am I
 * @param children
 * @return {DOMElement} the structure of a page
 * @constructor
 */
const Layout = ({ location, children }) => {
    const [scrolled, setScrolled] = React.useState({scrolled : false});
    /**
     * Check if user has Scroll the window
     * @return {boolean} true|false
     */
    const hasScrolled = () => {
        if(window.pageYOffset > 5){
            setScrolled({scrolled: true});
        }else{
            setScrolled({scrolled: false});
        }
    };

    React.useEffect(() => {
        window.addEventListener('scroll', hasScrolled);

        return () => window.removeEventListener('scroll', hasScrolled);
    });

    return (
        <div
          style={{
            marginLeft: `auto`,
            marginRight: `auto`,
          }}
        >
          <header className={classNames("app-header", {"header-shadow": scrolled.scrolled})}>
              <ToolbarHeader extraStyle={"top-menu"} responsive={true} displayToolbarName={true} topics={TOPICS} displaySocialIcons={true} displayMailIcon={false} />
          </header>
          <main>{children}</main>
          <footer className="app-footer">
              <ToolbarHeader responsive={false} topics={[{topicName:'about', to: '/topic/about'}/*, {topicName:'contact', to: '/topic/contact'}*/]} centered={true} displaySocialIcons={true} displayMailIcon={true} />
              <div className="powered-by-footer">
                  Powered by <a href="https://github.com/nicodaniel">ndaniel</a>
              </div>
          </footer>
        </div>
    )
};

export default Layout

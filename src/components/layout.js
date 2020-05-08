import React from "react"
import { ToolbarHeader } from "./header/toolbar-header"
import "../pages/index.scss"
const {TOPICS} = require(`../../constants`);

/**
 * Layout of the application, each page follow this structure
 * @param {Location} location - where am I
 * @param children
 * @return {DOMElement} the structure of a page
 * @constructor
 */
const Layout = ({ location, children }) => {
    return (
        <div
          style={{
            marginLeft: `auto`,
            marginRight: `auto`,
          }}
        >
          <header className="app-header">
              <ToolbarHeader extraStyle={"top-menu"} responsive={true} displayToolbarName={true} topics={TOPICS} displaySocialIcons={true} displayMailIcon={false} />
          </header>
          <main>{children}</main>
          <footer className="app-footer">
              <ToolbarHeader responsive={false} topics={[{topicName:'about', to: '/topic/about'}, {topicName:'contact', to: '/topic/contact'}]} centered={true} displaySocialIcons={true} displayMailIcon={true} />
              <div className="powered-by-footer">
                  Powered by <a href="https://github.com/nicodaniel">ndaniel</a>
              </div>
          </footer>
        </div>
    )
};

export default Layout

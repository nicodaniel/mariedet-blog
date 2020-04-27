import React from "react"
import { rhythm } from "../utils/typography"
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
        maxWidth: rhythm(40),
        padding: `0px 38px 0px 38px`,
      }}
    >
      <header className="app-header">
          <ToolbarHeader displayToolbarName={true} topics={TOPICS} displaySocialIcons={true}  />
      </header>
      <main>{children}</main>
      <footer className="app-footer">
          <ToolbarHeader topics={[{topicName:'about', to: '/topic/about'}, {topicName:'contact', to: '/topic/contact'}]} centered={true} displaySocialIcons={true} />
          <div className="powered-by-footer">
              Powered by <a href="https://github.com/nicodaniel">ndaniel</a>
          </div>
      </footer>
    </div>
  )
};

export default Layout

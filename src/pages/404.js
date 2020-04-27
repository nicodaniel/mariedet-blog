import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

const NotFoundPage = ({ data, location }) => {
  return (
    <Layout location={location}>
      <SEO title="404: Not Found" />
        <div className="404-container" style={{display: 'flex', flexWrap: 'wrap'}}>
            <div>
                <div style={{fontSize: '100px', fontWeight: 700}}>D'OH!</div>
                <div>This is not the route you are looking for ...</div>
            </div>
            <div><img src={"homer-404.jpg"} height={400} alt="404-error" /></div>
        </div>
    </Layout>
  )
}

export default NotFoundPage

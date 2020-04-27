import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm, scale } from "../utils/typography"

import "./nav-article-link.scss";

const BlogPostTemplate = ({ data, pageContext, location }) => {
  const post = data.markdownRemark
  const { previous, next } = pageContext

  return (
    <Layout location={location}>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      />
      <article>
        <header>
          <h1
            style={{
              marginTop: rhythm(1),
              marginBottom: 0,
            }}
          >
            {post.frontmatter.title}
          </h1>
          <p
            style={{
              ...scale(-1 / 5),
              display: `block`,
              marginBottom: rhythm(1),
            }}
          >
            {post.frontmatter.date}
          </p>
        </header>
        <section dangerouslySetInnerHTML={{ __html: post.html }} />
        <hr
          style={{
            marginBottom: rhythm(1),
          }}
        />
      </article>
        <nav>
            <div style={{
                position: 'absolute',
                top: '50%',
                left: '0'
            }} className="nav-previous-after">
                {previous && (
                    <Link to={previous.fields.slug} rel="prev" className="link">
                        ←
                        <div className="nav-more-info">
                            {previous.frontmatter.title}
                        </div>
                    </Link>
                )}
            </div>
            <div style={{
                position: 'absolute',
                top: '50%',
                right: '0'
            }} className="nav-previous-after">
                {next && (
                    <Link to={next.fields.slug} rel="next" className="link">
                        →
                        <div className="nav-more-info">
                            {next.frontmatter.title}
                        </div>
                    </Link>
                )}
            </div>
        </nav>
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
        topic
      }
    }
  }
`

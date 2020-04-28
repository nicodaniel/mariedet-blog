import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm, scale } from "../utils/typography"

import "./nav-article-link.scss";


const BlogPostTemplate = ({ data, pageContext, location }) => {
  const post = data.markdownRemark;
  const nextPost = data.nextPost;
  const previousPost = data.previousPost;
  const { previous, next } = pageContext

  return (
    <Layout location={location}>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      />
      <article>
        <header>
          <p style={{textAlign: "center", color: 'grey', fontFamily : 'baskerville', fontSize: '15px', fontWeight: 400, paddingTop: '40px'}}>
            {post.frontmatter.date}
          </p>
            <p className="article-title" style={{textAlign: 'center', fontSize: '42px', paddingTop: '40px',  paddingBottom: '80px'}}>{post.frontmatter.title}</p>
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
            }} className="pagination-nav">
                {previous && (
                    <Link to={previousPost.fields.slug} rel="prev" className="link no-box-shadow">
                        <div className="nav-arrow prev-arrow" style={{fontSize: 40,textAlign:'left'}}>←</div>
                        <div className="nav-more-info prev-pagination">
                            <span className="article-title" style={{alignSelf: 'center'}} >
                                <span>{previousPost.frontmatter.title}</span>
                            </span>
                            <img src={previousPost.frontmatter.preview.childImageSharp.fixed.src} />
                        </div>
                    </Link>
                )}
            </div>
            <div style={{
                position: 'absolute',
                top: '50%',
                right: '0'
            }} className="pagination-nav">
                {next && (
                    <Link to={nextPost.fields.slug} rel="next" className="link no-box-shadow">
                        <div className="nav-arrow next-arrow" style={{fontSize: 40, textAlign:'right'}}>→</div>
                        <div className="nav-more-info next-pagination">
                            <span className="article-title" style={{alignSelf: 'center'}} >
                                <span>{nextPost.frontmatter.title}</span>
                            </span>
                            <img src={nextPost.frontmatter.preview.childImageSharp.fixed.src} />
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
  query BlogPostBySlug($slug: String!, $nextSlug: String, $previousSlug: String) {
    site {
      siteMetadata {
        title
      }
    }
    nextPost: markdownRemark(fields: { slug: { eq: $nextSlug} }) {
      id
      fields{
        slug
      }
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
        preview {
          childImageSharp {
            fixed(width: 50) {
              ...GatsbyImageSharpFixed
            }
          }
        }
      }
    }
    previousPost: markdownRemark(fields: { slug: { eq: $previousSlug} }) {
      id
      fields{
        slug
      }
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
        preview {
          childImageSharp {
            fixed(width: 50) {
              ...GatsbyImageSharpFixed
            }
          }
        }
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

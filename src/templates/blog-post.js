import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import "./nav-article-link.scss";
import Image from "gatsby-image";
import rehypeReact from "rehype-react"

const Paragraph = ({ children }) => {
    if(children && children[0]){
        const child = children[0];
        if(child.props && child.props.className && child.props.className === 'gatsby-resp-image-wrapper'){
            const subChildren = child.props.children;
            if(subChildren && subChildren[1] && subChildren[1].props &&
                subChildren[1].props.className === 'gatsby-resp-image-link'){
                return <img src={subChildren[1].props.href} />
            }
        }
    }
    return children;
};


const BlogPostTemplate = ({ data, pageContext, location }) => {
  const post = data.markdownRemark;
  const nextPost = data.nextPost;
  const previousPost = data.previousPost;
  const { previous, next } = pageContext;

  /* markup to react component */
  const renderAst = new rehypeReact({
      createElement: React.createElement,
      components: {
        p: Paragraph
      },
  }).Compiler;

  return (
    <Layout location={location}>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      />
      <article>
        <header>
          <p className="article-date" style={{textAlign: "center",fontSize: '19px', fontWeight: 400, paddingTop: '40px'}}>
            {post.frontmatter.date}
          </p>
            <p className="article-title" style={{textAlign: 'center', lineHeight: '38px', fontSize: '40px', paddingTop: '20px',  paddingBottom: '30px'}}>{post.frontmatter.title}</p>
        </header>
          <div style={{ marginBottom: '30px', marginLeft: '65px', marginRight:'65px'}}>
              <Image
                  style={{margin: 'auto'}}
                  fluid={post.frontmatter.preview.childImageSharp.fluid}
                  alt={"post preview"}
              />
          </div>
          <div className="section-container" style={{marginLeft: '65px', marginRight:'65px'}}>
              <section>
                  {
                      renderAst(post.htmlAst)
                  }
                  <Paragraph children={renderAst(post.htmlAst)}></Paragraph>
              </section>
              <hr style={{width: '75%', margin: 'auto', height:'0.5px', marginTop: '70px', marginBottom: '70px'}}/>
          </div>
      </article>
        <nav>
            <div style={{
                position: 'fixed',
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
                            <img alt="previous post" src={previousPost.frontmatter.preview.childImageSharp.fixed.src} />
                        </div>
                    </Link>
                )}
            </div>
            <div style={{
                position: 'fixed',
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
                            <img alt="next post" src={nextPost.frontmatter.preview.childImageSharp.fixed.src} />
                        </div>
                    </Link>
                )}
            </div>
        </nav>
    </Layout>
  )
};

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
        description
        preview {
          childImageSharp {
            fixed(width: 70) {
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
        description
        preview {
          childImageSharp {
            fixed(width: 70) {
              ...GatsbyImageSharpFixed
            }
          }
        }
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      htmlAst
      fields {
        slug
      }
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
        topic
        preview {
          childImageSharp {
            fluid(maxWidth: 1500) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`;

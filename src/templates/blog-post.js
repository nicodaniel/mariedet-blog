import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import "./nav-article-link.scss";
import Image from "gatsby-image";
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import {makeStyles} from "@material-ui/core/styles";
import * as rehypeReact from "rehype-react";


/**
 * Render paragraph from markdown
 * @param children
 * @return {*}
 * @constructor
 */
const Paragragh = ({children}) => {
    return <p>{children}</p>
};

/**
 * Process images from markdown text and create a grid layout
 * @param markdown
 * @return {*}
 * @constructor
 */
const MarkdownImages = (markdown) => {
    const imagesProperties = markdown.markdown.img;
    const COLUMN = 3;
    const useStyles = makeStyles((theme) => ({
        root: {
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-around',
        }
    }));

    const classes = useStyles();
    return <div className={classes.root}>
        <GridList cellHeight={160} className={classes.gridList} cols={COLUMN}>
            {imagesProperties.map((img, index) => {
                return <GridListTile key={index} cols={1} style={{marginBottom: 0}}>
                    <img style={{objectFit: 'cover'}} src={img.src} />
                </GridListTile>
            })}
        </GridList>
    </div>
};

const BlogPostTemplate = ({ data, pageContext, location }) => {
  const post = data.markdownRemark;
  const nextPost = data.nextPost;
  const previousPost = data.previousPost;
  const { previous, next } = pageContext;

  const json = JSON.parse(JSON.stringify(post.htmlAst));

    /**
     * Rehype is waiting for this kind of structure, let's give him what he want ...
     * @param json
     * @return {{data: {quirksMode: boolean}, children: *, type: string}}
     */
  const createAst = (json) => {
      return {type: "root", children: json, data: {quirksMode: false}};
  };

    /**
     * Create a rehype render
     * @type {compiler|(function(*=): (*))}
     */
  const renderAst = new rehypeReact({
      createElement: React.createElement,
      components: {
          p: Paragragh
      },
  }).Compiler;

  const filterImages = (element) => {
      if(element.children && element.children[0].tagName === 'span'){
          const spanElement = element.children[0];
          if(spanElement.children && spanElement.children[1] &&
              spanElement.children[1].properties.className[0] === "gatsby-resp-image-link"){
              const linkElement = spanElement.children[1];
              if(linkElement.children && linkElement.children[3] && linkElement.children[3].tagName === 'img'){
                  return linkElement.children[3].properties;
              }
          }
      }
      return null;
  };

    /**
     * Process markdown json and split text and images to process them differently...
     * @param json
     * @return {{img: [], text: []}}
     */
  const processMarkdown = (json) => {
      const markdownImages = [];
      const markdownText = [];
      json.children.filter(child => child.type === "element").forEach(element => {
          const img = filterImages(element);
          if(img != null){
              markdownImages.push(img);
          }else{
              markdownText.push(element);
          }
      });
      return {img : markdownImages, text: markdownText};
  };

    const markdownProcessing = processMarkdown(json);

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
          <div style={{ marginBottom: '30px', marginLeft: '95px', marginRight:'95px'}}>
              <Image
                  style={{margin: 'auto'}}
                  fluid={post.frontmatter.preview.childImageSharp.fluid}
                  alt={"post preview"}
              />
          </div>
          <div className="section-container" style={{marginLeft: '65px', marginRight:'65px'}}>
              <section>
                  {
                      renderAst(createAst(markdownProcessing.text))
                  }
                  <MarkdownImages markdown={markdownProcessing} />
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
      html
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

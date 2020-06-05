import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Image from "gatsby-image";
import * as rehypeReact from "rehype-react";
import {ImageViewer} from "../components/image-preview/image-viewer";
import {FullSizeMarkdownImages} from "../components/markdown/markdown-image-full-size";
import {NavigationArrow} from "../components/article-nav/navigation-arrow";
import {LikeCounter} from "../components/like-counter/counter";
import "./blog-post.scss";

/**
 * Render paragraph from markdown
 * @param children
 * @return {*}
 * @constructor
 */
const Paragragh = ({children}) => {
    return <p>{children}</p>
};

const BlogPostTemplate = ({ data, pageContext, location }) => {
  const post = data.markdownRemark;
  const nextPost = data.nextPost;
  const previousPost = data.previousPost;
  const { previous, next } = pageContext;

  const [showImageViewer, setShowImageViewer] = React.useState({show: false, index: 0});

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


    const json = JSON.parse(JSON.stringify(post.htmlAst));
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
          <p className="article-title">{post.frontmatter.title}</p>
          <LikeCounter articleId={post.fields.slug} />
        </header>
          <div style={{ marginBottom: '30px'}}>
              <Image
                  style={{margin: 'auto', zIndex: '2'}}
                  fluid={post.frontmatter.preview?.childImageSharp?.fluid}
                  alt={"post preview"}
              />
          </div>
          <div className="section-container" style={{marginLeft: '65px', marginRight:'65px'}}>
              <section>
                  {/*display text only*/}
                  {renderAst(createAst(markdownProcessing.text))}

                  {/*display images*/}
                  {/*<MarkdownImages markdown={markdownProcessing} setShowImageViewer={setShowImageViewer} />*/}

              </section>

              {/*display images at the bottom of article*/}
              <FullSizeMarkdownImages markdown={markdownProcessing} setShowImageViewer={setShowImageViewer} />

              {/*display images in carousel on click*/}
              <ImageViewer markdownProcessing={markdownProcessing} show={showImageViewer} openViewer={setShowImageViewer}  />

              {/*footer delimiter*/}
              <hr style={{width: '75%', margin: 'auto', height:'0.5px', marginTop: '70px', marginBottom: '70px'}}/>
          </div>
      </article>
        <nav>
            {/*left arrow nav */}
            <NavigationArrow direction={"LEFT"} displayLink={previous} post={previousPost} alt="Previous post"  />

            {/*right arrow nav*/}
            <NavigationArrow direction={"RIGHT"} displayLink={next} post={nextPost} alt="Next post"  />
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
            fluid(maxWidth: 1500, quality: 90) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`;

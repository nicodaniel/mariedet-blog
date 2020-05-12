import React from "react"
import {graphql} from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import {CarouselViewer} from "../components/carousel/carousel-viewer";
import "./index.scss";
import {ArticleTopic} from "../components/article-preview/article-topic-section";
import {PictureLayout} from "../components/utils/picture-layout";
import "../css/parallax-image.scss";
const {TOPICS} = require(`../../constants`);

const BlogIndex = ({data, location}) => {
    const postsByTopics = data.allMarkdownRemark.group;

    return (
        <Layout location={location} displayToolbarName={true} topics={TOPICS} displaySocialIcons={true}>
            <SEO title="Home"/>

            {/*carousel*/}
            <CarouselViewer
                data={data.carouselPreview.edges.map(edge => edge.node)}/>

            {/*article section*/}
            {postsByTopics.sort((group, group2) => {
                const topicName = group.edges[0].node.frontmatter.topic;
                const topicName2 = group2.edges[0].node.frontmatter.topic;
                return TOPICS.findIndex(topic => topic.topicName === topicName) - TOPICS.findIndex(topic => topic.topicName === topicName2);
            }).map((group, index) => {
                const topicName = group.edges[0].node.frontmatter.topic;
                return <ArticleTopic topic={topicName} posts={group.edges} showLink={true} />
            })}

            {/*social section*/}
            <PictureLayout title="Follow me"
                           margin={9}
                           images={data.instagram.edges.map(edge => {return {img: edge.node.localFile.childImageSharp.fixed, nodeId: edge.node.id}})}
                           imageAlt={"social images"}
                           instagramLink={true} />

        </Layout>
    )
};

export default BlogIndex

export const pageQuery = graphql`
  query homePageQuery {
    carouselPreview: allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC}, limit: 3){
        edges {
          node {
            fields{
               slug
            }
            frontmatter {
              title
              topic
              date(formatString: "MMMM DD, YYYY")
              preview{
                childImageSharp {
                  fluid(maxWidth: 1700, maxHeight: 750, quality: 90) {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
            }
          }
        }
    }
    instagram: allInstaNode(sort: { fields: [timestamp], order: DESC}, limit: 8) {
      edges {
        node {
          id
          timestamp
          localFile {
            childImageSharp {
              fixed(width: 400, height: 400) {
                ...GatsbyImageSharpFixed
              }
            }
          }
        }
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      group(field: frontmatter___topic, limit: 3){
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              date(formatString: "MMMM DD, YYYY")
              title
              description
              topic
              preview {
                childImageSharp {
                  fixed(width: 450, height: 310) {
                    ...GatsbyImageSharpFixed
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

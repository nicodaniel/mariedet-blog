import React from "react"
import {graphql} from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import {SocialFeed} from "../components/social-feed/social-feed"
import {CarouselViewer} from "../components/carousel/carousel-viewer";
import "./index.scss";
import {ArticleTopic} from "../components/article-preview/article-topic-section";
const {TOPICS} = require(`../../constants`);

const BlogIndex = ({data, location}) => {
    const postsByTopics = data.allMarkdownRemark.group;

    return (
        <Layout location={location}>
            <SEO title="Home"/>

            {/*carousel*/}
            <CarouselViewer
                data={data.carouselPreview.edges.map(edge => edge.node.frontmatter)}/>

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
            <SocialFeed instagram={data.instagram}/>

        </Layout>
    )
};

export default BlogIndex

export const pageQuery = graphql`
  query homePageQuery {
    carouselPreview: allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC}, limit: 3){
        edges {
          node {
            frontmatter {
              title
              topic
              date(formatString: "MMMM DD, YYYY")
              preview{
                childImageSharp {
                  fixed(width: 800, height: 400) {
                    ...GatsbyImageSharpFixed
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
              fixed(width: 185, height: 185) {
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
                  fixed(width: 300, height: 200) {
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

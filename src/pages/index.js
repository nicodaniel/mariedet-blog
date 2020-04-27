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
                images={data.carouselPreview.edges.filter(edge => edge.node.frontmatter.preview.childImageSharp.fixed).map(edge => edge.node.frontmatter.preview.childImageSharp.fixed)}/>

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
    instagram: allFile(filter: {absolutePath: { regex: "/(inst)[1-9]*/" } }) {
      edges {
        node {
          childImageSharp {
            fluid(maxWidth: 185, maxHeight: 185) {
              ...GatsbyImageSharpFluid
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

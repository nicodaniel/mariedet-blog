import React from "react"
import Layout from "../components/layout"
import {ArticleTopic} from "../components/article-preview/article-topic-section";
import {graphql} from "gatsby";
import SEO from "../components/seo";

const topicPostTemplate = ({data, location}) => {
    const path = location.pathname.split("/topic/");
    const posts = data.allMarkdownRemark.edges;
    return (
        <Layout location={location}>
            <SEO title={path[1]} />
            {/*article section*/}
            <ArticleTopic topic={path[1]} posts={posts} showLink={false} />
        </Layout>
    )
};

export default topicPostTemplate;


export const topicQuery = graphql`
  query postByTopic($topic: String!) {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }, filter: {
        frontmatter :{
          topic:{eq: $topic}
        }
      }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
          }
        }
      }
    }
  }
`;

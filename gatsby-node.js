const path = require(`path`)
const {createFilePath} = require(`gatsby-source-filesystem`)
const {TOPICS} = require(`./constants`);


exports.createPages = async ({graphql, actions}) => {
    const {createPage} = actions

    const blogPost = path.resolve(`./src/templates/blog-post.js`);
    const topicPost = path.resolve(`./src/templates/topic-post.js`);
    const BLOG_POST_QUERY_LIMIT = 1000;
    const result = await graphql(
        `
      {
        allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: DESC }
          limit: ${BLOG_POST_QUERY_LIMIT}
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
                topic
                previewName
              }
            }
          }
        }
      }
    `
    );

    if (result.errors) {
        Promise.reject(result.errors);
    }

    // Create topic pages
    TOPICS.filter(topic => !topic.staticPage).forEach(topic => {
        console.log("createPage:", topic.to);
        createPage({
            path: topic.to,
            component: topicPost,
            context: {
                slug: topic.to,
                topic: topic.topicName
            },
        })
    });

    // Create blog posts pages.
    const posts = result.data.allMarkdownRemark.edges;
    posts.forEach((post, index) => {
        const previous = index === posts.length - 1 ? null : posts[index + 1].node
        const next = index === 0 ? null : posts[index - 1].node
        console.log("createPage:", post.node.fields.slug);
        console.log("post: ", post);
        console.log("next: ", next);
        createPage({
            path: post.node.fields.slug,
            component: blogPost,
            context: {
                slug: post.node.fields.slug,
                previousImg:"",
                previous,
                next,
            },
        })
    })
}

exports.onCreateNode = ({node, actions, getNode}) => {
    const {createNodeField} = actions

    if (node.internal.type === `MarkdownRemark`) {
        const value = createFilePath({node, getNode})
        createNodeField({
            name: `slug`,
            node,
            value,
        })
    }
}

/**
 * list of the section of the website
 * @type {{staticPage: boolean, to: String topicName: string}[]}
 *
 * a module is used to also export the variable inside gatsby-node as this file doesn't support ES6 IMPORT
 * https://github.com/gatsbyjs/gatsby/issues/7810
 */
module.exports.TOPICS = [{topicName:'travel', to:'/topic/travel', staticPage: false}, {topicName: 'cycling',  to:'/topic/cycling', staticPage: false}, {topicName: 'training', to:'/topic/training', staticPage: false},
    {topicName:'meet-up', to:'/topic/meet-up', staticPage: false},{topicName: 'food', to: '/topic/food', staticPage: false}, {topicName: 'about me', to: '/topic/about', staticPage: true}];

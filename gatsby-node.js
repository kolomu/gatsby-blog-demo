// https://www.gatsbyjs.org/docs/node-apis/

// here we are registering the post based on the template and the front-matter-> path to let gatsby know where to route each title...
const path = require('path');

// using Redux behind the scenes, register post so we can use the URLS
exports.createPages = ({boundActionCreators, graphql}) => {
    const { createPage } = boundActionCreators;
    const postTemplate = path.resolve('src/templates/blog-post.js');

    return graphql(`
        {
            allMarkdownRemark {
                edges {
                    node {
                        html
                        id
                        frontmatter {
                            path
                            title
                            date
                            author
                        }
                    }
                }
            }
        }
    `).then( res => {
        if(res.errors) {
            return Promise.reject(res.errors);
        }

        res.data.allMarkdownRemark.edges.forEach(({node}) => {
            createPage({
                path: node.frontmatter.path,
                component: postTemplate
            })
        })
    })
}
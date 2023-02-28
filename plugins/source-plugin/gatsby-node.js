const {createRemoteFileNode} = require(`gatsby-source-filesystem`)
const fetch = require('node-fetch')

/**
 * ============================================================================
 * Helper functions and constants
 * ============================================================================
 */

const POST_NODE_TYPE = `Post`
const TAG_NODE_TYPE = `Tag`

// helper function for creating nodes
const createNodeFromData = (item, nodeType, helpers) => {
    const nodeMetadata = {
        id: helpers.createNodeId(`${nodeType}-${item.id}`),
        parent: null,
        children: [],
        internal: {
            type: nodeType,
            content: JSON.stringify(item),
            contentDigest: helpers.createContentDigest(item),
        },
    }

    const node = Object.assign({}, item, nodeMetadata)
    helpers.createNode(node)
    return node
}

/**
 * ============================================================================
 * Verify plugin loads
 * ============================================================================
 */

// should see message in console when running `gatsby develop` in example-site
exports.onPreInit = () => console.log("Loaded source-plugin")

/**
 * ============================================================================
 * Link nodes together with a customized GraphQL Schema
 * ============================================================================
 */

exports.createSchemaCustomization = ({schema, actions}) => {
    const {createTypes} = actions
    createTypes(schema.buildObjectType({
        name: 'Tag',
        interfaces: ['Node'],
        fields: {
            name: {
                type: `String`
            },
            posts: {
                type: [`Post`],
                extensions: {
                    link: {
                        by: `foreign_tags.elemMatch.name`,
                        from: 'name',
                    },
                },
            }
        }
    }))
    createTypes(schema.buildObjectType({
        name: 'Post',
        interfaces: ['Node'],
        fields: {
            source_link: {
                type: 'String',
            },
            author: {
                type: 'String',
            },
            featured_image: {
                type: `File`,
                extensions: {
                    link: {
                        from: `fields.image_file_id`,
                    },
                },
            },
            foreign_tags: {
                type: [`Tag`],
                extensions: {
                    link: {
                        by: `name`,
                    },
                },
            },
        }
    }))
    // createTypes(`
    // type Post implements Node {
    //   remote_file: File @link(from: fields.image_file_id)
    // }`)
}

/**
 * ============================================================================
 * Source and cache nodes from the API
 * ============================================================================
 */

exports.sourceNodes = async function sourceNodes(
    {
        actions,
        cache,
        createContentDigest,
        createNodeId,
        getNodesByType,
        getNode,
    },
    pluginOptions
) {
    const backendUrl = pluginOptions.backendUrl,
        backendWebsiteCode = pluginOptions.backendWebsiteCode,
        perPage = pluginOptions.perPage
    const {createNode, touchNode, deleteNode} = actions
    const helpers = Object.assign({}, actions, {
        createContentDigest,
        createNodeId,
    })

    const response = await fetch(
        `${backendUrl}/articles_to_publish/${backendWebsiteCode}`
    )
    const data = await response.json()
    const articles = data.articles
    const totalPages = Math.ceil(data.total / perPage)
    if (totalPages > 1) {
        const promises = []
        for (let i = 2; i <= totalPages; i++) {
            promises.push(await fetch(
                `${backendUrl}/articles_to_publish/${backendWebsiteCode}?page=${i}`
            ))
        }
        await Promise.all(promises)
            .then(responses => Promise.all(responses.map(response => response.json())))
            .then(results => {
                results.forEach((result) => {
                    if (result.articles) {
                        result.articles.forEach((article) => articles.push(article))
                    }
                })
            })
    }

    // touch nodes to ensure they aren't garbage collected
    getNodesByType(POST_NODE_TYPE).forEach(node => touchNode(node))
    // getNodesByType(TAG_NODE_TYPE).forEach(node => deleteNode(node))

    articles.forEach(post => {
        if (post.foreign_tags) {
            post.foreign_tags.forEach(tag => {
                tag.id = tag.slug
                createNodeFromData(tag, TAG_NODE_TYPE, helpers)
            })
            post.foreign_tags = post.foreign_tags.map((tag) => tag.name)
        }
        createNodeFromData(post, POST_NODE_TYPE, helpers)
    })
}

/**
 * ============================================================================
 * Transform remote file nodes
 * ============================================================================
 */

exports.onCreateNode = async ({
                                  actions: {createNode, createNodeField},
                                  getCache,
                                  createNodeId,
                                  node,
                              }) => {
    // transform remote file nodes using Gatsby sharp plugins
    // because onCreateNode is called for all nodes, verify that you are only running this code on nodes created by your plugin
    if (node.internal.type === POST_NODE_TYPE) {
        if (node.image_url) {
            // create a FileNode in Gatsby that gatsby-transformer-sharp will create optimized images for
            const fileNode = await createRemoteFileNode({
                // the url of the remote image to generate a node for
                url: node.image_url,
                getCache,
                createNode,
                createNodeId,
                parentNodeId: node.id,
            })

            if (fileNode) {
                createNodeField({node, name: `image_file_id`, value: fileNode.id})
            }
        }
    }
}
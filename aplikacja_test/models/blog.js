module.exports = (sequelize, Sequelize) => {
    const Blog = sequelize.define("blog", {
        title: {
            type: Sequelize.STRING
        },
        content: {
            type: Sequelize.TEXT
        },
        likes: {
            type: Sequelize.INTEGER
        },
        reads: {
            type: Sequelize.INTEGER
        }
    });
    return Blog;
};
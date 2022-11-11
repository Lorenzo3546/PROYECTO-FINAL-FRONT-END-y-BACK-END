const { generateError } = require('../helpers');
const { getConnection } = require('./db');

const createComment = async (text, userId, postId) => {

    let connection;

    try {
        connection = await getConnection();

        const [result] = await connection.query(
            `
    INSERT INTO comments (text, user_id, post_id) VALUES (?,?,?)
    `,
            [text, userId, postId]);

        return result.insertId;

    } finally {
        if (connection) connection.release();
    }

};


const getCommentId = async (commentId) => {
    let connection;

    try {
        connection = await getConnection();

        const [result] = await connection.query(
            `
        SELECT * FROM comments WHERE id = ?
        `,
            [commentId]
        );

        if (result.length === 0) {
            throw generateError('El comment que intentas borrar no existe', 404);
        }

        return result[0];

    } finally {
        if (connection) connection.release();
    }
};



const deleteComment = async (commentId) => {

    let connection;

    try {
        connection = await getConnection();

        await connection.query(
            `
    DELETE FROM comments WHERE id = ?
    `, [commentId]);

        return;

    } finally {
        if (connection) connection.release();
    }

};




module.exports = {
    createComment,
    getCommentId,
    deleteComment,
};

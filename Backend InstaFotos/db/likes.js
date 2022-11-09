const { getConnection } = require('./db');
const { generateError } = require('../helpers');


const createLike = async (userId, postId) => {

    let connection;

    try {
        connection = await getConnection();

        const [result] = await connection.query(
            `
    INSERT INTO likes(user_id, post_id) VALUES(?,?)
    `,
            [userId, postId]);



        return result;

    } finally {
        if (connection) connection.release();
    }

};




const dislike = async (userId, postId) => {

    let connection;

    try {
        connection = await getConnection();

        await connection.query(
            `
    DELETE FROM likes WHERE user_id = ? AND post_id = ?
    `,
            [userId, postId]);

        return;

    } finally {
        if (connection) connection.release();
    }

};



const getLikes = async (userId, postId) => {
    let connection;

    try {
        connection = await getConnection();

        const [result] = await connection.query(
            `
        SELECT * FROM likes WHERE user_id = ? AND post_id = ?
        `,
            [userId, postId]
        );

        if (result.length === 0) {
            throw generateError('El like que intentas borrar no existe', 404);
        }

        return result[0];
        //console.log(result);

    } finally {
        if (connection) connection.release();
    }
};



const totalLikes = async (postId) => {
    let connection;

    try {
        connection = await getConnection();

        const [result] = await connection.query(
            `
        SELECT COUNT(DISTINCT user_id) FROM likes where post_id = ?
        `,
            [postId]);

        return result[0];

    } finally {
        if (connection) connection.release();
    }
};




module.exports = {
    createLike,
    dislike,
    getLikes,
    totalLikes,
};


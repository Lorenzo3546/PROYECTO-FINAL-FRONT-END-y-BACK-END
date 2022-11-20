//const { text } = require('express');
const { generateError } = require('../helpers');
const { getConnection } = require('./db');


const createPost = async (userId, image = '', text = '') => {

    let connection;

    try {
        connection = await getConnection();

        const [result] = await connection.query(
            `
    INSERT INTO posts (user_id, image, text) VALUES(?,?,?)
    `,
            [userId, image, text]);

        return result.insertId;

    } finally {
        if (connection) connection.release();
    }

};



const getUserPosts = async (id) => {

    let connection;
    try {
        connection = await getConnection();

        const [result] = await connection.query(`
        SELECT p.id,user_id,image, text,p.created_at, nick FROM posts p LEFT JOIN users u on user_id = u.id WHERE user_id = ?
        `, [id]);

        for (const post of result) {
            const [comments] = await connection.query(`
        SELECT text, c.id, user_id, c.created_at, post_id, nick  FROM comments c LEFT JOIN users u on user_id=u.id WHERE post_id = ?`,
                [post.id]
            );
            post.comments = comments;
        }
        for (const post of result) {
            const [likes] = await connection.query(`
   
           SELECT COUNT(DISTINCT user_id)as likes FROM likes where post_id = ?
           `,
                [post.id]);
            post.likes = likes[0].likes;

        }
        return result;

    } finally {
        if (connection) connection.release();
    }
};


/* if (result.length === 0) {
    throw generateError(`El usuario con id: ${id} no tienen ningun post`, 404); */



const getPostById = async (id) => {

    let connection;
    try {
        connection = await getConnection();

        const [result] = await connection.query(`

        SELECT * FROM posts where id = ?
        `, [id]
        );

        if (result.length === 0) {
            throw generateError(`El post con id: ${id} no existe`, 404);
        }

        return result[0];


    } finally {
        if (connection) connection.release();
    }
};




const getAllPosts = async () => {

    let connection;
    try {
        connection = await getConnection();

        const [result] = await connection.query(`
        SELECT p.id,user_id,image, text,p.created_at, nick FROM posts p LEFT JOIN users u on user_id = u.id ORDER BY created_at DESC
        `);


        for (const post of result) {
            const [comments] = await connection.query(`
        SELECT text, c.id, user_id, c.created_at, post_id, nick  FROM comments c LEFT JOIN users u on user_id=u.id WHERE post_id = ?`,
                [post.id]
            );
            post.comments = comments;
        }

        for (const post of result) {
            const [likes] = await connection.query(`
   
           SELECT COUNT(DISTINCT user_id)as likes FROM likes where post_id = ?
           `,
                [post.id]);
            post.likes = likes[0].likes;

        }
        //post.comments = comments;  [post.id]
        //return result[0]

        //console.log(result);
        return result;

    } finally {
        if (connection) connection.release();
    }
};
//SELECT p.id,user_id,image, text,p.created_at, nick FROM posts p LEFT JOIN users u on user_id = u.id ORDER BY created_at DESC
//SELECT p.id,p.user_id,image, p.text,p.created_at, nick, c.text, c.created_at,c.user_id, c.post_id FROM posts p LEFT JOIN users u on p.user_id = u.id LEFT JOIN comments c on p.id = c.post_id ORDER BY p.created_at DESC
//SELECT * FROM posts WHERE text LIKE ?

const getImageByDescription = async (text) => {
    let connection;

    try {
        connection = await getConnection();

        const [imagen] = await connection.query(
            `
        SELECT p.id,user_id,image, text,p.created_at, nick FROM posts p LEFT JOIN users u on user_id = u.id WHERE text LIKE ? ORDER BY created_at DESC 
      `,
            [text]
        );

        if (imagen.length === 0) {
            throw generateError(`No se han encontrado imagenes con el texto: ${text}`, 404);
        }

        return imagen;
    } finally {
        if (connection) connection.release();
    }
};



const deletePost = async (id) => {

    let connection;

    try {
        connection = await getConnection();

        await connection.query(
            `
    DELETE FROM comments WHERE post_id = ?
    `,
            [id]);

        await connection.query(
            `
    DELETE FROM likes WHERE post_id = ?
    `,
            [id]);

        await connection.query(
            `
    DELETE FROM posts WHERE id = ?
    `,
            [id]);

        return;

    } finally {
        if (connection) connection.release();
    }

};




module.exports = {
    createPost,
    getAllPosts,
    getUserPosts,
    getPostById,
    getImageByDescription,
    deletePost,
};


const { text } = require('express');
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

        if (result.length === 0) {
            throw generateError(`El usuario con id: ${id} no tienen ningun post`, 404);
        }
        return result;

    } finally {
        if (connection) connection.release();
    }
};
//SELECT * FROM posts WHERE user_id = ?


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
        return result;

    } finally {
        if (connection) connection.release();
    }
};



/* const getImageByDescription = async () => {
    let connection;

    try {
        connection = await getConnection();

        const [imagen] = await connection.query(
            `
        SELECT text as descripcion FROM posts WHERE text LIKE = ?
      `,
            [text]
        );

        if (imagen.length === 0) {
            throw generateError(`La imagen con texto: ${text} no existe`, 404);
        }

        return imagen;
    } finally {
        if (connection) connection.release();
    }
};
 */

const getImageByDescription = async (text) => {
    let connection;

    try {
        connection = await getConnection();

        const [imagen] = await connection.query(
            `
        SELECT * FROM posts WHERE text LIKE ?
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


const { text } = require('express');
const { generateError } = require('../helpers');
const { getConnection } = require('./db');

const createPost = async (userId, text = '', image) => {

    let connection;

    try {
        connection = await getConnection();
    
    const [result] = await connection.query(`
    INSERT INTO posts (user_id, text, image) VALUES(?,?,?)
    `, [userId, text, image]);

    return result.insertId; 

    } finally {
        if (connection) connection.release(); 
    }

};

const getUserPosts = async (id) => { 
    let connection; 
    try { connection = await getConnection(); 
        //const [result] = await connection.query(` SELECT * FROM posts WHERE id = ? `, [userId]); 
        const result = await connection.query
        (` SELECT image, text, created_at , user_id from posts where user_id= ? `,[id]); 

        return result[0]; } 
        finally { if (connection) connection.release(); } };


const getAllPosts = async () => {

    let connection; 
    try {
        connection = await getConnection();

        const [result] = await connection.query(`
        SELECT * FROM posts ORDER BY created_at DESC;
       
        `);
        return result; 

    } finally {
        if (connection) connection.release();
    }
};

const getImageById = async (id) => {

    let connection; 
    try {
        connection = await getConnection();

        const result = await connection.query(`
        SELECT id, image, text, created_at from posts where id = ?
        `,[id]);
        return result[0]; 

    } finally {
        if (connection) connection.release();
    }
};

/*const getImageById = async () => 
{ let connection; 
try { connection = await getConnection(); 
const result = await connection.query(` SELECT image, text,email from users u join posts p where u.id = p.id `,); 
return result[0]; } 
finally { if (connection) connection.release(); } };*/


const getImageByDescription = async (text) => {
    let connection;
  
    try {
      connection = await getConnection();
  
      const [imagen] = await connection.query(
        `
        SELECT text FROM posts WHERE text LIKE ?
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

  const deletePost = async (id) => {

    let connection;

    try {
        connection = await getConnection();
    
    const [result] = await connection.query(
    `
    delete from posts where id = ?
    `, 
    [id]);

    return result.insertId; 

    } finally {
        if (connection) connection.release(); 
    }

}


module.exports = {
    createPost,
    deletePost,
    getAllPosts,
    getImageById,
    getImageByDescription,
    getUserPosts
};

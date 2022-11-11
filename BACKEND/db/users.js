const bcrypt = require('bcrypt');
const { generateError } = require('../helpers');
const { getConnection } = require('./db');


// Crea usuario en la base de datos y devuelve su id
const createUser = async (email, password, nick) => {
    let connection;

    try {
        connection = await getConnection();

        const [user] = await connection.query(
            `
        SELECT id FROM users WHERE email = ?
        `, [email]
        );

        if (user.length > 0) {
            throw generateError('Ya existe un usuario en la base de datos con ese email', 409);
        }

        const passwordHash = await bcrypt.hash(password, 5);

        const [newUser] = await connection.query(
            `
        INSERT INTO users (email, password, nick) VALUES(?, ?, ?)
        `,
            [email, passwordHash, nick]
        );

        return newUser.insertId;

    } finally {
        if (connection) connection.release();
    }
};




const getUserByEmail = async (email) => {
    let connection;

    try {
        connection = await getConnection();
        const [result] = await connection.query(
            `
        SELECT * FROM users WHERE email=?
        `, [email]);

        if (result.length === 0) {
            throw generateError('No existe ningun usuario con ese email, 404');
        }
        return result[0];

    } finally {
        if (connection) connection.release();
    }
};



// Devuelve la informacion publica de perfil de un usuario por su id 
const getUserById = async (id) => {
    let connection;

    try {
        connection = await getConnection();
        const [result] = await connection.query(`
        SELECT id, nick, created_at FROM users WHERE id=?
        `, [id]);

        if (result.length === 0) {
            throw generateError('No existe ningun usuario con esa id, 404');
        }
        return result[0];

    } finally {
        if (connection) connection.release();
    }
};



const getMeUserById = async (id) => {
    let connection;

    try {
        connection = await getConnection();
        const [result] = await connection.query(`
        SELECT id, email, nick, created_at FROM users WHERE id=?
        `, [id]);

        if (result.length === 0) {
            throw generateError('No existe ningun usuario con ese id, 404');
        }
        return result[0];

    } finally {
        if (connection) connection.release();
    }
};




const modifyUser = async (userId, password = '', nick = '') => {
    let connection;

    try {
        connection = await getConnection();

        const passwordHash = await bcrypt.hash(password, 5);

        const [modifyUser] = await connection.query(`
        UPDATE users SET password = ?, nick = ? WHERE id = ?
        `, [passwordHash, nick, userId]);

        return modifyUser;

    } finally {
        if (connection) connection.release();
    }
};


const getUserLikes = async (id) => {
    let connection;

    try {
        connection = await getConnection();
        const [result] = await connection.query(`
        SELECT post_id FROM likes WHERE user_id=?
        `, [id]);

        return result.map(post =>
            post.post_id);

    } finally {
        if (connection) connection.release();
    }
};



module.exports = {
    createUser,
    getUserById,
    getMeUserById,
    getUserByEmail,
    modifyUser,
    getUserLikes,
};


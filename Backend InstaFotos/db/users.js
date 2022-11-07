const bcrypt = require('bcrypt');
const { generateError } = require('../helpers');
const { getConnection } = require('./db');


const getUserByEmail = async (email) => {
    let connection;

    try {
        connection = await getConnection();
        const [result] = await connection.query (`
        SELECT * FROM users WHERE email = ?
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
        const [result] = await connection.query (`
        SELECT id, email, avatar, created_at , nick FROM users WHERE id=?
        `, [id]);

        if (result.length === 0) {
            throw generateError('No existe ningun usuario con esa id, 404');
        }
        return result[0];

    } finally {
        if (connection) connection.release(); 
    }
};



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

        if(user.length > 0) {
            throw generateError('Ya existe un usuario en la base de datos con ese email', 409);
        }

        const passwordHash = await bcrypt.hash(password, 5);

        const [newUser] = await connection.query(
            `
        INSERT INTO users (email, password, nick ) VALUES(?, ?, ?)

        `, 
        [email, passwordHash, nick]
        );


        return newUser.insertId; 

    } finally {
        if (connection) connection.release();
}
};

const modifyUser = async (userId,email, password, nick) => {
    let connection;

    try {
        connection = await getConnection();
        const [modifyUser] = await connection.query (`
        UPDATE users SET email = ? , password = ? nick = ? WHERE id = ?
        `, [email, password, userId, nick]);
console.log(password, email, userId, nick);
    return modifyUser;

    } finally {
        if (connection) connection.release(); 
    }
};


module.exports = {
    createUser,
    getUserById,
    getUserByEmail,
    modifyUser,
}; 

require('dotenv').config();

const { getConnection } = require('./db');

async function main() {
    let connection;

    try {
        connection = await getConnection();

        console.log('borrando tablas existentes');

        await connection.query('DROP TABLE IF EXISTS comments');
        await connection.query('DROP TABLE IF EXISTS likes');
        await connection.query('DROP TABLE IF EXISTS posts');
        await connection.query('DROP TABLE IF EXISTS users');




        console.log('creando tablas');

        await connection.query(`
        CREATE TABLE users (
            id INT PRIMARY KEY AUTO_INCREMENT,
            email VARCHAR(255) UNIQUE NOT NULL, 
            password VARCHAR(100) NOT NULL, 
            nick VARCHAR(80) NOT NULL, 
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );
        `);
        //public_profile BOOLEAN DEFAULT TRUE,

        await connection.query(`
        CREATE TABLE posts (
            id INT PRIMARY KEY AUTO_INCREMENT,
            user_id INT NOT NULL, 
            image CHAR(255) NOT NULL, 
            text VARCHAR(500) NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users(id) ON UPDATE CASCADE 
        );
        `);


        await connection.query(`
        CREATE TABLE comments (
            id INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
            text VARCHAR(500) NOT NULL, 
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            user_id INTEGER NOT NULL, 
            post_id INTEGER NOT NULL, 
            FOREIGN KEY (user_id) REFERENCES users (id) ON UPDATE CASCADE ,
            FOREIGN KEY (post_id) REFERENCES posts (id) ON UPDATE CASCADE 
        );
        `);


        await connection.query(`
        CREATE TABLE likes (
            id INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            user_id INT NOT NULL, 
            post_id INT NOT NULL, 
            FOREIGN KEY (user_id) REFERENCES users (id) ON UPDATE CASCADE ,
            FOREIGN KEY (post_id) REFERENCES posts (id) ON UPDATE CASCADE 
        );
        `);

    } catch (error) {
        console.error(error);
    } finally {
        if (connection) connection.release();
        process.exit();
    }
}

main();



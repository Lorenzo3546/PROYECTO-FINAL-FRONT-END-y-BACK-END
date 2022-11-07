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
            nick VARCHAR(80) NOT NULL,
            password VARCHAR(100) NOT NULL, 
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            avatar VARCHAR(255) NULL
        );
        `);
//public_profile BOOLEAN DEFAULT TRUE,

        await connection.query(`
        CREATE TABLE posts (
            id INT PRIMARY KEY AUTO_INCREMENT,
            image CHAR(255), 
            text VARCHAR(500) NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            user_id INT NOT NULL, 
            email varchar(80) NOT NULL
            FOREIGN KEY (user_id) REFERENCES users(id)
            FOREIGN KEY (nick) REFERENCES users(nick)
        );
        `);

        
        await connection.query(`
        CREATE TABLE comments (
            id INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
            text VARCHAR(500) NOT NULL, 
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            user_id INTEGER NOT NULL, 
            post_id INTEGER NOT NULL, 
            FOREIGN KEY (user_id) REFERENCES users (id),
            FOREIGN KEY (post_id) REFERENCES posts (id)
        );
        `);


        await connection.query(`
        CREATE TABLE likes (
            
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            user_id INT NOT NULL, 
            post_id INT NOT NULL, 
            FOREIGN KEY (user_id) REFERENCES users (id),
            FOREIGN KEY (post_id) REFERENCES posts (id)
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
const { getConnection } = require('./db');

const getUserId = async (userId, postId) => {
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

    } finally {
        if(connection) connection.release();
    }
}; 



const createLike = async (userId, postId) => {

    let connection;

    try {
        connection = await getConnection();
    
    const [result] = await connection.query(
    `
    INSERT INTO likes (user_id, post_id) VALUES (?,?)
    `, 
    [userId, postId]);

    return result.insertId; 

    } finally {
        if (connection) connection.release(); 
    }

}

const disLike = async (id) => {

    let connection;

    try {
        connection = await getConnection();
    
    const [result] = await connection.query(
    `
    delete from likes where id = ?
    `, 
    [id]);

    return result.insertId; 

    } finally {
        if (connection) connection.release(); 
    }

}



module.exports = {
    createLike,
    disLike,
    getUserId
};

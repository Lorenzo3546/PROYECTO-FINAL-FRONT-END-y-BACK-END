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

const deleteComment = async (postId) => {

    let connection;

    try {
        connection = await getConnection();
    
    const [result] = await connection.query(
    `
    DELETE FROM comments where id = ?
    `, 
    [postId]);

    return result.insertId; 

    } finally {
        if (connection) connection.release(); 
    }

}


module.exports = {
    createComment, 
    deleteComment
};

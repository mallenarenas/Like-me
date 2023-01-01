require('dotenv').config()
const { Pool } = require('pg')
const pool = new Pool({
host: process.env.HOST,
user: process.env.USER,
password: process.env.PASSWORD,
database: process.env.DATABASE,
allowExitOnIdle: true, 
})
const getDate = async () => {
const result = await pool.query("SELECT NOW()")
}
getDate()

const addPost = async (title, img, description, likes) => {
    const query = "INSERT INTO posts values (DEFAULT, $1, $2, $3, $4) RETURNING *"
    const values = [title, img, description, likes]
    try{
        const result = await pool.query(query, values)
        console.log("Post agregado")
    }
    catch (e) {
            console.log('error al insertar datos en tabla product: ', e.code, e.message)
            throw new Error(e)
          }
}


const getPosts = async () => {
    const { rows } = await pool.query("SELECT * FROM posts")
    return rows
    }

module.exports = { addPost, getPosts }
import { pool } from "../bd.js";

export const getUsers = async (req,res)=>{
  try {
    const [rows] = await pool.query('SELECT * FROM users')
    res.json(rows)
  } catch (error) {
    return res.status(500).json({
      message: 'algo salio mal :C'
    })
  }
}

export const getUser = async (req,res)=>{
  try {
    const [rows] = await pool.query('SELECT * FROM users WHERE idUser = ?',[req.params.id])

  if(rows.length <= 0){
    return res.status(404).json({
      message: 'Usuario no encontrado'
    })
  }

  res.json(rows[0])
  } catch (error) {
    return res.status(500).json({
      message: 'algo salio mal :C'
    })
  }
}

export const createUser = async (req,res)=>{
  const {email,pass} = req.body
  try {
  const [rows] = await pool.query('INSERT INTO users (email,pass) VALUES (?,?)',[email,pass])
  
  res.send({
    id:rows.insertId,
    email,
    pass
  })
  } catch (error) {
    return res.status(500).json({
      message: 'algo salio mal :C'
    })
  }
}
export const updateUser = async(req,res)=>{
  const {id} = req.params
  const {email,pass} = req.body
  try {
  const [result] = await pool.query('UPDATE users SET email = ?, pass = IFNULL(?) WHERE idUser = ?',[email,pass,id])
  
  if(result.affectedRows === 0){
    return res.status(404).json({
      message: 'Usuario no encontrado'
    })
  }

  const [rows] = await pool.query('SELECT * FROM users WHERE idUser = ?'[id])
  
  res.json(rows[0])
  } catch (error) {
    return res.status(500).json({
      message: 'algo salio mal :C'
    })
  }
}

export const deleteUser = async (req,res)=>{
  try {
    const [result] = await pool.query('DELETE FROM users WHERE idUser = ?',[req.params.id])

  if(result.affectedRows <= 0){
    return res.status(404).json({
      message: 'Usuario no encontrado'
    })
  }

  res.sendStatus(204)
  } catch (error) {
    return res.status(500).json({
      message: 'algo salio mal :C'
    })
  }
}
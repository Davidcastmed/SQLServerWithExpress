import sql from "mssql";
import { randomBytes } from 'crypto'
import {connectDB} from "../config/database.js"

// Generar Token 
export function GenerateToken(){
  return randomBytes(32).toString('hex');
}
export const Logout = async (req, res) => {
  const isoDate = new Date().toISOString();
  const {user, token} = req.body
  try{
    const pool = await connectDB()
    const Result = await pool.request()
    .input('user', sql.VarChar,user)
    .input('token', sql.VarChar,token)
    .query('SELECT * FROM Logins_History WHERE Name = @user and Token = @token')
    //console.log('Result.recordset', Result.recordset.length)
    if (Result.recordset.length === 0){
     res.status(400).json({ error: "Token is not Valid" })
    } else{
      const pool = await connectDB()
      const logout = await pool.request()
      .input('user', sql.VarChar,user)
      .input('token',sql.VarChar, token)
      .input('isoDate', sql.DateTime,isoDate)
      .query('UPDATE Logins_History SET Logout_Time = @isoDate, Active_Session = 0  WHERE Name = @user and Token = @token')
       res.status(200).json({message:'The session was closed successfully'})
    }
   // console.log('Data', Result.recordset)
  } catch (err) {
    console.error('SQL error', err)
    throw err
  }
}

// a manera de ejemplo he decidido no almacenar la contrasenia encriptada, esto se debera arreglar en el proyeto real
export const GetUserByCredential = async (req, res) => {
  const Token = GenerateToken()
  const activeSession = 1
  const isoDate = new Date().toISOString();

  //Como derminar las cantidad se sesiones activas?. por cada sesion se crea un Token

  //verificar tabla, quitar caracteres en blanco, mejorar funcion insertar token y regresar token al frontend
  console.log('token',Token)
  console.log('usuario', req.body)
  const {user, password} = req.body
  try{
    const pool = await connectDB()
    const Result = await pool.request()
    .input('user', sql.VarChar,user)
    .input('password', sql.VarChar,password)
    .query('SELECT * FROM Users WHERE Name = @user and Password = @password')
    //console.log('Result.recordset', Result.recordset.length)
    if (Result.recordset.length === 0){
     res.status(400).json({ error: "User not Found" })
    } else{
      const insertToken = await pool.request()
      .input('token',sql.VarChar, Token)
      .input('user', sql.VarChar,user)
      .input('isoDate', sql.DateTime,isoDate)
      .input('activeSession', sql.Int, activeSession)
      .query('INSERT INTO Logins_History (Name,Login_Time,Token,Active_Session ) VALUES(@user,@isoDate,@token, @activeSession)')
       res.status(200).json({message:'Token was Generated',
        user, Token,
        })
    }
   // console.log('Data', Result.recordset)
  } catch (err) {
    console.error('SQL error', err)
    throw err
  }
}

export const GetUsers =  async (req, res) => {
    try{
      const pool = await connectDB();
      const Result = await pool.request()
      .query('SELECT * FROM Users');
      console.log('Data', Result.recordset)
      // await pool.close()
      res.status(200).json(Result.recordset)
    }catch (err) {
      console.error('SQL error', err)
      throw err
    }
  }
  
  export const GetUserById = async(req, res) =>{
    const id = req.params.id
    try{
      const pool = await connectDB();
      const Result = await pool.request()
      .input('id', sql.Int, id)
      .query('SELECT * FROM Users where Id = @id');
      console.log('Data', Result.recordset)
      // await pool.close()
      res.status(200).json(Result.recordset)
      // return Result.recordset;
    }catch (err) {
      console.error('SQL error', err)
      throw err
    }
  }
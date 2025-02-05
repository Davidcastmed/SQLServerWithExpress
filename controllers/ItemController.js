import sql from "mssql";
import {connectDB} from "../config/database.js"

export  const SearchItem = async(req, res) =>{
 const {search} = req.params;
 console.log('search',req.params)
 if(!search){
   return res.status(400).json({error:'No hay parametros'});
 }
 try {
   const pool = await connectDB();
   const Result = await pool.request()
   .input('search', sql.VarChar, `%${search}%`)
   .query('SELECT * FROM Item_Table WHERE Item_Name like @search');
   res.status(200).json(Result.recordset);
 } catch (error) {
   console.error('SQL error', err)
   throw err
  }
}
export  const UpdateItem = async(req, res) =>{
   const {id, description} = req.body;
  console.log('req.body', req.body)
  if(!id || !description){
    return res.status(400).json({error:'Error en los parametros dados'});
  }
  try {
    const pool = await connectDB();
    const Result = await pool.request()
    .input('id', sql.Int,id)
    .input('description', sql.VarChar,description)
    .query('UPDATE Item_Table SET Item_Name = @description WHERE Id = @id');

    if(Result.rowsAffected[0]=== 0){
      return res.status(404).json({Message:`El item con ID: ${id} no existe`,})
    }
    res.status(200).json(Result.recordset)

  } catch (error) {
    console.error('SQL error', err)
    throw err
  }
}
export const InsertNewItemWithSQLTransaction = async(req, res) =>{
  console.log(req.body, 'Request from User')
  const {id,description} = req.body
  try{
    //Transaccion Start
    const transaction = new sql.Transaction(await connectDB())
    await transaction.begin();
    // const pool =  await connectDB();
    const Result = await transaction.request()
    .input('id', sql.Int,id)
    .input('description', sql.VarChar,description)
    .query('INSERT INTO Item_Table (Id,Item_Name) VALUES(@id,@description)');
    res.status(201).json({message:'New Item were inserted',
    rowsAffected: Result.rowsAffected,
    })
    await transaction.commit();

  }catch (err) {
    await transaction.rollback();
    console.error('SQL error', err);
  }
}

export const InsertNewItem = async(req, res) =>{
  console.log(req.body, 'Request from User')
  const {id,description} = req.body
  try{
    const pool =  await connectDB();
    const Result = await pool.request()
    .input('id', sql.Int,id)
    .input('description', sql.VarChar,description)
    .query('INSERT INTO Item_Table (Id,Item_Name) VALUES(@id,@description)');
    res.status(201).json({message:'New Item were inserted',
    rowsAffected: Result.rowsAffected,
    })

  }catch (err) {
    console.error('SQL error', err)
    throw err
  }
}

export const GetItems =  async (req, res) => {
  // aqui deberia ser la extaccion de los parametro, por motivos de este ejemplo 
  // los genero para objetivo de este ejemplo. pero cuando realmente se quiere obtener los parametros
  // estos llegan con las varibles  -> req.params
  const param1 = 10; const param2 = 'Description10';
  console.log('parameters', param1, param2)
  try{
    const pool = await connectDB();
    const Result = await pool.request()
    .input('param1', sql.Int, param1)
    .input('param2', sql.VarChar, param2)
    .query('SELECT * FROM Item_Table WHERE Id = @param1 AND Item_Name = @param2');
    console.log('Data', Result.recordset)
    // await pool.close()
    res.status(200).json(Result.recordset)
  }catch (err) {
    console.error('SQL error', err)
    throw err
  }
}

export const GetItemById = async(req, res) =>{
  const param1 = req.params.id
  console.log(param1, 'param1')
  try{
    const pool = await connectDB();
    const Result = await pool.request()
    .input('param1', sql.Int, param1)
    .query('SELECT * FROM Item_Table WHERE Id = @param1');
    console.log('Data', Result.recordset)
    // await pool.close()
    res.status(200).json(Result.recordset)
    // return Result.recordset;
  }catch (err) {
    console.error('SQL error', err)
    throw err
  }
}
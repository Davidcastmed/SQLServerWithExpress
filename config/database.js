import sql from "mssql";
import  dotenv  from "dotenv";
dotenv.config();

// Ver Notas
// SQL Server configuration
 const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER ,
  database: process.env.DB_DATABASE,
  port: 1433 ,
  options: {
    encrypt: true, // Use encryption (e.g., for Azure)
    trustServerCertificate: true, // For local dev, set this to true
  },
};
export const connectDB = async () => {
  console.log('dbConfig', dbConfig)
  try {
    const pool =  await sql.connect(dbConfig);
    // console.log('poool', pool)
    console.log('Connected to SQL Server successfully');
    return pool;
  }catch(error){
    console.error('DB connection Failed:', error.message);
    throw error
  }
}

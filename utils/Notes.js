// Error al correr desde npm run dev  o start. problem de conexion con DB,
//  alternativa es ir a carpeta src y de ahi -> node server.js o nodemon

//DB
// Utilizar nomenglatura Upper CamelCase con simbolo "_" separando los Nombres compuestos Ejemplo: User_Name 
// esto hace las Columnas mas claras para leer

//Javascript
// Aqui utilizo CamelCase con una excepcion para variales especiales por ejemplo Result -> Almacena los resultados de los
//Registros afectados. Token > Para almacenar el Token generado

//Placeholder -> Este atributo es utilizado para almacenar atributos agregados que se necesitan despues de haber creado la Tabla

// Esta configuracion funciona con SQL Server Management Studio, 
// Se debera Instalar y configurar SQL server y SSMS, Crear la BD, Este ejemplo lo he creado como guia unicamente
// en SSMS se debera crear los derechos de usuario y la Base de Datos en en principio contiene Tres tablas -> 
// SELECT TOP (1000) [Id]
// ,[Item_Name]
// ,[Placeholder_1]
// ,[Placeholder_2]
// ,[Placeholder_3]
// ,[Placeholder_4]
// ,[Placeholder_5]
// FROM [PHI].[dbo].[Item_Table]
// ........................................................
// SELECT TOP (1000) [Id]
// ,[Name]
// ,[Email]
// ,[Token]
// ,[Active]
// ,[Password]
// ,[Role]
// FROM [PHI].[dbo].[Users]
// ......................................
// SELECT TOP (1000) [Name]
//       ,[Login_Time]
//       ,[Logout_Time]
//       ,[Ip_Address]
//       ,[Location]
//       ,[Placeholder_1]
//       ,[Placeholder_2]
//       ,[Placeholder_3]
//       ,[Placeholder_4]
//       ,[Placeholder_5]
//       ,[Token]
//       ,[Active_Session]
//   FROM [PHI].[dbo].[Logins_History]
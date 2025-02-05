
import { Router } from "express";
import { GetItems,
         GetItemById, 
         InsertNewItem, 
         UpdateItem, 
         SearchItem, 
         InsertNewItemWithSQLTransaction  } from "../controllers/ItemController.js";

const itemRouter =  Router()

itemRouter.get('/items', GetItems)
itemRouter.get('/items/:id', GetItemById)
itemRouter.post('/newItem',InsertNewItem)
itemRouter.post('/newItem-With-SQL-T',InsertNewItemWithSQLTransaction)
itemRouter.put('/updateItem', UpdateItem)
itemRouter.get('/search/:search',SearchItem)

export default itemRouter

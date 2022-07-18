import { dbConnection } from "./Database";
import { Product } from "../interfaces/Product";

export async function queryProductsList(){
  try{
    const result = await dbConnection.query<Product[]>('SELECT id, title, description, price FROM products');
    
    return result.rows;
  } catch(err) {
    console.log(err)
    throw new Error('Error getting products list')
  }
}

export async function queryProductsById(id: string){
  try{
    const result = await dbConnection.query<Product>('SELECT id, title, description, price FROM products WHERE id = $1', [id]);

    return result.rows;
  } catch(err) {
    console.log(err)
    throw new Error('Error getting products list')
  }
}

export async function createProduct({title, description, price}: Product){
  try{
    const result = await dbConnection.query('INSERT INTO products(title, description, price) VALUES ($1, $2, $3)', [title, description, price]);

    return result.rows;
  } catch(err) {
    console.log(err)
    throw new Error('Error getting products list')
  }
}
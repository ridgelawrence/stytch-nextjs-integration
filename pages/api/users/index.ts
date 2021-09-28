import type {NextApiRequest, NextApiResponse} from 'next';
import { PSDB } from 'planetscale-node'
import getUsers from '../../../lib';

const conn = new PSDB('main')

export interface User { 
  id: number,
  email: string, 
  password: string, 
  name: string,
 }

export async function handler(req: NextApiRequest, res: NextApiResponse){
    if( req.method == 'GET'){
      getUsers(req,res)
    } else if(req.method == "POST") {
      addUser(req, res)
    }
}



async function addUser(req: NextApiRequest, res: NextApiResponse)  {
  var user = JSON.parse(req.body) 
  try {
    const [row, _] = await conn.query(
      `INSERT INTO users (email, password, name) VALUES (?,?,?)`, Object.values(user))
    res.status(201).json({"id": row.insertId})
  } catch (e) {
    res.status(500).json({"error":"an error occurred"})
    console.log(e)
  }
}

export default handler;

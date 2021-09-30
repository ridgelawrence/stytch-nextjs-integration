import type {NextApiRequest, NextApiResponse} from 'next';
import { PSDB } from 'planetscale-node'

const conn = new PSDB('main')

export interface User { 
  id: number,
  email: string, 
  password: string, 
  name: string,
 }

export async function handler(req: NextApiRequest, res: NextApiResponse){
    if( req.method == 'GET'){
      getUsers(conn, req,res)
    } else if(req.method == "POST") {
      addUser(conn, req, res)
    }
}

//getUsers retrieve all users
 async function getUsers(conn: PSDB, req: NextApiRequest, res: NextApiResponse)  {
  try {
    var query = 'select * from users' 

    const [getRows, _] = await conn.query(query,"")
    res.status(200).json(getRows)
    
  } catch (e) {
    res.status(500).json({"error":"an error occurred"})
  }
}

//addUser create a new user
 async function addUser(conn: PSDB, req: NextApiRequest, res: NextApiResponse)  {
  var user = JSON.parse(req.body) 
  console.log(user)
  try {
    var query = "INSERT INTO users ( name, email, password) VALUES (?,?,?)"
    var params = Object.values(user)

    const [row, _] = await conn.query(query, params)
    res.status(201).json({"id": row.insertId})
  } catch (e) {
    res.status(500).json({"error":"an error occurred"})
  }
}

export default handler;

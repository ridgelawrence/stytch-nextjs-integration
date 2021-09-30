import type {NextApiRequest, NextApiResponse} from 'next';
import { PSDB } from 'planetscale-node'

const conn = new PSDB('main')
export async function handler(req: NextApiRequest, res: NextApiResponse){
    if( req.method == 'GET'){
      getUser(conn, req, res)
    } else if(req.method == "DELETE") {
      deleteUser(conn, req,res)
    }
}


//getUser get a single user
 async function getUser(conn: PSDB, req: NextApiRequest, res: NextApiResponse)  {
  try {
    var query = 'select * from users WHERE id=?'
    var params = [req.query["uid"]]

    const [getRows, _] = await conn.query(query, params)
    res.status(200).json(getRows)
  } catch (e) {
    res.status(500).json({"error":"an error occurred"})
  }
}

//deleteUser remove a single user
 async function deleteUser(conn: PSDB, req: NextApiRequest, res: NextApiResponse)  {
  try {
    var query = 'DELETE from users WHERE id=?'
    var params = [req.query["uid"]]

    const [row, _] = await conn.query(query, params)
    res.status(200).json({"id":row.insertId})
  } catch (e) {
    res.status(500).json({"error":"an error occurred"})
  }
}

export default handler;

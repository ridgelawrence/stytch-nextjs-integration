import type {NextApiRequest, NextApiResponse} from 'next';
import { PSDB } from 'planetscale-node'
const conn = new PSDB('main')
export async function handler(req: NextApiRequest, res: NextApiResponse){
    if( req.method == 'GET'){
      getUser(req, res)
    } else if(req.method == "DELETE") {
      deleteUser(req,res)
    }
}

async function getUser(req: NextApiRequest, res: NextApiResponse)  {
  try {
    var id = req.query["uid"]
    const [getRows, _] = await conn.query('select * from users WHERE id=?', id)
    res.status(200).json(getRows)
  } catch (e) {
    res.status(500).json({"error":"an error occurred"})
  }
}

async function deleteUser(req: NextApiRequest, res: NextApiResponse)  {
  try {
    var id = req.query["uid"]
    const [row, _] = await conn.query('DELETE from users WHERE id=?', id)
    res.status(200).json({"id":row.insertId})
  } catch (e) {
    res.status(500).json({"error":"an error occurred"})
    console.log(e)
  }
}

export default handler;

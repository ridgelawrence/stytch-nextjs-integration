export async function getUsers(req: NextApiRequest, res: NextApiResponse)  {
  try {
    const [getRows, _] = await conn.query('select * from users',"")
    res.status(200).json(getRows)
  } catch (e) {
    console.log(e)
    res.status(500).json({"error":"an error occurred"})
  }
}
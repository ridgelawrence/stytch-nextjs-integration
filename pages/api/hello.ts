import type {NextApiRequest, NextApiResponse} from 'next';

export async function handler(req: NextApiRequest, res: NextApiResponse){
    if( req.method == 'GET'){
        console.log("Hello world")
        res.status(200).json({"message":"very nice"})
    }
    if (req.method == 'POST'){
        console.log("Successfully posted")
        res.status(200).json({"message":"very good"})
    }
}

export default handler;
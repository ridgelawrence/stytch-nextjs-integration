import loadStytch from "./loadStytch";
import { NextApiRequest,NextApiResponse } from 'next';
import Cookies from 'cookies';
import { FlashOffRounded } from "@mui/icons-material";


const client = loadStytch()
type APIHandler = (req: NextApiRequest, res: NextApiResponse<any>) => Promise<any>;
export type ServerSideProps = ({ req }: { req: NextApiRequest }) => Promise<any>;

export  function validSessionToken (token: string ): boolean {

    //authenticate the session
   client.sessions.authenticate({session_token: token})
    .then(sessionAuthResp => { 
        //if the cookie has expired, then revoke it
        if(Date.now() > sessionAuthResp.session.expires_at.getTime()) {
            //revoke session
            client.sessions.revoke({session_id: sessionAuthResp.session.session_id})

            //clear cookie
            return false;
        }
     })
    .catch(err => { 
        console.log("Failed to validate session. Token = ",token, err)
        return false
    });
    return true
  }

export  function validSession (req: NextApiRequest, res: NextApiResponse ) {
    //get cookie from browser or from request1
    const cookies = new Cookies(req, res)
    const cookieKey = process.env.COOKIE_NAME as string
    var token = cookies.get(cookieKey)

    if (token == null) {
        return false
    }

    console.log("cookies in profile req", req.cookies)
    console.log("header in res profile", res.getHeaders())
    console.log("header in req profile", req.headers)

    // res.getHeader
    console.log(cookieKey, token)
    //authenticate the session
   client.sessions.authenticate({session_token: token})
    .then(sessionAuthResp => { 
        //if the cookie has expired, then revoke it
        if(Date.now() > sessionAuthResp.session.expires_at.getTime()) {
            //revoke session
            client.sessions.revoke({session_id: sessionAuthResp.session.session_id})

            //clear cookie
            cookies.set(cookieKey)
            res.redirect('/');
            return false
        }
        return true
     })
    .catch(err => { 
        console.log("Failed to validate session. Token = ",token, err); 
        return false 
    });
  }
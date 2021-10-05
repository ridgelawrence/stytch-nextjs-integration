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
        return true
     })
    .catch(err => { 
        console.log("Failed to validate session. Token = ",token, err)
        return false
    });
    return true
  }

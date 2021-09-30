import loadStytch from "./loadStytch";

const url = `${process.env.BASE_URL}/api/authenticate_magic_link`

async function inviteUser(url:string, duration: bigint, email: string, name: string, ){
    const client = loadStytch()

    // params are of type stytch.InviteByEmailRequest
    const params = { 
        email: email,
        invite_magic_link_url: url,
        invite_expiration_minutes: duration,
        name: {
            first_name: name,
        }
    };


    client.magicLinks.email.invite(params)
    .then(resp => {
        console.log(resp)
    })
    .catch(err => {
        console.log(err)
    }); 
}
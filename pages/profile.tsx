import React, { useEffect } from 'react';
import styles from '../styles/Home.module.css';
import StytchContainer from '../components/StytchContainer';
import withSession, { ServerSideProps } from '../lib/withSession';
import { getUsers, addUser, deleteUserById } from '../lib/usersUtils';
import AddIcon from '@material-ui/icons/AddRounded';
import { Hidden, Button, makeStyles, Table, TableBody, TableCell, TableHead, TableRow, InputLabel, TextField, DialogContent, DialogTitle } from '@material-ui/core';
import { useRouter } from 'next/router';
import { User } from '../pages/api/users/';
import Dialog from '@mui/material/Dialog';


type Props = {
  user?: {
    id: string;
  };
};

// const users = async (): Promise<User[]> => { return getUsers()};
var users = await getUsers();



const Profile = (props: Props) => {
  const { user } = props;
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');

  useEffect(() => {
    if (!user) {
      router.replace('/');
    }
  });

  function toggleOpen(){
    setOpen(!open);
    console.log("toggled open to " +open)
  }
  
  function submitUser(){
    //do nothing if empty
    if(name=="" || email == "") {
      toggleOpen()
      return
    }

    toggleOpen()
    //grab name and email
     addUser(name, email, "temp")
     
    //calll api
  }

  function deleteUser(id: number){
    deleteUserById(id)
    this.forceUpdate()
  }

  const signOut = async () => {
    const resp = await fetch('/api/logout', { method: 'POST' });
    if (resp.status === 200) {
      router.push('/');
    }
  };

  return (
    <>
      {!user ? (
        <div />
      ) : (
        <StytchContainer>
          <TableHead>
            <TableRow>
              <TableCell> <b>Name </b></TableCell>
              <TableCell><b> Email </b> </TableCell>
              <TableCell><b> Actions </b> </TableCell>

            </TableRow>
          </TableHead>
        <TableBody>
         {users.map(user => (
             <TableRow key={user.name} id={user.id}>  <TableCell> {user.name} </TableCell> <TableCell> {user.email} </TableCell> <TableCell>  <Button
             color="secondary"
             onClick={() => deleteUser(user.id)}
           >
             Delete
           </Button> </TableCell> </TableRow>
          ))}  

          <TableRow>
            <Button startIcon={<AddIcon />} onClick={toggleOpen} size="small">
              Invite
            </Button>
            <Dialog open={open} onClose={toggleOpen} > 

            <DialogTitle>{`Invite`}</DialogTitle>
            <DialogContent>
            <InputLabel > Name</InputLabel>
              <TextField
                autoFocus
                margin="dense"
                placeholder="Ada Lovelace"
                variant="standard"
                size="small"
                onChange={(e) => setName(e.target.value)}
              />
              <InputLabel>Email</InputLabel>
              <TextField
                autoFocus
                margin="dense"
                placeholder="ada@lovelace.com"
                variant="standard"
                size="small"
                onChange={(e) => setEmail(e.target.value)}
              />
            <Button
            onClick={submitUser}
            style={{
              backgroundColor: "#0D4052",
              color:"white"
          }}
            variant="contained"
            size="small"
          >
            Confirm
          </Button>
              </DialogContent>
             </Dialog>
          </TableRow>
          </TableBody>

        </StytchContainer>
      )}
    </>
  );
};

const getServerSidePropsHandler: ServerSideProps = async ({ req }) => {
  // Get the user's session based on the request
  const user = req.session.get('user') ?? null;
  const props: Props = { user };
  return { props };
};

export const getServerSideProps = withSession(getServerSidePropsHandler);

export default Profile;

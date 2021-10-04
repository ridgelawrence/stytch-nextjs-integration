import React, { useEffect } from 'react';
import styles from '../styles/Home.module.css';
import StytchContainer from '../components/StytchContainer';
// import withSession, { ServerSideProps } from '../lib/withSession';
import { ServerSideProps } from '../lib/StytchSession';
import { getUsers, getUsersWithToken, addUser, deleteUserById } from '../lib/usersUtils';
import { User } from '../pages/api/users/';
import AddIcon from '@material-ui/icons/AddRounded';
import { Hidden, Button, makeStyles, Table, TableBody, TableCell, TableHead, TableRow, InputLabel, TextField, DialogContent, DialogTitle, Collapse,  IconButton } from '@material-ui/core';
import { useRouter } from 'next/router';
import Dialog from '@mui/material/Dialog';
import Alert from '@mui/material/Alert';
import CloseIcon from '@mui/icons-material/Close';
import {validSessionToken} from '../lib/StytchSession';
import Cookies from 'cookies';

type Props = {
  token?: string;
  users?: User[];
};

// var users = getUsers(token)

// const users = async (): Promise<User[]> => { return getUsers()};

const Profile = (props: Props) => {
  const { token, users } = props;
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [deleteOpen, setDeleteOpen] = React.useState(false)
  const [submitOpen, setSubmitOpen] = React.useState(false)
  const [usersState, setUsers] = React.useState(users)
  
  // var usersResp = (users.then(userResp => userResp)) as User[]

  useEffect(() => {
    if (!token) {
      router.replace('/');
    }
  });

  function toggleOpen(){
    setOpen(!open);
  }

  function toggleDelete(){
    setDeleteOpen(!deleteOpen)
  }

  function toggleSubmit(){
    setSubmitOpen(!submitOpen)
  }
  
  function submitUser(){
    //do nothing if empty
    if(name=="" || email == "") {
      toggleOpen()
      return
    }

    //closes modal
    toggleOpen()


    //grab name and email
   addUser(name, email, "temp")
  
     //opens popup
     toggleSubmit()

    }

  function deleteUser(id: number){
    //remove user fromt the DB
    deleteUserById(id)
    

    //remove user from the list
    users?.forEach(
      (element, index) =>{
        if(element.id == id) delete users[index]
      }
    )

    setUsers(users)
    toggleDelete()
  }

  const signOut = async () => {
    console.log("click")
    const resp = await fetch('/api/logout', { method: 'POST' });
    if (resp.status === 200) {
      router.push('/');
    }
  };

  return (
    <>
      {!token ? (
        <div></div>
      ) : (
        <div>
        <Collapse in={deleteOpen}>
          
          <Alert
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={toggleDelete}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          User was successfully <b> deleted </b> - refresh the page.
        </Alert>
        </Collapse>

        <Collapse in={submitOpen}>
          
          <Alert
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={toggleSubmit}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          User was successfully <b> added </b>  - refresh the page.
        </Alert>
        </Collapse>

        <StytchContainer>
      
          <TableHead>
            <TableRow>
              <TableCell> <b>Name </b></TableCell>
              <TableCell><b> Email </b> </TableCell>
              <TableCell> </TableCell>

            </TableRow>
          </TableHead>
          <TableBody>
         {            usersState.map(user => ( <TableRow key={user.name} id={user.id}>  <TableCell> {user.name} </TableCell> <TableCell> {user.email} </TableCell> <TableCell> 
              <IconButton
           color="secondary"
           onClick={() => deleteUser(user.id)}
         >
           <CloseIcon/>
         </IconButton> </TableCell> </TableRow>))
        }
         
        {/* //  users.map(user => (
        //      <TableRow key={user.name} id={user.id}>  <TableCell> {user.name} </TableCell> <TableCell> {user.email} </TableCell> <TableCell> <IconButton
        //      color="secondary"
        //      onClick={() => deleteUser(user.id)}
        //    >
        //      <CloseIcon/>
        //    </IconButton> </TableCell> </TableRow>
        //   ))}   */}

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

          <button className={styles.primaryButton} onClick={signOut}>
            Sign out
          </button>
          </StytchContainer>

        </div>
      )}
    </>
  );
};



const getServerSidePropsHandler: ServerSideProps = async ({ req}) => {
  var users = await getUsers(req.cookies[process.env.COOKIE_NAME as string])
  // Get the user's session based on the request
  return { props : { 
    token: req.cookies[process.env.COOKIE_NAME as string] || "",
  users: users} };
};


export const getServerSideProps = getServerSidePropsHandler;

export default Profile;

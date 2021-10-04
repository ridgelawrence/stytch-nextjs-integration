import React, { useEffect } from 'react';
import styles from '../styles/Home.module.css';
import StytchContainer from '../components/StytchContainer';
import Notification from '../components/Notification';
import UsersTable from '../components/UsersTable';

// import withSession, { ServerSideProps } from '../lib/withSession';
import { ServerSideProps } from '../lib/StytchSession';
import { getUsers, addUser, deleteUserById } from '../lib/usersUtils';
import { useRouter } from 'next/router';

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

        <Notification open={open} toggle={toggleSubmit} />

        <StytchContainer>
      
         <UsersTable 
         users={usersState} 
         setName={setName}
         setEmail={setEmail}
         deleteUser={deleteUser} 
         toggle={toggleOpen} 
         isOpen={open} 
         submit={submitUser} 
         />


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

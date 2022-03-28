import React, { useEffect } from 'react';
import styles from '../styles/Home.module.css';
import StytchContainer from '../components/StytchContainer';
import withSession, { ServerSideProps } from '../lib/withSession';
import { useRouter } from 'next/router';
import { useStytchUser, useStytchSession, useStytchLazy } from '@stytch/stytch-react';

type Props = {
  user?: {
    user_id: string;
  };
};

const Profile = (props: Props) => {
  const user = useStytchUser();
  const session = useStytchSession();
  const stytch = useStytchLazy();
  console.log('GET SYNC', stytch?.user.getSync());

  if (process.browser) {
    console.log('FRONTEND USER:', user);
  } else {
    console.log('BACKEND USER:', user);
  }

  if (process.browser) {
    console.log('FRONTEND SESSION:', session);
  } else {
    console.log('BACKEND SESSION:', session);
  }

  const router = useRouter();

  // Commented out because this breaks :(
  // useEffect(() => {
  //   if (process.browser && !user) {
  //     router.replace('/');
  //   }
  // });

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
          <h2>{'Welcome!'}</h2>
          <p className={styles.profileSubHeader}>Thank you for using Stytch! Here’s your user info.</p>
          <pre className={styles.code}>{JSON.stringify(user, null, 2).replace(' ', '')}</pre>
          <button className={styles.primaryButton} onClick={signOut}>
            Sign out
          </button>
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

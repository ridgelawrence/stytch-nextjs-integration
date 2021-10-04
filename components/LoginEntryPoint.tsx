import React from 'react';
import styles from '../styles/Home.module.css';
import { LoginMethod } from '../lib/types';
import StytchContainer from './StytchContainer';

type Props = {
  setLoginMethod: (loginMethod: LoginMethod) => void;
};

const LoginEntryPoint = (props: Props) => {
  const { setLoginMethod } = props;
  console.log(process.env.STYTCH_PUBLIC_TOKEN);

  return (
    <StytchContainer>
      <h2>Login or Signup</h2>
      <button className={styles.entryButton} onClick={() => setLoginMethod(LoginMethod.SDK)}>
        Continue with email
      </button>
    </StytchContainer>
  );
};

export default LoginEntryPoint;

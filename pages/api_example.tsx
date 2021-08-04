import styles from "../styles/Home.module.css";
import LoginWithSMS from "../components/loginWithSMS";
import withSession, { ServerSideProps } from "../lib/withSession";
import { AppProps } from ".";
import Profile from "../components/profile";

const getServerSidePropsHandler: ServerSideProps = async ({ req }) => {
  // Get the user's session based on the request
  const user = req.session.get("user");
  const props: AppProps = {};
  if (user) {
    props.user = user;
  }
  return {
    props,
  };
};

export const getServerSideProps = withSession(getServerSidePropsHandler);

const APIExample = ({ user }: AppProps) => {
  return (
    <div>
      <div className={styles.header}>{"Stytch.js + Next.js"}</div>
      <div className={styles.container}>
        <main className={styles.main}>
          {!user ? <LoginWithSMS /> : Profile(user)}
        </main>
      </div>
    </div>
  );
};

export default APIExample;

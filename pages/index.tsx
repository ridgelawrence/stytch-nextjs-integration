import withSession, { ServerSideProps } from "../lib/withSession";
import Profile from "../components/profile";
import Link from "next/link";
import styles from "../styles/Home.module.css";

export type AppProps = { user?: object };

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

const App = ({ user }: any) => {
  return (
    <div>
      <div className={styles.container}>
        <main className={styles.main}>
          <div className={styles.header}>{"Stytch.js + Next.js Examples"}</div>
          {!user ? (
            <div>
              <div className={styles.title}>
                <Link href="/sdk_example">
                  <a>{"Stytch SDK + next-js magic links example"}</a>
                </Link>
              </div>
              <div className={styles.title}>
                <Link href="/api_example">
                  <a>{"Stytch API + next-js OTP example"}</a>
                </Link>
              </div>
            </div>
          ) : (
            Profile(user)
          )}
        </main>
      </div>
    </div>
  );
};

export default App;

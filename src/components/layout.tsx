import { FunctionComponent, ReactNode } from "react";
import Link from "next/link";
import { auth, firestore, googleAuthProvider } from '../../src/auth/initFirebase';
import { useAuth } from "src/auth/useAuth";
import { signInWithPopup, signInAnonymously, signOut } from '@firebase/auth';
interface IProps {
  main: ReactNode;
}

const Layout: FunctionComponent<IProps> = ({ main }) => {
  const { logout, authenticated } = useAuth();

  const signInWithGoogle = async () => {
    await signInWithPopup(auth, googleAuthProvider)
  };

  return (
    <div className="bg-gray-900 max-w-screen-2xl mx-auto text-white">
      <nav className="bg-gray-800" style={{ height: "64px" }}>
        <div className="px-6 flex items-center justify-between h-16">
          <Link href="/">
              <img
                src="/home-color.svg"
                alt="home house"
                className="inline w-6"
              />
          </Link>
          {authenticated ? (
            <>
              <Link href="/houses/add">
                Add House
              </Link>
              <button onClick={() => signOut(auth)}>Logout</button>
            </>
          ) : (
            <button onClick={signInWithGoogle}>
              Login / Signup
            </button>
          )}
        </div>
      </nav>
      <main style={{ minHeight: "calc(100vh - 64px)" }}>{main}</main>
    </div>
  );
};

export default Layout;

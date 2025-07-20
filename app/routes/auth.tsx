import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { usePuterStore } from "~/lib/puter"

export const meta = () => ([
  { title: "Resuming | Auth" },
  { name: "description", content: "Log into your account" },
]);

const Auth = () => {
  const { isLoading, auth } = usePuterStore();
const loacation = useLocation();

const next = loacation.search.split("next=")[1];
const validNext = next?.startsWith("/") ? next : "/";

const navigate = useNavigate();


  useEffect(()=>{
    if(auth.isAuthenticated) navigate(validNext)
  },[auth.isAuthenticated, validNext])
  return (
    <main className="bg-[url('/images/bg-main.svg')] bg-cover min-h-screen flex items-center justify-center">
      <div className="gradient-border shadow-lg">
        <section className="flex flex-col gap-8 bg-white rounded-2xl p-10">
          <div className="flex flex-col items-center gap-2 text-center">
            <h1>Welcome</h1>
            <h2>Log In to Continue Your Job Journey</h2>
          </div>

          {isLoading ? (
            <button className="auth-button animate-pulse">
                <p>Signing you in...</p>
            </button>
          ) : (
            <>
              {auth.isAuthenticated ? (
                <button className="auth-button" onClick={auth.signOut}>
                  Log Out
                </button>
              ) : (
                <button className="auth-button" onClick={auth.signIn}>
                  Log In
                </button>
              )}
            </>
          )}
        </section>
      </div>
    </main>
  );
};

export default Auth;

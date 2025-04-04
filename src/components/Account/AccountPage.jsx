import { UserContext } from "../../context/User";
import { useContext } from "react";
import { PostedArticles } from "./PostedArticles";
import { PostedComments } from "./PostedComments";

export function AccountPage({ setIsLoggedIn, setUser }) {
  const { user } = useContext(UserContext);

  function handleLogOut(event) {
    event.preventDefault;
    sessionStorage.removeItem("user");
    setIsLoggedIn(false);
    setUser({});
  }

  return (
    <section className="AccountPage">
      <h2>Account</h2>
      <section className="Stats">
        <h3>Account Details:</h3>
        <p>Username: {user.username}</p>
        <p>Name: {user.name}</p>
        <button className="LogoutButton" onClick={handleLogOut}>
          Log Out
        </button>
      </section>
      <PostedArticles />
      <PostedComments />
    </section>
  );
}

import { UserContext } from "../../context/User";
import { useContext } from "react";
import { PostedArticles } from "./PostedArticles";
import { PostedComments } from "./PostedComments";

export function AccountPage() {
  const { user } = useContext(UserContext);

  return (
    <section className="AccountPage">
      <h2>Account</h2>
      <section className="Stats">
        <h3>Account Details:</h3>
        <p>Username: {user.username}</p>
        <p>Name: {user.name}</p>
      </section>
      <PostedArticles />
      <PostedComments />
    </section>
  );
}

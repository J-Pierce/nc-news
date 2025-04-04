import { UserContext } from "../../context/User";
import { useContext } from "react";
import Loading from "../Loading";
import { useEffect, useState } from "react";
import { getUsers, getUserByUsername } from "../../endpoints";
import { LoginError } from "./LoginError";
import { AccountPage } from "./AccountPage";

export function Account() {
  const [users, setUsers] = useState([]);
  const { setUser } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(null);

  let booleanLogin;
  if (sessionStorage.getItem("user")) {
    booleanLogin = true;
  } else {
    booleanLogin = false;
  }
  const [isLoggedIn, setIsLoggedIn] = useState(booleanLogin);

  useEffect(() => {
    getUsers()
      .then((users) => {
        setUsers(users);
      })
      .catch((error) => {
        setError(error);
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  function handleLogin(event) {
    event.preventDefault();
    getUserByUsername(event.target[0].value)
      .then((user) => {
        setUser(user);
        setIsLoggedIn(true);
        sessionStorage.setItem("user", JSON.stringify(user));
      })
      .catch((error) => {
        console.log(error);
        if (error.message.includes("404")) {
          setIsError(true);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  if (isLoading) {
    return (
      <section>
        <Loading />
      </section>
    );
  }
  if (isError) {
    return (
      <section>
        <p>
          Whoops, something went wrong! <br />
          Code: {error.code},<br /> Message: {error.message}
        </p>
      </section>
    );
  }

  if (isLoggedIn) {
    return <AccountPage setIsLoggedIn={setIsLoggedIn} setUser={setUser} />;
  } else {
    return (
      <section className="Login">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div>
            <label htmlFor="username">Username</label>
            <select type="text" id="username" required>
              {users.map((user) => {
                return (
                  <option key={user.username} value={user.username}>
                    {user.username}
                  </option>
                );
              })}
            </select>
          </div>
          <div>
            <button type="submit">Login</button>
          </div>
        </form>
        <LoginError isError={isError} />
      </section>
    );
  }
}

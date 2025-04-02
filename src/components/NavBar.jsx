import { Link } from "react-router-dom";
import { UserContext } from "../context/User";
import { useContext } from "react";

export function NavBar() {
  const { user } = useContext(UserContext);
  let img_url;

  if (user.avatar_url) {
    img_url = user.avatar_url;
  } else {
    img_url =
      "https://cdn.pixabay.com/photo/2018/11/13/21/43/avatar-3814049_1280.png";
  }
  return (
    <nav className="NavBar">
      <Link to="/" className="Logo">
        <h1>NC-News</h1>
      </Link>
      <Link to="/topics" className="NavItem">
        <p>Topics</p>
      </Link>
      <Link to="/account" className="NavItem" id="Account">
        <p>Account</p>
        <img src={img_url} alt="Avatar" />
      </Link>
    </nav>
  );
}

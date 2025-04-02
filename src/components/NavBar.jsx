import { Link } from "react-router-dom";

export function NavBar() {
  return (
    <nav className="NavBar">
      <Link to="/" className="Logo">
        <h1>NC-News</h1>
      </Link>
      <Link to="/topics" className="NavItem">
        Topics
      </Link>
      <Link to="/account" className="NavItem">
        Account
      </Link>
    </nav>
  );
}

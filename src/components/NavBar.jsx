import { Link } from "react-router-dom";

export function NavBar() {
  return (
    <nav className="NavBar">
      <div>
        <Link to="/" className="Logo">
          <h1>NC-News</h1>
        </Link>
      </div>
      <div>
        <Link to="/articles" className="NavItem">
          Articles
        </Link>
      </div>
      <div>
        <Link to="/topics" className="NavItem">
          Topics
        </Link>
      </div>
      <div>
        <Link to="/account" className="NavItem">
          Account
        </Link>
      </div>
    </nav>
  );
}

import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";

export function NavBar() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (width >= 600) {
    return (
      <nav className="NavBarLong">
        <div>
          <Link to="/" className="Logo" id="active">
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
  } else {
    return (
      <nav className="NavBarVertical" id="myNavBar">
        <div>
          <Link to="/" className="Logo" id="active">
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
}
// onClick={myFunction}

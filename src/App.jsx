import "./css/App.css";
import { Routes, Route } from "react-router-dom";

import { NavBar } from "./components/NavBar";
import { Footer } from "./components/Footer";
import { Home } from "./components/Home";
import { Articles } from "./components/Articles/Articles";
import { ArticlePage } from "./components/Articles/ArticlePage";
import { Topics } from "./components/Topics/Topics";
import { Account } from "./components/Account/Account";
import { NoResult } from "./components/NoResult";

function App() {
  return (
    <>
      <header>
        <NavBar />
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/articles/:article_id" element={<ArticlePage />} />;
          <Route path="/topics" element={<Topics />} />
          <Route path="/account" element={<Account />} />
          <Route path="/*" element={<NoResult />} />
        </Routes>
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}

export default App;

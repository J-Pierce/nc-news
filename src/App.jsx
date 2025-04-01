import "./css/App.css";
import { Routes, Route } from "react-router-dom";
import { UserProvider } from "./context/User";

import { NavBar } from "./components/NavBar";
import { Footer } from "./components/Footer";
import { ArticlesPage } from "./components/Articles/ArticlesPage";
import { ArticlePage } from "./components/Articles/ArticlePage";
import { Topics } from "./components/Topics/Topics";
import { Account } from "./components/Account/Account";
import { NoResult } from "./components/NoResult";

function App() {
  return (
    <>
      <UserProvider>
        <header>
          <NavBar />
        </header>
        <main>
          <Routes>
            <Route path="/" element={<ArticlesPage />} />
            <Route path="/:article_id" element={<ArticlePage />} />;
            <Route path="/topics" element={<Topics />} />
            <Route path="/account" element={<Account />} />
            <Route path="/*" element={<NoResult />} />
          </Routes>
        </main>
        <footer>
          <Footer />
        </footer>
      </UserProvider>
    </>
  );
}

export default App;

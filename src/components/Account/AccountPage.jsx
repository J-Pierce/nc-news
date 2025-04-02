import { UserContext } from "../../context/User";
import { useContext } from "react";
import Loading from "../Loading";
import { useState, useEffect } from "react";
import { getArticles, getComments } from "../../endpoints";
import { Link } from "react-router-dom";

export function AccountPage() {
  const { user } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);
  const [articles, setArticles] = useState([]);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const limit = 1000;
    getArticles({ limit }).then((articles) => {
      const UserArticles = articles.filter((article) => {
        return article.author === user.username;
      });
      setArticles(UserArticles);
    });

    getComments()
      .then((comments) => {
        setComments(comments);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <section>
        <Loading />
      </section>
    );
  }

  console.log(articles);

  return (
    <section className="AccountPage">
      <h2>Account</h2>
      <section className="Stats">
        <h3>Account Details:</h3>
        <p>Username: {user.username}</p>
        <p>Name: {user.name}</p>
      </section>
      <h3>Articles Posted: </h3>
      <section className="ArticlesPosted">
        {articles.map((article) => {
          const date = String(new Date(article.created_at));
          const formattedDate = date.split("GMT")[0];
          return (
            <section key={article.article_id} className="ArticleList">
              <Link to={`/${article.article_id}`}>
                <h3>{article.title}</h3>
              </Link>

              <img src={article.article_img_url} alt={article.title} />
              <section className="ArticleInfo">
                <p>Posted: {formattedDate}</p>
                <p>Author: {article.author} </p>
              </section>
              <section className="ArticleStats">
                <p>{article.votes} Votes</p>
                <p>{article.comment_count} Comments</p>
              </section>
            </section>
          );
        })}
      </section>
      <section className="CommentsPosted"></section>
    </section>
  );
}

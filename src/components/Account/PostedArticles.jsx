import { UserContext } from "../../context/User";
import { useContext } from "react";
import Loading from "../Loading";
import { useState, useEffect } from "react";
import { getArticles, deleteArticleById } from "../../endpoints";
import { Link } from "react-router-dom";

export function PostedArticles() {
  const { user } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(null);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const limit = 1000;
    getArticles({ limit })
      .then((articles) => {
        const UserArticles = articles.filter((article) => {
          return article.author === user.username;
        });
        setArticles(UserArticles);
      })
      .catch((error) => {
        setError(error);
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  function handleDeleteButton(event) {
    event.preventDefault();
    const deleteConfirmed = confirm(
      "Deleting an aticle is irreversible! \n\nAre you sure you want to do this?"
    );
    if (deleteConfirmed) {
      const id = event.target.value;
      let removedArticle;
      setArticles(
        articles.filter((article) => {
          if (article.article_id === Number(id)) {
            removedArticle = article;
          }
          return article.article_id !== Number(id);
        })
      );
      console.log(removedArticle);
      deleteArticleById(id).catch(() => {
        setArticles((previousState) => {
          return {
            ...previousState,
            removedArticle,
          };
        });
      });
    } else {
      null;
    }
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

  return (
    <section className="ArticlesPosted">
      <h3 id="title">Articles Posted: </h3>
      <section className="List">
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
              <button onClick={handleDeleteButton} value={article.article_id}>
                Delete Article
              </button>
            </section>
          );
        })}
      </section>
    </section>
  );
}

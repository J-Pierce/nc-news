import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getArticles } from "../../endpoints";
import Loading from "../Loading";

export function ArticlesDisplay() {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    getArticles()
      .then((articles) => {
        setArticles(articles);
      })
      .catch((error) => {
        setError(error);
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  if (isError) {
    return (
      <div>
        <p>
          Whoops, something went wrong! <br />
          Code: {error.code},<br /> Message: {error.message}
        </p>
      </div>
    );
  }

  return (
    <div className="ArticleFilter">
      {articles.length === 0 ? (
        <p>No Results</p>
      ) : (
        articles.map((article) => {
          return (
            <section key={article.article_id} className="ArticleList">
              <h3>
                <Link to={`/${article.article_id}`}>{article.title}</Link>
              </h3>
              <img src={article.article_img_url} alt={article.title} />
              <p>{article.votes} Votes</p>
            </section>
          );
        })
      )}
    </div>
  );
}

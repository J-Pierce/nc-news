import { useEffect, useState } from "react";
import { getArticles } from "../endpoints";
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

  function articleCard(article) {
    return (
      <section key={article.article_id} className="ArticleList">
        <h3>{article.title}</h3>
        <img src={article.article_img_url} alt={article.title} />
        <p>{article.votes} Votes</p>
      </section>
    );
  }

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
          return articleCard(article);
        })
      )}
    </div>
  );
}

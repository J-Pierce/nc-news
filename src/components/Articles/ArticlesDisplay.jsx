import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getArticles } from "../../endpoints";
import Loading from "../Loading";
import { useSearchParams } from "react-router-dom";

export function ArticlesDisplay() {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [searchParams] = useSearchParams();

  const sort_by = searchParams.get("sort_by");
  const order = searchParams.get("order");
  const topic = searchParams.get("topic");
  const limit = searchParams.get("limit");
  const p = searchParams.get("p");

  useEffect(() => {
    getArticles(sort_by, order, topic, limit, p)
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
  }, [sort_by, order, topic, limit, p]);

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
        })
      )}
    </div>
  );
}

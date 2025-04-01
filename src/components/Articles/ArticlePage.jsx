import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getArticleById } from "../endpoints";
import Loading from "../Loading";
import { ArticleComments } from "./ArticleComments";

export function ArticlePage() {
  const { article_id } = useParams();
  const [article, setArticle] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    getArticleById(article_id)
      .then((articles) => {
        setArticle(articles);
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
    <section className="ArticlePage">
      <h3>{article.title}</h3>
      <ul className="DataList">
        <li>
          <p>Author: {article.author}</p>
        </li>
        <li>
          <p>topic: {article.topic}</p>
        </li>
        <li>
          <p>created_at: {article.created_at}</p>
        </li>
        <li className="votes">
          <p>votes : {article.votes}</p>
        </li>
      </ul>

      <section className="content">
        <img src={article.article_img_url} />
        <p>{article.body}</p>
      </section>
      <section className="comments">
        <h4>Comments</h4>
        <p className="CommentCount">{article.comment_count} Comments:</p>
        <ArticleComments />
      </section>
    </section>
  );
}

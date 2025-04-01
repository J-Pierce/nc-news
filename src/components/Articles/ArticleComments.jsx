import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCommentsByArticleId } from "../../endpoints";
import Loading from "../Loading";

import { ArticleAddComment } from "./ArticleAddComment";

export function ArticleComments() {
  const { article_id } = useParams();
  const [comments, setComments] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    getCommentsByArticleId(article_id)
      .then((comments) => {
        setComments(comments);
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
    <section className="comments">
      <h4>Comments</h4>
      <ArticleAddComment commentCount={comments.length} />
      {comments.map((comment) => {
        const date = String(new Date(comment.created_at));
        const formattedDate = date.split("GMT")[0];
        return (
          <section className="comment">
            <p id="body">{comment.body}</p>
            <section className="stats">
              <p>Author: {comment.author}</p>

              <p>Posted: {formattedDate}</p>

              <p>{comment.votes} votes</p>
            </section>
          </section>
        );
      })}
    </section>
  );
}

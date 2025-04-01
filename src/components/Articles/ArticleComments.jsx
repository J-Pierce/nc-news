import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCommentsByArticleId } from "../endpoints";
import Loading from "../Loading";

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

  console.log(comments);

  return (
    <>
      {comments.map((comment) => {
        return (
          <section className="comment">
            <ul>
              <li>{comment.body}</li>
              <li>
                <p>Author: {comment.author}</p>
              </li>
              <li>
                <p>created at: {comment.created_at}</p>
              </li>
              <li>
                <p>{comment.votes} votes</p>
              </li>
            </ul>
          </section>
        );
      })}
    </>
  );
}

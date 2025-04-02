import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { deleteCommentById, getCommentsByArticleId } from "../../endpoints";
import Loading from "../Loading";
import { UserContext } from "../../context/User";
import { useContext } from "react";

import { ArticleAddComment } from "./ArticleAddComment";

export function ArticleComments() {
  const { article_id } = useParams();
  const [comments, setComments] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const { user } = useContext(UserContext);

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

  function handleDeleteButton(event) {
    event.preventDefault();
    const id = event.target.value;
    let removedComment;
    setComments(
      comments.filter((comment) => {
        if (comment.comment_id === Number(id)) {
          removedComment = comment;
        }
        return comment.comment_id !== Number(id);
      })
    );
    deleteCommentById(id).catch(() => {
      setComments((previousState) => {
        return {
          ...previousState,
          removedComment,
        };
      });
    });
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
    <section className="comments">
      <h3>Comments</h3>
      <ArticleAddComment commentCount={comments.length} />
      {comments.map((comment) => {
        const date = String(new Date(comment.created_at));
        const formattedDate = date.split("GMT")[0];
        if (comment.author === user.username) {
          return (
            <section className="comment">
              <p id="body">{comment.body}</p>
              <section className="stats">
                <p>Author: {comment.author}</p>

                <p>Posted: {formattedDate}</p>

                <p>{comment.votes} votes</p>
              </section>
              <button onClick={handleDeleteButton} value={comment.comment_id}>
                Delete Comment
              </button>
            </section>
          );
        } else {
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
        }
      })}
    </section>
  );
}

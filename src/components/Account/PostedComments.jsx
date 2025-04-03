import { UserContext } from "../../context/User";
import { useContext } from "react";
import Loading from "../Loading";
import { useState, useEffect } from "react";
import { getComments, deleteCommentById } from "../../endpoints";
import { Link } from "react-router-dom";

export function PostedComments() {
  const { user } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [error, setError] = useState(null);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    getComments()
      .then((comments) => {
        const UserComments = comments
          .filter((comment) => {
            return comment.author === user.username;
          })
          .sort((a, b) => {
            return new Date(b.created_at) - new Date(a.created_at);
          });
        setComments(UserComments);
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
    <section className="CommentsPosted">
      <h3 id="title">Comments Posted: </h3>
      <section className="List">
        {comments.map((comment) => {
          const date = String(new Date(comment.created_at));
          const formattedDate = date.split("GMT")[0];
          return (
            <section key={comment.comment_id} className="Comment">
              <section className="CommentInfo">
                <p>{comment.body}</p>
              </section>
              <section className="CommentStats">
                <p>Posted: {formattedDate}</p>
                <p>Author: {comment.author} </p>
                <p>{comment.votes} Votes</p>
              </section>
              <section className="buttons">
                <button>
                  <Link to={`/${comment.article_id}`}>
                    <h3>Go To Article</h3>
                  </Link>
                </button>
                <button onClick={handleDeleteButton} value={comment.comment_id}>
                  Delete Comment
                </button>
              </section>
            </section>
          );
        })}
      </section>
    </section>
  );
}

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { deleteCommentById, getCommentsByArticleId } from "../../endpoints";
import Loading from "../Loading";
import { UserContext } from "../../context/User";
import { useContext } from "react";

import { ArticleAddComment } from "./ArticleAddComment";
import { CommentVotes } from "./CommentVotes";

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
        const sortedComments = comments.sort((a, b) => {
          return b.votes - a.votes;
        });
        setComments(sortedComments);
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

  function CommentDisplay() {
    return comments.map((comment) => {
      const date = String(new Date(comment.created_at));
      const formattedDate = date.split("GMT")[0];
      if (comment.author === user.username) {
        return (
          <section className="comment" key={comment.comment_id}>
            <p id="body">{comment.body}</p>
            <section className="stats">
              <p className="P">Author: {comment.author}</p>

              <p className="P">Posted: {formattedDate}</p>

              <CommentVotes id={comment.comment_id} votes={comment.votes} />
            </section>
            <button onClick={handleDeleteButton} value={comment.comment_id}>
              Delete Comment
            </button>
          </section>
        );
      } else {
        return (
          <section className="comment" key={comment.comment_id}>
            <p id="body">{comment.body}</p>
            <section className="stats">
              <p className="P">Author: {comment.author}</p>

              <p className="P">Posted: {formattedDate}</p>

              <CommentVotes id={comment.comment_id} votes={comment.votes} />
            </section>
          </section>
        );
      }
    });
  }

  if (user.username) {
    return (
      <section className="comments">
        <h3>Comments</h3>
        <section>
          <p className="CommentCount">{comments.length} Comments:</p>
          <ArticleAddComment
            article_id={article_id}
            setComments={setComments}
            username={user.username}
          />
        </section>
        <CommentDisplay />
      </section>
    );
  } else {
    return (
      <section className="comments">
        <h3>Comments</h3>
        <section className="commentsBar">
          <p className="CommentCount">{comments.length} Comments:</p>
        </section>
        <CommentDisplay />
      </section>
    );
  }
}

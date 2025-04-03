import { useState } from "react";
import { postCommentByArticleId } from "../../endpoints";
import { PostCommentError } from "./PostCommentError";

export function ArticleAddComment({ article_id, setComments, username }) {
  const [isAddComment, setIsAddComment] = useState(false);
  const [error, setError] = useState(null);
  const [isError, setIsError] = useState(false);

  function handleAddCommentButton(event) {
    event.preventDefault();
    setIsAddComment(true);
    setIsError(false);
  }

  function handleAddComment(event) {
    event.preventDefault();
    const body = event.target[0].value;
    const Comment = {
      author: username,
      body: body,
      votes: 0,
      created_at: new Date(),
    };
    setComments((previousState) => {
      return [Comment, ...previousState];
    });
    postCommentByArticleId(article_id, username, body)
      .then(() => {
        setIsAddComment(false);
      })
      .catch((error) => {
        setIsError(true);
        setError(error);
      });
  }
  console.l;

  if (isAddComment) {
    return (
      <section className="AddComment">
        <form onSubmit={handleAddComment}>
          <label htmlFor="body">Comment: </label>
          <input id="body" type="text" />
          <input type="submit" id="button" />
        </form>
        <PostCommentError error={error} isError={isError} />
      </section>
    );
  } else {
    return (
      <button className="addCommentButton" onClick={handleAddCommentButton}>
        Add Comment
      </button>
    );
  }
}

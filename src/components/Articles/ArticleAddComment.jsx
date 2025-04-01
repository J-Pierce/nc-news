import { useState } from "react";
import { postCommentByArticleId } from "../../endpoints";
import { UserContext } from "../../context/User";
import { useContext } from "react";
import { useParams } from "react-router-dom";

export function ArticleAddComment({ commentCount }) {
  const [isClicked, setIsClicked] = useState(false);
  const [isPosted, setIsPosted] = useState(false);
  const { user } = useContext(UserContext);
  const { article_id } = useParams();
  const [postComment, setPostComment] = useState({
    comment_id: 0,
    article_id: article_id,
    body: "",
    votes: 0,
    author: user.username,
    created_at: "",
  });

  function handleAddComment(event) {
    event.preventDefault();
    setIsClicked(true);
  }

  function handlePostButton(event) {
    event.preventDefault();
    setIsPosted(true);
    setPostComment((previousState) => {
      return {
        ...previousState,
        body: event.target[0].value,
        created_at: Date.now(),
      };
    });
    postCommentByArticleId(
      article_id,
      user.username,
      event.target[0].value
    ).catch((error) => {
      console.log(error);
    });
  }

  if (isPosted) {
    const date = String(new Date(postComment.created_at));
    const formattedDate = date.split("GMT")[0];
    return (
      <>
        <section className="commentsBar">
          <p className="CommentCount">{commentCount + 1} Comments:</p>
        </section>
        <section className="comment">
          <p id="body">{postComment.body}</p>
          <section className="stats">
            <p>Author: {postComment.author}</p>
            <p>Posted: {formattedDate}</p>
            <p>{postComment.votes} votes</p>
          </section>
        </section>
      </>
    );
  } else if (isClicked) {
    return (
      <>
        <section className="commentsBar">
          <p className="CommentCount">{commentCount} Comments:</p>
        </section>
        <form onSubmit={handlePostButton} className="AddComment">
          <label htmlFor="body">Comment: </label>
          <input type="text" id="body" required />
          <button type="submit">Post Comment</button>
        </form>
      </>
    );
  } else {
    return (
      <section className="commentsBar">
        <p className="CommentCount">{commentCount} Comments:</p>
        <button onClick={handleAddComment}>Add Comment</button>
      </section>
    );
  }
}

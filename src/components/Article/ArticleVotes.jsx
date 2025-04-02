import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-regular-svg-icons";
import { faThumbsDown } from "@fortawesome/free-regular-svg-icons";
import { useState } from "react";
import { patchVotesByArticleId } from "../../endpoints";

export function ArticleVotes({ id, votes }) {
  const [vote, setVote] = useState(votes);
  const [hasUpVoted, setHasUpVoted] = useState(false);
  const [hasDownVoted, setHasDownVoted] = useState(false);

  function upClicked(event) {
    event.preventDefault();
    if (hasDownVoted) {
      null;
    } else {
      if (hasUpVoted) {
        event.target.style.color = "#000000";
        setHasUpVoted(false);
        setVote((vote) => {
          return vote - 1;
        });
        patchVotesByArticleId(id, -1).catch(() => {
          setVote((vote) => {
            return vote + 1;
          });
        });
      } else {
        event.target.style.color = "#ff0000";
        setHasUpVoted(true);
        setVote((vote) => {
          return vote + 1;
        });
        patchVotesByArticleId(id, 1).catch(() => {
          setVote((vote) => {
            return vote - 1;
          });
        });
      }
    }
  }

  function downClicked(event) {
    event.preventDefault();
    if (hasUpVoted) {
      null;
    } else {
      if (hasDownVoted) {
        event.target.style.color = "#000000";
        setHasDownVoted(false);
        setVote((vote) => {
          return vote + 1;
        });
        patchVotesByArticleId(id, 1).catch(() => {
          setVote((vote) => {
            return vote - 1;
          });
        });
      } else {
        event.target.style.color = "#ff0000";
        setHasDownVoted(true);
        setVote((vote) => {
          return vote - 1;
        });
        patchVotesByArticleId(id, -1).catch(() => {
          setVote((vote) => {
            return vote + 1;
          });
        });
      }
    }
  }

  return (
    <section className="Votes">
      <p>Votes: </p>
      <button onClick={upClicked} value="1" >
        <FontAwesomeIcon
          className="UpVote"
          icon={faThumbsUp}
          size="lg"
          style={{ color: "#000000" }}
          aria-hidden="false"
          role="upvote"
          alt="upvote button"
        />
      </button>
      <p>{vote}</p>
      <button onClick={downClicked} value="-1" >
        <FontAwesomeIcon
          icon={faThumbsDown}
          size="lg"
          style={{ color: "#000000" }}
          aria-hidden="false"
          role="downvote"
          alt="downvote button"
        />
      </button>
    </section>
  );
}

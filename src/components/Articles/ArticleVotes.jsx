import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-regular-svg-icons";
import { faThumbsDown } from "@fortawesome/free-regular-svg-icons";
import { useState } from "react";
import { patchVotesByArticleId } from "../endpoints";

export function ArticleVotes({ id, votes }) {
  const [vote, setVote] = useState(votes);
  const [hasUpVoted, setHasUpVoted] = useState(false);
  const [hasDownVoted, setHasDownVoted] = useState(false);

  function upClicked(event) {
    console.log(hasUpVoted);
    if (("Up: ", hasUpVoted)) {
      setHasUpVoted(false);
      event.target.style.color = "#000000";
      setVote((vote) => {
        return vote - 1;
      });
      patchVotesByArticleId(id, -1).catch(() => {
        setVote((vote) => {
          return vote + 1;
        });
      });
    } else {
      setHasUpVoted(true);

      event.target.style.color = "#ff0000";
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

  function downClicked(event) {
    console.log("Down: ", hasDownVoted);
    if (hasDownVoted) {
      setHasDownVoted(false);
      event.target.style.color = "#000000";
      setVote((vote) => {
        return vote + 1;
      });
      patchVotesByArticleId(id, 1).catch(() => {
        setVote((vote) => {
          return vote - 1;
        });
      });
    } else {
      setHasDownVoted(true);
      event.target.style.color = "#ff0000";
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

  return (
    <section className="Votes">
      <p>Votes: </p>
      <button onClick={upClicked}>
        <FontAwesomeIcon
          className="UpVote"
          icon={faThumbsUp}
          size="lg"
          style={{ color: "#000000" }}
        />
      </button>
      <p>{vote}</p>
      <button onClick={downClicked}>
        <FontAwesomeIcon
          icon={faThumbsDown}
          size="lg"
          style={{ color: "#000000" }}
        />
      </button>
    </section>
  );
}

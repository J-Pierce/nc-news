import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-regular-svg-icons";
import { faThumbsDown } from "@fortawesome/free-regular-svg-icons";
import { useState } from "react";
import { patchVotesByArticleId } from "../endpoints";

export function ArticleVotes({ id, votes }) {
  const [vote, setVote] = useState(votes);

  function upClicked() {
    setVote((vote) => {
      return vote + 1;
    });
    patchVotesByArticleId(id, 1).catch(() => {
      setVote((vote) => {
        return vote - 1;
      });
    });
  }

  function downClicked() {
    setVote((vote) => {
      return vote - 1;
    });
    patchVotesByArticleId(id, -1).catch(() => {
      setVote((vote) => {
        return vote + 1;
      });
    });
  }

  return (
    <section className="Votes">
      <p>Votes: </p>
      <button onClick={upClicked}>
        <FontAwesomeIcon icon={faThumbsUp} size="lg" />
      </button>
      <p>{vote}</p>
      <button onClick={downClicked}>
        <FontAwesomeIcon icon={faThumbsDown} size="lg" />
      </button>
    </section>
  );
}

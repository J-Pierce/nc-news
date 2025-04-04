import { useState } from "react";
import { patchVotesByCommentId } from "../../endpoints";
import { UserContext } from "../../context/User";
import { useContext } from "react";
import { UpVoteImage, DownVoteImage } from "./VoteStyling";

export function CommentVotes({ id, votes }) {
  const [vote, setVote] = useState(votes);
  const [hasUpVoted, setHasUpVoted] = useState(false);
  const [hasDownVoted, setHasDownVoted] = useState(false);
  const { user } = useContext(UserContext);

  function upClicked(event) {
    event.preventDefault();
    if (hasDownVoted) {
      setHasDownVoted(false);
      setHasUpVoted(true);
      setVote((vote) => {
        return vote + 2;
      });
      patchVotesByCommentId(id, 2).catch(() => {
        setVote((vote) => {
          return vote - 2;
        });
        setHasDownVoted(true);
        setHasUpVoted(false);
      });
    } else {
      if (hasUpVoted) {
        setVote((vote) => {
          return vote - 1;
        });
        setHasUpVoted(false);
        patchVotesByCommentId(id, -1).catch(() => {
          setVote((vote) => {
            return vote + 1;
          });
          setHasUpVoted(true);
        });
      } else {
        setVote((vote) => {
          return vote + 1;
        });
        setHasUpVoted(true);
        patchVotesByCommentId(id, 1).catch(() => {
          setVote((vote) => {
            return vote - 1;
          });
          setHasUpVoted(false);
        });
      }
    }
  }

  function downClicked(event) {
    event.preventDefault();
    if (hasUpVoted) {
      setHasUpVoted(false);
      setHasDownVoted(true);
      setVote((vote) => {
        return vote - 2;
      });
      patchVotesByCommentId(id, -2).catch(() => {
        setVote((vote) => {
          return vote + 2;
        });
        setHasDownVoted(false);
        setHasUpVoted(true);
      });
    } else {
      if (hasDownVoted) {
        setVote((vote) => {
          return vote + 1;
        });
        setHasDownVoted(false);
        patchVotesByCommentId(id, 1).catch(() => {
          setVote((vote) => {
            return vote - 1;
          });
          setHasDownVoted(true);
        });
      } else {
        setVote((vote) => {
          return vote - 1;
        });
        setHasDownVoted(true);
        patchVotesByCommentId(id, -1).catch(() => {
          setVote((vote) => {
            return vote + 1;
          });
          setHasDownVoted(false);
        });
      }
    }
  }
  if (user.username) {
    return (
      <section className="Votes">
        <p>Votes: </p>
        <button onClick={upClicked} value="1">
          <UpVoteImage hasUpVoted={hasUpVoted} />
        </button>
        <p>{vote}</p>
        <button onClick={downClicked} value="-1">
          <DownVoteImage hasDownVoted={hasDownVoted} />
        </button>
      </section>
    );
  } else {
    return <p></p>;
  }
}

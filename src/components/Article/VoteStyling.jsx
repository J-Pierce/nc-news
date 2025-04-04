import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-regular-svg-icons";
import { faThumbsDown } from "@fortawesome/free-regular-svg-icons";

export function UpVoteImage({ hasUpVoted }) {
  if (hasUpVoted) {
    return (
      <section className="UpVote">
        <FontAwesomeIcon
          className="UpVote"
          icon={faThumbsUp}
          size="lg"
          style={{ color: "#ff0000" }}
          aria-hidden="false"
          role="upvote"
          alt="upvote button"
        />
      </section>
    );
  } else {
    return (
      <section className="UpVote">
        <FontAwesomeIcon
          className="UpVote"
          icon={faThumbsUp}
          size="lg"
          style={{ color: "#000000" }}
          aria-hidden="false"
          role="upvote"
          alt="upvote button"
        />
      </section>
    );
  }
}

export function DownVoteImage({ hasDownVoted }) {
  if (hasDownVoted) {
    return (
      <section className="downVote">
        <FontAwesomeIcon
          icon={faThumbsDown}
          size="lg"
          style={{ color: "#0000ff" }}
          aria-hidden="false"
          role="downvote"
          alt="downvote button"
        />
      </section>
    );
  } else {
    return (
      <section className="downVote">
        <FontAwesomeIcon
          icon={faThumbsDown}
          size="lg"
          style={{ color: "#000000" }}
          aria-hidden="false"
          role="downvote"
          alt="downvote button"
        />
      </section>
    );
  }
}

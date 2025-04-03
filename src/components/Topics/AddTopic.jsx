import { useState } from "react";
import { PostTopicError } from "./PostTopicError";
import { postTopic } from "../../endpoints";

export function AddTopic({ setTopics }) {
  const [isAddTopic, setIsAddTopic] = useState(false);
  const [error, setError] = useState(null);
  const [isError, setIsError] = useState(false);

  function handleAddTopicButton(event) {
    event.preventDefault();
    setIsAddTopic(true);
    setIsError(false);
  }

  function handleAddTopic(event) {
    event.preventDefault();
    const topic = {
      slug: event.target[0].value,
      description: event.target[1].value,
    };
    setTopics((previousState) => {
      return [topic, ...previousState];
    });
    postTopic(topic)
      .then(() => {
        setIsAddTopic(false);
      })
      .catch((error) => {
        setIsError(true);
        setError(error);
      });
  }
  console.l;

  if (isAddTopic) {
    return (
      <section className="addTopics">
        <form onSubmit={handleAddTopic}>
          <div>
            <label htmlFor="slug">Slug: </label>
            <input id="slug" type="text" />
          </div>
          <div>
            <label htmlFor="description">Description: </label>
            <input id="description" type="text" />
          </div>
          <div>
            <input type="submit" id="button" />
          </div>
        </form>
        <PostTopicError error={error} isError={isError} />
      </section>
    );
  } else {
    return (
      <button className="addTopicsButton" onClick={handleAddTopicButton}>
        Add Topic
      </button>
    );
  }
}

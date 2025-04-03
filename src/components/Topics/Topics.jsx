import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getTopics } from "../../endpoints";
import Loading from "../Loading";
import { UserContext } from "../../context/User";
import { useContext } from "react";
import { AddTopic } from "./AddTopic";

export function Topics() {
  const [topics, setTopics] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const { user } = useContext(UserContext);

  useEffect(() => {
    getTopics()
      .then((topics) => {
        setTopics(topics);
      })
      .catch((error) => {
        setError(error);
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

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
  if (user.username) {
    return (
      <section className="Topics">
        <h2>Topics</h2>
        <AddTopic setTopics={setTopics} />
        {console.log(topics)}
        {topics.map((topic) => {
          return (
            <section className="Topic" key={topic.slug}>
              <Link to={`/?topic=${topic.slug}`}>
                <h3>{topic.slug}</h3>
              </Link>
              <p>{topic.description}</p>
            </section>
          );
        })}
      </section>
    );
  } else {
    return (
      <section className="Topics">
        <h2>Topics</h2>
        {topics.map((topic) => {
          return (
            <section className="Topic" key={topic.slug}>
              <Link to={`/?topic=${topic.slug}`}>
                <h3>{topic.slug}</h3>
              </Link>
              <p>{topic.description}</p>
            </section>
          );
        })}
      </section>
    );
  }
}

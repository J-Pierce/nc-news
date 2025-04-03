import { UserContext } from "../../context/User";
import { useContext } from "react";
import { useEffect, useState } from "react";
import { getTopics } from "../../endpoints";
import Loading from "../Loading";
import { postArticle } from "../../endpoints";
import { useNavigate } from "react-router";

export function PostArticle() {
  const { user } = useContext(UserContext);
  const [topics, setTopics] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [postError, setPostError] = useState(null);
  const [isPostError, setIsPostError] = useState(false);

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

  const navigate = useNavigate();
  function handlePostArticle(event) {
    event.preventDefault();
    setIsPostError(false);
    console.log;
    const article = {
      author: user.username,
      title: event.target[0].value,
      body: event.target[1].value,
      topic: event.target[2].value,
      article_img_url: event.target[3].value,
    };

    postArticle(article)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        setIsPostError(true);
        setPostError(error);
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

  if (isPostError) {
    return (
      <section className="PostArticle">
        <form onSubmit={handlePostArticle}>
          <div>
            <label htmlFor="title">Title</label>
            <input id="title" type="text" required />
          </div>
          <div>
            <label htmlFor="body">Body</label>
            <input id="body" type="text" required />
          </div>
          <div>
            <label htmlFor="topic">Topic</label>
            <select id="topic">
              {topics.map((topic) => {
                return (
                  <option key={topic.slug} value={topic.slug}>
                    {topic.slug}
                  </option>
                );
              })}
            </select>
          </div>
          <div>
            <label htmlFor="img_url">Image Url</label>
            <input id="img_url" type="url" />
          </div>
          <div>
            <input type="submit" value="Submit" />
          </div>
        </form>
        <section className="error">
          <p>
            Whoops, something went wrong! <br />
            Code: {postError.code},<br /> Message: {postError.message}
          </p>
        </section>
      </section>
    );
  } else {
    return (
      <section className="PostArticle">
        <form onSubmit={handlePostArticle}>
          <div>
            <label htmlFor="title">Title</label>
            <input id="title" type="text" required />
          </div>
          <div>
            <label htmlFor="body">Body</label>
            <input id="body" type="text" required />
          </div>
          <div>
            <label htmlFor="topic">Topic</label>
            <select id="topic">
              {topics.map((topic) => {
                return (
                  <option key={topic.slug} value={topic.slug}>
                    {topic.slug}
                  </option>
                );
              })}
            </select>
          </div>
          <div>
            <label htmlFor="img_url">Image Url</label>
            <input id="img_url" type="url" />
          </div>
          <div>
            <input type="submit" value="Submit" />
          </div>
        </form>
      </section>
    );
  }
}

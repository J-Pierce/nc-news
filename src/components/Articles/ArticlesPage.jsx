import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ArticlesDisplay } from "./ArticlesDisplay";
import { getTopics } from "../../endpoints";
import { PostArticleButton } from "./PostArticleButton";

export function ArticlesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [topics, setTopics] = useState([]);
  const [limit, setLimit] = useState(10);
  const [p, setP] = useState(0);

  useEffect(() => {
    getTopics().then((topics) => {
      setTopics(topics);
    });
  }, []);

  function handleSort(event) {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("sort_by", event.target.value);
    setSearchParams(newParams);
  }
  function handleOrder(event) {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("order", event.target.value);
    setSearchParams(newParams);
  }
  function handleTopic(event) {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("topic", event.target.value);
    setSearchParams(newParams);
  }
  function handleLimit(event) {
    setLimit(event.target.value);
    const newParams = new URLSearchParams(searchParams);
    newParams.set("limit", event.target.value);
    setSearchParams(newParams);
  }
  function handleP(event) {
    setP(event.target.value);
    const newParams = new URLSearchParams(searchParams);
    newParams.set("p", event.target.value);
    setSearchParams(newParams);
  }

  return (
    <section className="Articles">
      <h2>Current Articles</h2>
      <section className="QueryBar">
        <h3>Filters:</h3>
        <form className="Filters">
          <label htmlFor="sort">Sort:</label>
          <select id="sort" onChange={handleSort}>
            <option value="">No Filter</option>
            <option value="title">Title</option>
            <option value="topic">Topic</option>
            <option value="author">Author</option>
            <option value="created_at">Created At</option>
            <option value="votes">Votes</option>
            <option value="article_img_url">Article Img Url</option>
            <option value="comment_count">Comments</option>
          </select>
          <label htmlFor="order">Order:</label>
          <select id="order" onChange={handleOrder}>
            <option value="">No Filter</option>
            <option value="ASC">ASC</option>
            <option value="DESC">DESC</option>
          </select>
          <label htmlFor="topic">Topic:</label>
          <select id="topic" onChange={handleTopic}>
            <option value="">No Filter</option>
            {topics.map((topic) => {
              return (
                <option key={topic.slug} value={topic.slug}>
                  {topic.slug}
                </option>
              );
            })}
          </select>
        </form>
        <form className="PgNav">
          <label htmlFor="limit">Articles Per Page:</label>
          <input
            id="limit"
            type="number"
            value={limit}
            min="0"
            onChange={handleLimit}
          />
          <label htmlFor="p">Page:</label>
          <input id="p" type="number" value={p} min="0" onChange={handleP} />
        </form>
      </section>
      <PostArticleButton />
      <ArticlesDisplay />
    </section>
  );
}

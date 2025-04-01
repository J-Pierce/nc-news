import { Link } from "react-router-dom";

export function Topics() {
  const topics = [
    {
      slug: "coding",
      description: "Code is love, code is life",
    },
    {
      slug: "football",
      description: "FOOTIE!",
    },
    {
      slug: "cooking",
      description: "Hey good looking, what you got cooking?",
    },
  ];

  return (
    <section className="Topics">
      <h2>Topics</h2>
      {topics.map((topic) => {
        return (
          <section className="Topic">
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

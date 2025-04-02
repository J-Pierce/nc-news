export function LoginError({ isError }) {
  if (isError) {
    return (
      <section className="error">
        <p>No Username Found!</p>
      </section>
    );
  } else {
    return <></>;
  }
}

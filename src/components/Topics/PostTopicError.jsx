export function PostTopicError({ error, isError }) {
  if (isError) {
    return (
      <section>
        <p>
          Whoops, something went wrong! <br />
          Code: {error.code},<br /> Message: {error.message}
        </p>
      </section>
    );
  } else {
    <></>;
  }
}

export function PostCommentError({ error, isError }) {
  if (isError) {
    return (
      <section className="AddCommentError">
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

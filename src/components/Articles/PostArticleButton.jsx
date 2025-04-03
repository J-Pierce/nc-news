import { UserContext } from "../../context/User";
import { useContext } from "react";
import { useNavigate } from "react-router";

export function PostArticleButton() {
  const { user } = useContext(UserContext);

  function handleAddArticle() {
    navigate("/postArticle");
  }

  const navigate = useNavigate();

  if (user.username) {
    return (
      <button onClick={handleAddArticle} className="AddArticle">
        Add Article
      </button>
    );
  } else {
    return <></>;
  }
}

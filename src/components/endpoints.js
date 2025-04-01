import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://nc-news-b93u.onrender.com/api",
});

export function getArticles() {
  return apiClient.get(`/articles`).then(({ data }) => {
    console.log(data);
    return data.articles;
  });
}

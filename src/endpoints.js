import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://nc-news-b93u.onrender.com/api",
});

export function getArticles() {
  return apiClient.get(`/articles`).then(({ data }) => {
    return data.articles;
  });
}
export function getArticleById(id) {
  return apiClient.get(`/articles/${id}`).then(({ data }) => {
    return data.article;
  });
}
export function getCommentsByArticleId(id) {
  return apiClient
    .get(`/articles/${id}/comments?limit=100`)
    .then(({ data }) => {
      return data.comments;
    });
}
export function patchVotesByArticleId(id, inc_votes) {
  return apiClient.patch(`/articles/${id}`, { inc_votes }).then(({ data }) => {
    return data.comments;
  });
}
export function postCommentByArticleId(id, username, body) {
  return apiClient
    .post(`/articles/${id}/comments`, { username, body })
    .then(({ data }) => {
      return data.comments;
    });
}

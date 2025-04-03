import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://nc-news-b93u.onrender.com/api",
});

export function getArticles({ sort_by, order, topic, limit, p }) {
  sort_by === "" ? (sort_by = null) : sort_by;
  order === "" ? (order = null) : order;
  topic === "" ? (topic = null) : topic;
  return apiClient
    .get(`/articles`, {
      params: { sort_by, order, topic, limit, p },
    })
    .then(({ data }) => {
      return data.articles;
    });
}
export function getArticleById(id) {
  return apiClient.get(`/articles/${id}`).then(({ data }) => {
    return data.article;
  });
}
export function postArticle({ author, title, body, topic, article_img_url }) {
  return apiClient.post(`/articles`, {
    author,
    title,
    body,
    topic,
    article_img_url,
  });
}
export function deleteArticleById(id) {
  return apiClient.delete(`/articles/${id}`).then(({ data }) => {
    return data.articles;
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
export function deleteCommentById(id) {
  return apiClient.delete(`/comments/${id}`).then(({ data }) => {
    return data.comments;
  });
}
export function getTopics() {
  return apiClient.get(`/topics`).then(({ data }) => {
    return data.topics;
  });
}
export function getUserByUsername(username) {
  return apiClient.get(`/users/${username}`).then(({ data }) => {
    return data.user;
  });
}
export function getComments() {
  return apiClient.get(`/comments`).then(({ data }) => {
    return data.comments;
  });
}
export function getUsers() {
  return apiClient.get(`/users`).then(({ data }) => {
    return data.users;
  });
}

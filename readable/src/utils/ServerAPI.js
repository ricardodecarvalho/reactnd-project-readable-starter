import fetch from 'cross-fetch'

export const API = 'http://localhost:3001'
let token = localStorage.token

if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

export const headers = {
  'Accept': 'application/json',
  'Authorization': token,
  'Content-Type': 'application/json'
}

export const getCategories = () =>
  fetch(`${API}/categories`, { headers })
    .then(
      response => response.json(),
      error => console.log('Error in getCategories: ', error)
    )
    .then(data => data.categories)

export const getPosts = () =>
  fetch(`${API}/posts`, { headers })
    .then(
      response => response.json(),
      error => console.log('Error in getPosts: ', error)
    )
    .then(data => data)

export const getPostsByCategory = (category) =>
  fetch(`${API}/${category}/posts`, { headers })
    .then(
      response => response.json(),
      error => console.log('Error in getPostsByCategory: ', error)
    )
    .then(data => data)

export const addPost = (post) =>
  fetch(`${API}/posts`, {
    headers,
    method: 'POST',
    body: JSON.stringify({
      id: post.id,
      timestamp: post.timestamp,
      title: post.title,
      body: post.body,
      author: post.author,
      category: post.category
    })
  })
  .then(
    response => response.json(),
    error => console.log('Error in addPost: ', error)
  )
  .then(data => data)

export const getPostById = (id) =>
  fetch(`${API}/posts/${id}`, { headers })
    .then(
      response => response.json(),
      error => console.log('Error in getPostById: ', error)
    )
    .then(data => data)

export const updatePost = (post) =>
  fetch(`${API}/posts/${post.id}`, {
    headers,
    method: 'PUT',
    body: JSON.stringify({
      id: post.id,
      timestamp: post.timestamp,
      title: post.title,
      body: post.body,
      author: post.author,
      category: post.category
    })
  })
  .then(
    response => response.json(),
    error => console.log('Error in updatePost: ', error)
  )
  .then(data => data)




//option: upVote OR downVote
export const votePost = (id, option) =>
  fetch(`${API}/posts/${id}`, {
    headers,
    method: 'POST',
    body: JSON.stringify({
      option: option
    })
  })
  .then(
    response => response.json(),
    error => console.log('Error in addPost: ', error)
  )
  .then(data => data)

/* any API calls will happen here */
const BASE_URL =
  "https://strangers-things.herokuapp.com/api/2110-FTB-PT-WEB-PT";

export const fetchPosts = async (token) => {
  try {
    let response;
    if (token) {
      response = await fetch(`${BASE_URL}/posts`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
    } else {
      response = await fetch(`${BASE_URL}/posts`);
    }
    const {
      data: { posts },
    } = await response.json();
    return posts;
  } catch (error) {
    console.error(error);
  }
};

export const login = async (username, password) => {
  try {
    const response = await fetch(`${BASE_URL}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: {
          username,
          password,
        },
      }),
    });
    const {
      data: { token },
    } = await response.json();
    return token;
  } catch (error) {
    console.error(error);
  }
};

export const register = async (username, password) => {
  try {
    const response = await fetch(`${BASE_URL}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: {
          username,
          password,
        },
      }),
    });

    const {
      data: { token, message },
    } = await response.json();
    console.log("token", token, message);
    return token;
  } catch (error) {
    console.log(error);
  }
};

export const getUser = async (token) => {
  try {
    const response = await fetch(`${BASE_URL}/users/me`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const { data: userObject } = await response.json();
    return userObject;
  } catch (error) {
    console.error(error);
  }
};

export const createPost = async (
  title,
  description,
  price,
  willDeliver,
  location,
  token
) => {
  try {
    const response = await fetch(`${BASE_URL}/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, 
      },
      body: JSON.stringify({
        post: {
          title,
          description,
          price,
          location,
          willDeliver,
        },
      }),
    });
    const {
      data: { post },
    } = await response.json();
    return post;
  } catch (error) {
    console.error(error);
  }
};

export const deletePost = async (postIdToDelete, token) => {
  try {
    const response = await fetch(`${BASE_URL}/posts/${postIdToDelete}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const { success } = await response.json();
    return success;
  } catch (error) {
    console.error(error);
  }
};

export const editPost = async (post, POST_ID, token) => {
  try {
    const response = await fetch(`${BASE_URL}/posts/${POST_ID}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        post,
      }),
    });
    const {
      data: { post: newPost },
    } = await response.json();
    return newPost;
  } catch (error) {
    console.error(error);
  }
};

export const messagePost = async (POST_ID, token, content) => {
  try {
    const response = await fetch(`${BASE_URL}/posts/${POST_ID}/messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        message: {
          content,
        },
      }),
    });
    const {
      data: { message },
    } = await response.json();
    return message;
  } catch (error) {
    console.error(error);
  }
};

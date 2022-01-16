import { fetchPosts, deletePost } from "../api";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const Posts = ({ token, posts, setPosts, messages }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPosts = posts.filter(({ title, description, location }) => {
    return (
      title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      location.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const handlePosts = async () => {
    try {
      const newPosts = await fetchPosts(token);
      setPosts(newPosts);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (postIdToDelete) => {
    try {
      const success = await deletePost(postIdToDelete, token);
      if (success) {
        const newPosts = posts.filter((post) => post._id !== postIdToDelete);
        setPosts(newPosts);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    handlePosts();
  }, [token]);

  return (
    <div className="posts-wrapper">
      <div className="posts-top-section">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(event) => {
              setSearchTerm(event.target.value);
            }}
          />
        </div>
        <div className="add-post">
          {token ? (
            <Link to="/posts/create">
              <Button id="add-post-button" variant="outline-dark">
                ADD POST
              </Button>
            </Link>
          ) : null}
        </div>
      </div>
      <div className="posts">
        {filteredPosts.length ? (
          filteredPosts.length > 0 &&
          filteredPosts.map((post) => {
            const {
              _id,
              title,
              description,
              location,
              price,
              willDeliver,
              isAuthor,
            } = post;
            return (
              <Card className="post" order="primary" key={_id}>
                <Card.Header id="post-title">{title}</Card.Header>
                <Card.Text id="post-description">{description}</Card.Text>
                <Card.Text id="post-price">PRICE: {price}</Card.Text>
                <Card.Text id="post-location">LOCATION: {location}</Card.Text>
                <Card.Text id="post-delivery">
                  {willDeliver ? "DELIVERY AVAILABLE" : "DELIVERY UNAVAILABLE"}
                </Card.Text>
                <div className="post-optional-items">
                  {isAuthor && (
                    <div>
                      <div className="post-messages-to-user">
                        {messages.length > 0 &&
                          messages.map((message) => {
                            const post = message.post;
                            const postTitle = post.title;
                            const fromUser = message.fromUser;
                            const sender = fromUser.username;
                            if (title === postTitle) {
                              return (
                                <div key={message._id}>
                                  {sender}: {message.content}
                                </div>
                              );
                            }
                            return null;
                          })}
                      </div>
                      <div className="Delete">
                        <Button
                          id="delete-button"
                          variant="dark"
                          onClick={() => {
                            handleDelete(_id);
                          }}
                          className="delete-button"
                        >
                          DELETE
                        </Button>
                      </div>
                      <div>
                        <Button
                          id="edit-button"
                          variant="dark"
                          onClick={() => {
                            navigate(`/posts/${_id}/edit`);
                          }}
                        >
                          EDIT
                        </Button>
                      </div>
                    </div>
                  )}
                  {!isAuthor && token && (
                    <>
                      <div className="post-messages-from-user">
                        {messages.length > 0 &&
                          messages.map((message) => {
                            const post = message.post;
                            const postTitle = post.title;
                            if (title === postTitle) {
                              return (
                                <div key={message._id}>
                                  <p>MESSAGE BY YOU: </p>
                                  <p>{message.content}</p>
                                </div>
                              );
                            }
                            return null;
                          })}
                      </div>
                      {token && (
                        <>
                          <Button
                            id="send-message-button"
                            variant="dark"
                            onClick={() => {
                              navigate(`/posts/${_id}/messages`);
                            }}
                          >
                            SEND MESSAGE
                          </Button>
                        </>
                      )}
                    </>
                  )}
                </div>
              </Card>
            );
          })
        ) : (
          <h5>No posts to display</h5>
        )}
      </div>
    </div>
  );
};
export default Posts;

import { messagePost, fetchPosts } from "../api";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";

const Message = ({ posts, token, messages, setMessages, setPosts }) => {
  const [content, setContent] = useState("");

  const params = useParams();
  const { POST_ID } = params;

  const navigate = useNavigate();

  const handleMessage = async (event) => {
    try {
      event.preventDefault();
      const newMessage = await messagePost(POST_ID, token, content);
      if (newMessage) {
        fetchPosts().then(setPosts);
        setMessages([...messages, newMessage]);
      }
      navigate("/posts");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="send-a-message">
      <Card className="message-card">
        {posts.map(({ title, _id }) => {
          if (_id === POST_ID) {
            return (
              <div key={_id}>
                <Card.Header id="send-message-form-title">
                  SEND A MESSAGE ABOUT {title}
                </Card.Header>
              </div>
            );
          }
          return null;
        })}
        <Form className="send-a-message-form" onSubmit={handleMessage}>
          <Form.Group className="message-form-content">
            <textarea
              id="message-form-content-input"
              type="text"
              onChange={(event) => {
                setContent(event.target.value);
              }}
            />
          </Form.Group>
          <Button
            variant="dark"
            type="submit"
            onSubmit={handleMessage}
            id="message-form-send-button"
          >
            Send
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default Message;

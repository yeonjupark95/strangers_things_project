import { useState } from "react";
import { createPost } from "../api";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";

const Create = ({ token, posts, setPosts }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [willDeliver, setWillDeliver] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const newPost = await createPost(
        title,
        description,
        price,
        willDeliver,
        location,
        token
      );
      setPosts([...posts, newPost]);
      navigate("/posts");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="add-a-post">
      <Card className="new-post-card">
        <Card.Header id="new-post-form-title">ADD A POST</Card.Header>
        <Form onSubmit={handleSubmit} className="add-a-post-form">
          <Form.Group className="new-post-title">
            <input
              id="title-input"
              type="text"
              placeholder="Title*"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="new-post-description">
            <textarea
              type="text"
              id="description-input"
              placeholder="Description*"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="new-post-price">
            <input
              type="text"
              id="price-input"
              placeholder="Price*"
              value={price}
              onChange={(event) => setPrice(event.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="new-post-location">
            <input
              type="text"
              id="location-input"
              placeholder="Location"
              value={location}
              onChange={(event) => setLocation(event.target.value)}
            />
          </Form.Group>
          <Form.Group className="new-post-will-deliver">
            <input
              id="checkbox"
              type="checkbox"
              value={willDeliver}
              onChange={(event) => setWillDeliver(event.target.checked)}
            />
            <label htmlFor="checkbox"> Will Deliver </label>
          </Form.Group>
          <Button id="create-button" variant="dark" type="submit">
            Create
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default Create;

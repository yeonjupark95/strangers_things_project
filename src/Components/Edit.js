import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { editPost, fetchPosts } from "../api";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";

const Edit = ({ posts, setPosts, token }) => {
  const params = useParams();
  const { POST_ID } = params;
  const [editingPost, setEditingPost] = useState({});

  const navigate = useNavigate();

  const handleEdit = async (event) => {
    try {
      event.preventDefault();
      const newPost = await editPost(editingPost, POST_ID, token);
      fetchPosts().then(setPosts); //.then((posts)=>{setPosts(posts)})
      navigate("/posts");
      // }
    } catch (error) {
      console.error(error);
    }
  };

  for (let i = 0; i < posts.length; i++) {
    if (posts[i]._id === POST_ID) {
      const title = posts[i].title;
      const description = posts[i].description;
      const price = posts[i].price;
      const location = posts[i].location;
      const willDeliver = posts[i].willDeliver;

      return (
        <div className="edit-a-post">
          <Card className="edit-card">
            <Form onSubmit={handleEdit}>
              <Card.Header id="edit-post-form-title">
                EDIT YOUR POST
              </Card.Header>
              <Form.Group className="edit-post-title">
                <input
                  id="title-input"
                  type="text"
                  defaultValue={title}
                  onChange={(event) => {
                    setEditingPost({
                      ...editingPost,
                      title: event.target.value,
                    });
                  }}
                />
              </Form.Group>
              <Form.Group className="edit-post-description">
                <textarea
                  type="text"
                  placeholder="Description*"
                  id="description-input"
                  defaultValue={description}
                  onChange={(event) => {
                    setEditingPost({
                      ...editingPost,
                      description: event.target.value,
                    });
                  }}
                />
              </Form.Group>
              <Form.Group className="edit-post-price">
                <input
                  type="text"
                  placeholder="Price*"
                  id="price-input"
                  defaultValue={price}
                  onChange={(event) => {
                    setEditingPost({
                      ...editingPost,
                      price: event.target.value,
                    });
                  }}
                />
              </Form.Group>
              <Form.Group className="edit-post-location">
                <input
                  type="text"
                  id="location-input"
                  placeholder="Location"
                  defaultValue={location}
                  onChange={(event) => {
                    setEditingPost({
                      ...editingPost,
                      location: event.target.value,
                    });
                  }}
                />
              </Form.Group>
              <Form.Group className="edit-post-will-deliver">
                <input
                  id="checkbox"
                  type="checkbox"
                  value={willDeliver}
                  onChange={(event) => {
                    setEditingPost({
                      ...editingPost,
                      willDeliver: event.target.checked,
                    });
                  }}
                />
                <label htmlFor="checkbox">will deliver</label>
              </Form.Group>
              <Button variant="dark" type="submit" id="edit-form-save-button">
                Save
              </Button>
            </Form>
          </Card>
        </div>
      );
    }
  }
};

export default Edit;

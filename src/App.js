import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import {
  Posts,
  Login,
  Register,
  Home,
  Create,
  Edit,
  Message,
  Profile,
} from "./Components";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Container from "react-bootstrap/Container";
import { useState, useEffect } from "react";
import { getUser } from "./api";

function App() {
  const [token, setToken] = useState("");
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);
  const [messages, setMessages] = useState([]);

  const handleUser = async () => {
    if (token) {
      const userObject = await getUser(token);
      setUser(userObject);
    } else {
      setUser({});
    }
  };

  const handleLogOut = () => {
    setToken("");
    localStorage.removeItem("token");
  };

  useEffect(() => {
    handleUser();
  }, [token]);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
    }
  }, []);

  useEffect(() => {
    if (token) {
      setMessages(user.messages);
    }
  }, [user]);

  return (
    <div>
      <Navbar fixed="top" bg="light" expand="lg">
        <Container>
          <Navbar.Brand>
            <Link to="/" id="navbar-brand-text">
              STRANGERS THINGS
            </Link>
          </Navbar.Brand>
        </Container>
        <Container className="navbar-items">
          <Nav>
            <Link className="nav-link" to="/posts">
              POSTS
            </Link>
            {Object.keys(user).length === 0 && (
              <Link className="nav-link" to="/login">
                SIGN IN
              </Link>
            )}
            {Object.keys(user).length > 0 && (
              <Link className="nav-link" to="/profile">
                PROFILE
              </Link>
            )}
            {Object.keys(user).length > 0 && (
              <NavDropdown
                title={`Hi ${user.username}`}
                id="basic-nav-dropdown"
              >
                <NavDropdown.Item id="sign-out" onClick={handleLogOut}>
                  SIGN OUT
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Container>
      </Navbar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/posts"
          element={
            <Posts
              posts={posts}
              setPosts={setPosts}
              token={token}
              messages={messages}
            />
          }
        />
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route
          path="/posts/create"
          element={<Create token={token} posts={posts} setPosts={setPosts} />}
        />
        <Route
          path="/posts/:POST_ID/edit"
          element={<Edit token={token} posts={posts} setPosts={setPosts} />}
        />
        <Route
          path="posts/:POST_ID/messages"
          element={
            <Message
              token={token}
              posts={posts}
              setPosts={setPosts}
              messages={messages}
              setMessages={setMessages}
            />
          }
        />
        <Route
          path="/register"
          element={<Register token={token} setToken={setToken} />}
        />{" "}
        <Route
          path="/profile"
          element={<Profile user={user} messages={messages} />}
        />
        <Route path="/*" element={<div>Page Not Found</div>} />
      </Routes>
    </div>
  );
}

export default App;

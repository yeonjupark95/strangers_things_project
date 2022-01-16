import { useState } from "react";
import { login } from "../api";
import { useNavigate, Link } from "react-router-dom";

const Login = ({ setToken }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const token = await login(username, password);
      localStorage.setItem("token", token);
      setToken(token);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="login">
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="login-form-title">LOG INTO YOUR STRANGERS THINGS</div>
        <div className="username-input-label">Username</div>
        <div>
          <input
            value={username}
            placeholder="Username"
            id="username-input"
            onChange={(event) => {
              setUsername(event.target.value);
            }}
            required
          />
        </div>
        <div className="password-input-label">Password</div>
        <div>
          <input
            value={password}
            id="password-input"
            placeholder="Password"
            onChange={(event) => {
              setPassword(event.target.value);
            }}
            type="password"
          />
        </div>
        <button id="login-form-button">SIGN IN</button>
        <div>
          New to Strangers Things? <Link to="/register">Create An Account</Link>{" "}
        </div>
      </form>
    </div>
  );
};

export default Login;

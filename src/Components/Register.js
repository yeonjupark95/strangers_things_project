import { useState } from "react";
import { register } from "../api";
import { useNavigate } from "react-router-dom";

const Register = ({ setToken }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const newToken = await register(username, password);
      localStorage.setItem("token", newToken);
      setToken(newToken);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="register">
      <form className="register-form" onSubmit={handleSubmit}>
        <div className="register-form-title">
          Create a Strangers Things Account
        </div>
        <div className="username-input-label">Username</div>
        <div>
          <input
            id="username-input"
            value={username}
            onChange={(event) => {
              setUsername(event.target.value);
            }}
            required
          />
        </div>
        <div className="password-input-label">Password</div>
        <div>
          <input
            id="password-input"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
            type="password"
            required
          />
        </div>
        <button id="register-form-button">CREATE ACCOUNT</button>
      </form>
    </div>
  );
};

export default Register;

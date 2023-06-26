import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";

async function loginUser(credentials) {
  return fetch("http://localhost:5000/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
}

const LoginPage = ({ setToken }) => {
  const Navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [buttonActive, setButtonActive] = useState(false);
  const [viewPass, setViewPass] = useState(false);

  const handleSubmit = async (e) => {
    const token = await loginUser({
      email,
      password,
    });
    setToken(token);
    Navigate(`/`);
  };

  useEffect(() => {
    if (email.includes("@gmail.com") > 0 && password.length > 5) {
      setButtonActive(true);
    } else {
      setButtonActive(false);
    }
  }, [password, email]);

  return (
    <div className="login-container">
      <h1>Admin Login</h1>
      <form
        className="login-form"
        onSubmit={() => (buttonActive ? handleSubmit() : "")}
      >
        <label htmlFor="email">Email</label>
        <form className="text-input">
          <input
            id="email"
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            readonly
            onfocus="this.removeAttribute('readonly');"
            className="login-input"
          />
        </form>
        <label htmlFor="password">Password</label>
        <div className="text-input">
          <input
            className="login-input"
            type={viewPass ? "text" : "password"}
            id="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            readonly
            onfocus="this.removeAttribute('readonly');"
          />
          {password.length > 0 && (
            <img
              className="eye-icon"
              onClick={() => setViewPass((prevState) => !prevState)}
              src={viewPass ? "/images/eyeOpen.svg" : "/images/eyeClose.svg"}
              alt="eyeIcon"
            />
          )}
        </div>

        <button
          type={buttonActive ? "submit" : ""}
          className={buttonActive ? "filled" : ""}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;

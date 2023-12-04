import { useContext, useState } from "react";
import { UserContext } from "../component/Context";
import { signin } from "../component/utils";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const [input, setInput] = useState({
    username: "",
    password: "",
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const handleSignin = async () => {
    const { username, password } = input;
    signin(username, password, setUser, navigate);
  };

  return (
    <div className="home-center-div">
      <h1> Venue Admin Login </h1>
      <input
        className="signin-input"
        onChange={handleInput}
        placeholder="Username"
        name="username"
        value={input?.username}
        required
      />
      <input
        className="signin-input"
        onChange={handleInput}
        placeholder="Password"
        name="password"
        value={input?.password}
        required
      />
      <button className="signin-btn" onClick={handleSignin}>
        Sign in{" "}
      </button>
      <p> New Registration? </p>{" "}
    </div>
  );
};

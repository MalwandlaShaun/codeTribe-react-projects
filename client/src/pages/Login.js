import { Link } from "react-router-dom";
import "./Login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
//import { login } from "../features/auth/authSlice";
import { setPassword, setEmail, setAuth } from "../features/auth/authSlice";
import { useEffect } from "react";

const Login = () => {
  const { email, password } = useSelector((state) => state.auth);
  const state = useSelector((state) => state.auth);
  // console.log(state);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {}, [email, password]);

  const handleLogin = async () => {
    // dispatch(login());

    const response = await axios.post("http://localhost:8000/api/login", {
      email,
      password,
    });

    const data = await response.data;

    console.log(data);
    if (data.user) {
      localStorage.setItem("token", data.user);
      alert("Login successful");
      navigate("/dashboard");
      dispatch(setAuth(true));
      console.log(state);
    } else {
      alert("Please check your username and password");
    }
  };

  //.then((result) => {
  // if (result.payload.success) {
  //   alert("Login successful!");
  //   navigate("/dashboard");
  //   dispatch(setAuth());
  // } else {
  //   alert("Invalid email or password");
  // }
  //console.log(result);
  // })
  //.catch((error) => {
  //   console.log(error);
  //  });

  // console.log(email, password, login, setPassword);
  return (
    <div className="login-container">
      <h1>Login</h1>

      <input
        type="email"
        placeholder="email"
        className="input-field"
        value={email}
        onChange={(e) => dispatch(setEmail(e.target.value))}
      />
      <input
        type="password"
        placeholder="Password"
        className="input-field"
        value={password}
        onChange={(e) => dispatch(setPassword(e.target.value))}
      />
      <button className="login-button" onClick={() => handleLogin()}>
        Login
      </button>

      <p>
        Don't have an account sign up <Link to="/register">here</Link>
      </p>
    </div>
  );
};

export default Login;

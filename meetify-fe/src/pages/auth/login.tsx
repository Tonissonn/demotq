import axios from "axios";
import jwt_decode from "jwt-decode";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/button/button";
import Icon from "../../components/icon/icon";
import { userContext } from "../../hooks/userProvider";
import "./login.scss";

const Login = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { setTokenUser, logout } = useContext(userContext);
  const navigate = useNavigate();

  const handleChange = (event: React.SyntheticEvent<EventTarget>) => {
    setFormData({
      ...formData,
      [(event?.target as HTMLInputElement).name]: (
        event?.target as HTMLInputElement
      ).value,
    });
  };

  const handleSubmit = async (event: React.SyntheticEvent<EventTarget>) => {
    event.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:3001/user/auth/login",
        {
          email: formData.email,
          password: formData.password,
        }
      );
      setTokenUser(data.access_token, jwt_decode(data.access_token));
      navigate("/dashboard");
    } catch (err) {
      logout();
    }
  };

  return (
    <div className="login-container">
      <div className="half-page-container">
        <div className="external-form">
          <div className="user-type-header">
            <span
              className={
                isAdmin === false ? "user-type-primary" : "user-type-secondary"
              }
              onClick={() => setIsAdmin(false)}
            >
              STANRD USER
            </span>
            <span
              className={
                isAdmin === true ? "user-type-primary" : "user-type-secondary"
              }
              onClick={() => setIsAdmin(true)}
            >
              ADMINISTRATOR
            </span>
          </div>
          <div
            className={
              isAdmin === true ? "user-type-admin" : "user-type-standard"
            }
          >
            <Icon type={"user-select"} />
          </div>
          <div className="internal-form">
            <form onSubmit={handleSubmit}>
              <h4>LOG IN</h4>
              <label className="form-label" htmlFor="email">
                Email
              </label>
              <input
                className="form-input-text"
                type="email"
                name="email"
                id="email"
                placeholder="Enter email"
                onChange={handleChange}
              />
              <label className="form-label" htmlFor="password">
                Password
              </label>
              <input
                className="form-input-text"
                type="password"
                name="password"
                id="password"
                placeholder="Enter password"
                onChange={handleChange}
              />
              <div className="remember-forgot">
                <label className="checkbox">
                  <input type="checkbox" />
                  <span className="checkmark"></span>
                  Remember Me
                </label>
                <label htmlFor="forgorPassword">
                  <a href="https://www.amazon.de/">Forgot password</a>
                </label>
              </div>
              <div className="button-submit">
                <Button variant={"primary"} name="LOG IN" />
              </div>
              {/* <input type="submit" className="submit-button" /> */}
              <label className="not-a-member" htmlFor="notAMember">
                Not A Member? Sign Up <a href="./signup">Here</a>
              </label>
            </form>
          </div>
        </div>
      </div>
      <div className="half-page-container">
        <div className="welcome-text">
          <b>Welcome! Let's sign in to your account.</b>
        </div>
      </div>
    </div>
  );
};
export default Login;

import axios from "axios";
import jwt_decode from "jwt-decode";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/button/button";
import Icon from "../../components/icon/icon";
import { userContext } from "../../hooks/userProvider";
import "./signup.scss";

const Signup = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    role: "",
  });

  useEffect(() => {
    setFormData({
      ...formData,
      role: isAdmin === true ? "admin" : "user",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAdmin]);
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
      const { data } = await axios.post("http://localhost:3001/user/", {
        email: formData.email,
        password: formData.password,
        name: formData.name,
        role: formData.role,
      });
      setTokenUser(data.access_token, jwt_decode(data.access_token));
      navigate("/dashboard");
    } catch (err) {
      logout();
    }
  };

  return (
    <div className="signup-container">
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
            <form onSubmit={handleSubmit} autoComplete="off">
              <h4>SIGN UP</h4>
              <label className="form-label" htmlFor="name">
                Name
              </label>
              <input
                className="form-input-text"
                type="name"
                name="name"
                id="name"
                placeholder="Enter name"
                onChange={handleChange}
              />
              <label className="form-label" htmlFor="email">
                Email
              </label>
              <input
                autoComplete="new-password"
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
                autoComplete="new-password"
                className="form-input-text"
                type="password"
                name="password"
                id="password"
                placeholder="Min 8 characters, one capital letter, one number"
                onChange={handleChange}
              />
              <label className="form-label" htmlFor="password2">
                Confirm Password
              </label>
              <input
                className="form-input-text"
                type="password"
                name="password2"
                id="password2"
                placeholder="Min 8 characters, one capital letter, one number"
                onChange={handleChange}
              />
              <div className="remember-forgot">
                <label className="checkbox">
                  <input type="checkbox" />
                  <span className="checkmark"></span>I Accept&nbsp;
                </label>
                <label htmlFor="forgorPassword">
                  <a href="https://www.amazon.de/"> Terms And Conditions</a>
                </label>
              </div>
              <div className="button-submit">
                <Button variant={"primary"} name="LOG IN" />
              </div>
              {/* <input type="submit" className="submit-button" /> */}
              <label className="not-a-member" htmlFor="notAMember">
                Alredy a member? Sign in <a href="./login">Here</a>
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
export default Signup;

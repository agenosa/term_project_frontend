import React from "react";
import axios from "axios";
const BASE_URL = "https://localhost:44392/api/";

const AUTH_TOKEN = "tokenString";
const NAME_TOKEN = "firstName";

class UserInfo extends React.Component {
  constructor() {
    super();
    this.state = {
      loginMessage: "",
      token: "",
      name: "",
      techArray: [],
      userName: "",
      regName: "",
      regEmail: "",
      regPassword: "",
      regConfirmPassword: "",
      regMessage: "",
    };
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.getSecureData = this.getSecureData.bind(this);
    this.regNameInput = this.regNameInput.bind(this);
    this.regEmailInput = this.regEmailInput.bind(this);
    this.regPasswordInput = this.regPasswordInput.bind(this);
    this.regConfirmPasswordInput = this.regConfirmPasswordInput.bind(this);
    this.createUser = this.createUser.bind(this);
  }

  // Called when constructor is finished building component.
  componentDidMount() {
    if (sessionStorage.getItem(AUTH_TOKEN) != null) {
      this.setState({
        token: sessionStorage.getItem(AUTH_TOKEN),
      });
    }
    if (sessionStorage.getItem(NAME_TOKEN) != null) {
      this.setState({
        name: sessionStorage.getItem(NAME_TOKEN),
      });
    }
  }

  // Executes when button pressed.
  login(e) {
    const email = this.email.value;
    const password = this.password.value;

    const URL = BASE_URL + "login";
    this.email.value = ""; // Clear input.
    this.password.value = ""; // Clear input.

    fetch(URL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Email: email,
        Password: password,
        RememberMe: false,
      }),
    })
      // Response received.
      .then((response) => response.json())
      // Data retrieved.
      .then((json) => {
        // Store token with session data.
        if (json[AUTH_TOKEN] != null) {
          let token = json[AUTH_TOKEN];
          sessionStorage.setItem(AUTH_TOKEN, token);
          let name = json[NAME_TOKEN];
          sessionStorage.setItem(NAME_TOKEN, name);
          this.token = token;
          this.name = name;
          this.setState({
            loginMessage: "The user has been logged in.",
            token: token,
          });
        } else {
          this.setState({
            loginMessage: "An error occured at login. Try again.",
          });
        }
      })
      // Data not retrieved.
      .catch(function (error) {
        if (sessionStorage[""]) {
          alert(error);
        }
      });
  }

  logout(e) {
    alert("Inside logout");
    if (sessionStorage.getItem([AUTH_TOKEN]) != null) {
      sessionStorage.clear();
    }
    this.setState({ todos: [], loginMessage: "", token: "" });
  }

  getSecureData(e) {
    let token = sessionStorage.getItem(AUTH_TOKEN);
    const URL = BASE_URL + "login/List";

    // This code gets data from the remote server.
    // fetch(URL).then(response => response.json())
    fetch(URL, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      // Data Retrieved.
      .then((data) => {
        alert(JSON.stringify(data));
        this.setState({
          techArray: data["techArray"],
          userName: data["userName"],
        });
      })

      // Data Not Retrieved.
      .catch((error) => {
        alert(error);
      });
  }

  regNameInput(e) {
    this.setState((regState) => ({
      ...regState,
      regName: e.target.value,
    }));
  }

  regEmailInput(e) {
    this.setState((regState) => ({
      ...regState,
      regEmail: e.target.value,
    }));
  }

  regPasswordInput(e) {
    this.setState((regState) => ({
      ...regState,
      regPassword: e.target.value,
    }));
  }

  regConfirmPasswordInput(e) {
    this.setState((regState) => ({
      ...regState,
      regConfirmPassword: e.target.value,
    }));
  }

  createUser = async (e) => {
    e.preventDefault();
    let message;
    var data = JSON.stringify({
      Email: this.state.regEmail,
      FirstName: this.state.regName,
      Password: this.state.regPassword,
      ConfirmPassword: this.state.regPassword,
    });
    var config = {
      method: "post",
      url: BASE_URL + "login/Register",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    await axios(config).then(function (response) {
      message = response.data.message;
    });
    this.setState((regState) => ({
      ...regState,
      regMessage: message,
    }));
  };

  render() {
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th />
            </tr>
          </thead>
          <tbody>
            <tr>
              <td> Email: </td>
              <td>
                {" "}
                <input
                  type="text"
                  ref={(emailInput) => (this.email = emailInput)}
                />{" "}
              </td>
            </tr>
            <tr>
              <td>Password: </td>
              <td>
                {" "}
                <input
                  type="text"
                  ref={(passwordInput) => (this.password = passwordInput)}
                />
              </td>
            </tr>
            <tr>
              <td>
                <button onClick={this.login}>Login</button>
              </td>
              <td></td>
            </tr>
          </tbody>
        </table>
        {this.state.loginMessage}
        <br />
        {this.state.token}
        <br />
        <br />
        <button onClick={this.getSecureData}>Get Secure Data</button>
        <ul>
          {this.state.techArray.map((tech, index) => (
            <li key={index}>
              {index} {tech.text} {tech.link}
            </li>
          ))}
        </ul>
        <br />
        <button onClick={this.logout}>Logout</button>
        <br></br>
        <br></br>
        Register New User
        <form>
          Email: <input onChange={this.regEmailInput}></input>
          <br></br>
          Name: <input onChange={this.regNameInput}></input>
          <br></br>
          Password: <input onChange={this.regPasswordInput}></input>
          <br></br>
          Confirm Password:{" "}
          <input onChange={this.regConfirmPasswordInput}></input>
          <br></br>
          <button onClick={this.createUser}>register</button>
          <br></br>
        </form>
        {this.state.regMessage}
      </div>
    );
  }
}
export default UserInfo;

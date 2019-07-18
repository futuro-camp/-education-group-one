import React from "react";
import "./login.css";
import axios from "axios";
export const instance = () => axios.create({
    baseURL: "http://192.168.1.100:3000/",
    responseType: "json"
});

class Input extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        if (this.props.email) {
            return (
            <div className="login">
                <label>Email</label>
                <input className="email" type="text" autoFocus="autofocus" defaultValue="test" ref={(input) => {this.textInput = input;}}/>
            </div>
            )
        } else if (this.props.password) {
            return (
                <div className="login">
                    <label>Password</label>
                    <input className="password" type="password" defaultValue="admin" ref={(input) => {this.textInput = input;}}/>
                </div>
            )
        }
    }
}

class Login extends React.Component {
    constructor() {
        super();
        this.Authorization = this.Authorization.bind(this);
    }
    //This method POST (log/pass).value to server
    //and if it=true - server gives answer-object with authorization-key
    Authorization() {
        console.log(this.textEmail.textInput.value);
        console.log(this.textPassword.textInput.value);
        axios.post("http://192.168.1.100:3000/login", {
        login: this.textEmail.textInput.value,
        password: this.textPassword.textInput.value})
        .then((obj) => {
            console.log(obj.data.key);
            this.props.history.push("/items");
        })
        .catch((error) => {
            console.log(error);
        })
    }
    render() {
        return(
            <div className="login">
                <h1>Start Working 💻</h1>
                <Input email ref={(input) => {this.textEmail = input;}}/>
                <Input password ref={(input) => {this.textPassword = input;}}/>
                <button onClick={this.Authorization}>Sign In 🪐</button>
            </div>
        )
    }

}

export default Login;

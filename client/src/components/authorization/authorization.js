import React, { useState } from "react";
import { useHistory } from 'react-router-dom';


function Login( {user, onLogin, logout, setUserFavorites} ) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);

    let history = useHistory()

    function handleSubmit(e) {
        e.preventDefault();
        fetch("/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        }).then((r) => {
            if (r.ok) {
                r.json().then((user) => {onLogin(user)
                    setUserFavorites(user.favoritelocations)})
                    history.push("./")
                }
            else {
                r.json().then((err) => setErrors(err.errors));
            }
        });
    }

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [signUpUserName, setSignUpUserName] = useState("");
    const [signUpPassword, setSignUpPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");


    function handleSignUpSubmit(e) {
        e.preventDefault();
        setErrors([]);
        fetch("/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                first_name: firstName,
                last_name: lastName,
                email: email,
                username: signUpUserName,
                password: signUpPassword,
                password_confirmation: passwordConfirmation,
            }),
        }).then((r) => {
            if (r.ok) {
            } else {
                r.json().then((err) => setErrors(err.errors));
            }
        });
    }

    return (
        <React.Fragment>
        <div className="formContainer">
            <section class="form">
                <div class="center">
                    <h1>Login</h1>
                    <hr class="formhr" />
                    <form  onSubmit={handleSubmit}>

                        <input
                            type="text"
                            name="username"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />

                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <button class="formSubmit" type="submit">{user ? "Logout" : "Login"}</button>

                        <span>
                            {errors.map((err) => (
                                <span key={err}>{err}</span>
                            ))}
                        </span>

                    </form>
                    {/* <button onClick={logout} className="logoutbtn" type="button">{(user) ? "LOGOUT" : "LOGIN"}</button> */}
                </div>
            </section>
        </div>
        <hr></hr>
        <div class="formContainer">
            <section class="form">
                <div class="center">
                    <h1 class="formh1">Sign Up</h1>
                    <hr class="formHr" />

                    <form onSubmit={handleSignUpSubmit}>
                        <input
                            type="text"
                            class="firstLastNames"
                            name="firstName"
                            placeholder="First Name"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />

                        <input
                            type="text"
                            class="firstLastNames"
                            name="lastName"
                            placeholder="Last Name"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />

                        <input
                            type="text"
                            name="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <input
                            type="text"
                            name="username"
                            placeholder="Username"
                            value={signUpUserName}
                            onChange={(e) => setSignUpUserName(e.target.value)}
                        />

                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={signUpPassword}
                            onChange={(e) => setSignUpPassword(e.target.value)}
                        />

                        <input
                            type="password"
                            name="password confirmation"
                            placeholder="Confirm Password"
                            value={passwordConfirmation}
                            onChange={(e) => setPasswordConfirmation(e.target.value)}
                        />

                        <button class="formSubmit" type="submit">Sign Up</button>

                        <span>
                            {errors.map((err) => (
                                <span key={err}>{err}</span>
                            ))}
                        </span>

                    </form>
                </div>
            </section>
        </div>
        </React.Fragment>
    )

}

export default Login
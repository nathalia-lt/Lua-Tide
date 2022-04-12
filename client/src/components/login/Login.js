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

    return (
        <div class="formContainer">
            <section class="form">
                <div class="center">
                    <h1>Welcome Back!</h1>
                    <hr class="formHr" />
                    <form onSubmit={handleSubmit}>

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
    )
}

export default Login
import React, { useState } from "react";
import './edit.css';


function Edit( {user, setUser} ) {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [errors, setErrors] = useState([]);



    function handleSubmit(e) {
        e.preventDefault();
        fetch("/users/"+ user.id, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                first_name: firstName,
                last_name: lastName,
                email: email,
                username: username,
            }),
        }).then((r) => {
            if (r.ok) {
                r.json().then (r => {setUser(r)
                alert("You've been successfully update")
                })
            } else {
                r.json().then((err) => setErrors(err.errors));
            }
        });
    }

    return (
        <div class="formContainer">
            <section class="form">
                <div class="center">
                    <h1>Edit your profile</h1>
                    <hr class="formHr" />

                    <form className="loginform" onSubmit={handleSubmit}>
                        <input className="useredit"
                            type="text"
                            name="firstName"
                            placeholder="First Name"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />

                        <input className="useredit"
                            type="text"
                            name="lastName"
                            placeholder="Last Name"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />

                        <input className="useredit"
                            type="text"
                            name="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <input className="useredit"
                            type="text"
                            name="username"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />

                        <button class="formSubmit" type="submit"> Confirm </button>

                        <span>
                            {errors.map((err) => (
                                <span key={err}>{err}</span>
                            ))}
                        </span>

                    </form>
                </div>
            </section>
        </div>
    );

}

export default Edit;
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { register } from "../store/auth/slice";


export default function Register() {
    const dispatch = useDispatch();
    const [userData, setUserData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        password_confirmation: "",
        terms_of_service: true,
    });

    const [invalidCredentials, setInvalidCredentials] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setInvalidCredentials(false);
        try {
            dispatch(register(userData));

        } catch (e) {
            console.log(e);
            setInvalidCredentials(true);
            alert("invalid credentials");
        }
    };

    return (
        <div>
            <h2>Register</h2>
            <form
                style={{ display: "flex", flexDirection: "column", width: "400" }}
                onSubmit={handleSubmit}
            >
                <input
                    required
                    minLength={2}
                    value={userData.first_name}
                    placeholder="First name"
                    onChange={({ target }) =>
                        setUserData({ ...userData, first_name: target.value })
                    }
                />
                <input
                    required
                    minLength={2}
                    value={userData.last_name}
                    placeholder="Last name"
                    onChange={({ target }) =>
                        setUserData({ ...userData, last_name: target.value })
                    }
                />
                <input
                    required
                    value={userData.email}
                    placeholder="Email"
                    onChange={({ target }) =>
                        setUserData({ ...userData, email: target.value })
                    }
                />
                <input
                    required
                    type="password"
                    minLength={6}
                    value={userData.password}
                    placeholder="Password"
                    onChange={({ target }) =>
                        setUserData({ ...userData, password: target.value })
                    }
                />
                <input
                    required
                    type="password"
                    minLength={6}
                    value={userData.password_confirmation}
                    placeholder="Confirm Password"
                    onChange={({ target }) =>
                        setUserData({ ...userData, password_confirmation: target.value })
                    }
                />
                <label for="checkbox">By creating an account you agree to our </label>
                <input
                    required
                    id="checkbox"
                    type="checkbox"
                    value={userData.terms_of_service}
                    onChange={({ target }) => setUserData({ ...userData, terms_of_service: true })}
                />
                {invalidCredentials && (
                    <p style={{ color: "red" }}>Invalid credentials</p>
                )}


                <button>Submit</button>
            </form>
        </div>
    );
}
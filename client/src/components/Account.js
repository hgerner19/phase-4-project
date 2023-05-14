import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom"

const Account = () => {

    const [userLogin, setUserLogin] = useState({
        "email": "",
        "password": ""
    })

    const history = useHistory()

    const handleUserLoginChange = (event) => {
        const name = event.target.name
        const value = event.target.value
        setUserLogin((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleLogin = (event) => {
        event.preventDefault()
        if (userLogin.email && userLogin.password) {
            fetchUserLogin()
            console.log(userLogin)
        } else {
            window.alert("Your passwords do not match.  Please reenter your password and try again.")
        }
    }
    // const fetchUserLogin = () => {
    //     fetch("/customers/account", {
    //       method: "GET",
    //       headers: {
    //         "content-type": "application/json",
    //       },
    //       // body: JSON.stringify(userLogin)
    //     })
    //       .then((response) => {
    //         if (response.ok) {
    //           return response.json();
    //         } else {
    //           throw new Error("Network response was not OK.");
    //         }
    //       })
    //       .then((userData) => {
    //         // Handle the userData received from the server
    //         console.log(userData);
    //       })
    //       .catch((error) => {
    //         // Handle any errors that occur during the request
    //         console.error("Error:", error);
    //       });
    //   };
    const fetchUserLogin = () => {
        console.log("test fetchUserLogin")
        fetch("/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userLogin),
        })
        .then((response) => response.json())
        .then((userData) => console.log(userData))
    }

    const handleLogout = () => {
        fetch("/logout", {
            method: "DELETE"
        })
        // .then((response) => response.json())
        // .then((logoutData) => console.log(logoutData))
    }

    return (
        <>
        <div id="accountInfoDiv">
            <h1>View your account information here.</h1>
            <button onClick={() => history.push({pathname: "/my-account"})}>Your Account.</button>
        </div>
        <div id="loginDiv">
            <h1>Already have an account? Login here!</h1>
            <form className="loginForm" onSubmit={(event) => handleLogin(event)}>
                <input className="loginInput" value={userLogin.email} type="email" name="email" placeholder="Enter your email here." onChange={handleUserLoginChange}></input>
                <br></br>
                <input className="loginInput" value={userLogin.password} type="password" name="password" placeholder="Enter your password here." onChange={handleUserLoginChange}></input>
                <br></br>
                <button className="loginInput" type="submit">Login!</button>
            </form>
        </div>
        <div id="signupRedirectButton">
            <h2>Don't have an account yet?</h2>
            <button id="signupRedirect" onClick={() => history.push({pathname: "/create-account"})}>Signup here!</button>
        </div>
        <br></br><br></br>
        <div id="logoutRedirect">
            <h2>Logout Here</h2>
            <button onClick={handleLogout}>Logout</button>
        </div>
        </>
    )
}

export default Account
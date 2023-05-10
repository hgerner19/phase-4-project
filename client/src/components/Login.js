import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom"

const Login = () => {

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
            console.log(userLogin)
        } else {
            window.alert("Your passwords do not match.  Please reenter your password and try again.")
        }
    }

    const handleSignupRedirect = () => {
        history.push({pathname: "/create-account"})
    }

    return (
        <>
        <div id="loginDiv">
            <h1>Already have an account? Login here!</h1>
            <form class="loginForm" onSubmit={(event) => handleLogin(event)}>
                <input class="loginInput" value={userLogin.email} type="email" name="email" placeholder="Enter your email here." onChange={handleUserLoginChange}></input>
                <br></br>
                <input class="loginInput" value={userLogin.password} type="password" name="password" placeholder="Enter your password here." onChange={handleUserLoginChange}></input>
                <br></br>
                <button class="loginInput" type="submit">Login!</button>
            </form>
        </div>
        <div id="signupRedirectButton">
            <h2>Don't have an account yet?</h2>
            <button id="signupRedirect" onClick={() => handleSignupRedirect()}>Signup here!</button>
        </div>
        </>
    )
}

export default Login
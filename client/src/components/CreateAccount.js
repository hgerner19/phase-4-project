import { useState, useEffect } from "react";

const CreateAccount = () => {

    const [newUser, setNewUser] = useState({
        "firstName": "",
        "lastName": "",
        "email": "",
        "password": "",
        "confirmPassword": "",
        "address": ""
    })

    const handleNewUserChange = (event) => {
        const name = event.target.name
        const value = event.target.value
        setNewUser((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleCreateAccount = (event) => {
        event.preventDefault()
        if (newUser.password === newUser.confirmPassword) {
            console.log(newUser)
        } else {
            window.alert("Your passwords do not match.  Please reenter your password and try again.")
        }
    }

    return (
        <div id="createAccountDiv">
            <h1>Create An Account Here!</h1>
            <form class="createAccountForm" onSubmit={(event) => handleCreateAccount(event)}>
                <input class="createAccountInput" value={newUser.firstName} type="text" name="firstName" placeholder="Enter your first name here." onChange={handleNewUserChange}></input>
                <br></br>
                <input class="createAccountInput" value={newUser.lastName} type="text" name="lastName" placeholder="Enter your last name here." onChange={handleNewUserChange}></input>
                <br></br>
                <input class="createAccountInput" value={newUser.email} type="email" name="email" placeholder="Enter your email here." onChange={handleNewUserChange}></input>
                <br></br>
                <input class="createAccountInput" value={newUser.password} type="password" name="password" placeholder="Enter your password here." onChange={handleNewUserChange}></input>
                <br></br>
                <input class="createAccountInput" value={newUser.confirmPassword} type="password" name="confirmPassword" placeholder="Reenter you password." onChange={handleNewUserChange}></input>
                <br></br>
                <input class="createAccountInput" value={newUser.address} type="text" name="address" placeholder="Ender your address here." onChange={handleNewUserChange}></input>
                <br></br>
                <button class="createAccountInput" type="submit">Create Account!</button>
            </form>
        </div>
    )
}

export default CreateAccount
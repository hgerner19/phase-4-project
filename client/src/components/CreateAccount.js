import { useState, useEffect } from "react";

const CreateAccount = () => {

    const [newUser, setNewUser] = useState({
        "first_name": "",
        "last_name": "",
        "email": "",
        "phone_number": null,
        "password_hash": "",
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

    const handleSubmitCreateAccount = (event) => {
        event.preventDefault()
        if (newUser.password_hash === event.target.confirmPassword.value) {
            console.log("good job on the matching passwords")
            handleCreateAccount()
        } else {
            window.alert("Your passwords do not match.  Please reenter your password and try again.")
        }
    }

    const handleCreateAccount = () => {
        fetch("/customers", {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(newUser),
        })
        .then((response) => response.json())
        .then((newCustomerData) => console.log(newCustomerData))
    }
	// const addSong = (songData) => {
	// 	const postReqObj = {
	// 		method: "POST",
	// 		headers: {
	// 			"content-type": "application/json",
	// 		},
	// 		body: JSON.stringify(songData),
	// 	}
	// 	fetch("/songs", postReqObj)
	// 		.then((res) => res.json())
	// 		.then((newSong) => {
	// 			if (newSong["message"]) {
	// 				alert(newSong["message"])
	// 			} else {
	// 				setSongs((prevSongs) => [newSong, ...prevSongs])
	// 			}
	// 		})
	// 		.catch((err) => console.log(err))
	// }
    return (
        <div id="createAccountDiv">
            <h1>Create An Account Here!</h1>
            <form class="createAccountForm" onSubmit={(event) => handleSubmitCreateAccount(event)}>
                <input class="createAccountInput" value={newUser.first_name} type="text" name="first_name" placeholder="Enter your first name here." onChange={handleNewUserChange}></input>
                <br></br>
                <input class="createAccountInput" value={newUser.last_name} type="text" name="last_name" placeholder="Enter your last name here." onChange={handleNewUserChange}></input>
                <br></br>
                <input class="createAccountInput" value={newUser.email} type="email" name="email" placeholder="Enter your email here." onChange={handleNewUserChange}></input>
                <br></br>
                <input class="createAccountInput" value={newUser.phone_number} type="number" name="phone_number" placeholder="Enter your phone number here." onChange={handleNewUserChange}></input>
                <br></br>
                <input class="createAccountInput" value={newUser.password_hash} type="password" name="password_hash" placeholder="Enter your password_hash here." onChange={handleNewUserChange}></input>
                <br></br>
                <input class="createAccountInput" value={newUser.confirmPassword} type="password" name="confirmPassword" placeholder="Reenter you password_hash." onChange={handleNewUserChange}></input>
                <br></br>
                <input class="createAccountInput" value={newUser.address} type="text" name="address" placeholder="Ender your address here." onChange={handleNewUserChange}></input>
                <br></br>
                <button class="createAccountInput" type="submit">Create Account!</button>
            </form>
        </div>
    )
}

export default CreateAccount
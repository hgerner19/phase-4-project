import { useState, useEffect } from "react"
import { useHistory } from "react-router-dom"

const MyAccount = () => {

    // const [accountInfo, setAccountInfo] = useState({
    //     "first_name": "",
    //     "last_name": "",
    //     "email": "",
    //     "phone_number": 1231231234,
    //     "address": ""
    // })

    const [accountInfo, setAccountInfo] = useState({})

    // const [edit, setEdit] = useState(false)

    useEffect(() => {
        fetch("/cookies")
        .then((response) => response.json())
        .then((customerData) => setAccountInfo(customerData))
    }, [])

    // const renderEditOrNot = () => {
    //     if (edit) {
    //         return (
    //             <form id="editAccountInfoForm">
    //                 <input name="first_name" value={accountInfo.first_name}></input>
    //             </form>
    //         )
    //     } else {
    //         return (
    //             <p>{accountInfo.first_name}</p>
    //         )
    //     }
    // }

    const handleAccountInfoChange = (event) => {
        setAccountInfo((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.value
        }))
    }

    const handleEditAccount = (event) => {
        event.preventDefault()
        console.log(accountInfo.id)
        fetch(`/customers/${accountInfo.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "first_name": accountInfo.first_name,
                "last_name": accountInfo.last_name,
                "phone_number": accountInfo.phone_number,
                "email": accountInfo.email,
                "address": accountInfo.address
            }),
        })
        .then((response) => response.json())
        .then((newAccountData) => console.log(newAccountData))
        .catch((error) => console.error(error))
    }

    return (
        <div>
            <h1>Welcome to your account, {accountInfo.first_name}!</h1>
            <h4>Below is your account information.  If you'd like to update any of it please do so here!</h4>
            <form id="editAccountInfoForm" onSubmit={handleEditAccount}>
                <input name="first_name" value={accountInfo.first_name} type="text" onChange={(event) => handleAccountInfoChange(event)}></input>
                <br></br><br></br>
                <input name="last_name" value={accountInfo.last_name} type="text"></input>
                <br></br><br></br>
                <input name="email" value={accountInfo.email} type="text"></input>
                <br></br><br></br>
                <input name="phone_number" value={accountInfo.phone_number} type="number"></input>
                <br></br><br></br>
                <input name="address" value={accountInfo.address} type="text"></input>
                <br></br><br></br>
                <button type="submit">Edit Account</button>
            </form>
        </div>

    )
}

export default MyAccount
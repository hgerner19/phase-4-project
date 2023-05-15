import { useState, useEffect } from "react"
import {useLocation, useHistory } from "react-router-dom"
import OrderCountdown from "./OrderCountdown.js"

const OrderCheckout = () => {

    const history = useHistory()
    const location = useLocation()
    const orderItems = location.state

    const [orderPlaced, setOrderPlaced] = useState(false)
    const [newOrder, setNewOrder] = useState({
        "total": 0,
        "notes": "",
        "customer_id": 1
    })


    let total = 0
    const renderOrderItems = orderItems.map((orderItem) => {
        total += orderItem.price * Number(orderItem.quantity)
        return (
            <div className="orderItemReviewDiv">
                <p>{orderItem.name} x{orderItem.quantity} - ${orderItem.price * orderItem.quantity}</p>
            </div>
        )
    })

    useEffect(() => {
        setOrderPlaced(false)
        setNewOrder((prevState) => ({
            ...prevState,
            ["total"]: total
        }))
    }, [total])

    const handleOrderItemsPost = (order_id) => {
        orderItems.map((item) => {
            fetch("/orderitems", {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    "order_id": Number(order_id),
                    "menu_item_id": Number(item.id),
                    "quantity": Number(item.quantity)
                })
            })
        })
    }

    const handleOrderSubmit = (event) => {
        event.preventDefault()
        fetch("/orders", {
            method: 'POST',
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(newOrder),
        })
        .then((response) => response.json())
        .then((orderData) => handleOrderItemsPost(orderData.id))
        setOrderPlaced(true)
        window.alert("Thanks for placing your order!")
        // history.push({pathname:"/"})
    }

    const handleOrderChange = (event) => {
        const name = event.target.name
        const value = event.target.value
        setNewOrder((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }

    return (
        <>
            <h1>Order Checkout Page!</h1>
            <div id="checkoutReviewOrderDiv">
                {renderOrderItems}
                <p>Total: ${total}</p>
            </div>
            {orderPlaced ? 
            <OrderCountdown />
            :
            <div id="checkoutDiv">
                <h3 style={{color:"black", textShadow:"None"}}>Please enter your information below.</h3>
                <form id="checkoutCustomerForm" onSubmit={event => handleOrderSubmit(event)}>
                    <input type="text" name="name" placeholder="Enter a name for your order here."></input>
                    <br></br><br></br>
                    <input type="text" name="phone_number" placeholder="Enter your phone number here."></input>
                    <br></br><br></br>
                    <input type="email" name="email" placeholder="Enter your email here."></input>
                    <br></br><br></br>
                    <input type="text" name="creditCard" placeholder="Credit card number."></input>
                    <br></br><br></br>
                    <input type="text" name="expirationDate" placeholder="MM/YY"></input>
                    <br></br><br></br>
                    <input type="text" name="securityCode" placeholder="Security Code"></input>
                    <br></br><br></br>
                    <textarea name="notes" value={newOrder.notes} placeholder="Have any additional notes or customizations? Enter that here!" onChange={handleOrderChange}></textarea>
                    <br></br><br></br>
                    <button type="submit" className="mainButton">Place Your Order!</button>
                </form>
            </div>
            }
        </>
    )
}

export default OrderCheckout
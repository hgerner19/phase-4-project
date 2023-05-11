import { useState } from "react"
import {useLocation, useHistory } from "react-router-dom"

const OrderCheckout = () => {

    const history = useHistory()
    const location = useLocation()

    const orderItems = location.state
    console.log(orderItems)

    let total = 0
    const renderOrderItems = orderItems.map((orderItem) => {
        total += orderItem.price * orderItem.quantity
        return (
            <div className="orderItemReviewDiv">
                <p>{orderItem.name} x{orderItem.quantity} - ${orderItem.price * orderItem.quantity}</p>
            </div>
        )
    })

    return (
        <>
            <h1>Order Checkout Page!</h1>
            <div id="checkoutReviewOrderDiv">
                {renderOrderItems}
                <p>Total: ${total}</p>
            </div>
            <div id="checkoutDiv">
                <h3>Please enter your information below.</h3>
                <form id="checkoutCustomerForm">
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
                    <textarea name="notes" placeholder="Have any additional notes or customizations? Enter that here!"></textarea>
                    <br></br><br></br>
                    <button type="submit">Place Your Order!</button>
                </form>
            </div>
        </>
    )
}

export default OrderCheckout
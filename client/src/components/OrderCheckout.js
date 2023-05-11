import { useState, useEffect } from "react"
import {useLocation, useHistory } from "react-router-dom"

const OrderCheckout = () => {

    const history = useHistory()
    const location = useLocation()
    const orderItems = location.state

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
        setNewOrder((prevState) => ({
            ...prevState,
            ["total"]: total
        }))
    }, [total])


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
        .then((newOrderData) => {
            createOrderItem(newOrderData.id)

        })
        .catch((error) => console.error(error))
    }

    const createOrderItem = (orderId) => {
        orderItems.map((item) => {
            let oneOrderItem = {
                "order_id": orderId,
                "menu_item_id": item.id,
                "quantity": Number(item.quantity)
            }
            handleOrderItemPost(oneOrderItem)
        })
    // orderItems.map((item) => {
    //   console.log(item)
    // })
    }

    const handleOrderItemPost = (oneOrderItem) => {
        fetch("/orderitems", {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(oneOrderItem),
        })
        .then((response) => response.json())
        .then((newOrderItemData) => console.log(newOrderItemData))
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
                    <button type="submit" class="mainButton">Place Your Order!</button>
                </form>
            </div>
        </>
    )
}

export default OrderCheckout

const OrderCheckout = () => {

    return (
        <div>
            <h1>Order Checkout Page!</h1>
            <h3>Please enter your information below.</h3>
            <form id="placeOrderForm">
                <input type="text" name="name" placeholder="Enter a name for your order here."></input>
                <br></br>
                <input type="number" name="phone_number" placeholder="Enter your phone number here."></input>
                <br></br>
                <input type="email" name="email" placeholder="Enter your email here."></input>
            </form>    
        </div>
    )
}

export default OrderCheckout
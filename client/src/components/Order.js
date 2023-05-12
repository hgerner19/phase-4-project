import { useState, useEffect } from "react"
import { useHistory } from "react-router-dom"

const Order = () => {

    const [menuItems, setMenuItems] = useState([])

    const orderItems = []

    const history = useHistory()

    useEffect(() => {
        fetch('/menu')
        .then((response) => response.json())
        .then((menuData) => {
            setMenuItems(menuData)
        })
    }, [])
    
    const handleCheckoutRedirect = () => {
        console.log(orderItems)
        history.push({pathname:"/order/checkout", state:orderItems})
    }
    
    const handleAddToOrder = (event, category) => {
        event.preventDefault()
        let orderItemName = event.target[category].value
        let orderItemQuantity = event.target.quantity.value
        let orderItem = menuItems.find((item) => item.name === orderItemName)
        
        const newOrderItem = {
            "id": orderItem.id,
            "name": orderItemName,
            "price": orderItem.price,
            "quantity": orderItemQuantity
        }
        orderItems.push(newOrderItem)
        // console.log(orderItems)
    }

    const renderOrderItemForm = (category) => {
        return (
            <form onSubmit={event => handleAddToOrder(event, category)}>
                <br></br>
                <br></br>
                <select name={category}>
                    <option>{category}s</option>
                    {renderMenuItems(category)}
                </select>
                <br></br>
                <input type="number" name="quantity" defaultValue={1} placeholder="How many?"></input>
                <br></br>
                <button type="submit">Add to Order</button>
            </form>
        )
    }

    const renderMenuItems = (category) => menuItems.map(menuItem => {
        if (menuItem.category === category) {
            return (
                <option value={menuItem.name} name={menuItem.name}>{menuItem.name} - ${menuItem.price}</option>
            )
        }
    })
    
    return (
        // Guest Order Form
        <div id="placeOrderDiv">
            <h1>Place an Order!</h1>
            <p>If you already have an account, make sure you're logged in.</p>
            <p>Otherwise, go ahead and select what items you'd like to order, how many, and when you're done proceed to checkout!</p>
            <div id="renderOrderItemsDiv">
                {renderOrderItemForm("Appetizer")}
                {renderOrderItemForm("Pasta")}
                {renderOrderItemForm("Pizza")}
                {renderOrderItemForm("Desert")}
                {renderOrderItemForm("Beverage")}
            </div>
            <br></br><br></br>
            <button className="mainButton" onClick={handleCheckoutRedirect}>Proceed to Checkout</button>            
        </div>
    )
}

export default Order
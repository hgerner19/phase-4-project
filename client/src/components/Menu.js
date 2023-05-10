import {useState, useEffect} from "react"

import MenuItem from "./MenuItem"

const Menu = () => {
    const [menuItems, setMenuItems] = useState([])

    useEffect(() => {
        fetch('/menu')
        .then((response) => response.json())
        .then((menuData) => {
            console.log(menuData)
            setMenuItems(menuData)
        })
    }, [])

    const renderMenuItems = (category) => menuItems.map(item => {
        if (item.category == category) {
            return <MenuItem item={item} />
        }
    })

    return (
        <div id="menuDiv">
            <div id="menuHeader" class="menuItemsDiv">
                <h1 class="pageTitle">Menu Page</h1>
                <p class="menuDescription">
                    <span>Below we have a large selection of delicious appetizers, meals, deserts, and drinks.</span>
                    <br></br>
                    <span>Whether you are just taking a look, getting ready to place a carryout order, or just want it delivered straight to your door this is the place to be!</span>
                    <br></br>
                    <span>If you would like to place an order, consider creating an account to earn points towards future orders!</span>
                </p>
            </div>
            <div id="appsMenuDiv" class="menuItemsDiv">
                <h2 class="menuDivCategory">Appetizers</h2>
                {renderMenuItems("Appetizer")}
            </div>
            <div id="pastasMenuDiv" class="menuItemsDiv">
                <h2 class="menuDivCategory">Pastas</h2>
                {renderMenuItems("Pasta")}
            </div>
            <div id="pizzasMenuDiv" class="menuItemsDiv">
                <h2 class="menuDivCategory">Pizzas</h2>
                {renderMenuItems("Pizza")}
            </div>
            <div id="desertsMenuDiv" class="menuItemsDiv">
                <h2 class="menuDivCategory">Deserts</h2>
                {renderMenuItems("Desert")}
            </div>
            <div id="beveragesMenuDiv" class="menuItemsDiv">
                <h2 class="menuDivCategory">Beverages</h2>
                {renderMenuItems("Beverage")}
            </div>
        </div>
    )
}

export default Menu
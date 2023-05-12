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
            <div id="menuHeader" className="menuItemsDiv">
                <h1 className="pageTitle">Menu Page</h1>
                <p className="menuDescription">
                    <span>Below we have a large selection of delicious appetizers, meals, deserts, and drinks.</span>
                    <br></br>
                    <span>Whether you are just taking a look, getting ready to place a carryout order, or just want it delivered straight to your door this is the place to be!</span>
                    <br></br>
                    <span>If you would like to place an order, consider creating an account to earn points towards future orders!</span>
                </p>
            </div>
            <div id="appsMenuDiv" className="menuItemsDiv">
                <h2 className="menuDivCategory">Appetizers</h2>
                {renderMenuItems("Appetizer")}
            </div>
            <div id="pastasMenuDiv" className="menuItemsDiv">
                <h2 className="menuDivCategory">Pastas</h2>
                {renderMenuItems("Pasta")}
            </div>
            <div id="pizzasMenuDiv" className="menuItemsDiv">
                <h2 className="menuDivCategory">Pizzas</h2>
                {renderMenuItems("Pizza")}
            </div>
            <div id="desertsMenuDiv" className="menuItemsDiv">
                <h2 className="menuDivCategory">Deserts</h2>
                {renderMenuItems("Desert")}
            </div>
            <div id="beveragesMenuDiv" className="menuItemsDiv">
                <h2 className="menuDivCategory">Beverages</h2>
                {renderMenuItems("Beverage")}
            </div>
        </div>
    )
}

export default Menu
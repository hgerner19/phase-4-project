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

    const renderApps = menuItems.map(item => {
        if (item.category == "Appetizer") {
            return <MenuItem item={item} />
        }
    })

    const renderPastas = menuItems.map(item => {
        if (item.category == "Pasta") {
            return <MenuItem item={item} />
        }
    })

    const renderPizzas = menuItems.map(item => {
        if (item.category == "Pizza") {
            return <MenuItem item={item} />
        }
    })

    const renderDeserts = menuItems.map(item => {
        if (item.category == "Desert") {
            return <MenuItem item={item} />
        }
    })

    return (
        <div id="menuDiv">
            <h1 class="pageTitle">Menu Page</h1>
            <h2 class="menuDivCategory">Appetizers</h2>
            {renderApps}
            <h2 class="menuDivCategory">Pasta</h2>
            {renderPastas}
            <h2 class="menuDivCategory">Pizza</h2>
            {renderPizzas}
            <h2 class="menuDivCategory">Desert</h2>
            {renderDeserts}
        </div>
    )
}

export default Menu
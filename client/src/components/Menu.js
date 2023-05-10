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
        <>
            <h1>Menu Page</h1>
            <h2>Appetizers</h2>
            {renderApps}
            <h2>Pasta</h2>
            {renderPastas}
            <h2>Pizza</h2>
            {renderPizzas}
            <h2>Desert</h2>
            {renderDeserts}
        </>
    )
}

export default Menu
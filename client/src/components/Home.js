import {useEffect, useState} from "react"

import Menu from "./Menu.js"


const Home = () => {

    return (
        <>
            <div id="homepageDiv">
                <h1 class="pageTitle">Welcome to Our Restaurant!</h1>
                <h3>Insert about us section or something along those lines here.</h3>
            </div>
            <Menu />
        </>
    )
}

export default Home
import React from 'react'
import ProductListPage from '../components/productListPage/ProductListPage'
import NavBar from '../components/navbar/Navbar'

function page() {
    return (
        <>
            <div><NavBar /></div>
            <div><ProductListPage /></div>
        </>
    )
}

export default page
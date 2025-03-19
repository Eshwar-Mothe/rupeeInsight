import { Layout } from 'antd'
import React, { useState } from 'react'
import Navbar from './Components/Navbar'

const Expenses = () => {

    return (
        <>
            <Layout>
                <Navbar />
                <h4>Expenses</h4>
            </Layout>
        </>
    )
}

export default Expenses
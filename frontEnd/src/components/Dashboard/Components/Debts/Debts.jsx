import React from 'react'
import Navbar from '../Navbar'
import { Layout } from 'antd'
import DebtsChart from './DebtsChart'
import { Content } from 'antd/es/layout/layout'
import DebtTable from './DebtTable'

const Debts = () => {
  return (
    <>
    <Layout>
        <Navbar />
        <Layout>
          <Content>
            <header>
              <div className="section1">
                <h3>Debts</h3>
              </div>
            </header>
            <DebtsChart />
          </Content>
        </Layout>

        <Layout className='my-5 bg-light'>
          <Content className='text-end px-2'>
            <DebtTable />
          </Content>
        </Layout>
    </Layout>
</>
  )
}

export default Debts
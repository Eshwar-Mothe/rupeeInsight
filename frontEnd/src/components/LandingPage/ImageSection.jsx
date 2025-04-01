import React from 'react'
import ExploreButton from '../Common/ExploreButton'

const ImageSection = ({sectionRef}) => {
    return (
        <>
            <div ref={sectionRef} id='tax' className="imageContainer container">
                <div className="leftSection">
                        <h3 className='text-center '>Tax Calculation</h3>
                    <p className="content">
                        Tax calculation is an essential financial process that determines the amount of tax an individual or business owes based on income, expenses, and deductions. Various factors influence tax liabilities, including salary, investments, capital gains, and applicable exemptions. Governments impose different tax brackets, where higher earnings are taxed at progressively increasing rates.
                        Deductions such as medical expenses, retirement contributions, and home loan interest can reduce taxable income, lowering the overall tax burden. Businesses calculate taxes based on revenue, deducting operating costs, depreciation, and other eligible expenses. Proper tax planning ensures compliance while optimizing savings.
                        Understanding tax credits, rebates, and penalties is crucial to avoid overpayment or legal consequences. Efficient tax management involves maintaining accurate records, filing returns on time, and leveraging expert advice when necessary. Whether for individuals or businesses, precise tax calculation ensures financial stability and regulatory adherence.
                    </p>
                    <ExploreButton />
                </div>

                <div className="rightSection">
                    <img src="business.png" alt="" style={{ width: '100%', objectFit: 'contain' }} />
                </div>
            </div>
        </>
    )
}

export default ImageSection
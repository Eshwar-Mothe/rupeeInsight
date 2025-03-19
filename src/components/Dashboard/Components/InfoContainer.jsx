import React from 'react'

const InfoContainer = () => {
    return (
        <>
            <div className="infoContainer d-flex justify-content-between gap-5">

                <div id='income' className='revenue'>
                    <header className='d-flex justify-content-between gap-5'>
                        <div className="section1"><h6>Total income</h6></div>
                        <div className="section2"><img src='sprite1.png' style={{width:'25px', height:'25px', objectFit:'cover'}} alt='image'/></div>
                    </header>
                    <p id='amount'>&#8377;<span>4000</span></p>
                    <p id="change" className='infoLine' ><span id='percentage'>+10%</span><span className='arrow'>&uarr;</span> from last month</p>
                </div>

                <div className="expenses" id='expenses'>
                    <header className='d-flex justify-content-between gap-5'>
                        <div className="section1"><h6>Expenses</h6></div>
                        <div className="section2"><img src='sprite2.png' style={{width:'25px', height:'25px', objectFit:'cover'}} alt='image'/></div>
                    </header>
                    <p id='amount'>&#8377;<span>4000</span></p>
                    <p id="change" className='infoLine' ><span id='percentage'>+10%</span><span className='arrow'>&uarr;</span> from last month</p>
                </div>

                <div id='dets' className="debts">
                    <header className='d-flex justify-content-between gap-5'>
                        <div className="section1"><h6>Debts</h6></div>
                        <div className="section2"><img src='sprite3.png' style={{width:'25px', height:'25px', objectFit:'cover'}} alt='image'/></div>
                    </header>
                    <p id='amount'>&#8377;<span>4000</span></p>
                    <p id="change" className='infoLine' ><span id='percentage'>+10%</span><span className='arrow'>&uarr;</span> from last month</p>
                </div>

                <div className="savings" id='investments'>
                    <header className='d-flex justify-content-between gap-5'>
                        <div className="section1"><h6>Investments</h6></div>
                        <div className="section2"><img src='sprite4.png' style={{width:'25px', height:'25px', objectFit:'cover'}} alt='image'/></div>
                    </header>
                    <p id='amount'>&#8377;<span>4000</span></p>
                    <p id="change" className='infoLine' ><span id='percentage'>+10%</span><span className='arrow'>&uarr;</span> from last month</p>
                </div>
            </div>

        </>
    )
}
export default InfoContainer
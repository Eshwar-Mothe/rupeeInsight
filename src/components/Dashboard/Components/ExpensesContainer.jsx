import React from 'react'
import { GoArrowDownLeft,GoArrowUpRight } from "react-icons/go";
import { Link } from 'react-router-dom';
const Expenses = () => {
    return (
        <>
            <div className="expensesContainer">
                <header className='d-flex justify-content-between align-items-center gap-5 '>
                    <div className="section1">
                        <h6>Recent Transactions</h6>
                        <p>Your last 5 transactions</p>
                    </div>

                    <div className="filter">
                        <Link to={'/expenses'}><button>View All</button></Link>
                    </div>
                </header>

                <div className="transactions">
                    <div className="d-flex align-items-center justify-content-between  px-4 py-2">
                        <div className="d-flex align-items-center gap-3">
                                <div className="transType debit">
                                    <GoArrowDownLeft />
                                </div>
                            <div>
                                <h6 className="title">Swiggy Ltd</h6>
                                <p className="trans">Paid on <span id='transDateTime'>16 March 2025, 16:48</span></p> {/* Need to change the className */}
                            </div>
                        </div>

                        <div className="transactionAmount debit">- &#8377;1,999.00</div>
                    </div>

                    <div className="d-flex align-items-center justify-content-between  px-4 py-2">
                        <div className="d-flex align-items-center gap-3">
                                <div className="transType credit">
                                    <GoArrowUpRight />
                                </div>
                            <div>
                                <h6 className="title">Swiggy Ltd</h6>
                                <p className="trans">Paid on <span id='transDateTime'>16 March 2025, 16:48</span></p> {/* Need to change the className */}
                            </div>
                        </div>

                        <div className="transactionAmount credit">- &#8377;1,999.00</div>
                    </div>

                    <div className="d-flex align-items-center justify-content-between  px-4 py-2">
                        <div className="d-flex align-items-center gap-3">
                                <div className="transType debit">
                                    <GoArrowDownLeft />
                                </div>
                            <div>
                                <h6 className="title">Swiggy Ltd</h6>
                                <p className="trans">Paid on <span id='transDateTime'>16 March 2025, 16:48</span></p> {/* Need to change the className */}
                            </div>
                        </div>

                        <div className="transactionAmount debit">- &#8377;1,999.00</div>
                    </div>

                    <div className="d-flex align-items-center justify-content-between  px-4 py-2">
                        <div className="d-flex align-items-center gap-3">
                                <div className="transType credit">
                                    <GoArrowUpRight />
                                </div>
                            <div>
                                <h6 className="title">Swiggy Ltd</h6>
                                <p className="trans">Paid on <span id='transDateTime'>16 March 2025, 16:48</span></p> {/* Need to change the className */}
                            </div>
                        </div>

                        <div className="transactionAmount credit">- &#8377;1,999.00</div>
                    </div>

                    <div className="d-flex align-items-center justify-content-between  px-4 py-1">
                        <div className="d-flex align-items-center gap-3">
                                <div className="transType debit">
                                    <GoArrowDownLeft />
                                </div>
                            <div>
                                <h6 className="title">Swiggy Ltd</h6>
                                <p className="trans">Paid on <span id='transDateTime'>16 March 2025, 16:48</span></p> {/* Need to change the className */}
                            </div>
                        </div>

                        <div className="transactionAmount debit">- &#8377;1,999.00</div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Expenses
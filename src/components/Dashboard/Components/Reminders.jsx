import React from 'react'
import { Link } from 'react-router-dom'

const Reminders = () => {
    return (
        <>
            <div className='reminders py-3 '>
                <header className='d-flex justify-content-between align-items-center gap-5 my-2'>
                    <div className="section1">
                    <h2>Reminders</h2>
                    </div>
                    <div className="filter">
                        <Link to={'/expenses'}><button>View All</button></Link>
                    </div>
                </header>

                <div className='reminder d-flex justify-content-between align-items-center gap-5 py-2'>
                    <div className='reminderDetails d-flex gap-5 align-items-center'>
                        <h6 id='S.no'>01</h6>
                        <h6 id='reminderCategory'>Subscriptions</h6>
                        <h6 id='reminderTitle'>Amazon Prime</h6>
                        <h6 id='reminderDuration'>Yearly</h6>
                        <h6 id='dueDate'>Due: 10/05/2025</h6>
                        <h6 id='price'>&#8377;1600/-</h6>
                    </div>
                    <div className="actionButtons d-flex gap-3">
                        <button>payment Done</button>
                        <button>Snooze</button>
                        <button>Edit</button>
                        <button>Delete</button>
                    </div>
                </div>

                <div className='reminder d-flex justify-content-between align-items-center gap-5 py-2'>
                    <div className='reminderDetails d-flex gap-5 align-items-center justify-content-center'>
                        <h6 id='S.no'>02</h6>
                        <h6 id='reminderCategory'>Subscriptions</h6>
                        <h6 id='reminderTitle'>Netflix</h6>
                        <h6 id='reminderDuration'>Monthly</h6>
                        <h6 id='dueDate'>Due: 21/03/2025</h6>
                        <h6 id='price'>&#8377;600/-</h6>
                    </div>
                    <div className="actionButtons d-flex gap-3">
                        <button>payment Done</button>
                        <button>Snooze</button>
                        <button>Edit</button>
                        <button>Delete</button>
                    </div>
                </div>

                <div className='reminder d-flex justify-content-between align-items-center gap-5 py-2'>
                    <div className='reminderDetails d-flex gap-5 align-items-center justify-content-center'>
                        <h6 id='S.no'>03</h6>
                        <h6 id='reminderCategory'>Recharge</h6>
                        <h6 id='reminderTitle'>Postpaid</h6>
                        <h6 id='reminderDuration'>Monthly</h6>
                        <h6 id='dueDate'>Due: 16/05/2025</h6>
                        <h6 id='price'>&#8377;1100/-</h6>
                    </div>
                    <div className="actionButtons d-flex gap-3">
                        <button>payment Done</button>
                        <button>Snooze</button>
                        <button>Edit</button>
                        <button>Delete</button>
                    </div>
                </div>
                <div className='reminder d-flex justify-content-between align-items-center gap-5 py-2'>
                    <div className='reminderDetails d-flex gap-5 align-items-center justify-content-center'>
                        <h6 id='S.no'>04</h6>
                        <h6 id='reminderCategory'>Insurance</h6>
                        <h6 id='reminderTitle'>Health</h6>
                        <h6 id='reminderDuration'>Monthly</h6>
                        <h6 id='dueDate'>Due: 26/12/2025</h6>
                        <h6 id='price'>&#8377;6000/-</h6>
                    </div>
                    <div className="actionButtons d-flex gap-3">
                        <button>payment Done</button>
                        <button>Snooze</button>
                        <button>Edit</button>
                        <button>Delete</button>
                    </div>
                </div>
                <div className='reminder d-flex justify-content-between align-items-center gap-5 py-2'>
                    <div className='reminderDetails d-flex gap-5 align-items-center justify-content-center'>
                        <h6 id='S.no'>05</h6>
                        <h6 id='reminderCategory'>Loan</h6>
                        <h6 id='reminderTitle'>Muthoot Gold Finanace</h6>
                        <h6 id='reminderDuration'>Monthly</h6>
                        <h6 id='dueDate'>Due: 06/06/2025</h6>
                        <h6 id='price'>&#8377;2000/-</h6>
                    </div>
                    <div className="actionButtons d-flex gap-3">
                        <button>payment Done</button>
                        <button>Snooze</button>
                        <button>Edit</button>
                        <button>Delete</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Reminders
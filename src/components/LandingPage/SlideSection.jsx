import React from 'react'
import { Carousel } from 'antd';
const SlideSection = () => {
    const contentStyle = {
        height: '360px',
        color: '#fff',
        lineHeight: '360px',
        textAlign: 'center',
        background: '#adadad',
    };
    return (
        <>
            <div className="container carousel my-5">
                <h3 className='text-center'>Features</h3>
                <Carousel
                    autoplay={{
                        dotDuration: true,
                        dotColor: 'red'
                    }}
                    autoplaySpeed={5000}
                    >
                    <div >
                        <div className="card-container px-5 py-3 ">
                            <div className='content'>
                                <p >Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facilis ipsam nam earum qui maxime aliquam, quisquam corporis consequatur quaerat error. Modi quisquam voluptatem magnam omnis veniam numquam dicta deserunt itaque.
                                    Nostrum rerum, voluptatum delectus, atque a culpa, ut facilis iure laudantium velit repellat neque quisquam id. Quidem, possimus rerum aliquid libero, fuga in adipisci necessitatibus ducimus soluta temporibus harum. Earum.</p>
                            </div>
                            <div>
                                <img className='image' src="" alt="" width={300} height={300} />
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="card-container px-5 py-3 ">
                            <div className='content'>
                                <p  >Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facilis ipsam nam earum qui maxime aliquam, quisquam corporis consequatur quaerat error. Modi quisquam voluptatem magnam omnis veniam numquam dicta deserunt itaque.
                                    Nostrum rerum, voluptatum delectus, atque a culpa, ut facilis iure laudantium velit repellat neque quisquam id. Quidem, possimus rerum aliquid libero, fuga in adipisci necessitatibus ducimus soluta temporibus harum. Earum.</p>
                            </div>
                            <div>
                                <img className='image' src="" alt="" width={300} height={300} />
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="card-container px-5 py-3 ">
                            <div className='content'>
                                <p  >Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facilis ipsam nam earum qui maxime aliquam, quisquam corporis consequatur quaerat error. Modi quisquam voluptatem magnam omnis veniam numquam dicta deserunt itaque.
                                    Nostrum rerum, voluptatum delectus, atque a culpa, ut facilis iure laudantium velit repellat neque quisquam id. Quidem, possimus rerum aliquid libero, fuga in adipisci necessitatibus ducimus soluta temporibus harum. Earum.</p>
                            </div>
                            <div>
                                <img className='image' src="" alt="" width={300} height={300} />
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="card-container px-5 py-3 ">
                            <div className='content'>
                                <p  >Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facilis ipsam nam earum qui maxime aliquam, quisquam corporis consequatur quaerat error. Modi quisquam voluptatem magnam omnis veniam numquam dicta deserunt itaque.
                                    Nostrum rerum, voluptatum delectus, atque a culpa, ut facilis iure laudantium velit repellat neque quisquam id. Quidem, possimus rerum aliquid libero, fuga in adipisci necessitatibus ducimus soluta temporibus harum. Earum.</p>
                            </div>
                            <div>
                                <img className='image' src="" alt="" width={300} height={300} />
                            </div>
                        </div>
                    </div>
                </Carousel>
            </div>
        </>
    )
}

export default SlideSection
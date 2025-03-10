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
            <div id='features' className="container carousel">
                <h3 className='text-center'>Features</h3>
                <Carousel
                    autoplay={{
                        dotDuration: true,
                        dotColor: 'red'
                    }}
                    autoplaySpeed={5000}
                    >
                    <div >
                        <div className="card-container px-3 py-1 ">
                            <div className='content'>
                                <p >Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facilis ipsam nam earum qui maxime aliquam, quisquam corporis consequatur quaerat error. Modi quisquam voluptatem magnam omnis veniam numquam dicta deserunt itaque.
                                    Nostrum rerum, voluptatum delectus, atque a culpa, ut facilis iure laudantium velit repellat neque quisquam id. Quidem, possimus rerum aliquid libero, fuga in adipisci necessitatibus ducimus soluta temporibus harum. Earum.</p>
                            </div>
                            <div>
                                <img className='image' src="./feature1.png" alt="" style={{width:'100%',objectFit:'cover'}} />
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="card-container px-3 py-1 ">
                            <div className='content'>
                                <p  >Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facilis ipsam nam earum qui maxime aliquam, quisquam corporis consequatur quaerat error. Modi quisquam voluptatem magnam omnis veniam numquam dicta deserunt itaque.
                                    Nostrum rerum, voluptatum delectus, atque a culpa, ut facilis iure laudantium velit repellat neque quisquam id. Quidem, possimus rerum aliquid libero, fuga in adipisci necessitatibus ducimus soluta temporibus harum. Earum.</p>
                            </div>
                            <div>
                                <img className='image' src="./feature2.png" alt="" style={{width:'100%',objectFit:'cover'}}/>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="card-container px-3 py-1 ">
                            <div className='content'>
                                <p  >Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facilis ipsam nam earum qui maxime aliquam, quisquam corporis consequatur quaerat error. Modi quisquam voluptatem magnam omnis veniam numquam dicta deserunt itaque.
                                    Nostrum rerum, voluptatum delectus, atque a culpa, ut facilis iure laudantium velit repellat neque quisquam id. Quidem, possimus rerum aliquid libero, fuga in adipisci necessitatibus ducimus soluta temporibus harum. Earum.</p>
                            </div>
                            <div>
                                <img className='image' src="./feature3.png" alt="" style={{width:'100%',objectFit:'cover'}} />
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="card-container px-3 py-1 ">
                            <div className='content'>
                                <p  >Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facilis ipsam nam earum qui maxime aliquam, quisquam corporis consequatur quaerat error. Modi quisquam voluptatem magnam omnis veniam numquam dicta deserunt itaque.
                                    Nostrum rerum, voluptatum delectus, atque a culpa, ut facilis iure laudantium velit repellat neque quisquam id. Quidem, possimus rerum aliquid libero, fuga in adipisci necessitatibus ducimus soluta temporibus harum. Earum.</p>
                            </div>
                            <div>
                                <img className='image' src="./feature4.png" alt=""  style={{width:'100%',objectFit:'cover'}} />
                            </div>
                        </div>
                    </div>
                </Carousel>
            </div>
        </>
    )
}

export default SlideSection
import React from 'react'

const ImageSection = () => {
  return (
    <>
            <h3 className='text-center my-5'>Tax Calculation</h3>
        <div id='taxCal' className="imageContainer container text-center">
            <div className="leftSection">
                <p className="content">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum dolor reiciendis enim rerum odit necessitatibus odio accusantium delectus quam amet sunt non deleniti praesentium distinctio illo obcaecati ullam, provident vero.
                    Et omnis atque, eaque, eius rerum, nihil assumenda maxime cumque dolore fuga soluta vitae delectus? Doloremque veniam minima minus atque quidem, laboriosam natus, eos sint accusamus quod eaque cupiditate autem!
                    Vitae quasi magnam distinctio soluta similique quis doloremque repellendus error, doloribus impedit pariatur eius quam beatae. Pariatur sunt ipsam ducimus incidunt illo placeat optio laborum quibusdam odio? Placeat, alias vel?
                </p>
            </div>
            <div className="rightSection">
                <img src="business.png" alt=""  style={{ width:'100%',height: '70vh', objectFit:'contain' }}/>
            </div>
        </div>
    </>
  )
}

export default ImageSection
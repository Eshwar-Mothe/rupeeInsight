import React from 'react'
import ExploreButton from '../Common/ExploreButton';

const Features = () => {

    const cardsData = [
        { image: "feature1.png", content: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dicta laboriosam ad est perspiciatis et accusamus molestiae, pariatur quas odio, quasi saepe, cumque illum vitae delectus eos sit temporibus? Assumenda, commodi?" },
        { image: "feature2.png", content: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dicta laboriosam ad est perspiciatis et accusamus molestiae, pariatur quas odio, quasi saepe, cumque illum vitae delectus eos sit temporibus? Assumenda, commodi?" },
        { image: "feature3.png", content: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dicta laboriosam ad est perspiciatis et accusamus molestiae, pariatur quas odio, quasi saepe, cumque illum vitae delectus eos sit temporibus? Assumenda, commodi?" },
        { image: "feature4.png", content: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dicta laboriosam ad est perspiciatis et accusamus molestiae, pariatur quas odio, quasi saepe, cumque illum vitae delectus eos sit temporibus? Assumenda, commodi?" }
    ];
    return (
        <>
            <div id='facts' className="container text-center">

                <h1>Why RupeeInsight</h1>
                <div className="container d-flex p-2 justify-content-around align-items-stretch gap-5">
                    <div className='feature-image'>
                        <img src="man_think.png" alt="" style={{ width: '100%',height:'100%', objectFit: 'cover' }} />
                    </div>
                    <div className="card-section">
                        {cardsData.map((card, index) => (
                            <div key={index} className={`card card${index + 1} text-center position-relative overflow-hidden`} style={{ width: "100%" }}>
                                <img
                                    src={card.image}
                                    alt="featureImage"
                                    className="card-image-top"
                                    
                                />
                                <div className="card-body overlay">
                                    <p className="card-content">{card.content}</p>
                                    <ExploreButton />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Features
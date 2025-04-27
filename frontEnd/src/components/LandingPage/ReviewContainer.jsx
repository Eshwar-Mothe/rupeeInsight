import React from 'react';

const ReviewContainer = () => {
    const reviews = [
        {
            id: 1,
            name: "Aarav Mehta",
            image: "https://randomuser.me/api/portraits/men/31.jpg",
            content: "This project is amazing! The dashboard UI is intuitive and really helped me understand my finances better."
        },
        {
            id: 2,
            name: "Sneha Reddy",
            image: "https://randomuser.me/api/portraits/women/44.jpg",
            content: "Loved the features and smooth experience. Especially the way investments and debts are visualized is top-notch!"
        },
        {
            id: 3,
            name: "Rohan Verma",
            image: "https://randomuser.me/api/portraits/men/55.jpg",
            content: "The insights and comparisons with previous months are very useful. Helped me reduce unnecessary expenses!"
        },
        {
            id: 4,
            name: "Priya Nair",
            image: "https://randomuser.me/api/portraits/women/68.jpg",
            content: "Clean design and accurate data tracking. Exactly what I needed to manage my monthly budget."
        },
        {
            id: 5,
            name: "Kunal Sharma",
            image: "https://randomuser.me/api/portraits/men/22.jpg",
            content: "Fantastic app! I’ve used many trackers before but this one feels the most personalized and efficient."
        },
        {
            id: 6,
            name: "Ananya Iyer",
            image: "https://randomuser.me/api/portraits/women/36.jpg",
            content: "Easy to use and full of smart features. The reminders and category segregation are super helpful."
        }
    ];

    return (
        <div className="container mt-4">
            <div className="row">
                {reviews.map((item) => (
                    <div key={item.id} className="col-md-4 mb-4 d-flex">
                        <div className="card reviewCard p-5 w-100">
                            <div className="d-flex align-items-start">
                                <img
                                    src={item.image}
                                    alt="reviewer"
                                    className="rounded-circle me-3"
                                    style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                                />
                                <div>
                                    <p className="mb-2">"{item.content}"</p>
                                    <p className="fw-bold text-end mb-0">#_{item.name}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ReviewContainer;

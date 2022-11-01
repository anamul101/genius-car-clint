import React from 'react';

const ServicesCart = ({service}) => {
    const {service_id,title,img,price,description,facility} = service;
    return (
        <div className="card card-compact w-96 bg-base-100 shadow-xl">
            <figure><img src={img} alt="serviceimg" /></figure>
            <div className="card-body">
                <h2 className="card-title">{title}</h2>
                <p className='font-bold text-orange-600'>Price: $ {price}</p>
                <div className="card-actions justify-end">
                <button className="btn btn-primary">Buy Now</button>
                </div>
            </div>
        </div>
    );
};

export default ServicesCart;
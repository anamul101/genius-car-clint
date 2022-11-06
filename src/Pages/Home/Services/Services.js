import React, { useEffect, useState } from 'react';
import ServicesCart from './ServicesCart';

const Services = () => {
    const [services, setServices] = useState([]);
    useEffect(()=>{
        fetch('https://genius-car-server-three-tau.vercel.app/services')
        .then(res=>res.json())
        .then(data=>setServices(data))
    },[])
    return (
        <div className='my-12'>
            <div className='text-center mb-4'>
                <p className="text-2xl font-bold text-orange-600">Services</p>
                <p className="text-5xl font-bold">Our Service Area</p>
                <p>the majority have suffered alteration in some form, by injected humour, <br /> or randomised words which don't look even slightly believable. </p>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-5'>
                {
                    services.map(service=><ServicesCart
                        key={service._id}
                        service={service}
                    ></ServicesCart>)
                }
            </div>
        </div>
    );
};

export default Services;
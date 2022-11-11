import React, { useEffect, useState } from 'react';
import { useRef } from 'react';
import ServicesCart from './ServicesCart';

const Services = () => {
    const [services, setServices] = useState([]);
    const [isAsc , setISAsc] = useState(true);
    const searcheRef = useRef();
    const [search, setSearch] = useState('')
    useEffect(()=>{
        fetch(`https://genius-car-server-three-tau.vercel.app/services?search=${search}&order=${isAsc?"Asc":"Desc"}`)
        .then(res=>res.json())
        .then(data=>setServices(data))
    },[isAsc,search])
    const handelSearchbtn = ()=>{
        setSearch(searcheRef.current.value)
    }
    return (
        <div className='my-12'>
            <div className='text-center mb-4'>
                <p className="text-2xl font-bold text-orange-600">Services</p>
                <p className="text-5xl font-bold">Our Service Area</p>
                <p>the majority have suffered alteration in some form, by injected humour, <br /> or randomised words which don't look even slightly believable. </p>
                <input ref={searcheRef} type="text" placeholder="find order" className="input input-bordered input-sm w-full max-w-xs ml-2" />
                <button onClick={handelSearchbtn} className="btn btn-sm">Searche</button>
                <button className='btn btn-sm ml-4 btn-warning' onClick={()=>setISAsc(!isAsc)}>{isAsc?"Desc":"Asc"}</button>
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
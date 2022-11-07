import React from 'react';
import { Link } from 'react-router-dom';

const BannerItems = ({slide}) => {
    const {image,prev,next,id} = slide;
    return (
        <div id={`slide${id}`} className="carousel-item relative w-full">
                <div className='carousel-img'>
                    <img src={image} className=" w-full rounded-lg"alt='img'/>
                </div>
                <div className="absolute flex justify-end transform -translate-y-1/2 left-24 top-1/4">
                    <h1 className='text-6xl font-bold text-white'>
                        Affordabol <br />
                        Price for car <br />
                        Servicing
                    </h1>
                </div>
                <div className="absolute flex justify-end transform -translate-y-1/2 left-24 w-2/5 top-1/2">
                    <p className='text-xl text-white'>There are many variations of passages of  available, but the majority have suffered alteration in some form</p>
                </div>
                <div className="absolute flex justify-start transform -translate-y-1/2 left-24 w-2/5 top-2/3">
                    <button className="btn btn-warning mr-5">Get Start</button>
                    <Link to='/orders'>
                        <button className="btn btn-outline btn-warning">Orders</button>
                    </Link>
                </div>
                <div className="absolute flex justify-end transform -translate-y-1/2 left-5 right-5 bottom-0">
                <a href={`#slide${prev}`} className="btn btn-circle mr-5">❮</a> 
                <a href={`#slide${next}`} className="btn btn-circle bg-yellow-500 bouder-0 text-black hover:text-white">❯</a>
                </div>
            </div> 
    );
};

export default BannerItems;
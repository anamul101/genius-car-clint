import React, { useContext } from 'react';
import { useLoaderData } from 'react-router-dom';
import { AuthContext } from '../../Contexts/AuthProvider';

const Checkout = () => {
    const {_id, price, title} = useLoaderData();
    const {user} = useContext(AuthContext);
    const handelOrder =(event)=>{
        event.preventDefault();
        const form = event.target;
        const name = `${form.firstName.value} ${form.lastName.value}`;
        const email = user?.email || "unregister"
        const phone = form.phone.value;
        const message = form.message.value;

        const order={
            services: _id,
            servicesName: title,
            price,
            customer: name,
            email,
            phone,
            message

        }
        fetch('http://localhost:5000/orders',{
            method:'POST',
            headers:{
                "content-type":"application/json"
            },
            body: JSON.stringify(order)
        })
        .then(res=>res.json())
        .then(data=>{
            if(data.acknowledged){
                alert('Order Sussesfully');
                form.reset();
            }
            console.log(data);
        })
        .catch(error=>console.error(error))
        
    }
    return (
        <div className='my-20'>
            <form onSubmit={handelOrder}>
               <div className='mb-5'>
                    <h1 className='text-4xl font-bold'>Your about to order: {title}</h1>
                    <p className='text-xl font-bold'>Price: ${price}</p>
               </div>

                <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
                <input type="text" name='firstName' placeholder="First Name" className="input input-bordered input-primary w-full" />
                <input type="text" name='lastName' placeholder="Last Name" className="input input-bordered input-primary w-full" />
                <input type="text" name='phone' placeholder="Your Phone" className="input input-bordered input-primary w-full" />
                <input type="text" name='email' placeholder="email" defaultValue={user?.email} className="input input-bordered input-primary w-full" readOnly/>
                </div>
                <textarea className="textarea textarea-primary w-full my-4" name='message' placeholder="Message"></textarea>
                <input type="submit" className="btn btn-primary" value="Order Now" />
            </form>
        </div>
    );
};

export default Checkout;
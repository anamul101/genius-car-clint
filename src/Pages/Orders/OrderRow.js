import React, { useEffect, useState } from 'react';

const OrderRow = ({order,handelDelete,handelUbdate}) => {
        const {_id, customer, servicesName,services,message,price,email,phone, status}= order;
        const [orderServices, setOrderServices] = useState({});

        useEffect(()=>{
            fetch(`http://localhost:5000/services/${services}`)
            .then(res=>res.json())
            .then(data=> setOrderServices(data));
        },[services])

        

    return (
        <tr>
                <th>
                    <label>
                        <button onClick={()=>handelDelete(_id)} className="btn btn-ghost">X</button>
                    </label>
                    </th>
                    <td>
                    <div className="flex items-center space-x-3">
                        <div className="avatar">
                        <div className="rounded w-24 h-24">
                        { orderServices?.img &&
                                <img src={orderServices.img} alt="Avatar" />
                        }

                        </div>
                        </div>
                        <div>
                        <div className="font-bold">{customer}</div>
                        <div className="text-sm opacity-50">{phone}</div>
                        </div>
                    </div>
                    </td>
                    <td>
                        {servicesName}
                    <br/>
                    <span className="badge badge-ghost badge-sm">$ {price}</span>
                    </td>
                    <td>{email}</td>
                    <th>
                    <button onClick={()=>handelUbdate(_id)} className="btn btn-ghost btn-xs">{status? status: 'pending'}</button>
                </th>
        </tr>
    );
};

export default OrderRow;
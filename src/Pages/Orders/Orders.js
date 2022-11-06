import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Contexts/AuthProvider';
import OrderRow from './OrderRow';

const Orders = () => {
    const {user,LogOut} = useContext(AuthContext);
    const [orders, setOrders] = useState([]);

    useEffect(()=>{

        fetch(`https://genius-car-server-three-tau.vercel.app/orders?email=${user?.email}`,{
            headers:{
                authorization:`bearer ${localStorage.getItem('geniousToken')}`
            }
        })
        .then(res=>{
            if(res.status === 401 || res.status === 403){
                LogOut();
            }
            return res.json()
        })
        .then(data=>{
            setOrders(data)
        })
    },[user?.email,LogOut])

    const handelDelete = (id)=>{
        const proced = window.confirm('are you sure? you want to delete');
        if(proced){
            fetch(`https://genius-car-server-three-tau.vercel.app/orders/${id}`,{
                method:'DELETE'
            })
            .then(res=>res.json())
            .then(data =>{
                console.log(data);
                if(data.deletedCount > 0){
                    alert('delet success');
                    const remainging = orders.filter(ord => ord._id !== id);
                    setOrders(remainging);
                }
            })
        }
    }
    const handelUbdate = (id)=>{
     
            fetch(`https://genius-car-server-three-tau.vercel.app/orders/${id}`,{
                method:'PATCH',
                headers:{
                    "content-type": "application/json"
                },
                body: JSON.stringify({status: 'Approve'})
            })
            .then(res=>res.json())
            .then(data =>{
                console.log(data);
                if(data.modifiedCount > 0){
                    const remmaing = orders.filter(odr => odr._id !== id);
                    const aproved = orders.find(odr => odr._id === id);
                    aproved.status = 'Approved';
                    const newUbdate = [aproved, ...remmaing];
                    setOrders(newUbdate);
                }
            })
        
    }
    return (
        <div>
            <h1 className="text-5xl">Your Orders: {orders.length}</h1>
            <div className="overflow-x-auto w-full">
            <table className="table w-full">
                <thead>
                <tr>
                    <th>
                    <label>
                        <input type="checkbox" className="checkbox" />
                    </label>
                    </th>
                    <th>Name</th>
                    <th>Order Items</th>
                    <th>Favorite Color</th>
                    <th>message</th>
                </tr>
                </thead>
                <tbody>
                    {
                      orders?.map(order => <OrderRow
                      key={order._id}
                      order={order}
                      handelDelete={handelDelete}
                      handelUbdate={handelUbdate}
                      ></OrderRow>)
                    }
                </tbody>
            </table>
            </div>
        </div>
    );
};

export default Orders;
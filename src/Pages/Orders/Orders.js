import React, { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
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
               
                if(data.deletedCount > 0){
                    toast.success('Delete Successful');
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
                    toast.success('Your Product Update')
                }
            })
        
    }
    return (
        <div className='my-20'>
            <h1 className="text-5xl mb-8 text-center text-orange-800">Your Orders: {orders.length}</h1>
            <div className="overflow-x-auto w-full">
            <table className="table w-full">
                <thead>
                <tr>
                    <th>
                    <label>
                        <input type="checkbox" className="checkbox" />
                    </label>
                    </th>
                    <th>Details</th>
                    <th>Order Items</th>
                    <th>Mail</th>
                    <th>Status</th>
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
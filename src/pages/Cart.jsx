import React from 'react'
import axios from 'axios'
export default function Cart({orderdMeals , handleRemoveFromCart , handleClearCart}) {
    console.log(orderdMeals);
    console.log(localStorage.getItem('reserve_info'));
    const handleAddReservation =()=>{
        const reserve_info = JSON.parse(localStorage.getItem('reserve_info')) ;
        const url = "http://localhost/riadapis/index.php?action=reserve";
        let fdata = new FormData();
        fdata.append('guests', reserve_info.guests);
        fdata.append('date', reserve_info.date);
        fdata.append('time', reserve_info.time);
        fdata.append('username', reserve_info.username);
        fdata.append('table_id', reserve_info.table_id);
        fdata.append("total_price" , orderdMeals.reduce((acc, meal) => acc + meal.price * meal.qt, 0));
        fdata.append('meals', JSON.stringify(orderdMeals));
        axios.post(url, fdata, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then((response) => {
            console.log(response.data); // Check the structure of the response
            if (response.data.status === "success" ) {
                console.log(response);
            } 
        })
        .catch((error) => {
            console.error("Error in request:", error);
            // setError("Failed to make the reservation. Please try again.");
        });
    }
  return (
    <div className=' z-30 bg-white bg-opacity-90 p-8 rounded-lg shadow-lg  absolute left-20 top-10 mt-40'>
            <div className="">
               {orderdMeals.map((meal,index)=>{
                return(
                    <div className="border-b border-1 border-black p-4">
                        <h1>{meal.name}</h1>
                        <p>{meal.description}</p>
                        <p className='font-bold text-green-800'>{meal.price} MAD</p>
                        <p>quantite:{meal.qt}</p>
                        <button className='bg-red-700  text-white rounded p-2' 
                        onClick={()=>handleRemoveFromCart(meal)}
                        >Remove</button>
                    </div>
                )
               })}
                <h3>Totale : {orderdMeals.reduce((acc, meal) => acc + meal.price * meal.qt, 0)}</h3>
            </div>
           { orderdMeals.length > 0 && <button className='bg-red-700  text-white rounded p-2 mx-auto container'  onClick={handleClearCart}>Clear</button>}
           {orderdMeals.length > 0 && <button className='bg-green-700  text-white rounded p-2 mx-auto container' onClick={handleAddReservation}>Reserve</button>}
    </div>
  )
}

import './Cart.css';
import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { useCart, useDispatchCart } from '../components/ContextReducer';

export default function Cart() {
  let data = useCart();
  let dispatch = useDispatchCart();

  if (data.length === 0) {
    return (
      <div>
        <div className='m-5 w-100 text-center fs-3'>The Cart is Empty!</div>
      </div>
    );
  }

  const handleCheckOut = async () => {
    let userEmail = localStorage.getItem("userEmail");
  
    try {
      let response = await fetch("http://localhost:5000/api/orderData", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          order_data: data,
          email: userEmail,
          order_date: new Date().toDateString(),
        }),
      });
  
      // Log response status
      console.log("Response status:", response.status);
      
      // If the response is not OK, throw an error
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const responseData = await response.json();
      console.log("Order Response:", responseData); // Log the successful response
  
      // Clear cart on successful response
      if (response.status === 200) {
        dispatch({ type: "DROP" });
      }
    } catch (error) {
      // Log the error
      console.error("Failed to place order:", error);
      alert("Failed to place order. Please try again.");
    }
  };
  
  

  let totalPrice = data.reduce((total, food) => total + food.price, 0);

  return (
    <div>
      <div className='container m-auto mt-5 table-responsive'>
        <table className='table'>
          <thead className='text-success fs-4'>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Quantity</th>
              <th>Option</th>
              <th>Amount</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data.map((food, index) => (
              <tr key={index} className="white-text">
  <th>{index + 1}</th>
  <td>{food.name}</td>
  <td>{food.qty}</td>
  <td>{food.size}</td>
  <td>{food.price}</td>
  <td>
    <button className="btn p-0 text-success">
      <DeleteIcon onClick={() => dispatch({ type: "REMOVE", index: index })} />
    </button>
  </td>
</tr>

            ))}
          </tbody>
        </table>
        <div><h1 className='fs-2'>Total Price: {totalPrice}/-</h1></div>
        <div>
          <button className='btn bg-success mt-5' onClick={handleCheckOut}>Check Out</button>
        </div>
      </div>
    </div>
  );
}

import React, { useEffect, useState, useRef } from 'react';
import { useDispatchCart, useCart } from './ContextReducer';

export default function Card(props) {
  const dispatch = useDispatchCart();
  const data = useCart();
  const priceRef = useRef();
  
  // Default options to an empty object if not provided
  const options = props.options || {};
  const priceOptions = Object.keys(options);

  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");

  // Final price calculation
  const finalPrice = qty * parseInt(options[size] || 0);

  // Add to cart or update item in cart
  const handleAddToCart = async () => {
    // Check if the item already exists in the cart
    const foodItem = data.find(item => item.id === props.foodItem._id && item.size === size);

    if (foodItem) {
      // Update item in cart if it exists
      await dispatch({
        type: "UPDATE",
        id: props.foodItem._id,
        price: finalPrice,
        qty: qty,
        size: size
      });
    } else {
      // Add new item to cart
      await dispatch({
        type: "ADD",
        id: props.foodItem._id,
        name: props.foodItem.name,
        price: finalPrice,
        qty: qty,
        size: size
      });
    }
  };

  useEffect(() => {
    if (priceOptions.length > 0) {
      setSize(priceOptions[0]); // Set default size when component mounts
    }
  }, [priceOptions]);

  return (
    <div>
      <div className="card mt-3" style={{ width: '18rem', maxHeight: '360px' }}>
        <img
          src={props.foodItem.img || "/paneer naan.jpg"}
          className="card-img-top"
          alt={props.foodItem.name}
          style={{ height: "140px", objectFit: "fill" }}
        />
        <div className="card-body">
          <h5 className="card-title">{props.foodItem.name}</h5>

          {/* Quantity Select */}
          <div className="container w-100"></div>
          <select
            className="m-2 h-100 bg-success rounded"
            onChange={(e) => setQty(e.target.value)}
          >
            {Array.from(Array(6), (e, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>

          {/* Size Select */}
          <select
            className="m-2 h-100 bg-success rounded"
            ref={priceRef}
            onChange={(e) => setSize(e.target.value)}
          >
            {priceOptions.map((data) => (
              <option key={data} value={data}>
                {data}
              </option>
            ))}
          </select>

          {/* Final Price */}
          <div className="d-inline h-100 fs-5">₹{finalPrice}/-</div>
        </div>
        <hr />
        <button
          className="btn btn-success justify-center ms-2"
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

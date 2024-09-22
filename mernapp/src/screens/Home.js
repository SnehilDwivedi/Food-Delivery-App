// Home.js

import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Card from "../components/Card";
import Footer from "../components/Footer";

export default function Home() {
  const [search, setSearch] = useState('');
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);

  // Fetch data from the backend
  const loadData = async () => {
    try {
      let response = await fetch("http://localhost:5000/api/foodData", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        }
      });

      response = await response.json();
      console.log(response); // Check response data in console

      setFoodItem(response[0]);
      setFoodCat(response[1]);
    } catch (error) {
      console.error("Error fetching food data:", error);
    }
  };

  // Load data on component mount
  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      {/* Navbar */}
      <Navbar />

      {/* Search Bar */}
      <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel">
        <div className="carousel-inner" id="carousel">
          <div className="carousel-caption" style={{ zIndex: "10" }}>
            <div className="d-flex justify-content-center">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={search}
                onChange={(e) => { setSearch(e.target.value) }}
              />
            </div>
          </div>

          {/* Carousel Items */}
          <div className="carousel-item active">
            <img src="/handi.jpg" className="d-block w-100" alt="..." />
          </div>
          <div className="carousel-item">
            <img src="/chicken.jpg" className="d-block w-100" alt="..." />
          </div>
          <div className="carousel-item">
            <img src="/burger.jpg" className="d-block w-100" alt="..." />
          </div>
        </div>

        {/* Carousel Controls */}
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      {/* Main Content */}
      <div className="container">
        {
          foodCat.length > 0
            ? foodCat.map((data) => (
              <div className='row mb-3' key={data._id}>
                <div className="fs-3 m-3">{data.CategoryName}</div>
                <hr />
                {foodItem.length > 0
                  ? foodItem
                    .filter((item) => item.CategoryName === data.CategoryName && item.name.toLowerCase().includes(search.toLowerCase()))
                    .map((filterItems) => (
                      <div key={filterItems._id} className="col-12 col-md-6 col-lg-3">
                        <Card
                          foodItem={filterItems}
                          options={filterItems.options?.[0] || {}} // Safe access to options[0]
                        />
                      </div>
                    ))
                  : <div>No Such Data Found</div>
                }
              </div>
            ))
            : <div>Loading Categories...</div>
        }
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

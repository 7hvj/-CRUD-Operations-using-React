import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function ProductList() {

    // TODO: Fetch products from API and set to state
    const [products, setProducts] = useState([]);

    // TODO: Implement getProducts function to fetch products from API
    function getProducts() {
        fetch("http://localhost:4000/products")
        .then(response =>{
            if (!response.ok) {
                throw new Error("Failed to fetch products");
            }
            return response.json();
        }).then(data => {
            setProducts(data);
        }).catch(error => {
            alert("Error: " + error.message)
        })
    }
    // Call getProducts when component mounts
    useEffect(getProducts, [])
    // Note: You can use json-server to create a fake REST API for testing
//     Create a db.json file with some data
// {
//   "posts": [
//     { "id": 1, "title": "json-server", "author": "typicode" }
//   ],
//   "comments": [
//     { "id": 1, "body": "some comment", "postId": 1 }
//   ],
//   "profile": { "name": "typicode" }
// }
    // Run the following command in your terminal to start the json-server:
    //npx json-server --watch db.json --port 4000
  return (
    <div className="container my-4">
        <h2 className="text-center mb-4">Products</h2>
        <div className="row mb-3">
            <div className="col">
                <Link to="/admin/products/create" className="btn btn-primary me-1" role="button">Add New Product</Link>
                <button type="button" className="btn btn-outline-primary" onClick={getProducts}>
                    Refresh
                </button>
            </div>
            <div className="col"></div>
        </div>
        <table className="table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Brand</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Description</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    products.map((products, index) => {
                        return (
                            <tr key={index}>
                                <td>{products.id}</td>
                                <td>{products.name}</td>
                                <td>{products.brand}</td>
                                <td>{products.category}</td>
                                <td>${products.price}</td>
                                <td>{products.description}</td>
                                <td style={{width: "10px" , whiteSpace:"nowrap"}}>
                                    <Link to={"/admin/products/edit/"+products.id} 
                                    className="btn btn-primary btn-sm me-1">Edit</Link>
                                    <button type="button" className="btn btn-danger btn-sm">Delete</button>
                                </td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>




    </div>
  );
}
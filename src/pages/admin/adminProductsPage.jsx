
import axios from "axios";
import { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa6";
import { Link } from "react-router-dom";

export default function AdminProductsPage() {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const token = localStorage.getItem("token");

    // Fetch products from backend
    useEffect(() => {

        if (!token) {
            console.log("Authentication token not found");
            setLoading(false);
            return;
        }

        axios.get(import.meta.env.VITE_API_URL + "/products", {
            headers: {
                Authorization: "Bearer " + token
            }
        })
        .then((response) => {

            console.log("Backend response:", response.data);

            // Check whether backend returns an array or an object
            if (Array.isArray(response.data)) {
                setProducts(response.data);
            }
            else if (Array.isArray(response.data.products)) {
                setProducts(response.data.products);
            }
            else {
                console.error("Unexpected API response:", response.data);
                setProducts([]);
            }

        })
        .catch((error) => {
            console.error("Error fetching products:", error);
        })
        .finally(() => {
            setLoading(false);
        });

    }, []);

   
    return (
        <div className="w-full h-full overflow-visible">
            

            <div className="w-full rounded-2xl border border-gray-200 bg-white shadow-lg">

                {/* Table Header */}
                <div className="flex flex-col gap-2 border-b border-gray-200 bg-primary px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
                
                    
                    <div>         
                        <h2 className="text-xl font-bold text-secondary">
                         
                            Product Management
                        </h2>

                        <p className="mt-1 text-sm text-secondary/70">
                            Manage and view all available products
                        </p>
                    </div>

                    <span className="w-fit rounded-full bg-accent/70 px-4 py-2 text-sm font-semibold text-secondary shadow-sm">
                        Total Products: {products.length}
                    </span>

                </div>

                {/* Responsive Table */}
                <div className="w-full max-h-[calc(100vh-220px)] overflow-auto hide-scroll-track">

                    <table className="w-full min-w-[1200px] text-left text-sm">

                        <thead className="sticky top-0 z-30 bg-gray-50">

                            <tr className="text-xs uppercase tracking-wider text-secondary">

                                <th className="bg-accent/50 px-5 py-4 font-bold">Product ID</th>
                                <th className="bg-accent/50 px-5 py-4 font-bold">Name</th>
                                <th className="bg-accent/50 px-5 py-4 font-bold">Price</th>
                                <th className="bg-accent/50 px-5 py-4 font-bold">Labelled Price</th>
                                <th className="bg-accent/50 px-5 py-4 font-bold">Category</th>
                                <th className="bg-accent/50 px-5 py-4 font-bold">Images</th>
                                <th className="bg-accent/50 px-5 py-4 font-bold">Visibility</th>
                                <th className="bg-accent/50 px-5 py-4 font-bold">Brand</th>
                                <th className="bg-accent/50 px-5 py-4 font-bold">Model</th>

                            </tr>

                        </thead>

                        <tbody className="divide-y divide-gray-100">

                            {loading ? (

                                <tr>
                                    <td colSpan="9" className="px-6 py-16 text-center">
                                        Loading products...
                                    </td>
                                </tr>

                            ) : (

                                products.map((item) => (

                                    <tr
                                        key={item.productId}
                                        className="transition-colors duration-200 hover:bg-primary/40"
                                    >

                                        <td className="whitespace-nowrap px-5 py-4 font-semibold text-secondary">
                                            {item.productId}
                                        </td>

                                        <td className="max-w-[220px] px-5 py-4 font-medium text-gray-800">
                                            <span className="line-clamp-2">
                                                {item.name}
                                            </span>
                                        </td>

                                        <td className="whitespace-nowrap px-5 py-4 font-semibold text-secondary">
                                            Rs. {Number(item.price).toLocaleString()}
                                        </td>

                                        <td className="whitespace-nowrap px-5 py-4 text-gray-500 line-through">
                                            Rs. {Number(item.labelledPrice).toLocaleString()}
                                        </td>

                                        <td className="px-5 py-4">
                                            <span className="rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-secondary">
                                                {item.category}
                                            </span>
                                        </td>

                                        
<td className="px-5 py-3 align-middle">

    {Array.isArray(item.images) && item.images.length > 0 ? (

        <div className="relative w-[60px] h-[60px]">

            <img
                src={item.images[0]}
                alt={item.name}
                className="w-[60px] h-[60px] object-cover rounded-lg border border-gray-300"
            />

            {item.images.length > 1 && (

                <span className="absolute -top-2 -right-2 bg-accent text-white text-xs font-bold rounded-full w-6 h-6 flex justify-center items-center shadow">

                    +{item.images.length - 1}

                </span>

            )}

        </div>

    ) : (

        <div className="w-[60px] h-[60px] bg-gray-100 rounded-lg flex justify-center items-center text-xs text-gray-400">

            No image

        </div>

    )}

</td>


                                        <td className="px-5 py-4">

                                            <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-bold ${
                                                item.isVisible
                                                    ? "bg-green-100 text-green-700"
                                                    : "bg-gray-100 text-gray-500"
                                            }`}>

                                                <span className={`h-2 w-2 rounded-full ${
                                                    item.isVisible
                                                        ? "bg-green-500"
                                                        : "bg-gray-400"
                                                }`}></span>

                                                {item.isVisible ? "Visible" : "Hidden"}

                                            </span>

                                        </td>

                                        <td className="px-5 py-4 font-medium text-gray-700">
                                            {item.brand}
                                        </td>

                                        <td className="px-5 py-4 font-medium text-gray-700">
                                            {item.model}
                                        </td>

                                    </tr>

                                ))

                            )}

                            {/* Empty State */}
                            {!loading && products.length === 0 && (

                                <tr>
                                    <td colSpan="9" className="px-6 py-16 text-center">

                                        <div className="flex flex-col items-center gap-2">

                                            <div className="rounded-full bg-primary p-4">
                                                <span className="text-2xl">📦</span>
                                            </div>

                                            <h3 className="font-bold text-secondary">
                                                No Products Found
                                            </h3>

                                            <p className="text-sm text-gray-500">
                                                There are currently no products available.
                                            </p>

                                        </div>

                                    </td>
                                </tr>

                            )}

                        </tbody>

                    </table>

                </div>

                {/* Footer */}
                <div className="border-t border-gray-200 bg-gray-50 px-6 py-4">
                    <p className="text-xs text-gray-500">
                        Showing {products.length} product(s)
                    </p>
                </div>

            </div>

            {/* Add Product Button */}
            <Link
                to="/admin/add-product"
                className="text-white bg-accent w-[50px] h-[50px] flex justify-center items-center text-xl rounded-[20px] hover:rounded-[20px] hover:bg-secondary fixed bottom-12 right-12"
            >
                <FaPlus />
                
            </Link>
            

        </div>
    );
}

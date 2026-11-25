
import axios from "axios";
import { useState, useEffect } from "react";
import { CiEdit, CiTrash } from "react-icons/ci";
import { FaPlus, FaTimes, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

export default function AdminProductsPage() {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    // Image preview states
    const [selectedImages, setSelectedImages] = useState([]);
    const [currentImage, setCurrentImage] = useState(0);
    const [showImageModal, setShowImageModal] = useState(false);

    // Delete confirmation state
    const [productToDelete, setProductToDelete] = useState(null);

    const token = localStorage.getItem("token");

    // Fetch products
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


    // Delete Product
    async function handleDeleteProduct(productId) {

        try {

            await axios.delete(
                import.meta.env.VITE_API_URL + "/products/" + productId,
                {
                    headers: {
                        Authorization: "Bearer " + token
                    }
                }
            );

            // Remove deleted product from the frontend
            setProducts((prevProducts) =>
                prevProducts.filter((item) => item.productId !== productId)
            );

            toast.success("product deleted successfully");

        }

        catch (error) {

            console.error("Error deleting product:", error);

            toast.error(
                error?.response?.data?.message || "Failed to delete product"
            );

        }

    }


    // Open image preview
    function openImagePreview(images, index = 0) {

        setSelectedImages(images);
        setCurrentImage(index);
        setShowImageModal(true);

    }


    // Close image preview
    function closeImagePreview() {

        setShowImageModal(false);
        setSelectedImages([]);
        setCurrentImage(0);

    }


    // Next image
    function nextImage(e) {

        e.stopPropagation();

        setCurrentImage((prev) =>
            (prev + 1) % selectedImages.length
        );

    }


    // Previous image
    function previousImage(e) {

        e.stopPropagation();

        setCurrentImage((prev) =>
            (prev - 1 + selectedImages.length) % selectedImages.length
        );

    }


    return (

        <div className="w-full h-full min-h-0 min-w-0 bg-[#F1F7FA] p-2 overflow-hidden">

            <div className="w-full h-full min-h-0 bg-white rounded-lg border border-slate-200 shadow-sm flex flex-col overflow-hidden">

                {/* Header */}

                <div className="h-[58px] shrink-0 px-4 flex items-center justify-between bg-[#DDF3FC] border-b border-sky-200">

                    <div>
                        <h2 className="text-lg font-bold text-slate-800">
                            Product Management
                        </h2>

                        <p className="text-[11px] text-slate-500">
                            Manage your store products
                        </p>
                    </div>

                    <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-md border border-sky-100">

                        <span className="text-xs text-slate-500">
                            Total Products
                        </span>

                        <span className="font-bold text-sm text-sky-700">
                            {products.length}
                        </span>

                    </div>

                </div>


                {/* Product Table */}

                <div className="flex-1 min-h-0 w-full overflow-auto hide-scroll-track">

                    <table className="w-full min-w-[1050px] table-fixed text-left border-collapse">

                        <thead className="sticky top-0 z-20 bg-[#75CFF0]">

                            <tr className="h-[36px] text-[11px] uppercase tracking-wide text-slate-800">

                                <th className="w-[9%] px-3 font-bold">Product ID</th>
                                <th className="w-[16%] px-3 font-bold">Product Name</th>
                                <th className="w-[11%] px-3 font-bold">Price</th>
                                <th className="w-[12%] px-3 font-bold">Labelled Price</th>
                                <th className="w-[11%] px-3 font-bold">Category</th>
                                <th className="w-[9%] px-3 font-bold">Images</th>
                                <th className="w-[10%] px-3 font-bold">Visibility</th>
                                <th className="w-[9%] px-3 font-bold">Brand</th>
                                <th className="w-[13%] px-3 font-bold">Model</th>
                                <th className="w-[6%] px-3 font-bold">Action</th>

                            </tr>

                        </thead>


                        <tbody className="divide-y divide-slate-100">

                            {loading ? (

                                <tr>
                                    <td colSpan="9" className="py-10 text-center text-sm text-slate-500">
                                        Loading products...
                                    </td>
                                </tr>

                            ) : (

                                products.map((item) => (

                                    <tr
                                        key={item.productId}
                                        className="h-[40px] even:bg-[#F0F9FD] odd:bg-white hover:bg-[#DDF3FC] transition-colors"
                                    >

                                        <td className="px-3 py-1 text-xs font-semibold text-slate-700">
                                            <span className="block truncate">
                                                {item.productId}
                                            </span>
                                        </td>

                                        <td className="px-3 py-1 text-xs font-semibold text-slate-800">
                                            <span className="block truncate" title={item.name}>
                                                {item.name}
                                            </span>
                                        </td>

                                        <td className="px-3 py-1 text-xs font-semibold text-slate-700 whitespace-nowrap">
                                            LKR {Number(item.price).toLocaleString()}
                                        </td>

                                        <td className="px-3 py-1 text-xs text-slate-400 whitespace-nowrap">
                                            <span className="line-through">
                                                LKR {Number(item.labelledPrice).toLocaleString()}
                                            </span>
                                        </td>

                                        <td className="px-3 py-1">
                                            <span className="inline-block max-w-full truncate bg-sky-100 text-sky-800 px-2 py-1 rounded text-[10px] font-semibold">
                                                {item.category}
                                            </span>
                                        </td>


                                        {/* Clickable Product Images */}

                                        <td className="px-3 py-1">

                                            {Array.isArray(item.images) && item.images.length > 0 ? (

                                                <div className="flex items-center gap-2">

                                                    <button
                                                        type="button"
                                                        onClick={() => openImagePreview(item.images, 0)}
                                                        className="relative group shrink-0"
                                                        title="Click to view images"
                                                    >

                                                        <img
                                                            src={item.images[0]}
                                                            alt={item.name}
                                                            className="w-[34px] h-[34px] object-cover rounded border border-slate-300 bg-white group-hover:border-sky-500 group-hover:scale-110 transition-all cursor-pointer"
                                                        />

                                                    </button>

                                                    {item.images.length > 1 && (

                                                        <button
                                                            type="button"
                                                            onClick={() => openImagePreview(item.images, 1)}
                                                            className="text-[10px] font-bold text-sky-700 bg-sky-100 px-1.5 py-1 rounded hover:bg-sky-200"
                                                            title="View remaining images"
                                                        >
                                                            +{item.images.length - 1}
                                                        </button>

                                                    )}

                                                </div>

                                            ) : (

                                                <span className="text-[10px] text-slate-400">
                                                    No image
                                                </span>

                                            )}

                                        </td>


                                        <td className="px-3 py-1">

                                            <span className={`inline-flex items-center gap-1.5 rounded-full px-2 py-1 text-[10px] font-bold ${
                                                item.isVisible
                                                    ? "bg-green-100 text-green-700"
                                                    : "bg-slate-100 text-slate-500"
                                            }`}>

                                                <span className={`w-1.5 h-1.5 rounded-full ${
                                                    item.isVisible
                                                        ? "bg-green-500"
                                                        : "bg-slate-400"
                                                }`}></span>

                                                {item.isVisible ? "Visible" : "Hidden"}

                                            </span>

                                        </td>

                                        <td className="px-3 py-1 text-xs text-slate-700">
                                            <span className="block truncate">
                                                {item.brand}
                                            </span>
                                        </td>

                                        <td className="px-3 py-1 text-xs text-slate-700">
                                            <span className="block truncate" title={item.model}>
                                                {item.model}
                                            </span>
                                        </td>


                                        {/* Action Buttons */}

                                        <td className="px-3 py-1 flex items-center justify-center gap-1">

                                            <Link
                                                to="/admin/update-product"
                                                state={item}
                                                className="hover:text-accent"
                                            >

                                                <CiEdit size={20} />

                                            </Link>


                                            <button
                                                type="button"
                                                onClick={() => setProductToDelete(item.productId)}
                                                title="Delete Product"
                                                className="hover:text-red-700 cursor-pointer"
                                            >

                                                <CiTrash size={20} />

                                            </button>

                                        </td>

                                    </tr>

                                ))

                            )}


                            {!loading && products.length === 0 && (

                                <tr>
                                    <td colSpan="9" className="py-16 text-center">

                                        <div className="text-3xl mb-2">📦</div>

                                        <h3 className="text-sm font-bold text-slate-700">
                                            No Products Found
                                        </h3>

                                        <p className="text-xs text-slate-400 mt-1">
                                            Add your first product to get started.
                                        </p>

                                    </td>
                                </tr>

                            )}

                        </tbody>

                    </table>

                </div>


                {/* Footer */}

                <div className="h-[30px] shrink-0 flex items-center justify-between px-4 bg-slate-50 border-t border-slate-200">

                    <p className="text-[10px] text-slate-500">
                        Showing {products.length} product(s)
                    </p>

                    <p className="text-[10px] text-slate-400">
                        i-Computers Admin
                    </p>

                </div>

            </div>


            {/* Add Product Button */}

            <Link
                to="/admin/add-product"
                title="Add New Product"
                className="fixed bottom-7 right-7 z-40 w-11 h-11 flex justify-center items-center text-white text-lg bg-sky-500 rounded-xl shadow-lg hover:bg-sky-700 hover:scale-105 transition-all duration-200"
            >
                <FaPlus />
            </Link>


            {/* Image Preview Modal */}

            {showImageModal && (

                <div
                    onClick={closeImagePreview}
                    className="fixed inset-0 z-[100] bg-black/75 flex justify-center items-center p-4"
                >

                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="relative w-full max-w-[750px] bg-white rounded-xl shadow-2xl p-4"
                    >

                        {/* Close Button */}

                        <button
                            onClick={closeImagePreview}
                            className="absolute -top-3 -right-3 z-20 w-9 h-9 rounded-full bg-red-500 text-white flex justify-center items-center shadow-lg hover:bg-red-600"
                        >
                            <FaTimes />
                        </button>


                        {/* Image */}

                        <div className="w-full h-[400px] md:h-[500px] bg-slate-100 rounded-lg flex justify-center items-center relative overflow-hidden">

                            <img
                                src={selectedImages[currentImage]}
                                alt="Product preview"
                                className="max-w-full max-h-full object-contain"
                            />


                            {/* Previous Button */}

                            {selectedImages.length > 1 && (

                                <button
                                    onClick={previousImage}
                                    className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 text-slate-800 rounded-full shadow-lg flex justify-center items-center hover:bg-sky-400 hover:text-white transition"
                                >
                                    <FaChevronLeft />
                                </button>

                            )}


                            {/* Next Button */}

                            {selectedImages.length > 1 && (

                                <button
                                    onClick={nextImage}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 text-slate-800 rounded-full shadow-lg flex justify-center items-center hover:bg-sky-400 hover:text-white transition"
                                >
                                    <FaChevronRight />
                                </button>

                            )}

                        </div>


                        {/* Image Counter */}

                        <div className="flex justify-between items-center mt-3">

                            <p className="text-sm font-semibold text-slate-700">
                                Product Images
                            </p>

                            <p className="text-sm text-slate-500">
                                {currentImage + 1} / {selectedImages.length}
                            </p>

                        </div>


                        {/* Image Thumbnails */}

                        {selectedImages.length > 1 && (

                            <div className="flex justify-center gap-2 mt-3 overflow-x-auto">

                                {selectedImages.map((image, index) => (

                                    <button
                                        key={index}
                                        onClick={() => setCurrentImage(index)}
                                        className={`shrink-0 w-12 h-12 rounded-md overflow-hidden border-2 ${
                                            currentImage === index
                                                ? "border-sky-500"
                                                : "border-slate-200"
                                        }`}
                                    >

                                        <img
                                            src={image}
                                            alt={`Product ${index + 1}`}
                                            className="w-full h-full object-cover"
                                        />

                                    </button>

                                ))}

                            </div>

                        )}

                    </div>

                </div>

            )}


            {/* Delete Confirmation Modal */}

            {productToDelete && (

                <div
                    onClick={() => setProductToDelete(null)}
                    className="fixed inset-0 z-[110] bg-secondary/70 backdrop-blur-sm flex items-center justify-center p-4"
                >

                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="w-full max-w-[430px] bg-white rounded-2xl shadow-2xl overflow-hidden border border-primary animate-in fade-in zoom-in duration-200"
                    >

                        {/* Modal Header */}

                        <div className="relative bg-accent px-6 py-6 flex flex-col items-center border-b border-sky-200">

                            {/* Close Button */}

                            <button
                                type="button"
                                onClick={() => setProductToDelete(null)}
                                className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center text-secondary hover:bg-white hover:text-red-600 transition-colors"
                                title="Close"
                            >
                                <FaTimes size={15} />
                            </button>


                            {/* Delete Icon */}

                            

                            

                            

                        </div>


                        {/* Modal Body */}

                        <div className="px-6 py-6">
                            

                            <p className="text-md font-bold text-center  leading-6 ">
                                Are you sure you want to delete {productToDelete}
                            </p>
                                <p className="text-sm text-slate-600 text-center  leading-6">
                                This action cannot be undone.
                            </p>



                            {/* Product ID */}

                        
                        </div>


                        {/* Modal Footer / Buttons */}

                        <div className="px-6 pb-6 flex gap-3">

                            {/* No Button */}

                            <button
                                type="button"
                                onClick={() => setProductToDelete(null)}
                                className="flex-1 py-3 rounded-xl border-2 border-secondary/20 bg-primary text-secondary text-sm font-bold hover:bg-accent hover:border-accent transition-all duration-2 cursor-pointer"
                            >
                                Cancel
                            </button>


                            {/* Yes Button */}

                            <button
                                type="button"
                                onClick={() => {
                                    handleDeleteProduct(productToDelete);
                                    setProductToDelete(null);
                                }}
                                className="flex-1 py-3 rounded-xl border-red-600 text-secondary bg-red-500 text-sm font-bold shadow-md hover:bg-red-700 hover:shadow-lg active:scale-95 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer "
                            >
                                
                                Delete
                            </button>

                        </div>

                    </div>

                </div>

            )}

        </div>

    );

}


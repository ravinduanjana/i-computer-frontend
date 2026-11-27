
import axios from "axios";
import { useEffect, useState } from "react";
import LoadingAnimation from "../../components/loadingAnimation";
import {
    FiSearch,
    FiEye,
    FiChevronLeft,
    FiChevronRight,
    FiShoppingBag,
    FiRefreshCw,
    FiX,
    FiPackage,
    FiSun,
    FiMoon
} from "react-icons/fi";

export default function AdminOrdersPage() {

    const [orders, setOrders] = useState([]);
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalPages, setTotalPages] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);

    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");
    const [selectedOrder, setSelectedOrder] = useState(null);

    const [error, setError] = useState("");
    const [refreshKey, setRefreshKey] = useState(0);

    // Theme state
    const [darkMode, setDarkMode] = useState(() => {
        return localStorage.getItem("adminOrdersTheme") === "dark";
    });

    // Toggle theme
    function toggleTheme() {
        setDarkMode((previousMode) => {
            const newMode = !previousMode;

            localStorage.setItem(
                "adminOrdersTheme",
                newMode ? "dark" : "light"
            );

            return newMode;
        });
    }

    // Fetch orders
    useEffect(() => {

        const token = localStorage.getItem("token");

        if (!token) {
            setError("Authentication token not found. Please log in again.");
            setIsLoaded(true);
            return;
        }

        setIsLoaded(false);
        setError("");

        axios.get(
            import.meta.env.VITE_API_URL + "/orders/" + pageSize + "/" + pageNumber,
            {
                headers: {
                    Authorization: "Bearer " + token
                }
            }
        ).then((response) => {

            setOrders(response.data.orders || []);
            setTotalPages(response.data.totalPages || 0);

        }).catch((error) => {

            console.log("Error fetching orders:", error);

            setError(
                error.response?.data?.message ||
                "Unable to load orders. Please try again."
            );

        }).finally(() => {

            setIsLoaded(true);

        });

    }, [pageNumber, pageSize, refreshKey]);

    // Format price
    function formatPrice(price) {

        return new Intl.NumberFormat("en-LK", {
            style: "currency",
            currency: "LKR",
            maximumFractionDigits: 2
        }).format(price || 0);

    }

    // Format date
    function formatDate(date) {

        if (!date) return "N/A";

        return new Date(date).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric"
        });

    }

    // Status styling
    function getStatusStyle(status) {

        switch (status?.toLowerCase()) {

            case "pending":
                return darkMode
                    ? "bg-amber-900/60 text-amber-300"
                    : "bg-amber-100 text-amber-800";

            case "processing":
                return darkMode
                    ? "bg-blue-900/60 text-blue-300"
                    : "bg-blue-100 text-blue-800";

            case "shipped":
                return darkMode
                    ? "bg-purple-900/60 text-purple-300"
                    : "bg-purple-100 text-purple-800";

            case "delivered":
                return darkMode
                    ? "bg-emerald-900/60 text-emerald-300"
                    : "bg-emerald-100 text-emerald-800";

            case "cancelled":
                return darkMode
                    ? "bg-red-900/60 text-red-300"
                    : "bg-red-100 text-red-800";

            default:
                return darkMode
                    ? "bg-gray-700 text-gray-300"
                    : "bg-gray-100 text-gray-700";

        }

    }

    // Search and filter orders
    const filteredOrders = orders.filter((order) => {

        const searchValue = search.toLowerCase();

        const matchesSearch =
            order.orderId?.toLowerCase().includes(searchValue) ||
            order.firstName?.toLowerCase().includes(searchValue) ||
            order.lastName?.toLowerCase().includes(searchValue) ||
            order.email?.toLowerCase().includes(searchValue) ||
            order.phone?.toLowerCase().includes(searchValue);

        const matchesStatus =
            statusFilter === "All" ||
            order.status?.toLowerCase() === statusFilter.toLowerCase();

        return matchesSearch && matchesStatus;

    });

    // Calculate total items
    function getTotalItems(items) {

        return items?.reduce((total, item) => total + item.qty, 0) || 0;

    }

    // Theme classes
    const pageBg = darkMode ? "bg-[#111827]" : "bg-[#DCE6ED]";
    const panelBg = darkMode ? "bg-[#1F2937]" : "bg-[#F8FAFC]";
    const headerBg = darkMode ? "bg-[#243B50]" : "bg-[#B9D9E9]";
    const summaryBg = darkMode ? "bg-[#172334]" : "bg-[#D3E2EB]";
    const toolbarBg = darkMode ? "bg-[#1F2937]" : "bg-[#F8FAFC]";
    const tableHeaderBg = darkMode ? "bg-[#164E63]" : "bg-[#5BAACB]";
    const tableText = darkMode ? "text-gray-200" : "text-slate-800";
    const mutedText = darkMode ? "text-gray-400" : "text-slate-600";
    const borderColor = darkMode ? "border-gray-700" : "border-slate-300";
    const inputBg = darkMode
        ? "bg-[#273449] text-gray-100 border-gray-600"
        : "bg-white text-[#01303f] border-slate-300";

    return (

        <div className={`w-full h-full min-h-0 min-w-0 ${pageBg} p-1.5 overflow-hidden transition-colors duration-200`}>

            <div className={`w-full h-full min-h-0 ${panelBg} rounded-lg border ${borderColor} shadow-sm flex flex-col overflow-hidden transition-colors duration-200`}>

                {/* Header */}

                <div className={`h-[48px] shrink-0 px-4 flex items-center justify-between ${headerBg} border-b ${borderColor}`}>

                    <div>
                        <h2 className={`text-base font-bold ${tableText}`}>
                            Order Management
                        </h2>

                        <p className={`text-[10px] ${mutedText}`}>
                            Manage and track customer orders
                        </p>
                    </div>

                    <div className="flex items-center gap-2">

                        {/* Theme Toggle */}

                        <button
                            type="button"
                            onClick={toggleTheme}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[11px] font-semibold transition ${
                                darkMode
                                    ? "bg-amber-400 text-gray-900 hover:bg-amber-300"
                                    : "bg-[#334155] text-white hover:bg-[#1e293b]"
                            }`}
                        >
                            {darkMode
                                ? <FiSun size={13} />
                                : <FiMoon size={13} />
                            }

                            {darkMode ? "Light Mode" : "Dark Mode"}
                        </button>

                        {/* Refresh */}

                        <button
                            type="button"
                            onClick={() => setRefreshKey(prev => prev + 1)}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#075985] border border-[#0369a1] text-white text-[11px] font-semibold hover:bg-[#0369a1] transition"
                        >
                            <FiRefreshCw size={13} />
                            Refresh
                        </button>

                    </div>

                </div>

                {/* Summary Cards */}

                <div className={`shrink-0 grid grid-cols-3 gap-2 px-3 py-2 ${summaryBg}`}>

                    <div className={`${panelBg} border ${borderColor} rounded-md px-3 py-2 flex items-center justify-between`}>
                        <p className={`text-[10px] sm:text-xs ${mutedText}`}>
                            Orders
                        </p>

                        <h2 className={`text-base font-bold ${tableText}`}>
                            {orders.length}
                        </h2>
                    </div>

                    <div className={`${panelBg} border ${borderColor} rounded-md px-3 py-2 flex items-center justify-between`}>
                        <p className={`text-[10px] sm:text-xs ${mutedText}`}>
                            Pending
                        </p>

                        <h2 className="text-base font-bold text-amber-500">
                            {orders.filter(
                                order => order.status?.toLowerCase() === "pending"
                            ).length}
                        </h2>
                    </div>

                    <div className={`${panelBg} border ${borderColor} rounded-md px-3 py-2 flex items-center justify-between`}>
                        <p className={`text-[10px] sm:text-xs ${mutedText}`}>
                            Total Pages
                        </p>

                        <h2 className={`text-base font-bold ${tableText}`}>
                            {totalPages}
                        </h2>
                    </div>

                </div>

                {/* Search and Table Container */}

                <div className={`flex-1 min-h-0 w-full flex flex-col overflow-hidden ${panelBg}`}>

                    {/* Search and Filters */}

                    <div className={`shrink-0 px-3 py-2 flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-between border-b ${borderColor} ${toolbarBg}`}>

                        <div>
                            <h2 className={`text-xs font-bold ${tableText}`}>
                                All Orders
                            </h2>

                            <p className={`text-[9px] ${mutedText}`}>
                                View and manage customer purchases
                            </p>
                        </div>

                        <div className="flex flex-row gap-2">

                            {/* Search */}

                            <div className="relative flex-1">

                                <FiSearch
                                    className={`absolute left-2.5 top-1/2 -translate-y-1/2 ${mutedText}`}
                                    size={13}
                                />

                                <input
                                    type="text"
                                    placeholder="Search orders..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className={`w-full sm:w-56 pl-8 pr-2 py-1.5 text-[11px] border rounded-md outline-none focus:border-[#02a9f7] focus:ring-2 focus:ring-[#02a9f7]/10 ${inputBg}`}
                                />

                            </div>

                            {/* Status Filter */}

                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className={`px-2 py-1.5 text-[11px] border rounded-md outline-none focus:border-[#02a9f7] ${inputBg}`}
                            >
                                <option value="All">All Status</option>
                                <option value="pending">Pending</option>
                                <option value="processing">Processing</option>
                                <option value="shipped">Shipped</option>
                                <option value="delivered">Delivered</option>
                                <option value="cancelled">Cancelled</option>
                            </select>

                        </div>

                    </div>

                    {/* Loading / Error / Table */}

                    {!isLoaded ? (

                        <div className="flex-1 min-h-0 flex justify-center items-center">
                            <LoadingAnimation />
                        </div>

                    ) : error ? (

                        <div className="flex-1 min-h-0 flex flex-col justify-center items-center gap-3 text-center px-4">

                            <p className="text-sm text-red-500">
                                {error}
                            </p>

                            <button
                                type="button"
                                onClick={() => setRefreshKey(prev => prev + 1)}
                                className="px-4 py-2 bg-[#0284C7] hover:bg-[#0369a1] text-white rounded-lg text-sm"
                            >
                                Try Again
                            </button>

                        </div>

                    ) : (

                        <>

                            {/* Scrollable Orders Table */}

                            <div className="flex-1 min-h-0 w-full overflow-auto hide-scroll-track">

                                <table className="w-full min-w-[1050px] table-fixed text-left border-collapse">

                                    <thead className={`sticky top-0 z-20 ${tableHeaderBg}`}>

                                        <tr className="h-[32px] text-[10px] uppercase tracking-wide text-white">

                                            <th className="w-[12%] px-3 font-bold">
                                                Order ID
                                            </th>

                                            <th className="w-[16%] px-3 font-bold">
                                                Customer
                                            </th>

                                            <th className="w-[19%] px-3 font-bold">
                                                Contact
                                            </th>

                                            <th className="w-[9%] px-3 font-bold">
                                                Items
                                            </th>

                                            <th className="w-[13%] px-3 font-bold">
                                                Total
                                            </th>

                                            <th className="w-[11%] px-3 font-bold">
                                                Date
                                            </th>

                                            <th className="w-[11%] px-3 font-bold">
                                                Status
                                            </th>

                                            <th className="w-[9%] px-3 font-bold text-center">
                                                Action
                                            </th>

                                        </tr>

                                    </thead>

                                    <tbody className={`divide-y ${darkMode ? "divide-gray-700" : "divide-slate-200"}`}>

                                        {filteredOrders.length === 0 ? (

                                            <tr>
                                                <td colSpan="8" className={`text-center py-12 ${mutedText}`}>

                                                    <FiShoppingBag className="mx-auto text-3xl mb-2 opacity-50" />

                                                    <p className="text-sm font-semibold">
                                                        No Orders Found
                                                    </p>

                                                    <p className="text-xs opacity-70 mt-1">
                                                        No orders match your search.
                                                    </p>

                                                </td>
                                            </tr>

                                        ) : (

                                            filteredOrders.map((order, index) => (

                                                <tr
                                                    key={order._id}
                                                    className={`h-[38px] transition-colors ${
                                                        darkMode
                                                            ? index % 2 === 0
                                                                ? "bg-[#1F2937] hover:bg-[#334155]"
                                                                : "bg-[#243244] hover:bg-[#334155]"
                                                            : index % 2 === 0
                                                                ? "bg-white hover:bg-[#D4E8F2]"
                                                                : "bg-[#E7F0F5] hover:bg-[#D4E8F2]"
                                                    }`}
                                                >

                                                    <td className="px-3 py-1 text-[11px] font-semibold text-sky-500">
                                                        <span className="block truncate" title={order.orderId}>
                                                            {order.orderId}
                                                        </span>
                                                    </td>

                                                    <td className="px-3 py-1">
                                                        <p className={`text-[11px] font-semibold truncate ${tableText}`}>
                                                            {order.firstName} {order.lastName}
                                                        </p>

                                                        <p className={`text-[9px] truncate ${mutedText}`}>
                                                            {order.city}
                                                        </p>
                                                    </td>

                                                    <td className="px-3 py-1">
                                                        <p className={`text-[11px] truncate ${tableText}`} title={order.email}>
                                                            {order.email}
                                                        </p>

                                                        <p className={`text-[9px] ${mutedText}`}>
                                                            {order.phone}
                                                        </p>
                                                    </td>

                                                    <td className="px-3 py-1">
                                                        <span className={`inline-flex items-center gap-1 text-[11px] ${tableText}`}>
                                                            <FiPackage className="text-sky-500" size={12} />
                                                            {getTotalItems(order.items)}
                                                        </span>
                                                    </td>

                                                    <td className={`px-3 py-1 text-[11px] font-semibold whitespace-nowrap ${tableText}`}>
                                                        {formatPrice(order.total)}
                                                    </td>

                                                    <td className={`px-3 py-1 text-[11px] whitespace-nowrap ${mutedText}`}>
                                                        {formatDate(order.date)}
                                                    </td>

                                                    <td className="px-3 py-1">
                                                        <span className={`inline-flex px-2 py-1 rounded-full text-[9px] font-bold capitalize ${getStatusStyle(order.status)}`}>
                                                            {order.status || "pending"}
                                                        </span>
                                                    </td>

                                                    <td className="px-3 py-1 text-center">
                                                        <button
                                                            type="button"
                                                            onClick={() => setSelectedOrder(order)}
                                                            className={`inline-flex items-center gap-1 px-2 py-1 rounded-md transition text-[10px] font-semibold ${
                                                                darkMode
                                                                    ? "bg-[#164E63] text-sky-200 hover:bg-sky-600 hover:text-white"
                                                                    : "bg-[#C5E3F0] text-[#01303f] hover:bg-[#028ac7] hover:text-white"
                                                            }`}
                                                        >
                                                            <FiEye size={12} />
                                                            View
                                                        </button>
                                                    </td>

                                                </tr>

                                            ))

                                        )}

                                    </tbody>

                                </table>

                            </div>

                            {/* Pagination */}

                            <div className={`h-[36px] shrink-0 flex items-center justify-between gap-2 px-3 border-t ${borderColor} ${darkMode ? "bg-[#172334]" : "bg-[#DCE6ED]"}`}>

                                <div className={`flex items-center gap-2 text-[10px] ${mutedText}`}>

                                    <span>Rows per page</span>

                                    <select
                                        value={pageSize}
                                        onChange={(e) => {
                                            setPageSize(Number(e.target.value));
                                            setPageNumber(1);
                                        }}
                                        className={`border rounded px-2 py-1 outline-none focus:border-[#02a9f7] ${inputBg}`}
                                    >
                                        <option value={5}>5</option>
                                        <option value={10}>10</option>
                                        <option value={20}>20</option>
                                        <option value={50}>50</option>
                                    </select>

                                </div>

                                <div className="flex items-center gap-2">

                                    <span className={`text-[10px] ${mutedText}`}>
                                        Page {pageNumber} of {totalPages}
                                    </span>

                                    <button
                                        type="button"
                                        disabled={pageNumber <= 1}
                                        onClick={() => setPageNumber(prev => prev - 1)}
                                        className={`p-1 border rounded transition disabled:opacity-40 disabled:cursor-not-allowed ${
                                            darkMode
                                                ? "border-gray-600 text-gray-200 hover:bg-gray-700"
                                                : "border-slate-300 text-slate-700 hover:bg-[#C5E3F0]"
                                        }`}
                                    >
                                        <FiChevronLeft size={13} />
                                    </button>

                                    <button
                                        type="button"
                                        disabled={pageNumber >= totalPages || totalPages === 0}
                                        onClick={() => setPageNumber(prev => prev + 1)}
                                        className={`p-1 border rounded transition disabled:opacity-40 disabled:cursor-not-allowed ${
                                            darkMode
                                                ? "border-gray-600 text-gray-200 hover:bg-gray-700"
                                                : "border-slate-300 text-slate-700 hover:bg-[#C5E3F0]"
                                        }`}
                                    >
                                        <FiChevronRight size={13} />
                                    </button>

                                </div>

                            </div>

                        </>

                    )}

                </div>

            </div>

            {/* Order Details Modal */}

            {selectedOrder && (

                <div
                    onClick={() => setSelectedOrder(null)}
                    className="fixed inset-0 z-[100] bg-[#01303f]/75 backdrop-blur-sm flex justify-center items-center p-4"
                >

                    <div
                        onClick={(e) => e.stopPropagation()}
                        className={`w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl ${
                            darkMode ? "bg-[#1F2937]" : "bg-[#F8FAFC]"
                        }`}
                    >

                        {/* Modal Header */}

                        <div className={`sticky top-0 z-10 flex justify-between items-center px-6 py-4 border-b ${
                            darkMode
                                ? "bg-[#1F2937] border-gray-700"
                                : "bg-[#F8FAFC] border-slate-200"
                        }`}>

                            <div>
                                <h2 className={`text-xl font-bold ${tableText}`}>
                                    Order Details
                                </h2>

                                <p className={`text-sm ${mutedText}`}>
                                    {selectedOrder.orderId}
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={() => setSelectedOrder(null)}
                                className={`p-2 rounded-lg transition ${
                                    darkMode
                                        ? "hover:bg-red-900/50 text-gray-300 hover:text-red-300"
                                        : "hover:bg-red-50 text-gray-500 hover:text-red-500"
                                }`}
                            >
                                <FiX size={20} />
                            </button>

                        </div>

                        {/* Modal Body */}

                        <div className="p-6 space-y-6">

                            {/* Customer Details */}

                            <div>

                                <h3 className={`font-bold mb-3 ${tableText}`}>
                                    Customer Information
                                </h3>

                                <div className={`grid grid-cols-1 sm:grid-cols-2 gap-4 rounded-xl p-4 text-sm ${
                                    darkMode ? "bg-[#273449]" : "bg-[#DCEAF2]"
                                }`}>

                                    <div>
                                        <p className={mutedText}>
                                            Customer name
                                        </p>

                                        <p className={`font-semibold ${tableText}`}>
                                            {selectedOrder.firstName} {selectedOrder.lastName}
                                        </p>
                                    </div>

                                    <div>
                                        <p className={mutedText}>
                                            Email
                                        </p>

                                        <p className={`font-semibold break-all ${tableText}`}>
                                            {selectedOrder.email}
                                        </p>
                                    </div>

                                    <div>
                                        <p className={mutedText}>
                                            Phone
                                        </p>

                                        <p className={`font-semibold ${tableText}`}>
                                            {selectedOrder.phone}
                                        </p>
                                    </div>

                                    <div>
                                        <p className={mutedText}>
                                            Address
                                        </p>

                                        <p className={`font-semibold ${tableText}`}>
                                            {selectedOrder.addressLine1}, {selectedOrder.addressLine2} {selectedOrder.city}, {selectedOrder.postalCode}, {selectedOrder.country}
                                        </p>
                                    </div>

                                </div>

                            </div>

                            {/* Ordered Products */}

                            <div>

                                <h3 className={`font-bold mb-3 ${tableText}`}>
                                    Ordered Products
                                </h3>

                                <div className="space-y-3">

                                    {selectedOrder.items?.map((item, index) => (

                                        <div
                                            key={index}
                                            className={`flex items-center gap-4 border rounded-xl p-3 ${
                                                darkMode
                                                    ? "border-gray-700 bg-[#243244]"
                                                    : "border-slate-200 bg-white"
                                            }`}
                                        >

                                            <img
                                                src={item.image || "https://via.placeholder.com/80"}
                                                alt={item.name}
                                                className={`w-16 h-16 rounded-lg object-cover ${
                                                    darkMode ? "bg-gray-700" : "bg-gray-100"
                                                }`}
                                            />

                                            <div className="flex-1 min-w-0">

                                                <p className={`font-semibold truncate ${tableText}`}>
                                                    {item.name}
                                                </p>

                                                <p className={`text-xs ${mutedText}`}>
                                                    {item.productId}
                                                </p>

                                                <p className={`text-xs mt-1 ${mutedText}`}>
                                                    Quantity: {item.qty}
                                                </p>

                                            </div>

                                            <div className="text-right">

                                                <p className={`font-semibold ${tableText}`}>
                                                    {formatPrice(item.price * item.qty)}
                                                </p>

                                                <p className={`text-xs ${mutedText}`}>
                                                    {formatPrice(item.price)} each
                                                </p>

                                            </div>

                                        </div>

                                    ))}

                                </div>

                            </div>

                            {/* Order Total */}

                            <div className={`rounded-xl p-4 flex justify-between items-center ${
                                darkMode ? "bg-[#164E63]" : "bg-[#C5E3F0]"
                            }`}>

                                <span className={`font-semibold ${tableText}`}>
                                    Order Total
                                </span>

                                <span className={`text-xl font-bold ${
                                    darkMode ? "text-sky-300" : "text-[#0369a1]"
                                }`}>
                                    {formatPrice(selectedOrder.total)}
                                </span>

                            </div>

                        </div>

                    </div>

                </div>

            )}

        </div>

    );

}

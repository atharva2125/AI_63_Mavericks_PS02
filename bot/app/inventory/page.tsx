"use client";
import React, { useState } from 'react';

const InventoryDashboard = () => {
  // Sample inventory data
  const [inventoryData, setInventoryData] = useState([
    { id: 1, name: "Laptop", category: "Electronics", stock: 24, minLevel: 10, status: "In Stock", lastUpdated: "2025-03-15" },
    { id: 2, name: "Desk Chair", category: "Furniture", stock: 7, minLevel: 5, status: "Low Stock", lastUpdated: "2025-03-18" },
    { id: 3, name: "Printer", category: "Electronics", stock: 12, minLevel: 8, status: "In Stock", lastUpdated: "2025-03-10" },
    { id: 4, name: "Desk", category: "Furniture", stock: 3, minLevel: 5, status: "Critical", lastUpdated: "2025-03-20" },
    { id: 5, name: "Headphones", category: "Electronics", stock: 38, minLevel: 15, status: "In Stock", lastUpdated: "2025-03-12" },
    { id: 6, name: "Notebook", category: "Office Supplies", stock: 56, minLevel: 20, status: "In Stock", lastUpdated: "2025-03-17" },
    { id: 7, name: "Whiteboard", category: "Office Supplies", stock: 0, minLevel: 3, status: "Out of Stock", lastUpdated: "2025-03-19" },
    { id: 8, name: "Monitor", category: "Electronics", stock: 9, minLevel: 10, status: "Low Stock", lastUpdated: "2025-03-14" }
  ]);

  // Calculate summary metrics
  const totalItems = inventoryData.reduce((sum, item) => sum + item.stock, 0);
  const lowStockItems = inventoryData.filter(item => item.stock < item.minLevel).length;
  const outOfStockItems = inventoryData.filter(item => item.stock === 0).length;
  const categories = [...new Set(inventoryData.map(item => item.category))];

  // Filter state
  const [categoryFilter, setCategoryFilter] = useState("All");

  // Get filtered data
  const filteredItems = categoryFilter === "All" 
    ? inventoryData 
    : inventoryData.filter(item => item.category === categoryFilter);

  // Function to determine status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Stock": return "text-green-400";
      case "Low Stock": return "text-yellow-400";
      case "Critical": return "text-orange-400";
      case "Out of Stock": return "text-red-400";
      default: return "text-gray-400";
    }
  };

  return (
    <div className="bg-black text-gray-200 min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-white">Inventory Dashboard</h1>
        
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
            <h3 className="text-gray-400 text-sm">Total Items</h3>
            <p className="text-white text-2xl font-bold">{totalItems}</p>
          </div>
          <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
            <h3 className="text-gray-400 text-sm">Categories</h3>
            <p className="text-white text-2xl font-bold">{categories.length}</p>
          </div>
          <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
            <h3 className="text-gray-400 text-sm">Low Stock</h3>
            <p className="text-yellow-400 text-2xl font-bold">{lowStockItems}</p>
          </div>
          <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
            <h3 className="text-gray-400 text-sm">Out of Stock</h3>
            <p className="text-red-400 text-2xl font-bold">{outOfStockItems}</p>
          </div>
        </div>
        
        {/* Filters and Actions */}
        <div className="flex flex-col md:flex-row justify-between mb-6">
          <div className="mb-4 md:mb-0">
            <select 
              className="bg-gray-800 text-white border border-gray-700 rounded p-2"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="All">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          <div className="flex gap-2">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
              Add Item
            </button>
            <button className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded">
              Export
            </button>
          </div>
        </div>
        
        {/* Inventory Table */}
        <div className="bg-gray-900 rounded-lg border border-gray-700 overflow-hidden">
          <table className="min-w-full divide-y divide-gray-700">
            <thead className="bg-gray-800">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Stock</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Last Updated</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {filteredItems.map((item) => (
                <tr key={item.id} className="hover:bg-gray-800">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{item.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{item.category}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{item.stock}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`${getStatusColor(item.status)}`}>{item.status}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{item.lastUpdated}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                    <button className="text-blue-400 hover:text-blue-300 mr-3">Edit</button>
                    <button className="text-red-400 hover:text-red-300">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="flex justify-between items-center mt-4 text-sm text-gray-400">
          <div>
            Showing <span className="text-white">{filteredItems.length}</span> of <span className="text-white">{inventoryData.length}</span> items
          </div>
          <div className="flex gap-2">
            <button className="px-3 py-1 rounded bg-gray-800 hover:bg-gray-700">Previous</button>
            <button className="px-3 py-1 rounded bg-gray-800 hover:bg-gray-700">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InventoryDashboard;
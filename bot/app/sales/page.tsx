"use client";
import React, { useState } from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { ArrowUp, ArrowDown, DollarSign, Users, ShoppingBag, TrendingUp } from 'lucide-react';

const SalesDashboard = () => {
  // Sample data
  const salesData = [
    { month: 'Jan', sales: 4000, target: 3000, profit: 2400 },
    { month: 'Feb', sales: 3000, target: 3000, profit: 1398 },
    { month: 'Mar', sales: 2000, target: 3000, profit: 9800 },
    { month: 'Apr', sales: 2780, target: 3500, profit: 3908 },
    { month: 'May', sales: 4890, target: 3500, profit: 4800 },
    { month: 'Jun', sales: 3390, target: 3500, profit: 3800 },
    { month: 'Jul', sales: 5490, target: 4000, profit: 4300 },
    { month: 'Aug', sales: 6390, target: 4000, profit: 5300 },
    { month: 'Sep', sales: 4490, target: 4000, profit: 3300 },
    { month: 'Oct', sales: 5100, target: 4500, profit: 4100 },
    { month: 'Nov', sales: 4990, target: 4500, profit: 4000 },
    { month: 'Dec', sales: 6700, target: 4500, profit: 5400 },
  ];

  const productData = [
    { name: 'Product A', value: 400 },
    { name: 'Product B', value: 300 },
    { name: 'Product C', value: 300 },
    { name: 'Product D', value: 200 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  // Get current year totals
  const totalSales = salesData.reduce((sum, item) => sum + item.sales, 0);
  const totalProfit = salesData.reduce((sum, item) => sum + item.profit, 0);
  
  // Calculate quarter data
  const Q1 = salesData.slice(0, 3).reduce((sum, item) => sum + item.sales, 0);
  const Q2 = salesData.slice(3, 6).reduce((sum, item) => sum + item.sales, 0);
  const Q3 = salesData.slice(6, 9).reduce((sum, item) => sum + item.sales, 0);
  const Q4 = salesData.slice(9, 12).reduce((sum, item) => sum + item.sales, 0);
  
  // Previous year data (mock comparison)
  const prevYearSales = totalSales * 0.85;
  const salesGrowth = ((totalSales - prevYearSales) / prevYearSales * 100).toFixed(1);
  
  const prevYearProfit = totalProfit * 0.8;
  const profitGrowth = ((totalProfit - prevYearProfit) / prevYearProfit * 100).toFixed(1);

  return (
    <div className="bg-black text-gray-100 p-6 rounded-lg w-full h-full">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Sales Dashboard</h1>
        <p className="text-gray-400">Performance overview for 2025</p>
      </div>
      
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-gray-900 p-4 rounded-lg">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-400 text-sm">Total Revenue</p>
              <p className="text-2xl font-bold text-white">${(totalSales/1000).toFixed(1)}K</p>
            </div>
            <div className={`flex items-center ${parseFloat(salesGrowth) >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {parseFloat(salesGrowth) >= 0 ? <ArrowUp size={20} /> : <ArrowDown size={20} />}
              <span className="ml-1">{Math.abs(parseFloat(salesGrowth))}%</span>
            </div>
          </div>
          <div className="mt-2">
            <DollarSign className="text-blue-500" size={18} />
          </div>
        </div>
        
        <div className="bg-gray-900 p-4 rounded-lg">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-400 text-sm">Total Profit</p>
              <p className="text-2xl font-bold text-white">${(totalProfit/1000).toFixed(1)}K</p>
            </div>
            <div className={`flex items-center ${parseFloat(profitGrowth) >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {parseFloat(profitGrowth) >= 0 ? <ArrowUp size={20} /> : <ArrowDown size={20} />}
              <span className="ml-1">{Math.abs(parseFloat(profitGrowth))}%</span>
            </div>
          </div>
          <div className="mt-2">
            <TrendingUp className="text-green-500" size={18} />
          </div>
        </div>
        
        <div className="bg-gray-900 p-4 rounded-lg">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-400 text-sm">Customers</p>
              <p className="text-2xl font-bold text-white">8,642</p>
            </div>
            <div className="flex items-center text-green-500">
              <ArrowUp size={20} />
              <span className="ml-1">12.3%</span>
            </div>
          </div>
          <div className="mt-2">
            <Users className="text-purple-500" size={18} />
          </div>
        </div>
        
        <div className="bg-gray-900 p-4 rounded-lg">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-400 text-sm">Orders</p>
              <p className="text-2xl font-bold text-white">3,721</p>
            </div>
            <div className="flex items-center text-green-500">
              <ArrowUp size={20} />
              <span className="ml-1">7.2%</span>
            </div>
          </div>
          <div className="mt-2">
            <ShoppingBag className="text-yellow-500" size={18} />
          </div>
        </div>
      </div>
      
      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Monthly Sales Chart */}
        <div className="bg-gray-900 p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-4 text-white">Monthly Sales vs Target</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={salesData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                <XAxis dataKey="month" stroke="#999" />
                <YAxis stroke="#999" />
                <Tooltip contentStyle={{ backgroundColor: '#333', border: 'none', color: '#fff' }} />
                <Legend />
                <Bar dataKey="sales" name="Sales" fill="#3B82F6" />
                <Bar dataKey="target" name="Target" fill="#6366F1" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Profit Trends */}
        <div className="bg-gray-900 p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-4 text-white">Profit Trends</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={salesData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                <XAxis dataKey="month" stroke="#999" />
                <YAxis stroke="#999" />
                <Tooltip contentStyle={{ backgroundColor: '#333', border: 'none', color: '#fff' }} />
                <Legend />
                <Line type="monotone" dataKey="profit" name="Profit" stroke="#10B981" strokeWidth={2} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Product Distribution */}
        <div className="bg-gray-900 p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-4 text-white">Product Distribution</h2>
          <div className="h-64 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={productData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {productData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#333', border: 'none', color: '#fff' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Quarterly Performance */}
        <div className="bg-gray-900 p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-4 text-white">Quarterly Performance</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={[
                  { quarter: 'Q1', sales: Q1 },
                  { quarter: 'Q2', sales: Q2 },
                  { quarter: 'Q3', sales: Q3 },
                  { quarter: 'Q4', sales: Q4 }
                ]}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                <XAxis dataKey="quarter" stroke="#999" />
                <YAxis stroke="#999" />
                <Tooltip contentStyle={{ backgroundColor: '#333', border: 'none', color: '#fff' }} />
                <Bar dataKey="sales" name="Quarterly Sales" fill="#EC4899" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesDashboard;
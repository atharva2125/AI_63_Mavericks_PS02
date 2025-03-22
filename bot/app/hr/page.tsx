"use client";

import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { ArrowUpRight, Users, Clock, Award, BriefcaseBusiness, AlertCircle, Brain, Lightbulb, TrendingUp } from 'lucide-react';

const HRPage = () => {
  interface Insight {
    id: number;
    title: string;
    description: string;
    action: string;
    priority: string;
    icon: React.ReactNode;
  }
  
  const [insights, setInsights] = useState<Insight[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [employeeData, setEmployeeData] = useState([
    { department: 'Engineering', count: 42, turnover: 12, engagement: 76 },
    { department: 'Marketing', count: 18, turnover: 22, engagement: 68 },
    { department: 'Sales', count: 27, turnover: 18, engagement: 72 },
    { department: 'Customer Support', count: 36, turnover: 15, engagement: 74 },
    { department: 'Finance', count: 12, turnover: 8, engagement: 82 },
  ]);

  // Fetch AI-generated insights from endpoint
  useEffect(() => {
    const fetchInsightsFromAI = async () => {
      setLoading(true);
      try {
        // In a real implementation, this would be your actual GenAI endpoint
        // const response = await fetch('/api/genai/hr-insights', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify({ department: selectedDepartment, employeeData })
        // });
        // const data = await response.json();
        // setInsights(data.insights);

        // Simulating API response for demonstration
        await new Promise(resolve => setTimeout(resolve, 1200));
        
        // This simulates what would come from your GenAI endpoint
        const aiGeneratedInsights = [
          {
            id: 1,
            title: "Turnover Risk Detected",
            description: "Engineering department's turnover rate has increased 3% above historical average. Pattern analysis suggests workload and compensation factors.",
            action: "Conduct focused stay interviews with high performers and review compensation benchmarks for market alignment.",
            priority: "high",
            icon: <AlertCircle className="text-red-400" size={20} />
          },
          {
            id: 2,
            title: "Engagement Opportunity",
            description: "Marketing team shows correlation between training budget utilization and engagement scores. Current budget is 32% underutilized.",
            action: "Launch skill development program focused on emerging digital marketing technologies.",
            priority: "medium",
            icon: <Lightbulb className="text-amber-400" size={20} />
          },
          {
            id: 3, 
            title: "Hiring Forecast Model",
            description: "Predictive model indicates Customer Support will need 3-5 new hires in Q2 based on growth trajectory and historical support ticket patterns.",
            action: "Begin talent pipeline development with focus on technical support specialists.",
            priority: "medium",
            icon: <TrendingUp className="text-blue-400" size={20} />
          },
          {
            id: 4,
            title: "Productivity Enhancement",
            description: "NLP analysis of meeting patterns indicates 22% of recurring meetings lack clear agenda items or actionable outcomes.",
            action: "Implement meeting effectiveness framework and roll out communication efficiency training.",
            priority: "low",
            icon: <Clock className="text-green-400" size={20} />
          }
        ];
        
        // Filter insights based on selected department
        let filteredInsights = aiGeneratedInsights;
        if (selectedDepartment !== 'All') {
          filteredInsights = aiGeneratedInsights.filter(insight => 
            insight.description.toLowerCase().includes(selectedDepartment.toLowerCase())
          );
        }
        
        setInsights(filteredInsights);
      } catch (error) {
        console.error("Error fetching AI insights:", error);
        setInsights([]);
      } finally {
        setLoading(false);
      }
    };
    
    fetchInsightsFromAI();
  }, [selectedDepartment, employeeData]);

  // Custom tooltip for charts
  const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: { name: string; value: number; color: string }[]; label?: string }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-900 border border-gray-700 p-4 rounded shadow-lg">
          <p className="text-gray-200 font-medium">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }} className="text-sm">
              {`${entry.name}: ${entry.value}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-gray-900 min-h-screen text-gray-100">
      <div className="container mx-auto p-6">
        <header className="mb-8">
          <div className="flex items-center gap-3">
            <Brain size={32} className="text-indigo-400" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">HR Intelligence Dashboard</h1>
          </div>
          <p className="text-gray-400 mt-2">AI-powered insights to optimize your workforce management</p>
        </header>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 shadow-md">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-400 text-sm">Total Employees</p>
                <p className="text-2xl font-bold mt-1 text-white">135</p>
              </div>
              <Users className="text-indigo-400" />
            </div>
            <div className="flex items-center mt-4 text-xs text-green-400">
              <ArrowUpRight size={14} />
              <span className="ml-1">12% from last month</span>
            </div>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 shadow-md">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-400 text-sm">Avg. Retention</p>
                <p className="text-2xl font-bold mt-1 text-white">3.2 yrs</p>
              </div>
              <BriefcaseBusiness className="text-purple-400" />
            </div>
            <div className="flex items-center mt-4 text-xs text-green-400">
              <ArrowUpRight size={14} />
              <span className="ml-1">5% improvement</span>
            </div>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 shadow-md">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-400 text-sm">Time to Hire</p>
                <p className="text-2xl font-bold mt-1 text-white">24 days</p>
              </div>
              <Clock className="text-amber-400" />
            </div>
            <div className="flex items-center mt-4 text-xs text-red-400">
              <ArrowUpRight size={14} className="transform rotate-45" />
              <span className="ml-1">3 days longer than target</span>
            </div>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 shadow-md">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-400 text-sm">Engagement Score</p>
                <p className="text-2xl font-bold mt-1 text-white">74%</p>
              </div>
              <Award className="text-green-400" />
            </div>
            <div className="flex items-center mt-4 text-xs text-green-400">
              <ArrowUpRight size={14} />
              <span className="ml-1">2% increase</span>
            </div>
          </div>
        </div>

        {/* Department filter */}
        <div className="mb-6 flex items-center">
          <label htmlFor="department" className="mr-2 text-gray-300">Department Filter:</label>
          <select 
            id="department"
            className="bg-gray-800 border border-gray-700 rounded p-2 text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
          >
            <option value="All">All Departments</option>
            {employeeData.map(dept => (
              <option key={dept.department} value={dept.department}>{dept.department}</option>
            ))}
          </select>
        </div>

        {/* Main content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left column - Charts */}
          <div className="lg:col-span-2">
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 shadow-lg mb-8">
              <h2 className="text-xl font-semibold mb-4 text-white">Department Overview</h2>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={employeeData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 25 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis 
                      dataKey="department" 
                      tick={{ fill: '#D1D5DB' }}
                      tickLine={{ stroke: '#4B5563' }}
                      axisLine={{ stroke: '#4B5563' }}
                      angle={-15}
                      textAnchor="end"
                      height={60}
                    />
                    <YAxis 
                      tick={{ fill: '#D1D5DB' }}
                      tickLine={{ stroke: '#4B5563' }}
                      axisLine={{ stroke: '#4B5563' }}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend 
                      wrapperStyle={{ paddingTop: 10 }}
                      formatter={(value) => <span className="text-gray-300">{value}</span>}
                    />
                    <Bar dataKey="count" name="Employee Count" fill="#818CF8" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="turnover" name="Turnover %" fill="#F87171" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="engagement" name="Engagement %" fill="#6EE7B7" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 shadow-lg">
                <h2 className="text-xl font-semibold mb-4 text-white">Open Positions</h2>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[
                        { department: 'Eng', openings: 4 },
                        { department: 'Mktg', openings: 2 },
                        { department: 'Sales', openings: 6 },
                        { department: 'CS', openings: 3 },
                        { department: 'Fin', openings: 1 },
                      ]}
                      margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis 
                        dataKey="department" 
                        tick={{ fill: '#D1D5DB' }}
                        tickLine={{ stroke: '#4B5563' }}
                        axisLine={{ stroke: '#4B5563' }}
                      />
                      <YAxis 
                        tick={{ fill: '#D1D5DB' }}
                        tickLine={{ stroke: '#4B5563' }}
                        axisLine={{ stroke: '#4B5563' }}
                      />
                      <Tooltip content={<CustomTooltip />} />
                      <Bar dataKey="openings" name="Open Positions" fill="#C084FC" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 shadow-lg">
                <h2 className="text-xl font-semibold mb-4 text-white">Engagement Trend</h2>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={[
                        { month: 'Jan', score: 71 },
                        { month: 'Feb', score: 68 },
                        { month: 'Mar', score: 70 },
                        { month: 'Apr', score: 72 },
                        { month: 'May', score: 74 },
                        { month: 'Jun', score: 76 },
                      ]}
                      margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis 
                        dataKey="month" 
                        tick={{ fill: '#D1D5DB' }}
                        tickLine={{ stroke: '#4B5563' }}
                        axisLine={{ stroke: '#4B5563' }}
                      />
                      <YAxis 
                        domain={[60, 80]}
                        tick={{ fill: '#D1D5DB' }}
                        tickLine={{ stroke: '#4B5563' }}
                        axisLine={{ stroke: '#4B5563' }}
                      />
                      <Tooltip content={<CustomTooltip />} />
                      <Line 
                        type="monotone" 
                        dataKey="score" 
                        name="Engagement Score" 
                        stroke="#34D399" 
                        strokeWidth={3}
                        dot={{ fill: '#34D399', strokeWidth: 2, r: 4 }}
                        activeDot={{ fill: '#F3F4F6', stroke: '#34D399', strokeWidth: 2, r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>

          {/* Right column - AI Insights */}
          <div>
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 shadow-lg sticky top-6">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2">
                  <Brain size={20} className="text-indigo-400" />
                  <h2 className="text-xl font-semibold text-white">AI-Generated Insights</h2>
                </div>
                <button 
                  className="text-sm bg-indigo-900 text-indigo-300 px-3 py-1 rounded-full flex items-center hover:bg-indigo-800 transition-colors"
                  onClick={() => setSelectedDepartment('All')}
                >
                  <span>Refresh</span>
                </button>
              </div>

              {loading ? (
                <div className="flex flex-col justify-center items-center h-64">
                  <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-indigo-400 mb-4"></div>
                  <p className="text-gray-400 text-sm">Generating insights with AI...</p>
                </div>
              ) : insights.length > 0 ? (
                <div className="space-y-4">
                  {insights.map(insight => (
                    <div key={insight.id} className={`p-4 rounded-lg border-l-4 bg-opacity-10 ${
                      insight.priority === 'high' ? 'border-red-400 bg-red-900' :
                      insight.priority === 'medium' ? 'border-amber-400 bg-amber-900' :
                      'border-green-400 bg-green-900'
                    }`}>
                      <div className="flex items-start">
                        <div className="mr-3 mt-1 flex-shrink-0">{insight.icon}</div>
                        <div>
                          <h3 className="font-medium text-white">{insight.title}</h3>
                          <p className="text-sm text-gray-300 mt-1">{insight.description}</p>
                          <div className="mt-2 pt-2 border-t border-gray-700">
                            <span className="text-xs font-medium bg-gray-700 text-gray-300 px-2 py-1 rounded">
                              Recommended action:
                            </span>
                            <p className="text-sm mt-1 text-gray-300">{insight.action}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-400 bg-gray-800 rounded-lg">
                  <AlertCircle className="mx-auto mb-3 text-gray-500" />
                  <p>No insights available for the selected filter.</p>
                </div>
              )}
              
              <div className="mt-6 pt-4 border-t border-gray-700">
                <p className="text-xs text-gray-500">
                  Insights generated by AI based on pattern analysis of historical HR data, exit interviews, performance reviews, and industry benchmarks.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HRPage;
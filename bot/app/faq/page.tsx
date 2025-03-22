"use client";
import React, { useState } from 'react';
import { Search, ChevronDown, ChevronUp, MessageCircle, Clock, Star, Filter } from 'lucide-react';

// Define TypeScript interfaces
interface FAQ {
  id: number;
  category: string;
  question: string;
  answer: string;
  views: number;
  helpful: number;
}

type CategoryColors = {
  [key: string]: string;
};

const FAQDashboard = () => {
  // Sample FAQ data
  const faqData: FAQ[] = [
    {
      id: 1,
      category: "Product",
      question: "How do I reset my password?",
      answer: "To reset your password, click on the 'Forgot Password' link on the login page. You'll receive an email with instructions to create a new password.",
      views: 1250,
      helpful: 95
    },
    {
      id: 2,
      category: "Billing",
      question: "When will I be charged for my subscription?",
      answer: "Your subscription is billed on the same date each month based on your signup date. For example, if you subscribed on the 15th, you'll be charged on the 15th of each month.",
      views: 853,
      helpful: 88
    },
    {
      id: 3,
      category: "Shipping",
      question: "How long does shipping take?",
      answer: "Standard shipping typically takes 3-5 business days within the continental US. International shipping can take 7-14 business days depending on the destination country and customs processing.",
      views: 1567,
      helpful: 91
    },
    {
      id: 4,
      category: "Returns",
      question: "What is your return policy?",
      answer: "We offer a 30-day return policy for all unused and unopened items. To initiate a return, please log into your account and select the order you wish to return. Return shipping labels are provided free of charge.",
      views: 2108,
      helpful: 94
    },
    {
      id: 5,
      category: "Product",
      question: "Can I use the app offline?",
      answer: "Yes, our app has offline capabilities. You can download content for offline use by clicking the download icon next to any item. Note that some features requiring real-time data may be limited when offline.",
      views: 732,
      helpful: 87
    },
    {
      id: 6,
      category: "Account",
      question: "How do I delete my account?",
      answer: "To delete your account, go to Account Settings > Privacy > Delete Account. Please note that account deletion is permanent and will remove all your data from our systems within 30 days.",
      views: 645,
      helpful: 79
    },
    {
      id: 7,
      category: "Billing",
      question: "Do you offer refunds for unused subscription time?",
      answer: "Yes, we provide prorated refunds for the unused portion of your subscription when you cancel. The refund will be processed to your original payment method within 5-7 business days.",
      views: 921,
      helpful: 85
    },
    {
      id: 8,
      category: "Product",
      question: "Is there a limit to how many devices I can use?",
      answer: "Standard accounts can be used on up to 2 devices simultaneously. Premium accounts allow for up to 5 devices, and Family Plan subscribers can use the service on up to 10 devices across 6 different user profiles.",
      views: 1033,
      helpful: 92
    },
  ];

  // State management
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [sortBy, setSortBy] = useState<string>('popular');

  // Get unique categories
  const categories: string[] = ['All', ...Array.from(new Set(faqData.map(faq => faq.category)))];

  // Filter FAQs based on search and category
  const filteredFAQs: FAQ[] = faqData.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Sort FAQs
  const sortedFAQs: FAQ[] = [...filteredFAQs].sort((a, b) => {
    if (sortBy === 'popular') return b.views - a.views;
    if (sortBy === 'helpful') return b.helpful - a.helpful;
    return 0;
  });

  // Toggle FAQ expansion
  const toggleExpand = (id: number): void => {
    setExpandedId(expandedId === id ? null : id);
  };

  // Category color mappings
  const categoryColors: CategoryColors = {
    "Product": "blue",
    "Billing": "purple",
    "Shipping": "green",
    "Returns": "amber",
    "Account": "rose"
  };

  // Function to get category color classes
  const getCategoryColorClasses = (category: string): string => {
    const colorMap: {[key: string]: string} = {
      "blue": "bg-blue-900 text-blue-200",
      "purple": "bg-purple-900 text-purple-200",
      "green": "bg-green-900 text-green-200",
      "amber": "bg-amber-900 text-amber-200",
      "rose": "bg-rose-900 text-rose-200"
    };
    
    return colorMap[categoryColors[category] || "blue"];
  };

  return (
    <div className="bg-black text-gray-200 p-6 rounded-lg shadow-lg max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-2">Frequently Asked Questions</h1>
        <p className="text-gray-400">Find answers to common questions about our products and services.</p>
      </div>
      
      {/* Search and filters */}
      <div className="mb-6">
        <div className="relative mb-4">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-500" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-700 rounded-md leading-5 bg-gray-900 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Search for questions or keywords..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex flex-wrap gap-3 items-center justify-between">
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-gray-400" />
            <span className="text-sm text-gray-400">Filter by:</span>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  className={`px-3 py-1 text-sm rounded-full ${
                    selectedCategory === category 
                      ? 'bg-blue-900 text-blue-200 border border-blue-700' 
                      : 'bg-gray-800 text-gray-300 border border-gray-700 hover:bg-gray-700'
                  }`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
          
          <div className="flex items-center">
            <span className="text-sm text-gray-400 mr-2">Sort by:</span>
            <select
              className="text-sm border border-gray-700 rounded p-1 bg-gray-900 text-gray-300"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="popular">Most viewed</option>
              <option value="helpful">Most helpful</option>
            </select>
          </div>
        </div>
      </div>
      
      {/* FAQ list */}
      <div className="space-y-4">
        {sortedFAQs.length > 0 ? (
          sortedFAQs.map((faq) => (
            <div 
              key={faq.id} 
              className="border border-gray-800 rounded-lg overflow-hidden shadow-md bg-gray-900"
            >
              <div 
                className="flex justify-between items-center p-4 cursor-pointer hover:bg-gray-800"
                onClick={() => toggleExpand(faq.id)}
              >
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className={`px-2 py-1 text-xs font-medium rounded ${getCategoryColorClasses(faq.category)}`}>
                      {faq.category}
                    </span>
                    <div className="flex items-center text-xs text-gray-500">
                      <MessageCircle className="h-3 w-3 mr-1" />
                      <span>{faq.views} views</span>
                    </div>
                    <div className="flex items-center text-xs text-gray-500">
                      <Star className="h-3 w-3 mr-1 text-yellow-500" />
                      <span>{faq.helpful}% found helpful</span>
                    </div>
                  </div>
                  <h3 className="font-medium text-gray-100">{faq.question}</h3>
                </div>
                <div className="ml-4">
                  {expandedId === faq.id ? 
                    <ChevronUp className="h-5 w-5 text-gray-400" /> : 
                    <ChevronDown className="h-5 w-5 text-gray-400" />
                  }
                </div>
              </div>
              
              {expandedId === faq.id && (
                <div className="p-4 bg-gray-800 border-t border-gray-700">
                  <p className="text-gray-300 whitespace-pre-line">{faq.answer}</p>
                  <div className="mt-4 flex justify-between items-center">
                    <div className="text-sm text-gray-500 flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>Last updated: March 10, 2025</span>
                    </div>
                    <div className="flex space-x-2">
                      <button className="px-3 py-1 text-xs bg-blue-900 text-blue-200 rounded border border-blue-700 hover:bg-blue-800">
                        Helpful
                      </button>
                      <button className="px-3 py-1 text-xs bg-gray-700 text-gray-300 rounded border border-gray-600 hover:bg-gray-600">
                        Not helpful
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="text-center py-10 bg-gray-900 rounded-lg">
            <p className="text-gray-400">No FAQ entries match your search criteria.</p>
            <button 
              className="mt-2 text-blue-400 hover:text-blue-300"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
      
      {/* Footer */}
      <div className="mt-8 pt-4 border-t border-gray-800">
        <p className="text-gray-400 text-sm">
          Can't find what you're looking for? 
          <a href="#" className="text-blue-400 ml-1 hover:text-blue-300 hover:underline">Contact our support team</a>.
        </p>
      </div>
    </div>
  );
};

export default FAQDashboard;
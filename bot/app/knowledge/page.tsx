"use client";

import { useState, useEffect } from "react";

export default function KnowledgeBasePage() {
  // State to manage knowledge base articles
  const [articles, setArticles] = useState<{ id: number; title: string; description: string; content: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // List of company project names to use as reference
  const companyProjects = [
    "TechCorp AI Solutions",
    "Global ERP Systems",
    "NextGen Innovations",
    "SmartBiz Technologies",
    "FutureWorks AI",
  ];

  // Simulate fetching knowledge base articles
  useEffect(() => {
    const fetchKnowledgeBase = async () => {
      setLoading(true);
      setError(null);

      try {
        // Simulate a delay to mimic an API call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Mock data
        const mockArticles = [
          {
            id: 1,
            title: "How to Optimize ERP Systems",
            description: "Learn the best practices for optimizing ERP systems in your organization.",
            content: "ERP optimization involves streamlining processes, integrating modules, and leveraging AI for automation.",
          },
          {
            id: 2,
            title: "AI in Business Management",
            description: "Discover how AI is transforming business management across industries.",
            content: "AI enables predictive analytics, process automation, and enhanced decision-making in business management.",
          },
          {
            id: 3,
            title: "Future of AI in ERP",
            description: "Explore the future trends of AI in ERP systems.",
            content: "AI in ERP systems will focus on predictive analytics, real-time decision-making, and enhanced user experiences.",
          },
        ];

        setArticles(mockArticles);
      } catch (err) {
        console.error("Error fetching knowledge base articles:", err);
        setError("Failed to fetch knowledge base articles. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchKnowledgeBase();
  }, []);

  return (
    <div className="bg-black text-white min-h-screen py-8">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-8">Knowledge Base Management</h1>

        {loading && <p className="text-gray-400">Loading knowledge base articles...</p>}

        {error && <p className="text-red-500">{error}</p>}

        {!loading && !error && articles.length === 0 && (
          <p className="text-gray-400">No articles available. Try generating new content.</p>
        )}

        {!loading && !error && articles.length > 0 && (
          <div className="space-y-4">
            {articles.map((article) => (
              <div key={article.id} className="p-4 bg-gray-800 rounded shadow">
                <h2 className="text-xl font-semibold">{article.title}</h2>
                <p className="text-gray-300">{article.description}</p>
                <details className="mt-2">
                  <summary className="text-blue-400 cursor-pointer">Read More</summary>
                  <p className="text-gray-400 mt-2">{article.content}</p>
                </details>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
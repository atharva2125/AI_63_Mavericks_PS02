"use client";

import { useEffect, useState } from "react";

type FAQ = {
  id: string;
  question: string;
  answer: string;
};

export default function FAQPage() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch FAQs from the backend
    const fetchFAQs = async () => {
      try {
        const response = await fetch("http://localhost:5000/faqs");
        if (!response.ok) {
          throw new Error("Failed to fetch FAQs");
        }
        const data = await response.json();
        setFaqs(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFAQs();
  }, []);

  if (loading) return <p>Loading FAQs...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Frequently Asked Questions</h1>
      <ul className="space-y-4">
        {faqs.map((faq) => (
          <li key={faq.id} className="border-b pb-4">
            <h2 className="text-lg font-semibold">{faq.question}</h2>
            <p className="text-gray-700">{faq.answer}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
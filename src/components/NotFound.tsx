import React from "react";
import { Link } from "react-router-dom";

export const NotFoundPage: React.FC = () => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
    <h1 className="text-5xl font-bold text-blue-700 mb-4">404</h1>
    <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
    <p className="text-gray-600 mb-6">The page you're looking for does not exist, or the campaign could not be found.</p>
    <Link to="/" className="px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700">Go to Dashboard</Link>
  </div>
);

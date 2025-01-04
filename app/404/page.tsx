import { NextPage } from "next";
import Link from "next/link";

const NotFound: NextPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md text-center">
        <h2 className="text-2xl font-semibold mb-4">404 - Page Not Found</h2>

        <Link href="/" className="text-blue-500 hover:text-blue-600">
          Go to Home page
        </Link>
      </div>
    </div>
  );
};

export default NotFound;

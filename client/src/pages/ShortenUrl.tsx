// import React, { useState } from "react";
// import axios from "axios";
// import config from "../config";
// import { useNavigate } from "react-router-dom";

// const ShortenUrl: React.FC = () => {
//   const [originalUrl, setOriginalUrl] = useState<string>("");
//   const [shortUrl, setShortUrl] = useState<string | null>(null);
//   const [error, setError] = useState<string | null>(null);
//   const [loading, setLoading] = useState<boolean>(false);
//   const navigate = useNavigate();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError(null);
//     setShortUrl(null);
//     setLoading(true);

//     try {
//       const token = localStorage.getItem("token"); // Get JWT token from localStorage
//       console.log("Token is hereeee", token);

//       if (!token) {
//         throw new Error("User is not authenticated.");
//       }

//       const response = await axios.post(
//         `${config.baseURL}/shorten-url`,
//         { originalUrl },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`, // Attach the token in the Authorization header
//           },
//         }
//       );

//       setShortUrl(`${config.baseURL}/shorten-url/${response.data.shortId}`);
//       setOriginalUrl("");
//     } catch (err: any) {
//       setError(err.response?.data?.message || "An error occurred.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleLogout = () => {
//     // Clear the token
//     localStorage.removeItem("token");
//     // Redirect to login page
//     navigate("/login");
//     // Prevent going back after logging out
//     window.history.pushState(null, "", window.location.href);
//     window.addEventListener("popstate", () => {
//       navigate("/login");
//     });
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
//       <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-lg">
//         <div className="flex justify-between items-center mb-6">
//           <h2 className="text-3xl font-bold text-gray-800">Shorten Your URL</h2>
//           <button
//             onClick={handleLogout}
//             className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
//           >
//             Logout
//           </button>
//         </div>
//         <form onSubmit={handleSubmit}>
//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-600 mb-2">
//               Original URL
//             </label>
//             <input
//               type="url"
//               value={originalUrl}
//               onChange={(e) => setOriginalUrl(e.target.value)}
//               required
//               placeholder="Enter a URL"
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//             />
//           </div>

//           {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
//           {shortUrl && (
//             <p className="text-green-500 text-sm mb-4">
//               Shortened URL:{" "}
//               <a
//                 href={shortUrl}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="text-blue-500 hover:underline"
//               >
//                 {shortUrl}
//               </a>
//             </p>
//           )}

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 focus:outline-none disabled:bg-gray-300"
//           >
//             {loading ? "Shortening..." : "Shorten URL"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default ShortenUrl;

import React, { useState } from "react";
import axios from "axios";
import config from "../config";
import { useNavigate } from "react-router-dom";

const ShortenUrl: React.FC = () => {
  const [originalUrl, setOriginalUrl] = useState<string>("");
  const [shortUrl, setShortUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setShortUrl(null);
    setLoading(true);

    try {
      const token = localStorage.getItem("token"); // Get JWT token from localStorage
      console.log("Token is hereeee", token);

      if (!token) {
        throw new Error("User is not authenticated.");
      }

      const response = await axios.post(
        `${config.baseURL}/shorten-url`,
        { originalUrl },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Attach the token in the Authorization header
          },
        }
      );

      setShortUrl(`${config.baseURL}/shorten-url/${response.data.shortId}`);
      setOriginalUrl("");
    } catch (err: any) {
      setError(err.response?.data?.message || "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    // Clear the token
    localStorage.removeItem("token");
    // Redirect to login page
    navigate("/login");
    // Prevent going back after logging out
    window.history.pushState(null, "", window.location.href);
    window.addEventListener("popstate", () => {
      navigate("/login");
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Logout Button */}
      <div className="p-4 bg-white shadow-sm flex justify-end">
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:ring-2 focus:ring-red-400"
        >
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center flex-grow">
        <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">
            Shorten Your URL
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Original URL
              </label>
              <input
                type="url"
                value={originalUrl}
                onChange={(e) => setOriginalUrl(e.target.value)}
                required
                placeholder="Enter a URL"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            {shortUrl && (
              <p className="text-green-500 text-sm mb-4">
                Shortened URL:{" "}
                <a
                  href={shortUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  {shortUrl}
                </a>
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md font-semibold hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 focus:outline-none disabled:bg-gray-300"
            >
              {loading ? "Shortening..." : "Shorten URL"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ShortenUrl;

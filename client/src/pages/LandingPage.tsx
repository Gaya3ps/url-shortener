import { useNavigate } from "react-router-dom";

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center bg-fixed text-white"
      style={{
        backgroundImage: `url('https://source.unsplash.com/1920x1080/?technology,abstract')`,
      }}
    >
      <div className="bg-black bg-opacity-60 p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-5xl font-extrabold mb-6">
          Welcome to URL Shortener
        </h1>
        <p className="text-lg mb-8">
          Simplify your links and manage them effortlessly.
        </p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => navigate("/login")}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 shadow-md transform hover:scale-105 transition-all"
          >
            Login
          </button>
          <button
            onClick={() => navigate("/register")}
            className="px-6 py-3 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 shadow-md transform hover:scale-105 transition-all"
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;

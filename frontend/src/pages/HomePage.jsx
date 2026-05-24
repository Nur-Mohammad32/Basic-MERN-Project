import Navbar from "../components/Navbar";
import RateLimitedUI from "../components/RateLimitedUI";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-base-100 text-base-content">
      <Navbar />

      <main className="max-w-6xl px-4 pt-6 mx-auto">
        <RateLimitedUI />
      </main>
    </div>
  );
};

export default HomePage;

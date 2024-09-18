import { Link } from "react-router-dom";
export default function Home() {
  return (
    <div className="flex flex-col mx-4 md:mx-20 my-4 md:my-10 space-y-2 md:space-y-0 gap-2 md:gap-6 ">
      <nav className="flex flex-row justify-between items-center ">
        <div className="flex flex-row items-center gap-4 md:gap-8">
          {/* Hamburger Icon */}
          <Link to={"/menu"}>
            <div className="space-y-1 md:space-y-2">
              <div className="w-6 md:w-8 h-0.5 bg-gray-800"></div>
              <div className="w-6 md:w-8 h-0.5 bg-gray-800"></div>
              <div className="w-6 md:w-8 h-0.5 bg-gray-800"></div>
            </div>
          </Link>
        </div>

        {/* Button */}
        <div>
          <Link
            to={"/menu"}
            className="bg-stone-700 text-white font-bold py-1 md:py-3 px-4 md:px-6 rounded-md shadow-md hover:bg-green-700 border-2 border-white md:order-3"
          >
            Calculate
          </Link>
        </div>
      </nav>

      <div className="bg-gray-100 h-screen">
        {/* Hero Section */}
        <section className="bg-gray-800 text-white py-20">
          <div className="container mx-auto px-6">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-center">
              Football Analysis
            </h1>
          </div>
        </section>

        <div className="container mx-auto text-center mt-6">
          <Link
            to={"/menu"}
            className="bg-blue-600 py-3 px-6 rounded-lg text-white font-semibold hover:bg-blue-500 transition"
          >
            Go to Match
          </Link>
        </div>
      </div>
    </div>
  );
}

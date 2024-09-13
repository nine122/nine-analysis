import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

function App() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const label = ["W1", "X", "W2", "BTTS", "Over2.5", "Under2.5"];

  useEffect(() => {
    // Fetch data from the API
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/difference`
        );

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const result = await response.json();
        setData(result); // Update state with the result
      } catch (err) {
        setError(err.message); // Update error state if something goes wrong
      } finally {
        setLoading(false); // Stop loading once the fetch completes
      }
    };

    fetchData(); // Call the async function
  }, []); // Empty dependency array means this runs once when the component mounts

  // Render the data, error, or loading message
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="flex flex-col mx-4 md:mx-20 my-4 md:my-10 space-y-2 md:space-y-0 gap-2 md:gap-6 ">
      <nav className="flex flex-row justify-between items-center ">
        <div className="flex flex-row items-center gap-4 md:gap-8">
          {/* Hamburger Icon */}
          <div className="space-y-1 md:space-y-2">
            <div className="w-6 md:w-8 h-0.5 bg-gray-800"></div>
            <div className="w-6 md:w-8 h-0.5 bg-gray-800"></div>
            <div className="w-6 md:w-8 h-0.5 bg-gray-800"></div>
          </div>

          {/* Title */}
          <div className="text-xl md:text-3xl font-bold italic text-center md:order-2">
            Football Analysis
          </div>
        </div>

        {/* Button */}
        <div>
          <Link
            to="/edit"
            className="text-black font-bold py-1 md:py-3 px-4 md:px-6 text-xl mx-3"
          >
            Edit
          </Link>
          <Link
            to={"/calculate"}
            className="bg-stone-700 text-white font-bold py-1 md:py-3 px-4 md:px-6 rounded-md shadow-md hover:bg-green-700 border-2 border-white md:order-3"
          >
            Calculate
          </Link>
        </div>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 h-44 md:h-52">
        {!!data.length &&
          data.map((d) => {
            return (
              <>
                <Link to={`/result/${d._id}`}>
                  <div
                    key={d._id} // Key is added here
                    className="bg-blue-300 p-4 flex flex-col gap-2 rounded-lg border border-gray-200 shadow-md "
                  >
                    <div className="flex flex-row justify-between">
                      <h1 className="text-md md:text-xl font-bold">
                        {d.hometeam}
                      </h1>
                      <h1 className="text-md md:text-xl font-bold">
                        {d.awayteam}
                      </h1>
                    </div>
                    <div className="flex justify-center gap-3">
                      <div className="bg-purple-800 px-2 py-2 rounded-full w-10 h-10 text-white text-sm flex justify-center items-center">
                        {d.body}
                      </div>
                      <div className="bg-purple-800 px-2 py-2 rounded-full w-10 h-10 text-white text-sm flex justify-center items-center">
                        {d.total}
                      </div>
                    </div>
                    <ul className="bg-stone-200 flex flex-col items-center gap-0.5 md:gap-0">
                      {d.odds.map((odd, index) => {
                        const probability = d.probability[index]; // Get the corresponding probability value
                        const difference =
                          ((1 / odd) * 100).toFixed(2) - probability; // Subtract the two values

                        return (
                          difference > 0 && (
                            <li key={index} className="text-sm md:text-lg">
                              <strong>{label[index]}: </strong>
                              {difference.toFixed(2)}
                            </li>
                          )
                        );
                      })}
                    </ul>
                  </div>
                </Link>
              </>
            );
          })}
      </div>
    </div>
  );
}

export default App;

import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function App() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const label = ["W1", "X", "W2", "BTTS", "Over2.5", "Under2.5"];
  const location = useLocation();
  const { roundId, round, league } = location.state || {};
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch data from the API
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/matches/${roundId}`
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

  const handleCalculate = () => {
    if (roundId) {
      // Pass the selected round's _id and matches
      navigate("/calculate", {
        state: { roundId, round, league },
      });
    } else {
      alert("No roundId");
    }
  };

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

          {/* Title */}
          <Link to={"/"}>
            <div className="text-xl md:text-3xl font-bold italic text-center md:order-2">
              Football Analysis
            </div>
          </Link>
        </div>

        {/* Button */}
        <div className="flex">
          <button
            onClick={() =>
              navigate("/edit", { state: { roundId, round, league } })
            }
            className="text-black font-bold py-1 md:py-3 px-4 md:px-6 text-xl mx-3"
          >
            Edit
          </button>
          <div
            onClick={handleCalculate}
            className="bg-stone-700 text-white font-bold py-1 md:py-3 px-4 md:px-6 rounded-md shadow-md hover:bg-green-700 border-2 border-white md:order-3"
          >
            Calculate
          </div>
        </div>
      </nav>

      <div className="m-auto">
        <h1 className="text-3xl bold">{`${league}: ${round}`}</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 h-44 md:h-52">
        {!!data.length &&
          data.map((d) => {
            return (
              <>
                <Link to={`/result/${roundId}/${d._id}`}>
                  <div
                    key={d._id} // Key is added here
                    className={`p-4 flex flex-col gap-2 rounded-lg border border-gray-200 shadow-md 
                  ${
                    d.iswon === true
                      ? "bg-green-300"
                      : d.iswon === false
                      ? "bg-red-300"
                      : "bg-blue-300"
                  }`}
                  >
                    {d.result && (
                      <h1 className="text-md md:text-xl font-bold text-center bg-white rounded-lg w-20 m-auto ">
                        {d.result}
                      </h1>
                    )}

                    <div className="flex flex-row justify-between">
                      <h1 className="text-md md:text-xl font-bold">
                        {d.hometeam}
                      </h1>

                      <h1 className="text-md md:text-xl font-bold">
                        {d.awayteam}
                      </h1>
                    </div>
                    <div className="flex justify-center gap-3">
                      <div className="bg-purple-800 px-3 py-2 rounded-lg my-1 shadow-md  text-white text-sm flex justify-center items-center">
                        {d.body}
                      </div>
                      <div className="bg-purple-800 px-3 py-2 rounded-lg my-1 shadow-md text-white text-sm flex justify-center items-center">
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

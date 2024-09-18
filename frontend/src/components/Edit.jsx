import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function Edit() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [iswon, setIswon] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { roundId, league, round } = location.state || {};
  const label = ["W1", "X", "W2", "BTTS", "Over2.5", "Under2.5"];
  const [result, setResult] = useState("");

  const postResult = async (id) => {
    if (id) {
      try {
        const response = await axios.patch(
          `${import.meta.env.VITE_BACKEND_URL}/api/matches/${roundId}/` + id,
          {
            result,
            iswon,
          }
        );
        console.log("result posted successfully:", response.data);
        alert("result recorded");
      } catch (error) {
        console.error("Error posting data:", error);
      }
    }
  };

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

  let deleteMatch = async (id) => {
    var text = "are you sure want to delete this match?";
    if (confirm(text) === true) {
      try {
        const res = await axios.delete(
          `${import.meta.env.VITE_BACKEND_URL}/api/matches/${roundId}/${id}`
        );
        if (res.status === 200) {
          console.log("Match deleted");

          // Optionally, you can refetch the data or update the state to reflect the change
          setData(data.filter((match) => match._id !== id));
        }
      } catch (err) {
        console.error("Error deleting match:", err.message);
      }
    }
  };

  return (
    <div className="flex flex-col mx-4 md:mx-20 my-4 md:my-10 space-y-2 md:space-y-0 gap-2 md:gap-6 ">
      <nav className="flex flex-row justify-between items-center ">
        <Link to={"/menu"}>
          <div className="space-y-1 md:space-y-2">
            <div className="w-6 md:w-8 h-0.5 bg-gray-800"></div>
            <div className="w-6 md:w-8 h-0.5 bg-gray-800"></div>
            <div className="w-6 md:w-8 h-0.5 bg-gray-800"></div>
          </div>
        </Link>

        {/* Title */}
        <Link to={"/"}>
          <div className="text-lg md:text-3xl font-bold italic text-center md:order-2">
            Football Analysis
          </div>
        </Link>

        {/* Button */}
        <div>
          <button
            onClick={() =>
              navigate("/match", {
                state: { roundId, league, round },
              })
            }
            className=" text-black font-bold py-1 md:py-3 px-3 md:px-6 text-lg md:text-xl md:mx-3"
          >
            Matches
          </button>
        </div>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 h-44 md:h-52">
        {data.length > 0 &&
          data.map((d) => (
            <div
              key={d._id} // Assign key to the outer div
              className="bg-blue-300 p-4 flex flex-col gap-2 rounded-lg border border-gray-200 shadow-md "
            >
              <div className="flex flex-row justify-between">
                <h1 className="text-md md:text-xl font-bold">{d.hometeam}</h1>
                <h1 className="text-md md:text-xl font-bold">{d.awayteam}</h1>
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
                  const difference = ((1 / odd) * 100).toFixed(2) - probability; // Subtract the two values

                  return (
                    difference > 0 && (
                      <li key={index} className="text-sm md:text-lg">
                        <strong>{label[index]}: </strong>
                        {difference.toFixed()}
                      </li>
                    )
                  );
                })}
              </ul>
              <div className="flex justify-between items-center">
                <div className="flex flex-row gap-1 items-center mr-5">
                  <div
                    onClick={() =>
                      navigate("/edit-detail", {
                        state: { roundId, id: d._id, round, league },
                      })
                    }
                    className=" text-black font-bold py-1 md:py-3 px-4 md:px-6 text-md cursor-pointer"
                  >
                    Edit
                  </div>
                  <div
                    className="bg-red-500 px-4 py-2 rounded-lg text-white text-sm cursor-pointer"
                    onClick={() => deleteMatch(d._id)} // Pass the correct match ID to delete
                  >
                    delete
                  </div>
                </div>

                <div className="flex gap-4 items-center">
                  <input
                    type="text"
                    className="appearance-none border bg-stone-200 rounded w-12 md:w-16 h-8 md:h-10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-center"
                    placeholder="result"
                    value={d.result}
                    onChange={(e) => setResult(e.target.value)}
                  />
                  <div className="">
                    <label className="flex items-center space-x-1 ">
                      <input
                        type="radio"
                        name="result"
                        value={iswon}
                        onChange={(e) => e.target.value(setIswon(true))}
                        className="appearance-none w-5 h-5 rounded-full checked:bg-green-600 border border-gray-400"
                      />
                      <span>Won</span>
                    </label>

                    <label className="flex items-center space-x-1">
                      <input
                        type="radio"
                        name="result"
                        value={iswon}
                        onChange={(e) => e.target.value(setIswon(false))}
                        className="appearance-none w-5 h-5 rounded-full checked:bg-red-600 border border-gray-400"
                      />
                      <span>Lost</span>
                    </label>
                  </div>
                </div>
                <button
                  className="bg-green-500 rounded-lg px-4 py-2 text white mx-1 my-2"
                  onClick={() => postResult(d._id)}
                >
                  Save
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Edit;

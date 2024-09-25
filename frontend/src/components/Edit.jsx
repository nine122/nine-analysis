import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const Edit = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const { roundId, league, round } = location.state || {};
  const label = ["W1", "X", "W2", "BTTS", "Over2.5", "Under2.5"];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/matches/${roundId}`
        );
        if (!response.ok) throw new Error(`Error: ${response.status}`);
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [roundId]);

  const deleteMatch = async (id) => {
    if (window.confirm("Are you sure you want to delete this match?")) {
      try {
        await axios.delete(
          `${import.meta.env.VITE_BACKEND_URL}/api/matches/${roundId}/${id}`
        );
        setData(data.filter((match) => match._id !== id));
      } catch (err) {
        console.error("Error deleting match:", err.message);
      }
    }
  };

  const saveResult = async (id, result, iswon) => {
    if (id) {
      try {
        const response = await axios.patch(
          `${import.meta.env.VITE_BACKEND_URL}/api/matches/${roundId}/${id}`,
          {
            result,
            iswon,
          }
        );
        console.log("Result saved successfully:", response.data);
        alert("Result saved");
        setData(
          data.map((match) =>
            match._id === id
              ? { ...match, result, iswon, unsavedChanges: false }
              : match
          )
        );
      } catch (error) {
        console.error("Error saving data:", error);
      }
    }
  };

  const handleResultChange = (id, result) => {
    setData(
      data.map((match) =>
        match._id === id ? { ...match, result, unsavedChanges: true } : match
      )
    );
  };

  const handleWonLostChange = (id, newStatus) => {
    setData(
      data.map((match) =>
        match._id === id
          ? {
              ...match,
              iswon: match.iswon === newStatus ? null : newStatus,
              unsavedChanges: true,
            }
          : match
      )
    );
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  if (error)
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        Error: {error}
      </div>
    );

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

      <div className="p-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2  gap-6">
          {data.map((match) => (
            <div
              key={match._id}
              className={`rounded-lg shadow-md p-6 space-y-4 ${
                match.iswon === true
                  ? "bg-green-100"
                  : match.iswon === false
                  ? "bg-red-100"
                  : "bg-white"
              }`}
            >
              <div className="flex justify-between items-center">
                <h2 className="font-bold text-lg">
                  {match.hometeam} vs {match.awayteam}
                </h2>
                <div className="flex space-x-2">
                  <button
                    onClick={() =>
                      navigate("/edit-detail", {
                        state: { roundId, id: match._id, round, league },
                      })
                    }
                    className="text-blue-500 font-bold"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteMatch(match._id)}
                    className="text-red-500 font-bold"
                  >
                    Delete
                  </button>
                </div>
              </div>

              <div className="flex justify-center space-x-6">
                <span className="bg-purple-600 text-white rounded-full w-10 h-10 md:w-12 md:h-12 flex items-center justify-center text-md md:text-lg">
                  {match.body}
                </span>
                <span className="bg-purple-600 text-white rounded-full w-10 h-10 md:w-12 md:h-12 flex items-center justify-center text-md md:text-lg">
                  {match.total}
                </span>
              </div>

              <div className="bg-gray-200 p-3 rounded text-center space-y-1">
                {match.odds.map((odd, index) => {
                  const probability = match.probability[index];
                  const difference = ((1 / odd) * 100).toFixed(2) - probability;
                  return (
                    difference > 0 && (
                      <div key={index} className="text-sm">
                        <strong>{label[index]}:</strong> {difference.toFixed()}
                      </div>
                    )
                  );
                })}
              </div>

              <div className="flex items-center justify-between mt-4">
                <input
                  type="text"
                  className="border rounded p-1 w-20 text-center text-lg"
                  placeholder="Result"
                  value={match.result || ""}
                  onChange={(e) =>
                    handleResultChange(match._id, e.target.value)
                  }
                />
                <div className="flex space-x-3">
                  <button
                    onClick={() => handleWonLostChange(match._id, true)}
                    className={`rounded px-4 py-2 text-sm ${
                      match.iswon === true
                        ? "bg-green-500 text-white"
                        : "bg-gray-300"
                    }`}
                  >
                    Won
                  </button>
                  <button
                    onClick={() => handleWonLostChange(match._id, false)}
                    className={`rounded px-4 py-2 text-sm ${
                      match.iswon === false
                        ? "bg-red-500 text-white"
                        : "bg-gray-300"
                    }`}
                  >
                    Lost
                  </button>
                </div>
              </div>

              {match.unsavedChanges && (
                <div className="flex justify-end mt-4">
                  <button
                    onClick={() =>
                      saveResult(match._id, match.result, match.iswon)
                    }
                    className="bg-blue-500 text-white rounded-lg px-4 md:px-6 py-1 md:py-2 text-sm"
                  >
                    Save
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Edit;

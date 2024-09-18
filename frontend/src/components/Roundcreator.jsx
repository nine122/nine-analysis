import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const leagues = [
  "EPL",
  "La Liga",
  "Bundesliga",
  "Serie A",
  "UCL",
  "International",
  "Others",
];

const RoundCreator = () => {
  const [selectedLeague, setSelectedLeague] = useState(null);
  const [newRound, setNewRound] = useState("");
  const [rounds, setRounds] = useState([]);
  const [selectedRound, setSelectedRound] = useState(null); // Store full round object
  const [loading, setLoading] = useState(false); // Add a loading state
  const [error, setError] = useState(null); // Error state for handling issues
  const [create, setCreate] = useState(false);
  const navigate = useNavigate();

  const handleNextClick = () => {
    if (selectedRound) {
      // Pass the selected round's _id and matches
      navigate("/match", {
        state: {
          roundId: selectedRound._id,
          round: selectedRound.roundNumber,
          league: selectedLeague,
        },
      });
    } else {
      alert("Please select a round");
    }
  };

  // Fetch existing rounds for the selected league
  const fetchRounds = async (leagueName) => {
    try {
      setLoading(true); // Start loading when fetching data
      setError(null); // Reset error before fetching
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/rounds/${leagueName}`
      );
      const data = await response.json();
      setRounds(data); // Store full round objects instead of just roundNumber
      if (data.length === 0) {
        setError("No rounds available for this league."); // Set error if no rounds found
      }
    } catch (error) {
      setError("Failed to fetch rounds. Please try again later.");
      console.error("Failed to fetch rounds:", error);
    } finally {
      setLoading(false); // Stop loading after fetching
    }
  };

  useEffect(() => {
    if (selectedLeague) {
      fetchRounds(selectedLeague);
    }
  }, [selectedLeague]);

  // Create new round for the selected league
  const createNewRound = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/rounds/create-round`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            leagueName: selectedLeague,
            roundNumber: newRound,
          }),
        }
      );
      const data = await response.json();
      alert(data.message);
      fetchRounds(selectedLeague); // Refresh rounds after creation
      setNewRound(""); // Reset new round input
      setCreate(false);
    } catch (error) {
      console.error("Failed to create round:", error);
    }
  };

  return (
    // <div className="flex h-screen flex-col mx-4 md:ml-[35rem] my-4 md:my-10 space-y-2 md:space-y-0 gap-2 md:gap-6 md:w-[60rem] items-center">
    <div className="flex flex-col justify-center items-center mt-10 mx-6">
      {/* Side modal with league list */}
      <div>
        <h2 className="text-3xl font-bold mb-4">Leagues</h2>
        <div className=" bg-white shadow-lg p-4 flex flex-col md:flex-row items-center gap-2 md:gap-6">
          {leagues.map((league) => (
            <button
              key={league}
              onClick={() => setSelectedLeague(league)}
              className={` w-[7.5rem] text-center py-2 px-4 rounded-md mb-2 transition-colors 
            ${
              selectedLeague === league
                ? "bg-blue-500 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
            >
              {league}
            </button>
          ))}
        </div>
      </div>

      {/* Displaying rounds when a league is selected */}
      {selectedLeague && (
        <div className="w-[30rem] p-8  flex flex-col justify-center items-center">
          <h2 className="text-2xl font-bold mb-4">
            Manage Rounds for {selectedLeague}
          </h2>

          {/* Show loading state */}
          {loading ? (
            <p>Loading rounds...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <div className="mb-4 w-[15rem] md:w-auto  ">
              {/* Dropdown for existing rounds */}
              <label className="block text-gray-700 mb-2">Select a Round</label>
              <div className="flex flex-row items-center justify-center gap-4">
                {rounds.length > 0 ? (
                  <select
                    className=" block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    value={selectedRound?._id || ""}
                    onChange={(e) => {
                      const selectedRoundId = e.target.value;
                      const round = rounds.find(
                        (r) => r._id === selectedRoundId
                      );
                      setSelectedRound(round); // Store the full round object
                    }}
                  >
                    <option value="">Select a round</option>
                    {rounds.map((round) => (
                      <option key={round._id} value={round._id}>
                        {round.roundNumber}
                      </option>
                    ))}
                  </select>
                ) : (
                  <p>No rounds available for this league.</p>
                )}

                <button
                  className="py-2 px-4 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 transition"
                  onClick={handleNextClick}
                  disabled={!selectedRound} // Disable button if no round selected
                >
                  Next
                </button>
              </div>

              {/* "Next" Button */}
              <div
                className="m-auto w-[15rem] mt-10 text-center underline italic text-xl px-4 py-2  hover:bg-blue-600 hover:text-white hover:rounded-md hover:no-underline hover:not-italic transition"
                onClick={() => setCreate(true)}
              >
                Create new round
              </div>
              {create && (
                <div className="flex flex-col md:flex-row mt-10 justify-center items-center gap-2">
                  <input
                    type="text"
                    value={newRound}
                    onChange={(e) => setNewRound(e.target.value)}
                    placeholder="round number"
                    className=" py-3 px-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                  <div
                    onClick={createNewRound}
                    className="mt-2 md:mt-0 py-3 px-4 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 transition"
                  >
                    Create New Round
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Create new round */}
        </div>
      )}
    </div>
  );
};

export default RoundCreator;

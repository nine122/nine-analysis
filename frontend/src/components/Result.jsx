import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function MovieDetail() {
  const { roundId, id } = useParams();
  const [match, setMatch] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovie = async () => {
      if (id && roundId) {
        try {
          const res = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/api/matches/${roundId}/${id}`
          );
          if (res.status === 200) {
            setMatch(res.data);
          }
        } catch (error) {
          console.error("Error fetching match data:", error);
        }
      }
    };
    fetchMovie();
  }, [id, roundId]);

  const label = ["W1", "X", "W2", "BTTS", "Over2.5", "Under2.5"];

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 py-4 sm:py-12 px-2 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg overflow-hidden shadow-lg">
          <div className="p-4 sm:p-8 border-b border-gray-200">
            <h2 className="text-2xl sm:text-4xl font-bold text-center text-black">
              <span>{match.hometeam}</span>
              <span className="mx-2 sm:mx-4 text-gray-400">vs</span>
              <span>{match.awayteam}</span>
            </h2>
          </div>
          <div className="p-2 sm:p-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
              {match.odds &&
                match.odds.map((odd, index) => {
                  const probability = match.probability[index];
                  const bookieProb = ((1 / odd) * 100).toFixed(2);
                  const difference = (bookieProb - probability).toFixed(2);
                  const isPositive = parseFloat(difference) > 0;

                  return (
                    <div
                      key={index}
                      className="bg-gray-50 rounded-lg p-3 sm:p-4 transition-all duration-300 hover:bg-gray-100 border border-gray-200 flex flex-col"
                    >
                      <div className="flex justify-between items-center mx-4 mb-2 sm:mb-3">
                        <span className="text-lg sm:text-xl font-bold text-gray-700 mr-2">
                          {label[index]}
                        </span>
                        <span
                          className={`text-sm sm:text-base font-semibold px-2 py-1 rounded ${
                            isPositive
                              ? "bg-green-500 text-white"
                              : " text-red-600"
                          }`}
                        >
                          {isPositive ? "+" : ""}
                          {difference}%
                        </span>
                      </div>
                      <div className="flex flex-col space-y-1 sm:space-y-2 text-gray-600 mt-auto text-sm sm:text-base">
                        <div className="flex justify-around">
                          <span className="font-medium">
                            Probability: {probability}%
                          </span>
                        </div>
                        <div className="flex justify-around">
                          <span className="font-medium">
                            Bookie: {bookieProb}%
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
            <div className="mt-6 sm:mt-12 flex justify-center space-x-4 sm:space-x-6">
              <button
                onClick={() => navigate(-1)}
                className="px-4 sm:px-6 py-2 sm:py-3 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition-colors duration-300 text-sm sm:text-base"
              >
                Back
              </button>
              <button
                onClick={() => navigate(-1)}
                className="px-4 sm:px-6 py-2 sm:py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors duration-300 text-sm sm:text-base"
              >
                Calculate Another Match
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

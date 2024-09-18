import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

export default function MovieDetail() {
  let { roundId, id } = useParams();
  let [match, setMatch] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    let fetchMovie = async () => {
      if (id && roundId) {
        let res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/matches/${roundId}/` + id
        );
        if (res.status === 200) {
          setMatch(res.data);
        }
      }
    };

    fetchMovie();
  }, [id]);

  const label = ["W1", "X", "W2", "BTTS", "Over2.5", "Under2.5"];

  return (
    <>
      <div className="w-auto md:w-[40rem] flex flex-col bg-gray-800 rounded-lg shadow-lg mt-8 md:mt-10 md:mx-auto p-10">
        <h2 className="text-3xl font-bold mb-4 text-white m-auto">
          {match.hometeam} vs {match.awayteam}
        </h2>

        <ul className="space-y-2 ">
          {/* Display odds, probability, and difference */}
          {match.odds &&
            match.odds.map((odd, index) => {
              const probability = match.probability[index];
              const difference = ((1 / odd) * 100).toFixed(2) - probability;

              return (
                <li
                  key={index}
                  className="text-lg flex flex-row bg-stone-300  md:gap-7 p-5 rounded-lg items-center justify-between md:justify-center"
                >
                  <strong className="text-sm md:text-xl text-left">
                    {label[index]}:
                  </strong>
                  <div className="flex flex-col gap-2 items-center">
                    <strong className="text-sm md:text-xl">
                      Probability: {probability}%
                    </strong>
                    <strong className="text-blue-600 text-md md:text-xl bg-blue-50">
                      Odds: {((1 / odd) * 100).toFixed(2)}%
                    </strong>
                  </div>
                  <strong
                    className={`text-sm md:text-xl ${
                      difference > 0 ? "bg-green-500" : "text-red-600"
                    }`}
                  >
                    D: {difference.toFixed(2)}
                  </strong>
                </li>
              );
            })}
        </ul>

        <div className="mt-7 flex flex-row justify-center items-center">
          <button
            onClick={() => navigate(-1)}
            className="text-white font-bold py-1 md:py-3 px-4 md:px-6 text-xl mx-3"
          >
            Back
          </button>
          <button
            onClick={() => navigate(-1)}
            className="bg-stone-700 text-white font-bold py-1 md:py-3 px-4 md:px-6 rounded-md shadow-md hover:bg-green-700 border-2 border-white md:order-3"
          >
            Calculate Another Match
          </button>
        </div>
      </div>
    </>
  );
}

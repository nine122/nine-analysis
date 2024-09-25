import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link, useLocation } from "react-router-dom";

export default function EditDetail() {
  // State for Home Team and Away Team
  const [homeTeam, setHomeTeam] = useState("");
  const [awayTeam, setAwayTeam] = useState("");
  const [body, setBody] = useState("");
  const [total, setTotal] = useState("");
  const [probability, setProbability] = useState(new Array(6).fill(""));
  const [odds, setOdds] = useState(new Array(6).fill(""));

  const navigate = useNavigate();
  const location = useLocation();
  const { roundId, id, round, league } = location.state || {};

  useEffect(() => {
    let fetchRecipe = async () => {
      if (id) {
        let res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/matches/${roundId}/` + id
        );
        if (res.status === 200) {
          setHomeTeam(res.data.hometeam);
          setAwayTeam(res.data.awayteam);
          setProbability(res.data.probability || new Array(6).fill(""));
          setOdds(res.data.odds || new Array(6).fill(""));
          setBody(res.data.body);
          setTotal(res.data.total);
        }
      }
    };
    fetchRecipe();
  }, [id]);

  const handleSubmit = async () => {
    const link = `${
      import.meta.env.VITE_BACKEND_URL
    }/api/matches/${roundId}/${id}`;

    try {
      const response = await axios.patch(link, {
        hometeam: homeTeam,
        awayteam: awayTeam,
        body,
        total,
        probability,
        odds,
      });
      console.log("Data posted successfully:", response.data);
      navigate("/match", {
        state: { roundId, round, league },
      });
    } catch (error) {
      console.error("Error posting data:", error);
    }
  };

  return (
    <div className="bg-white flex flex-col items-center justify-center my-4">
      <nav className="flex flex-row justify-around items-center ">
        {/* Button */}
        <Link
          to="/"
          className="text-black font-bold py-1 md:py-3 px-2 md:px-6 text-xl border-2 rounded-lg"
        >
          <h1>Back to Home</h1>
        </Link>
      </nav>

      {/* Team Name */}
      <div className="flex flex-row gap-5 p-6 rounded-lg shadow-lg w-full max-w-sm">
        <div className="mb-2">
          <input
            id="input1"
            type="text"
            className="appearance-none border bg-stone-200 rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Home Team"
            value={homeTeam}
            onChange={(e) => setHomeTeam(e.target.value)}
            required
          />
        </div>

        <div className="mb-2">
          <input
            id="input2"
            type="text"
            className="appearance-none border bg-stone-200 rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Away Team"
            value={awayTeam}
            onChange={(e) => setAwayTeam(e.target.value)}
            required
          />
        </div>
      </div>

      {/* Probability */}
      <div className="bg-white p-4 rounded-lg shadow-lg w-full max-w-sm">
        <div className="my-2">
          <h1 className="text-2xl font-bold">Probability</h1>
        </div>
        <div className="flex gap-2 mb-4">
          <input
            type="number"
            value={probability[0]}
            onChange={(e) => {
              const newProbabilities = [...probability];
              newProbabilities[0] = e.target.value;
              setProbability(newProbabilities);
            }}
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="W1"
          />
          <input
            type="number"
            value={probability[1]}
            onChange={(e) => {
              const newProbabilities = [...probability];
              newProbabilities[1] = e.target.value;
              setProbability(newProbabilities);
            }}
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="X"
          />
          <input
            type="number"
            value={probability[2]}
            onChange={(e) => {
              const newProbabilities = [...probability];
              newProbabilities[2] = e.target.value;
              setProbability(newProbabilities);
            }}
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="W2"
          />
        </div>
        <div className="mb-4">
          <input
            type="number"
            value={probability[3]}
            onChange={(e) => {
              const newProbabilities = [...probability];
              newProbabilities[3] = e.target.value;
              setProbability(newProbabilities);
            }}
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="btts-yes"
          />
        </div>

        <div className="mb-4 flex flex-row gap-11">
          <input
            type="number"
            value={probability[4]}
            onChange={(e) => {
              const newProbabilities = [...probability];
              newProbabilities[4] = e.target.value;
              setProbability(newProbabilities);
            }}
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="over2.5"
          />
          <input
            type="number"
            value={probability[5]}
            onChange={(e) => {
              const newProbabilities = [...probability];
              newProbabilities[5] = e.target.value;
              setProbability(newProbabilities);
            }}
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="under2.5"
          />
        </div>
      </div>

      {/* Odds */}
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
        <div className="my-2">
          <h1 className="text-2xl font-bold">Odds</h1>
        </div>
        <div className="flex gap-2 mb-4">
          <input
            type="number"
            value={odds[0]}
            onChange={(e) => {
              const newOdds = [...odds];
              newOdds[0] = e.target.value;
              setOdds(newOdds);
            }}
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="W1"
          />
          <input
            type="number"
            value={odds[1]}
            onChange={(e) => {
              const newOdds = [...odds];
              newOdds[1] = e.target.value;
              setOdds(newOdds);
            }}
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="X"
          />
          <input
            type="number"
            value={odds[2]}
            onChange={(e) => {
              const newOdds = [...odds];
              newOdds[2] = e.target.value;
              setOdds(newOdds);
            }}
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="W2"
          />
        </div>

        <div className="mb-4">
          <input
            type="number"
            value={odds[3]}
            onChange={(e) => {
              const newOdds = [...odds];
              newOdds[3] = e.target.value;
              setOdds(newOdds);
            }}
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="btts-yes"
          />
        </div>

        <div className="mb-4 flex flex-row gap-11">
          <input
            type="number"
            value={odds[4]}
            onChange={(e) => {
              const newOdds = [...odds];
              newOdds[4] = e.target.value;
              setOdds(newOdds);
            }}
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="over2.5"
          />
          <input
            type="number"
            value={odds[5]}
            onChange={(e) => {
              const newOdds = [...odds];
              newOdds[5] = e.target.value;
              setOdds(newOdds);
            }}
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="under2.5"
          />
        </div>
      </div>

      <div className="mt-4 flex justify-around">
        <input
          id="input1"
          type="text"
          className="appearance-none border rounded max-w-36 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          required
        />
        <input
          id="input2"
          type="text"
          className="appearance-none border rounded max-w-36 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Total"
          value={total}
          onChange={(e) => setTotal(e.target.value)}
          required
        />
      </div>

      <button
        onClick={handleSubmit}
        className="bg-green-600 m-2 md:m-4 text-white font-bold py-2 md:py-3 px-4 md:px-6 rounded-md shadow-md hover:bg-green-700"
      >
        Update
      </button>
    </div>
  );
}

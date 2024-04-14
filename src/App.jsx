import './App.css'
import { Link } from "react-router-dom";
import { useEffect, useState} from "react";


function App() {
  const [standings, setStandings] = useState([])

  useEffect(() => {
  const fetchData = async () => {
  const fetchPromises = [];

    const url = `https://v3.football.api-sports.io/standings?league=197&season=2023`;
    const options = {
        method: 'GET',
        headers: {
        'X-RapidAPI-Key': import.meta.env.VITE_API_KEY,
        'X-RapidAPI-Host': import.meta.env.VITE_API_URL,
      },
    };

      fetchPromises.push(
      fetch(url, options)
        .then((response) => response.json())
        .catch((error) => console.error(error))
      )

  try {
    const responses = await Promise.all(fetchPromises);

    //get the current Standings of Greek Super League from the API endpoint
    setStandings(responses[0].response[0].league.standings[2])
  } 
  catch (error) {
    console.error(error);
  }
  };
  
   fetchData()
 }, [])

  return (
      <table className='table-fixed w-full'>
        <thead className='text-center'>
          <th>#</th>
          <th>Ομάδα</th>
          <th>Αγώνες</th>
          <th>Ν</th>
          <th>Ι</th>
          <th>Η</th>
          <th>Γκολ</th>
          <th>Δ. Γκολ</th>
          <th>Β</th>
        </thead>
        <tbody>
          {standings.map((standing,index) => (
            <tr key={index}>
              <td className='text-center'>{standing.rank}</td>
              <td className='flex flex-row text-center'>
                  <img className='w-5 h-5' src={standing.team.logo} alt="Team Logo" />
                  <Link to="teams" state={{ teamName: standing.team.name, teamID: standing.team.id, teamForm:standing.form}}>{standing.team.name}</Link>
              </td>
              <td className='text-center'>{standing.all.played}</td>
              <td className='text-center'>{standing.all.win}</td>
              <td className='text-center'>{standing.all.draw}</td>
              <td className='text-center'>{standing.all.lose}</td>
              <td className='text-center'>{standing.all.goals.for} / {standing.all.goals.against}</td>
              <td className='text-center'>{standing.goalsDiff}</td>
              <td className='text-center'>{standing.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
  )
}

export default App

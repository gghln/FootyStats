import { useLocation } from "react-router-dom"
import { Link } from "react-router-dom"
import { useEffect, useState} from "react"
import Form  from "./Form"
// eslint-disable-next-line no-unused-vars
import { Chart } from "chart.js/auto"
import { Line, Doughnut } from "react-chartjs-2"

function Teams(){
    let { state } = useLocation()
    const [teamStats, setTeamStats] = useState([])
    const [squad, setSquad] = useState([])

    console.log('API_KEY: ', import.meta.env.API_KEY)
    useEffect(() => {
        const getTeamStats = `https://v3.football.api-sports.io/teams/statistics?season=2023&team=${state.teamID}&league=197`
        const getTeamSquad = `https://v3.football.api-sports.io/players/squads?team=${state.teamID}`
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': import.meta.env.VITE_API_KEY,
                'X-RapidAPI-Host': import.meta.env.VITE_API_URL,
            }
        }

        // Fetch team stats
        fetch(getTeamStats, options)
        .then((response) => response.json())
        .then((data) => setTeamStats(data.response))
        .catch((error) => console.error(error))

        // Fetch team squad
        fetch(getTeamSquad, options)
        .then((response) => response.json())
        .then((data) => setSquad(data.response[0].players))
        .catch((error) => console.error(error))

    },[])

    console.log('Teams Stats:', teamStats)
    console.log('Squad:', squad)
    return (
      <>
      {teamStats.length === 0 ? (
        <div>Loading...</div>
      ):
      (<div className="flex flex-row size-full gap-2 m-2">
      <div className="flex flex-col size-1/3 gap-2">
        {/* Team Info */}
        <div className="flex flex-col size-full"> 
          <div className="flex flex-row size-full items-center justify-between gap-4 font-sans bg-gray-900 rounded-lg">
              <div className="w-2/3 h-full flex flex-row p-2 gap-4">
                  <img className=' size-24 rounded-md' src={teamStats.team.logo} alt="Team-Icon" />
                  <div className="size-full flex flex-col">
                      <p className="size-full text-md font-bold text-white">{state.teamName}</p>
                      <p className="size-full text-md  text-white">League: {teamStats.league.name}</p>
                      <p className="size-full text-md  text-white">Coach: Matias Almeyda</p>
                      <p className="size-full text-md  text-white">Stadium: Opap Arena</p>
                  </div>
              </div>
              <div className="flex flex-col w-1/3 h-full justify-center m-2">
                <p className="size-1/4 text-xl font-bold text-white">Form</p>
                <div className="flex flex-row gap-1 items-center size-full">
                  <Form form={state.teamForm}/>
                </div>
              </div>
          </div>
        </div>

        {/* Squad */}
        <div className="flex flex-col place-self-center size-full">
          <table className='table-auto w-full font-sans bg-gray-900 rounded-lg'>
            <thead className='text-center'>
              <th className="text-xl font-bold text-white">#</th>
              <th className="text-xl font-bold text-white">Name</th>
              <th className="text-xl font-bold text-white">Position</th>
            </thead>
            <tbody>
              {squad.map((player,index) => (
                <tr className='mt-4' key={index}>
                  <td className='text-center text-md text-white'>{player.number}</td>
                  <td className='flex flex-row text-center text-md gap-3 text-white'>
                      <img className='w-8 h-8 rounded-md' src={player.photo} alt="Player Photo" />
                      <Link to="/player" state={{playerID: player.id, playerName: player.name, playerPhoto:player.photo, playerAge:player.age}}>{player.name}</Link>
                  </td>
                  <td className="text-center text-md  text-white">{player.position}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Team Stats */}
      <div className="flex flex-col size-2/3 gap-4"> 
        <div className="size-full text-xl p-3 text-white font-sans bg-gray-900 rounded-lg">
            <p className="size-full text-xl font-bold text-white font-sans text-center mb-2">Fixtures</p>
            <div className="flex flex-row size-full gap-4">
                <div className="flex flex-col size-full">
                  <p className="text-md font-bold text-white font-sans mb-2">Home</p>
                  <div className="grid grid-cols-3 grid-flow-row-3 gap-1 size-full">
                    <div className="flex flex-col gap-1 size-full bg-gray-700 rounded-lg">
                        <p className="w-full h-1/3 pt-1 pl-1 text-xs font-bold text-white font-sans">Wins</p>
                        <p className="w-full h-2/3 mb-2 text-2xl text-center text-white font-sans">{teamStats.fixtures.wins.home}</p>
                    </div>
                    <div className="flex flex-col gap-1 size-full bg-gray-700 rounded-lg">
                        <p className="w-full h-1/3 pt-1 pl-1 text-xs font-bold text-white font-sans">Draws</p>
                        <p className="w-full h-2/3 mb-2 text-2xl text-center text-white font-sans">{teamStats.fixtures.draws.home}</p>
                    </div>
                    <div className="flex flex-col gap-1 size-full bg-gray-700 rounded-lg">
                        <p className="w-full h-1/3 pt-1 pl-1 text-xs font-bold text-white font-sans">Loses</p>
                        <p className="w-full h-2/3 mb-2 text-2xl text-center text-white font-sans">{teamStats.fixtures.loses.home}</p>
                    </div>
                    <div className="flex flex-col gap-1 size-full bg-gray-700 rounded-lg">
                        <p className="w-full h-1/3 pt-1 pl-1 text-xs font-bold text-white font-sans">Biggest Win</p>
                        <p className="w-full h-2/3 mb-2 text-2xl text-center text-white font-sans">{teamStats.biggest.wins.home}</p>
                    </div>
                    <div className="flex flex-col gap-1 size-full bg-gray-700 rounded-lg">
                        <p className="w-full h-1/3 pt-1 pl-1 text-xs font-bold text-white font-sans">Clean Sheets</p>
                        <p className="w-full h-2/3 mb-2 text-2xl text-center text-white font-sans">{teamStats.clean_sheet.home}</p>
                    </div>
                    <div className="flex flex-col gap-1 size-full bg-gray-700 rounded-lg">
                        <p className="w-full h-1/3 pt-1 pl-1 text-xs font-bold text-white font-sans">Failed to Score</p>
                        <p className="w-full h-2/3 mb-2 text-2xl text-center text-white font-sans">{teamStats.failed_to_score.home}</p>
                    </div>                      
                  </div>
                </div>
                <div className="size-full">
                  <p className="text-md font-bold text-white font-sans mb-2">Away</p>
                    <div className="grid grid-cols-3 grid-flow-row-3 gap-1 size-full">
                      <div className="flex flex-col gap-1 size-full bg-gray-700 rounded-lg">
                          <p className="w-full h-1/3 pt-1 pl-1 text-xs font-bold text-white font-sans">Wins</p>
                          <p className="w-full h-2/3 mb-2 text-2xl text-center text-white font-sans">{teamStats.fixtures.wins.away}</p>
                      </div>
                      <div className="flex flex-col gap-1 size-full bg-gray-700 rounded-lg">
                          <p className="w-full h-1/3 pt-1 pl-1 text-xs font-bold text-white font-sans">Draws</p>
                          <p className="w-full h-2/3 mb-2 text-2xl text-center text-white font-sans">{teamStats.fixtures.draws.away}</p>
                      </div>
                      <div className="flex flex-col gap-1 size-full bg-gray-700 rounded-lg">
                          <p className="w-full h-1/3 pt-1 pl-1 text-xs font-bold text-white font-sans">Loses</p>
                          <p className="w-full h-2/3 mb-2 text-2xl text-center text-white font-sans">{teamStats.fixtures.loses.away}</p>
                      </div>
                      <div className="flex flex-col gap-1 size-full bg-gray-700 rounded-lg">
                        <p className="w-full h-1/3 pt-1 pl-1 text-xs font-bold text-white font-sans">Biggest Win</p>
                        <p className="w-full h-2/3 mb-2 text-2xl text-center text-white font-sans">{teamStats.biggest.wins.away}</p>
                    </div>
                    <div className="flex flex-col gap-1 size-full bg-gray-700 rounded-lg">
                        <p className="w-full h-1/3 pt-1 pl-1 text-xs font-bold text-white font-sans">Clean Sheets</p>
                        <p className="w-full h-2/3 mb-2 text-2xl text-center text-white font-sans">{teamStats.clean_sheet.away}</p>
                    </div>
                    <div className="flex flex-col gap-1 size-full bg-gray-700 rounded-lg">
                        <p className="w-full h-1/3 pt-1 pl-1 text-xs font-bold text-white font-sans">Failed to Score</p>
                        <p className="w-full h-2/3 mb-2 text-2xl text-center text-white font-sans">{teamStats.failed_to_score.away}</p>
                    </div> 
                    </div>
                </div>
            </div>
        </div> 

        <div className="size-full text-xl p-3 text-white font-sans bg-gray-900 rounded-lg">
            <p className="size-full text-xl font-bold text-white font-sans text-center mb-2">Goals</p>
            <div className="flex flex-row size-full gap-4">
                <div className="flex flex-col size-full">
                  <p className="text-md font-bold text-white font-sans mb-2">For</p>
                  <div className="flex flex-row gap-1 size-full">
                    <div className="flex flex-col gap-1 size-full bg-gray-700 rounded-lg">
                        <p className="w-full h-1/3 pt-1 pl-1 text-xs font-bold text-white font-sans">Total</p>
                        <p className="w-full h-2/3 mb-2 text-2xl text-center text-white font-sans">{teamStats.goals.for.total.total}</p>
                    </div>
                    <div className="flex flex-col gap-1 size-full bg-gray-700 rounded-lg">
                        <p className="w-full h-1/3 pt-1 pl-1 text-xs font-bold text-white font-sans">Home</p>
                        <p className="w-full h-2/3 mb-2 text-2xl text-center text-white font-sans">{teamStats.goals.for.total.home}</p>
                    </div>
                    <div className="flex flex-col gap-1 size-full bg-gray-700 rounded-lg">
                        <p className="w-full h-1/3 pt-1 pl-1 text-xs font-bold text-white font-sans">Away</p>
                        <p className="w-full h-2/3 mb-2 text-2xl text-center text-white font-sans">{teamStats.goals.for.total.away}</p>
                    </div>
                  </div>
                  <div className="pt-2">
                      <Line 
                        data= {{
                          labels:['0-15', '16-30', '31-45', '46-60', '61-75', '75-90'],
                          datasets:[{
                              label: 'Goals Scored per 15 Minute',
                              data:[teamStats.goals.for.minute['0-15'].total, teamStats.goals.for.minute['16-30'].total, 
                              teamStats.goals.for.minute['31-45'].total, teamStats.goals.for.minute['46-60'].total, 
                              teamStats.goals.for.minute['61-75'].total, teamStats.goals.for.minute['76-90'].total],
                              borderColor: 'green',
                              backgroundColor:'green',
                              tension: 0.1,
                              width:'120px',
                              height:'120px',
                          }]
                        }}                    
                      />
                  </div>
                </div>
                <div className="size-full">
                  <p className="text-md font-bold text-white font-sans mb-2">Against</p>
                    <div className="flex flex-row gap-1 size-full">
                      <div className="flex flex-col gap-1 size-full bg-gray-700 rounded-lg">
                          <p className="w-full h-1/3 pt-1 pl-1 text-xs font-bold text-white font-sans">Total</p>
                          <p className="w-full h-2/3 mb-2 text-2xl text-center text-white font-sans">{teamStats.goals.against.total.total}</p>
                      </div>
                      <div className="flex flex-col gap-1 size-full bg-gray-700 rounded-lg">
                          <p className="w-full h-1/3 pt-1 pl-1 text-xs font-bold text-white font-sans">Home</p>
                          <p className="w-full h-2/3 mb-2 text-2xl text-center text-white font-sans">{teamStats.goals.against.total.home}</p>
                      </div>
                      <div className="flex flex-col gap-1 size-full bg-gray-700 rounded-lg">
                          <p className="w-full h-1/3 pt-1 pl-1 text-xs font-bold text-white font-sans">Away</p>
                          <p className="w-full h-2/3 mb-2 text-2xl text-center text-white font-sans">{teamStats.goals.against.total.away}</p>
                      </div>
                    </div>
                    <div className="pt-2">
                        <Line 
                          data= {{
                            labels:['0-15', '16-30', '31-45', '46-60', '61-75', '75-90'],
                            datasets:[{
                                label: 'Goals Conceded per 15 Minute',
                                data:[teamStats.goals.against.minute['0-15'].total, teamStats.goals.against.minute['16-30'].total, 
                                teamStats.goals.against.minute['31-45'].total, teamStats.goals.against.minute['46-60'].total, 
                                teamStats.goals.against.minute['61-75'].total, teamStats.goals.against.minute['76-90'].total],
                                borderColor: 'red',
                                backgroundColor:'red',
                                tension: 0.1,
                                width:'120px',
                                height:'120px'
                            }]
                          }}                       
                        />
                    </div>
                </div>
            </div>
        </div>        
        <div className="size-full text-xl p-3 text-white font-sans bg-gray-900 rounded-lg">
            <div className="flex flex-col p-2 size-full font-sans bg-gray-900 rounded-lg">
              <div className="flex flex-row gap-1 pt-2 pl-2 items-center place-self-center text-md text-white font-bold">
                  <p>Penalties</p>
              </div>
              <p className="place-self-center">
                  <Doughnut 
                      data= {{
                          labels:['Scored', 'Missed'],
                          datasets:[{
                              data:[teamStats.penalty.scored.total, teamStats.penalty.missed.total],
                              backgroundColor: [
                                  '#0284c7',
                                  '#f43f5e',
                              ],
                              hoverOffset: 4,
                              borderWidth: 0
                          }]
                      }}
                  />
              </p>
            </div>                  
        </div>
      </div>
      </div>)
      }
      </>
    )
}

export default Teams
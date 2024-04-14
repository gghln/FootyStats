import { useLocation } from "react-router-dom"
import { useState, useEffect } from "react"
import Counter from "./Counter"
// eslint-disable-next-line no-unused-vars
import { Chart } from "chart.js/auto"
import { Doughnut } from "react-chartjs-2"
import { IoFootball } from "react-icons/io5"
import { FaHandsHelping, FaTshirt, FaStar, FaUser, FaClock } from "react-icons/fa"
import { GiBarefoot, GiWhistle  } from "react-icons/gi"
import { GoBlocked } from "react-icons/go"
import { LuSwords, LuTarget  } from "react-icons/lu"
import { TbPlayFootball } from "react-icons/tb"

function Player(){
    let { state } = useLocation()
    const [playerStats, setPlayerStats] = useState([])
    const [nationality, setNationality] = useState('')
    const [height, setHeight] = useState('')

    useEffect(() => {
        const getPlayerStats = `https://v3.football.api-sports.io/players?id=${state.playerID}&season=2023`
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': import.meta.env.VITE_API_KEY,
                'X-RapidAPI-Host': import.meta.env.VITE_API_URL,
            }
        }

        // Fetch Player Stats stats
        fetch(getPlayerStats, options)
        .then((response) => response.json())
        .then((data) => {
            //Check if league name is Super League and then set the State
            for(let i = 0; i < data.response[0].statistics.length; i++){
                if(data.response[0].statistics[i].league.name == 'Super League 1'){
                    setPlayerStats(data.response[0].statistics[i])
                    setNationality(data.response[0].player.nationality)
                    setHeight(data.response[0].player.height)
                }
            }
        })
        .catch((error) => console.error(error))
    },[])

    console.log('Player stats:',playerStats)
    return (
        <>
            {playerStats.length === 0 ? (
                <div>Loading</div>
            ):( 
            <div className="flex flex-col size-full gap-6">
                <div className="grid grid-cols-2 grid-row-2 size-full gap-4">

                    {/* Play Info Grid */}
                    <div className= "flex flex-col size-full items-center gap-1 ml-2 mt-2 mr-2">

                        {/* Player & Team Icons */}
                        <div className="flex flex-row w-full h-28 items-center justify-between gap-4 font-sans bg-gray-900 rounded-lg">
                            <div className="size-full flex flex-row p-2 gap-4">
                                <img className='size-22 rounded-md' src={state.playerPhoto} alt="Player-Icon" />
                                <div className="size-full flex flex-col">
                                    <p className="size-full text-xl font-bold text-white">{state.playerName}</p>
                                    <p className="size-full font-bold text-white">Age: {state.playerAge}</p>
                                    <p className="size-full font-bold text-white">Nationality: {nationality}</p>
                                    <p className="size-full font-bold text-white">Height: {height}</p>
                                </div>
                            </div>
                            <img className='size-24' src={playerStats.team.logo} alt="Team-Icon" />
                        </div>

                        {/* Player Infos*/}
                        <div className='size-full grid grid-cols-2 gap-1'>
                            <div className="flex flex-col size-full font-sans bg-gray-900 rounded-lg ">
                                <div className="flex flex-row gap-1 pt-2 pl-2 items-center place-self-start text-md text-white font-bold">
                                    <FaTshirt />
                                    <p>Position</p>
                                </div>
                                <p className="text-2xl text-white place-self-center ">{playerStats.games.position}</p>
                            </div>
                            <div className="flex flex-col size-full font-sans bg-gray-900 rounded-lg">
                                <div className="flex flex-row gap-1 pt-2 pl-2 items-center place-self-start text-md text-white font-bold">
                                    <FaStar />
                                    <p>Rating</p>
                                </div>
                                <Counter stopNumber={parseFloat(playerStats.games.rating).toFixed(1)} duration={100} step={1} isRating={true}/>
                            </div>
                            <div className="flex flex-col size-full font-sans bg-gray-900 rounded-lg">
                                <div className="flex flex-row gap-1 pt-2 pl-2 items-center place-self-start text-md text-white font-bold">
                                    <FaUser />
                                    <p>Appearences</p>
                                </div>
                                <Counter stopNumber={playerStats.games.appearences} duration={30} step={1}/>
                            </div>
                            <div className="flex flex-col size-full font-sans bg-gray-900 rounded-lg">
                                <div className="flex flex-row gap-1 pt-2 pl-2 items-center place-self-start text-md text-white font-bold">
                                    <FaClock />
                                    <p>Minutes</p>
                                </div>
                                <Counter stopNumber={playerStats.games.minutes} duration={10} step={30}/>
                            </div>
                        </div>
                    </div>

                    {/* Goals, Assists, Pass Accuracy Grid */}
                    <div className="size-full grid grid-cols-2 gap-1 ml-2 mt-2 mr-2">
                        <div className="flex flex-col size-full font-sans bg-gray-900 rounded-lg">
                            <div className="flex flex-row size-1/2 gap-1 p-2 items-center place-self-start text-md text-white font-bold">
                                <IoFootball />
                                <p>Goals</p>
                            </div>
                            <Counter stopNumber={playerStats.goals.total} duration={100} step={1}/>
                        </div>
                        <div className="flex flex-col size-full font-sans bg-gray-900 rounded-lg">
                            <div className="flex flex-row size-1/2 gap-1 p-2 items-center place-self-start text-md text-white font-bold">
                                <FaHandsHelping />
                                <p>Assists</p>
                            </div>
                            <Counter stopNumber={playerStats.goals.assists} duration={100} step={1}/>
                        </div>
                        <div className="flex flex-col size-full font-sans bg-gray-900 rounded-lg">
                            <div className="flex flex-row size-1/2 gap-1 p-2 items-center place-self-start text-md text-white font-bold">
                                <GiBarefoot />
                                <p>Passes</p>
                            </div>
                            <div className="flex flex-row size-full">
                                <div className="flex flex-col size-full">
                                    <p className="size-1/2 text-md  text-center text-base self-center text-white font-bold">Total</p>
                                    <Counter stopNumber={playerStats.passes.total} duration={10} step={30}/>
                                </div>
                                <div className="flex flex-col size-full">
                                    <p className="size-1/2 text-md  text-center text-base self-center text-white font-bold">Key</p>
                                    <Counter stopNumber={playerStats.passes.key} duration={100} step={5}/>
                                </div>
                                <div className="flex flex-col size-full">
                                    <p className="size-1/2 text-md  text-center text-base self-center text-white font-bold">Accuracy</p>
                                    <Counter stopNumber={playerStats.passes.accuracy} duration={100} step={5} accuracy={true}/> 
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col size-full font-sans bg-gray-900 rounded-lg">
                            <div className="flex flex-row size-1/2 gap-1 p-2 items-center place-self-start text-md text-white font-bold">
                                <GoBlocked />
                                <p>Tackles</p>
                            </div>
                            <div className="flex flex-row size-full">
                                <div className="flex flex-col size-full">
                                    <p className="size-1/2 text-md text-center text-base self-center text-white font-bold">Total</p>
                                    <Counter stopNumber={playerStats.tackles.total} duration={10} step={30}/>
                                </div>
                                <div className="flex flex-col size-full">
                                    <p className="w-full h-1/2 text-md text-center text-base self-center text-white font-bold">Interceptions</p>
                                    <Counter stopNumber={playerStats.tackles.interceptions} duration={100} step={5}/>
                                </div>
                                <div className="flex flex-col size-full">
                                    <p className="size-1/2 text-md text-center text-base self-center text-white font-bold">Blocks</p>
                                    <Counter stopNumber={playerStats.tackles.blocks} duration={100} step={5}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                
                    {/* Charts Grid */}
                    <div className= "grid grid-cols-4 size-full gap-2 items-center ml-2 mb-2 mr-2">
                            <div className="flex flex-col p-2 size-full font-sans bg-gray-900 rounded-lg">
                                <div className="flex flex-row gap-1 pt-2 pl-2 items-center place-self-start text-md text-white font-bold">
                                    <LuSwords />
                                    <p>Duels</p>
                                </div>
                                <p className="place-self-center">
                                    <Doughnut 
                                        data= {{
                                            labels:['Won', 'Lost'],
                                            datasets:[{
                                                data:[playerStats.duels.won, playerStats.duels.total - playerStats.duels.won],
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
                            <div className="flex flex-col p-2 size-full font-sans bg-gray-900 rounded-lg">
                                <div className="flex flex-row gap-1 pt-2 pl-2 items-center place-self-start text-md text-white font-bold">
                                    <GiWhistle  />
                                    <p>Fouls</p>
                                </div>
                                <p className="place-self-center">
                                    <Doughnut 
                                        data= {{
                                            labels: ['Committed', 'Drawn'],
                                            datasets: [{
                                                data: [playerStats.fouls.committed, playerStats.fouls.drawn],
                                                backgroundColor: [
                                                    '#f43f5e',
                                                    '#0284c7',
                                                ],
                                                hoverOffset: 4,
                                                borderWidth: 0
                                            }]
                                        }}
                                    />
                                </p>
                            </div>
                            <div className="flex flex-col p-2 size-full font-sans bg-gray-900 rounded-lg">
                                <div className="flex flex-row gap-1 pt-2 pl-2 items-center place-self-start text-md text-white font-bold">
                                    <TbPlayFootball   />
                                    <p>Dribbles</p>
                                </div>
                                <p className="place-self-center">
                                    <Doughnut 
                                        data= {{
                                            labels:['Suceess', 'Failed'],
                                            datasets:[{
                                                data:[playerStats.dribbles.success,  playerStats.dribbles.attempts - playerStats.dribbles.success],
                                                backgroundColor: [
                                                    '#0284c7',
                                                    '#f43f5e',
                                                ],
                                                hoverOffset: 4,
                                                borderWidth: 0
                                            }],
                                        }}
                                    />
                                </p>
                            </div>
                            <div className="flex flex-col p-2 size-full font-sans bg-gray-900 rounded-lg">
                                <div className="flex flex-row gap-1 pt-2 pl-2 items-center place-self-start text-md text-white font-bold">
                                    <LuTarget />
                                    <p>Shots</p>
                                </div>
                                <p className="place-self-center">
                                    <Doughnut 
                                        data= {{
                                            labels:['On Tartget', 'Off Target'],
                                            datasets:[{
                                                data:[playerStats.shots.on, playerStats.shots.total - playerStats.shots.on],
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
            )
        }        
        </>
    )
    
}

export default Player
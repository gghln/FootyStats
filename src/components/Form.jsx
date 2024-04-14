import { useEffect, useState } from "react"

function Form(form){
    const [teamForm, setTeamForm] = useState(form.form)
    const [teamResults, setTeamResults] = useState([{result:'', textColor:''}])
    useEffect(() => {
        const resultsArray = teamForm.split("");
        const updatedResults = resultsArray.map(result => {
            let textColor = ''
            if (result === 'W') {
                textColor = 'bg-green-400'
            } else if (result === 'L') {
                textColor = 'bg-red-400'
            } else {
                textColor = 'bg-yellow-400'
            }
            return { result, textColor }
        })
        setTeamResults(updatedResults)
    }, [teamForm])

    console.log(teamResults)
    return (
        <>
            {teamResults.map((result, index) => {
                return (
                    <p key={index} className={`w-full h-1/3 text-md text-center rounded-lg font-bold text-white ${result.textColor}`}>{result.result}</p>
                )
            })}
        </>
    )
}

export default Form
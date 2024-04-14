/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react'

function Counter({ stopNumber, duration, step, isRating, accuracy}) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCount(prevCount => {
        const newCount = prevCount + step

        //Check is stopNumber is null then the value is 0, else the counter starts
        if (stopNumber !== null && newCount >= stopNumber) {
          clearInterval(interval)
          return stopNumber
        }else if (stopNumber === null && newCount >= 0) {
          clearInterval(interval);
          return 0
          }
        return newCount
      })
    }, duration)

    return () => clearInterval(interval)
  }, [])

  //Set color of text based on the rating of the player
  let textColor = ''
  if(stopNumber >= 0 && stopNumber <= 4){
    textColor = 'text-red-500'
  }else if (stopNumber >=5 && stopNumber <= 7){
    textColor = 'text-yellow-500'
  }else{
    textColor = 'text-green-500'
  }


  //Conditional rendering. First checking if the field the player's rating and then if the field is the player's pass accucaracy.
  return (
    isRating ? (
      <p className={`size-full text-3xl ${textColor} font-bold text-center`}>{count}</p>
    ) : ( accuracy ? (
      <p className={`size-full text-3xl text-slate-50 font-bold text-center`}>{count}%</p>
    ) : (
      <p className={`size-full text-3xl text-slate-50 font-bold text-center`}>{count}</p>
    )
    ) 
  )
  
}

export default Counter
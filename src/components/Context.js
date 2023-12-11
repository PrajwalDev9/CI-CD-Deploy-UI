import React, { createContext, useState } from 'react'

export const Quiz = createContext();
export const User = createContext();

export default function Context({children}) {
    const [quiz,setQuiz] = useState({});
    const [user,setUser] = useState({
      name: "",
      email: ""
    })
  return (
    <User.Provider value={{user,setUser}}>
      <Quiz.Provider value={{quiz,setQuiz}}>
        {children}
     </Quiz.Provider>
    </User.Provider>
  )
}

import React from "react"

export const handleMatching = (actualUser, loggedInFor, setIsMatched) => {

    if(loggedInFor && actualUser){
        if(actualUser.status !== loggedInFor){
            setIsMatched(true)
        } else {
            setIsMatched(false)
        }
    }
};
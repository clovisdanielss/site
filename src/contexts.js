import React from 'react'
const globalState = {
  isAuthenticated: true
}

const GlobalStateContext = React.createContext(globalState)
const UpdateGlobalStateContext = React.createContext(undefined)

export {
  GlobalStateContext,
  UpdateGlobalStateContext,
  globalState
}

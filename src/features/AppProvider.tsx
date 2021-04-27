import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { Grommet } from 'grommet'
import { GlobalStyle } from './GlobalStyle'
import { useAppStore } from '../hooks/useAppStore'

export const AppProvider: React.FC = (props) => {
  return (
    <BrowserRouter>
      <Grommet themeMode="dark">
        <GlobalStyle />
        <StateProvider>{props.children}</StateProvider>
      </Grommet>
    </BrowserRouter>
  )
}

const StateProvider: React.FC = (props) => (
  <Provider store={useAppStore()}>{props.children}</Provider>
)

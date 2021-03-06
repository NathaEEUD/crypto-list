import React from 'react'

export type AppActionKind =
  | 'UPDATE_COIN_ID'
  | 'UPDATE_SEARCH_QUERY'
  | 'TOGGLE_SIDEBAR_COLLAPSE'

type Action = {
  type: AppActionKind
  payload: any
}

type Dispatch = (action: Action) => void

type State = {
  coinId: string
  searchQuery: string
  sidebarCollapsed: boolean
}

type AppProviderProps = { children: React.ReactNode }

const AppContext = React.createContext<
  { state: State; dispatch: Dispatch } | undefined
>(undefined)

const INITIAL_STATE: State = {
  coinId: '',
  searchQuery: '',
  sidebarCollapsed: false,
}

function AppReducer(state: State, action: Action) {
  switch (action.type) {
    case 'UPDATE_COIN_ID': {
      return {
        ...state,
        coinId: action.payload,
      }
    }

    case 'UPDATE_SEARCH_QUERY': {
      return {
        ...state,
        searchQuery: action.payload,
      }
    }

    case 'TOGGLE_SIDEBAR_COLLAPSE': {
      return {
        ...state,
        sidebarCollapsed: !state.sidebarCollapsed,
      }
    }

    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

function AppProvider({ children }: AppProviderProps) {
  const [state, dispatch] = React.useReducer(AppReducer, INITIAL_STATE)

  const value = { dispatch, state }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

function useApp() {
  const context = React.useContext(AppContext)

  if (context === undefined) {
    throw new Error('useApp must be used within a AppContext')
  }

  return context
}

export { AppProvider, useApp }

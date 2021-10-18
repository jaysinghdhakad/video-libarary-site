import { createContext, useContext, useReducer, useState } from "react";
let HistoryContext = createContext();

export function HistoryProvider({ children }) {
  const [loader, setloader] = useState(false);
  const [state, dispatch] = useReducer(HistoryReducer, {
    history: [],
  });

  return (
    <HistoryContext.Provider value={{ state, dispatch, loader }}>
      {children}
    </HistoryContext.Provider>
  );
}

function HistoryReducer(state, value) {
  console.log("this is history payload", value.payload);
  switch (value.type) {
    case "ADD-DATA-FROM_SERVER":
      return value.payload;
    case "ADD-VIDEO-TO-WATCH-HISTORY":
      return {
        ...state,
        history: [...state.history, value.payload.video],
      };

    case "DELETE-VIDEO-FROM-WATCH-HISTORY":
      state.history[value.payload.index] = null;
      return {
        ...state,
        history: state.history.filter((video) => {
          return video !== null;
        }),
      };
    default:
      break;
  }
}

export function useHistory() {
  return useContext(HistoryContext);
}

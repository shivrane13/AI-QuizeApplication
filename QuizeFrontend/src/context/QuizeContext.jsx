import { createContext, useContext, useReducer } from "react";

const QuizeContext = createContext();

const initialState = {
  questions: [],
  status: "",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  numCorrectAns: 0,
  historyId: null,
  QuizeTitle: "...",
};

function reducer(state, action) {
  switch (action.type) {
    case "dataRecevied":
      return {
        ...state,
        questions: action.payload.questions,
        QuizeTitle: action.payload.title,
        status: "ready",
      };
    case "start":
      return {
        ...state,
        status: "active",
      };
    case "newAnswer":
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload == question.correctOption
            ? state.points + question.points
            : state.points,
        numCorrectAns:
          action.payload == question.correctOption
            ? state.numCorrectAns + 1
            : state.numCorrectAns,
      };
    case "newQuestion":
      return {
        ...state,
        index: state.index + 1,
        answer: null,
      };
    case "finish":
      return {
        ...state,
        status: "finished",
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
        historyId: action.payload,
      };
    case "restart":
      return {
        ...state,
        questions: state.questions,
        status: "ready",
        index: 0,
        answer: null,
        points: 0,
        numCorrectAns: 0,
      };
    case "getDataFromHistory":
      return {
        ...state,
        questions: action.payload.questions,
        historyId: action.payload.historyId,
        status: "ready",
        index: 0,
        answer: null,
        points: 0,
        numCorrectAns: 0,
      };
    case "setStatus":
      return {
        ...state,
        status: action.payload,
      };
  }
}

function QuizeContextProvider({ children }) {
  const [
    {
      questions,
      status,
      index,
      answer,
      points,
      highscore,
      historyId,
      numCorrectAns,
      QuizeTitle,
    },
    dispatch,
  ] = useReducer(reducer, initialState);
  const numQuestions = questions.length;
  const maxPossiblePoints = questions.reduce(
    (prev, cur) => prev + cur.points,
    0
  );

  return (
    <QuizeContext.Provider
      value={{
        questions,
        status,
        index,
        answer,
        points,
        highscore,
        numQuestions,
        maxPossiblePoints,
        numCorrectAns,
        historyId,
        dispatch,
        QuizeTitle,
      }}
    >
      {children}
    </QuizeContext.Provider>
  );
}

export default QuizeContextProvider;

export function useQuizeContext() {
  const context = useContext(QuizeContext);
  if (!context) {
    throw new Error("Use Outsize the context");
  }
  return context;
}

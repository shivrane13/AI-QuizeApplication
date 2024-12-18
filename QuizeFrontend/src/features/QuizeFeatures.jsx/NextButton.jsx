import HisotryForm from "../../components/HisotryForm";
import { useQuizeContext } from "../../context/QuizeContext";

function NextButton() {
  const { answer, index, numQuestions, dispatch } = useQuizeContext();

  if (answer == null) {
    return null;
  }

  if (index < numQuestions - 1) {
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "newQuestion" })}
      >
        Next
      </button>
    );
  }

  if (index === numQuestions - 1) {
    return (
      // <button
      //   className="btn btn-ui"
      //   onClick={() => dispatch({ type: "finish" })}
      // >
      //   finished
      // </button>
      <HisotryForm />
    );
  }
}

export default NextButton;

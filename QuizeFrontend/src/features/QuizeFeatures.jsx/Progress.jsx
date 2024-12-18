import { useQuizeContext } from "../../context/QuizeContext";

function Progress() {
  const { index, points, numQuestions, answer, maxPossiblePoints } =
    useQuizeContext();
  return (
    <div className="progress">
      <progress
        max={numQuestions}
        value={index + Number(answer !== null)}
      ></progress>
      <p>
        Question <strong>{index + 1}</strong> / {numQuestions}
      </p>
      <p>
        <strong>{points}</strong> / {maxPossiblePoints}
      </p>
    </div>
  );
}

export default Progress;

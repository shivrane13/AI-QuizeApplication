import { useForm } from "react-hook-form";
import { useQuizeContext } from "../context/QuizeContext";
import { useUserContext } from "../context/UserContext";
import { saveHistory } from "../service/QuizeApiCall";

function HisotryForm() {
  const { register, handleSubmit } = useForm();
  const {
    questions,
    QuizeTitle,
    points,
    numQuestions,
    numCorrectAns,
    historyId,
    dispatch,
  } = useQuizeContext();

  const { user } = useUserContext();

  const questionsString = JSON.stringify(questions);

  async function onSubmit(data) {
    data = {
      ...data,
      highscore: Number(data.highscore),
      correct: Number(data.correct),
      wrong: Number(data.wrong),
      userId: Number(data.userId),
      id: data.id ? Number(data.id) : null,
    };
    console.log(data);
    const res = await saveHistory(data);
    let id;
    if (historyId == null) {
      id = res.insertId;
    } else {
      id = historyId;
    }
    console.log(id);
    dispatch({ type: "finish", payload: id });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {historyId && (
        <input type="hidden" {...register("id")} value={historyId} />
      )}
      <input type="hidden" {...register("title")} value={QuizeTitle} />

      <input type="hidden" {...register("highscore")} value={points} />
      <input type="hidden" {...register("correct")} value={numCorrectAns} />
      <input
        type="hidden"
        {...register("wrong")}
        value={numQuestions - numCorrectAns}
      />
      <input type="hidden" {...register("questions")} value={questionsString} />
      <input type="hidden" {...register("userId")} value={user.user.id} />
      {/* <button
        type="submit"
        className="btn btn-ui"
        onClick={() => dispatch({ type: "finish" })}
      >
        finished
      </button> */}
      <button type="submit" className="btn btn-ui">
        finished
      </button>
    </form>
  );
}

export default HisotryForm;

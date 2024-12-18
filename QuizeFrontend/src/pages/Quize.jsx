import styled from "styled-components";
import Progress from "../features/QuizeFeatures.jsx/Progress";
import Question from "../features/QuizeFeatures.jsx/Question";
import NextButton from "../features/QuizeFeatures.jsx/NextButton";
import { useQuizeContext } from "../context/QuizeContext";
import FinishedScreen from "../components/FinishedScreen";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Quize() {
  const { status, questions } = useQuizeContext();
  const navigate = useNavigate();
  console.log(questions.length);
  useEffect(() => {
    if (questions.length === 0) {
      navigate("/prompt");
    }
  }, [questions, navigate]);
  return (
    <QuestionContainer>
      {status === "ready" && (
        <>
          <Progress />
          <Question />
          <NextButton />
        </>
      )}
      {status === "finished" && <FinishedScreen />}
    </QuestionContainer>
  );
}

const QuestionContainer = styled.div`
  margin: 5rem auto 2rem auto;
  width: 70%;
`;

export default Quize;

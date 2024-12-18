import styled from "styled-components";
import Option from "./Option";
import { useQuizeContext } from "../../context/QuizeContext";

function Question() {
  const { questions, index } = useQuizeContext();
  const question = questions[index];

  return (
    <QuestionContainer>
      <h4>{question.question}</h4>
      <Option question={question} />
    </QuestionContainer>
  );
}

const QuestionContainer = styled.div`
  margin: 2rem auto 2rem auto;
  width: 100%;
`;

export default Question;

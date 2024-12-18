import styled from "styled-components";
import { useQuizeContext } from "../context/QuizeContext";
import { useNavigate } from "react-router-dom";

function HistoryElement({ history }) {
  const { dispatch } = useQuizeContext();
  const navigate = useNavigate();
  const questions = JSON.parse(history.questions);

  function handelClick() {
    dispatch({
      type: "getDataFromHistory",
      payload: { questions: questions, historyId: history.id },
    });
    navigate("/quize");
  }

  return (
    <HistoryCard>
      <InfoSection>
        <Title>{history.title}</Title>
        <Details>
          <span>Highscore: {history.highscore}</span>
          <span>Correct: {history.correct}</span>
          <span>Wrong: {history.wrong}</span>
        </Details>
      </InfoSection>
      <Action>
        <RetryButton onClick={handelClick}>Try Again</RetryButton>
      </Action>
    </HistoryCard>
  );
}

export default HistoryElement;

// Styled Components
const HistoryCard = styled.div`
  margin: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  background-color: var(--color-darkest);
  border: 1px solid var(--color-medium);
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
`;

const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Title = styled.h3`
  font-size: 1.6rem;
  color: var(--color-theme);
  margin: 0;
`;

const Details = styled.div`
  display: flex;
  gap: 1rem;
  font-size: 1.4rem;
  color: var(--color-light);
  flex-wrap: wrap;

  span {
    white-space: nowrap;
  }
`;

const Action = styled.div`
  display: flex;
  align-items: center;
`;

const RetryButton = styled.button`
  font-family: inherit;
  font-size: 1.4rem;
  padding: 0.6rem 1.5rem;
  color: var(--color-light);
  background-color: var(--color-accent);
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: var(--color-accent-hover);
  }

  &:active {
    transform: scale(0.98);
  }
`;

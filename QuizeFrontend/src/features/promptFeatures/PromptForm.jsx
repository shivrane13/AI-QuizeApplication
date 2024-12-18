import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useQuizeContext } from "../../context/QuizeContext";
import { getQuestions } from "../../service/QuizeApiCall";
import Loader from "../../components/Loader";

function PromptForm() {
  const { register, handleSubmit } = useForm();
  const { dispatch, status } = useQuizeContext();
  const navigate = useNavigate();

  async function onSubmit(data) {
    dispatch({ type: "setStatus", payload: "loading" });
    const questions = await getQuestions(data);
    console.log(questions.data.questions);
    console.log(questions.data.title);

    dispatch({
      type: "dataRecevied",
      payload: {
        questions: questions.data.questions,
        title: questions.data.title,
      },
    });
    navigate("/quize");
  }
  if (status === "loading") {
    return (
      <Loader>
        Wait for Second...! We are creating best set of questions for you...
      </Loader>
    );
  }

  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)}>
      <FormGroup>
        <label>Enter Your Prompt for Generate a Quize</label>
        <textarea
          {...register("prompt")}
          placeholder="Type your quize prompt here..."
        ></textarea>
      </FormGroup>
      <BtnAndSelector>
        <FormGroup>
          <label htmlFor="numberOfQuestions">Select Number of Questions</label>
          <select {...register("numberOfQuestions")}>
            <option>15</option>
            <option>25</option>
            <option>30</option>
          </select>
        </FormGroup>

        <SubmitButton className="btn btn-ui">Let&apos;s Start</SubmitButton>
      </BtnAndSelector>
    </FormContainer>
  );
}

const BtnAndSelector = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 2rem;
  padding: 3rem;
  /* background-color: var(--color-dark); */
  /* border-radius: 12px; */
  /* box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); */
  width: 150rem;
  margin: auto;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  label {
    font-size: 1.8rem;
    color: var(--color-light);
  }

  textarea,
  select {
    padding: 1rem;
    font-size: 1.6rem;
    border: 2px solid var(--color-medium);
    border-radius: 8px;
    background-color: var(--color-darkest);
    color: var(--color-light);
    resize: none;
  }

  textarea {
    height: 10rem;
  }

  select {
    cursor: pointer;
    width: 100%;
  }
  select:focus,
  textarea:focus {
    border-color: var(--color-theme);
    outline: none;
  }
`;

const SubmitButton = styled.button`
  font-family: inherit;
  font-size: 2rem;
  padding: 1.2rem 2.4rem;
  color: var(--color-light);
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: var(--color-accent);
    border: 2px solid var (--color-light);
  }

  &:active {
    transform: scale(0.98);
  }
`;

export default PromptForm;

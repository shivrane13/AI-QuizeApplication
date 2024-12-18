import styled from "styled-components";
import PromptForm from "../features/promptFeatures/PromptForm";

function Prompt() {
  return (
    <div className="starts">
      <WelcomeMassage>Welcome To QuizeMaster</WelcomeMassage>
      <CenterPromptForm>
        <PromptForm />
      </CenterPromptForm>
    </div>
  );
}

const WelcomeMassage = styled.h2`
  text-align: center;
`;

const CenterPromptForm = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default Prompt;

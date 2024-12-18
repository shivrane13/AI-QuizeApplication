import { useForm } from "react-hook-form";
import styled from "styled-components";
import { loginUser } from "../../service/UserApiCall";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  async function onSubmit(data) {
    console.log(data);
    await loginUser(data);
    navigate("/prompt");
  }

  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)}>
      <FormTitle>Log In</FormTitle>
      <FormGroup>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          placeholder="Enter your email"
          {...register("email", { required: true })}
        />
      </FormGroup>
      <FormGroup>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          placeholder="Enter your password"
          {...register("password", { required: true })}
        />
      </FormGroup>
      <SubmitButton>Log In</SubmitButton>
      <OtherOptions>
        <p>
          Don&apos;t have an account? <a href="/signup">Sign Up</a>
        </p>
      </OtherOptions>
    </FormContainer>
  );
}

export default LoginForm;

// Styled Components
const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  background-color: var(--color-darkest);
  border-radius: 8px;
  padding: 2rem 3rem;
  width: 100%;
  max-width: 500px;
  margin: 3rem auto;
  color: var(--color-light);
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);

  @media (max-width: 768px) {
    padding: 1.5rem 2rem;
  }
`;

const FormTitle = styled.h2`
  text-align: center;
  font-size: 2.4rem;
  margin-bottom: 1rem;
  color: var(--color-light);
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  label {
    font-size: 1.4rem;
    color: var(--color-medium);
  }

  input {
    padding: 1rem;
    font-size: 1.6rem;
    border: 2px solid var(--color-medium);
    border-radius: 6px;
    background-color: var(--color-dark);
    color: var(--color-light);
    outline: none;

    &:focus {
      border-color: var(--color-accent);
      box-shadow: 0 0 5px var(--color-accent);
    }
  }
`;

const SubmitButton = styled.button`
  padding: 1rem 2rem;
  font-size: 1.8rem;
  background-color: var(--color-accent);
  border: none;
  border-radius: 6px;
  color: var(--color-light);
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: var(--color-accent-light);
  }

  &:active {
    transform: scale(0.98);
  }
`;

const OtherOptions = styled.div`
  text-align: center;

  p {
    font-size: 1.2rem;
    color: var(--color-medium);

    a {
      color: var(--color-accent);
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }
`;

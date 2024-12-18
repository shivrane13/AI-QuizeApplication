import { useForm } from "react-hook-form";
import styled from "styled-components";
import { createUser } from "../../service/UserApiCall";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function SignupForm() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  async function onSubmit(data) {
    try {
      setIsLoading(true);
      const response = await createUser(data);
      navigate("/login");
    } catch (error) {
      console.error("Error creating user:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  const password = watch("password");

  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)}>
      <FormTitle>Sign Up</FormTitle>
      <FormGroup>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          placeholder="Enter your email"
          {...register("email", { required: "Email is required" })}
        />
        {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
      </FormGroup>

      <FormGroup>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          placeholder="Create a password"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters long",
            },
          })}
        />
        {errors.password && (
          <ErrorMessage>{errors.password.message}</ErrorMessage>
        )}
      </FormGroup>

      <FormGroup>
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          type="password"
          id="confirmPassword"
          placeholder="Re-enter your password"
          {...register("confirmPassword", {
            required: "Please confirm your password",
            validate: (value) => value === password || "Passwords do not match",
          })}
        />
        {errors.confirmPassword && (
          <ErrorMessage>{errors.confirmPassword.message}</ErrorMessage>
        )}
      </FormGroup>

      <SubmitButton disabled={isLoading} type="submit">
        Sign Up
      </SubmitButton>
    </FormContainer>
  );
}

export default SignupForm;

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

const ErrorMessage = styled.span`
  color: var(--color-error);
  font-size: 1.2rem;
`;

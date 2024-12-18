import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useUserContext } from "../../context/UserContext";
import Loader from "../../components/Loader";
import { createUser } from "../../service/UserApiCall";
import { set } from "react-hook-form";

function ProfileForm() {
  const { user, isLoading } = useUserContext();

  const [formData, setFormData] = useState({});
  console.log(user);
  useEffect(
    function () {
      if (!isLoading && user) {
        setFormData({
          id: user.user.id,
          name: user.user.name || "",
          email: user.user.email || "",
          password: user.user.password,
          collage: user.user.collage || "",
        });
      }
    },
    [isLoading, user]
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await createUser({ ...formData, id: Number(formData.id) });
    } catch (error) {
      console.log(error);
    }
  }

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   setIsSubmitting(true);

  //   console.log(formData);
  // };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <StyledForm onSubmit={handleSubmit}>
      <input type="hidden" id="id" name="id" value={formData?.id} />
      <FormGroup>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData?.name}
          onChange={handleChange}
          required
        />
      </FormGroup>
      <FormGroup>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData?.email}
          onChange={handleChange}
          required
        />
      </FormGroup>
      <FormGroup>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData?.password}
          onChange={handleChange}
          required
        />
      </FormGroup>
      <FormGroup>
        <label htmlFor="college">College</label>
        <input
          type="text"
          id="collage"
          name="collage"
          value={formData?.collage}
          onChange={handleChange}
          required
        />
      </FormGroup>
      <SubmitButton type="submit">Update Profile</SubmitButton>
    </StyledForm>
  );
}

// Styled components
const StyledForm = styled.form`
  max-width: 400px;
  margin: auto;
  padding: 2rem;
  background-color: var(--color-dark);
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  label {
    font-size: 1.6rem;
    color: var(--color-light);
  }

  input {
    padding: 0.8rem 1rem;
    font-size: 1.4rem;
    border: 2px solid var(--color-medium);
    border-radius: 6px;
    background-color: var(--color-darkest);
    color: var(--color-light);
  }

  input:focus {
    border-color: var(--color-theme);
    outline: none;
  }
`;

const SubmitButton = styled.button`
  font-family: inherit;
  font-size: 1.6rem;
  padding: 1rem 1.5rem;
  color: var(--color-light);
  background-color: var(--color-accent);
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: var(--color-accent-hover);
  }

  &:disabled {
    background-color: var(--color-medium);
    cursor: not-allowed;
  }
`;

export default ProfileForm;

import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import styled from "styled-components";
import ProfileCard from "./ProfileCard";
import { Link } from "react-router-dom";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <StyledHeader>
      <Link to="/">
        <LogoContainer>
          <h1>QuizeMaster</h1>
        </LogoContainer>
      </Link>
      <ProfileContainer onClick={() => setIsOpen(!isOpen)}>
        <FaUserCircle size={32} />
      </ProfileContainer>
      {isOpen && <ProfileCard setIsOpen={setIsOpen} />}
    </StyledHeader>
  );
}

const StyledHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2rem 7rem;
  background-color: var(--color-dark);
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);

  a {
    text-decoration: none;
    color: inherit;
  }
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  img {
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
  }

  h1 {
    font-family: "Codystar", sans-serif;
    font-size: 2.4rem;
    color: var(--color-theme);
  }
`;

const ProfileContainer = styled.div`
  display: flex;
  align-items: center;

  color: var(--color-light);
`;

export default Header;

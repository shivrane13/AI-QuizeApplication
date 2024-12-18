import { FaHistory, FaSignOutAlt, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import styled from "styled-components";

function ProfileCard({ setIsOpen }) {
  return (
    <Modal id="profile-modal">
      <Link to="/profile" onClick={() => setIsOpen(false)}>
        <Option>
          <FaUser size={18} />
          <span>Profile</span>
        </Option>
      </Link>
      <Link to="history" onClick={() => setIsOpen(false)}>
        <Option>
          <FaHistory size={18} />
          <span>History</span>
        </Option>
      </Link>
      <hr />
      <Link onClick={() => setIsOpen(false)}>
        <Option>
          <FaSignOutAlt size={18} />
          <span>Logout</span>
        </Option>
      </Link>
    </Modal>
  );
}

const Modal = styled.div`
  position: absolute;
  top: 80px; /* Positions the modal below the profile icon */
  right: 5px;
  background-color: var(--color-darkest);
  color: var(--color-light);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 200px;

  animation: fadeIn 0.3s ease-in-out;

  a {
    color: var(--color-light);
    text-decoration: none;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const Option = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  padding: 0.5rem 0.8rem;
  cursor: pointer;
  border-radius: 6px;
  transition: background-color 0.2s;

  &:hover {
    background-color: var(--color-medium);
  }

  span {
    font-size: 1.4rem;
  }
`;

export default ProfileCard;

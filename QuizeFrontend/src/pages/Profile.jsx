import styled from "styled-components";
import ProfileForm from "../features/profileFeatures/ProfileForm";

function Profile() {
  return (
    <ProfileDiv>
      <ProfileForm />
    </ProfileDiv>
  );
}

const ProfileDiv = styled.div`
  margin-top: 3rem;
`;

export default Profile;

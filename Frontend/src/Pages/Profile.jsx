import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { getProfileData, removeProfile, updateProfile } from "../Api";
import { clearUser } from "../Redux/AuthSlice";
import Header from "../Components/Header";

const Container = styled.div`
  width: 350px;
  height: 250px;
  position: absolute;
  top: 35%;
  left: 35%;
`;

const ButtonContainer = styled.div`
  width: 300px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

function Profile() {
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedProfile, setUpdatedProfile] = useState({ name: undefined, email: undefined });

  const dispatch = useDispatch();
  const loginData = useSelector((state) => state.userData.userInfo);
  const userId = loginData?.userId;

  useEffect(() => {
    if (userId) {
      getProfileData(userId).then((data) => {
        setProfile(data);
        // setUpdatedProfile({ name: data.name, email: data.email }); // Ensure updatedProfile is set
      });
    }
  }, [userId]);

  function removeUser() {
    if (window.confirm("Are you sure you want to delete your profile?")) {
      removeProfile(userId).then((data) => {
        if (data === "deleted successfully") {
          dispatch(clearUser());
        }
      });
    }
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setUpdatedProfile((prev) => ({ ...prev, [name]: value })); // Corrected state update
  }

  function handleUpdate() {
    if (window.confirm("Are you sure you want to update your profile?")) {
      updateProfile(userId, updatedProfile)
        .then((data) => {
          if (data === "updated successfully") {
            setProfile(updatedProfile); // Ensure UI updates immediately
            setIsEditing(false);
          }
        })
        .catch((err) => {
          console.error("Error updating profile:", err.message);
        });
    }
  }

  return (
    <>
    <Header/>
    <Container>
    <div className="card">
        <div className="card-body">
          {isEditing ? (
            <>
              <input
                type="text"
                name="name"
                value={updatedProfile.name}
                onChange={handleChange}
                placeholder="Enter name"
              />
              <input
                type="email"
                name="email"
                value={updatedProfile.email}
                onChange={handleChange}
                placeholder="Enter email"
              />
              <ButtonContainer>
                <button onClick={handleUpdate} className="btn bg-success">
                  Save
                </button>
                <button onClick={() => setIsEditing(false)} className="btn bg-danger">
                  Cancel
                </button>
              </ButtonContainer>
            </>
          ) : (
            <>
              <img width="250px" height="250px" src={profile?.image} alt="" />
              <h5 className="card-title">{profile?.name || "Loading..."}</h5>
              <p className="card-text">{profile?.email || "Loading..."}</p>
              <ButtonContainer>
                <button onClick={() => setIsEditing(true)} className="btn bg-success">
                  Update
                </button>
                <button onClick={removeUser} className="btn bg-danger">
                  Delete
                </button>
              </ButtonContainer>
            </>
          )}
        </div>
      </div>
    </Container>
    </>
  );
}

export default Profile;

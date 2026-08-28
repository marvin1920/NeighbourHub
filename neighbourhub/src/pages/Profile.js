import UserProfile from "../components/UserProfile";
import "../styles/Profile.css";

function Profile() {

  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    return <h2>Please login first.</h2>;
  }

  return (
    <div className="profile-page">

      <h1>My Profile</h1>

      <UserProfile user={user} />

    </div>
  );
}

export default Profile;
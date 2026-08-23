import UserProfile from "../components/UserProfile";
import "../styles/Profile.css";

function Profile() {

  const user = {
    name: "Martin",
    email: "martin@example.com",
    role: "Resident"
  };

  return (
    <div className="profile-page">

      <h1>My Profile</h1>

      <UserProfile user={user} />

    </div>
  );
}

export default Profile;
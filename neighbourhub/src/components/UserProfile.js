function UserProfile({ user }) {

  const initials = user.name
    ? user.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : "?";

  return (
    <div className="user-profile">

      <div className="profile-avatar">
        {initials}
      </div>

      <h2>User Profile</h2>

      <div className="profile-info">

        <p>
          <strong>Name:</strong> {user.name}
        </p>

        <p>
          <strong>Email:</strong> {user.email}
        </p>

        <p>
          <strong>Role:</strong> {user.role}
        </p>

      </div>

    </div>
  );
}

export default UserProfile;
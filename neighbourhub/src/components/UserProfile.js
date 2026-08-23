function UserProfile({ user }) {
  return (
    <div className="user-profile">

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
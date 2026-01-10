"use client";

const UsersTable = ({ users, loading }) => {
  if (loading) {
    return <p className="admin-loading">Loading users...</p>;
  }

  if (users.length === 0) {
    return <p className="admin-empty">No brochure requests yet.</p>;
  }

  return (
    <div className="admin-table-container">
      <table className="admin-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Project</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>
                <a href={`mailto:${user.email}`} className="admin-link">
                  {user.email}
                </a>
              </td>
              <td>
                <a href={`tel:${user.mobile}`} className="admin-link">
                  {user.mobile}
                </a>
              </td>
              <td>{user.project_name}</td>
              <td>
                {user.created_at
                  ? new Date(user.created_at).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })
                  : "—"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersTable;

"use client";

const AdminLogin = ({ credentials, onChange, onSubmit, loading, error }) => {
  return (
    <div className="admin-login-page">
      <div className="admin-login-container">
        <h1>Admin Login</h1>
        <p>Please enter your credentials to access the admin panel.</p>

        <form onSubmit={onSubmit}>
          <div className="admin-input-group">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={credentials.email}
              onChange={onChange}
              required
            />
          </div>
          <div className="admin-input-group">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={credentials.password}
              onChange={onChange}
              required
            />
          </div>
          {error && <p className="admin-error">{error}</p>}
          <button type="submit" className="admin-submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;

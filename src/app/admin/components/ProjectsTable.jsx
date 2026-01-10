"use client";

const ProjectsTable = ({ projects, loading, onEdit, onDelete }) => {
  if (loading) {
    return <p className="admin-loading">Loading projects...</p>;
  }

  if (projects.length === 0) {
    return <p className="admin-empty">No projects found. Add your first project!</p>;
  }

  return (
    <div className="admin-table-container">
      <table className="admin-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Location</th>
            <th>Status</th>
            <th>Brochure</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr key={project.id}>
              <td>
                {project.image_url ? (
                  <img
                    src={project.image_url}
                    alt={project.name}
                    className="admin-table-img"
                  />
                ) : (
                  <span className="admin-no-image">No image</span>
                )}
              </td>
              <td>{project.name}</td>
              <td>{project.location}</td>
              <td>
                <span
                  className={`admin-status ${
                    project.status ? "ongoing" : "delivered"
                  }`}
                >
                  {project.status ? "Ongoing" : "Delivered"}
                </span>
              </td>
              <td>
                {project.brochure_url ? (
                  <a
                    href={project.brochure_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="admin-link"
                  >
                    View PDF
                  </a>
                ) : (
                  <span className="admin-no-brochure">—</span>
                )}
              </td>
              <td>
                <div className="admin-actions">
                  <button
                    onClick={() => onEdit(project)}
                    className="admin-btn-icon edit"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(project)}
                    className="admin-btn-icon delete"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProjectsTable;

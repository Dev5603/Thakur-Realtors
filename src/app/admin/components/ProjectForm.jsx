"use client";

const ProjectForm = ({
  formData,
  editingProject,
  imageFile,
  brochureFile,
  uploading,
  onFormChange,
  onImageChange,
  onBrochureChange,
  onSubmit,
  onCancel,
}) => {
  return (
    <div className="admin-form-container">
      <h3>{editingProject ? "Edit Project" : "Add New Project"}</h3>
      <form onSubmit={onSubmit} className="admin-form">
        <div className="admin-form-row">
          <div className="admin-input-group">
            <label>Project Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter project name"
              value={formData.name}
              onChange={onFormChange}
              required
            />
          </div>
          <div className="admin-input-group">
            <label>Location</label>
            <input
              type="text"
              name="location"
              placeholder="Enter location"
              value={formData.location}
              onChange={onFormChange}
              required
            />
          </div>
        </div>

        <div className="admin-form-row">
          <div className="admin-input-group">
            <label>Project Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={onImageChange}
            />
            {formData.image_url && !imageFile && (
              <p className="admin-file-info">
                Current: {formData.image_url.split("/").pop()}
              </p>
            )}
          </div>
          <div className="admin-input-group">
            <label>Brochure PDF (Optional)</label>
            <input
              type="file"
              accept=".pdf"
              onChange={onBrochureChange}
            />
            {formData.brochure_url && !brochureFile && (
              <p className="admin-file-info">
                Current: {formData.brochure_url.split("/").pop()}
              </p>
            )}
          </div>
        </div>

        <div className="admin-checkbox-group">
          <label className="admin-checkbox-label">
            <input
              type="checkbox"
              name="status"
              checked={formData.status}
              onChange={onFormChange}
            />
            <span>Ongoing Project</span>
            <span className="admin-checkbox-hint">
              (Uncheck for delivered project)
            </span>
          </label>
        </div>

        <div className="admin-form-actions">
          <button
            type="button"
            onClick={onCancel}
            className="admin-btn admin-btn-secondary"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="admin-btn admin-btn-primary"
            disabled={uploading}
          >
            {uploading
              ? "Saving..."
              : editingProject
              ? "Update Project"
              : "Add Project"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProjectForm;

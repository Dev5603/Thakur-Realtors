"use client";

const DeleteModal = ({ project, onClose, onConfirm }) => {
  return (
    <div className="admin-modal-overlay" onClick={onClose}>
      <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
        <h3>Delete Project</h3>
        <p>
          Are you sure you want to delete <strong>{project?.name}</strong>? This
          action cannot be undone.
        </p>
        <div className="admin-modal-actions">
          <button
            onClick={onClose}
            className="admin-btn admin-btn-secondary"
          >
            Cancel
          </button>
          <button
            onClick={() => onConfirm(project?.id)}
            className="admin-btn admin-btn-danger"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;

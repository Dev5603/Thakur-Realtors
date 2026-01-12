"use client";
import "./admin.css";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import AdminLogin from "./components/AdminLogin";
import ProjectForm from "./components/ProjectForm";
import ProjectsTable from "./components/ProjectsTable";
import UsersTable from "./components/UsersTable";
import DeleteModal from "./components/DeleteModal";

const AdminPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const [projects, setProjects] = useState([]);
  const [projectsLoading, setProjectsLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [usersLoading, setUsersLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("projects");

  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    status: true,
    image_url: "",
    brochure_url: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [brochureFile, setBrochureFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [deleteModal, setDeleteModal] = useState({ open: false, project: null });

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) setIsLoggedIn(true);
    };
    checkSession();
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      fetchProjects();
      fetchUsers();
    }
  }, [isLoggedIn]);

  const fetchProjects = async () => {
    setProjectsLoading(true);
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) setProjects(data || []);
    setProjectsLoading(false);
  };

  const fetchUsers = async () => {
    setUsersLoading(true);
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) setUsers(data || []);
    setUsersLoading(false);
  };

  const uploadFile = async (file, bucket, folder) => {
    const fileExt = file.name.split(".").pop();
    const fileName = `${folder}/${Date.now()}.${fileExt}`;

    const { error } = await supabase.storage.from(bucket).upload(fileName, file);
    if (error) throw error;

    const { data: { publicUrl } } = supabase.storage.from(bucket).getPublicUrl(fileName);
    return publicUrl;
  };

  const extractStoragePath = (url) => {
    if (!url) return null;
    const match = url.match(/project-files\/(.+)$/);
    return match ? match[1] : null;
  };

  const resetForm = () => {
    setFormData({ name: "", location: "", status: true, image_url: "", brochure_url: "" });
    setImageFile(null);
    setBrochureFile(null);
    setEditingProject(null);
    setShowForm(false);
  };

  // Handlers
  const handleCredentialsChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: credentials.email,
        password: credentials.password,
      });

      if (error) setError(error.message);
      else if (data.user) setIsLoggedIn(true);
    } catch {
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsLoggedIn(false);
    setCredentials({ email: "", password: "" });
  };

  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageChange = (e) => {
    if (e.target.files?.[0]) setImageFile(e.target.files[0]);
  };

  const handleBrochureChange = (e) => {
    if (e.target.files?.[0]) setBrochureFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);
    setError("");

    try {
      let imageUrl = formData.image_url;
      let brochureUrl = formData.brochure_url;

      if (imageFile) {
        if (editingProject?.image_url) {
          const oldPath = extractStoragePath(editingProject.image_url);
          if (oldPath) await supabase.storage.from("project-files").remove([oldPath]);
        }
        imageUrl = await uploadFile(imageFile, "project-files", "images");
      }

      if (brochureFile) {
        if (editingProject?.brochure_url) {
          const oldPath = extractStoragePath(editingProject.brochure_url);
          if (oldPath) await supabase.storage.from("project-files").remove([oldPath]);
        }
        brochureUrl = await uploadFile(brochureFile, "project-files", "brochures");
      }

      const projectData = {
        name: formData.name,
        location: formData.location,
        status: formData.status,
        image_url: imageUrl,
        brochure_url: brochureUrl || null,
      };

      if (editingProject) {
        const { error } = await supabase
          .from("projects")
          .update(projectData)
          .eq("id", editingProject.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("projects").insert([projectData]);
        if (error) throw error;
      }

      await fetchProjects();
      resetForm();
    } catch (err) {
      setError(err.message || "An error occurred");
    } finally {
      setUploading(false);
    }
  };

  const handleEdit = (project) => {
    setEditingProject(project);
    setFormData({
      name: project.name,
      location: project.location,
      status: project.status,
      image_url: project.image_url || "",
      brochure_url: project.brochure_url || "",
    });
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    const project = projects.find((p) => p.id === id);

    try {
      if (project?.image_url) {
        const path = extractStoragePath(project.image_url);
        if (path) await supabase.storage.from("project-files").remove([path]);
      }
      if (project?.brochure_url) {
        const path = extractStoragePath(project.brochure_url);
        if (path) await supabase.storage.from("project-files").remove([path]);
      }

      const { error } = await supabase.from("projects").delete().eq("id", id);
      if (error) setError(error.message);
      else await fetchProjects();
    } catch (err) {
      setError(err.message || "Error deleting project");
    } finally {
      setDeleteModal({ open: false, project: null });
    }
  };

  if (!isLoggedIn) {
    return (
      <AdminLogin
        credentials={credentials}
        onChange={handleCredentialsChange}
        onSubmit={handleLogin}
        loading={loading}
        error={error}
      />
    );
  }

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <div>
          <h1>Admin Dashboard</h1>
          <p>Manage your projects</p>
        </div>
        <button onClick={handleLogout} className="admin-logout">
          Logout
        </button>
      </div>

      <div className="admin-content">
        <div className="admin-tabs">
          <button
            className={`admin-tab ${activeTab === "projects" ? "active" : ""}`}
            onClick={() => setActiveTab("projects")}
          >
            Projects
            <span className="admin-tab-count">{projects.length}</span>
          </button>
          <button
            className={`admin-tab ${activeTab === "users" ? "active" : ""}`}
            onClick={() => setActiveTab("users")}
          >
            Brochure Requests
            <span className="admin-tab-count">{users.length}</span>
          </button>
        </div>

        {activeTab === "projects" && (
          <div className="admin-section">
            <div className="admin-section-header">
              <h2>Projects</h2>
              <button
                onClick={() => {
                  resetForm();
                  setShowForm(true);
                }}
                className="admin-btn admin-btn-primary"
              >
                + Add Project
              </button>
            </div>

            {error && <p className="admin-error">{error}</p>}

            {showForm && (
              <ProjectForm
                formData={formData}
                editingProject={editingProject}
                imageFile={imageFile}
                brochureFile={brochureFile}
                uploading={uploading}
                onFormChange={handleFormChange}
                onImageChange={handleImageChange}
                onBrochureChange={handleBrochureChange}
                onSubmit={handleSubmit}
                onCancel={resetForm}
              />
            )}

            <ProjectsTable
              projects={projects}
              loading={projectsLoading}
              onEdit={handleEdit}
              onDelete={(project) => setDeleteModal({ open: true, project })}
            />
          </div>
        )}

        {activeTab === "users" && (
          <div className="admin-section">
            <div className="admin-section-header">
              <h2>Brochure Requests</h2>
            </div>
            <UsersTable users={users} loading={usersLoading} />
          </div>
        )}
      </div>

      {deleteModal.open && (
        <DeleteModal
          project={deleteModal.project}
          onClose={() => setDeleteModal({ open: false, project: null })}
          onConfirm={handleDelete}
        />
      )}
    </div>
  );
};

export default AdminPage;

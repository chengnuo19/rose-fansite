const API_BASE = import.meta.env.VITE_API_BASE_URL || "/api";

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.error || "请求失败，请稍后再试");
  }

  return data;
}

export const api = {
  getImages() {
    return request("/images");
  },
  getImage(id) {
    return request(`/images/${id}`);
  },
  getComments(id) {
    return request(`/images/${id}/comments`);
  },
  getRecentComments() {
    return request("/images/comments/recent");
  },
  submitPhoto(payload) {
    return request("/images/submissions", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },
  likeImage(id) {
    return request(`/images/${id}/like`, { method: "POST" });
  },
  createComment(id, payload) {
    return request(`/images/${id}/comments`, {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },
  getAdminComments(adminKey) {
    return request("/admin/comments", {
      headers: {
        "x-admin-key": adminKey,
      },
    });
  },
  deleteComment(commentId, adminKey) {
    return request(`/admin/comments/${commentId}`, {
      method: "DELETE",
      headers: {
        "x-admin-key": adminKey,
      },
    });
  },
  getAdminSubmissions(adminKey) {
    return request("/admin/submissions", {
      headers: {
        "x-admin-key": adminKey,
      },
    });
  },
  approveSubmission(submissionId, adminKey) {
    return request(`/admin/submissions/${submissionId}/approve`, {
      method: "POST",
      headers: {
        "x-admin-key": adminKey,
      },
    });
  },
  rejectSubmission(submissionId, adminKey) {
    return request(`/admin/submissions/${submissionId}/reject`, {
      method: "POST",
      headers: {
        "x-admin-key": adminKey,
      },
    });
  },
};

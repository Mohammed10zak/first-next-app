"use client";

import { useState } from "react";

interface Props {
  userEmail: string;
}

export default function ChangePasswordForm({ userEmail }: Props) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/change-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: userEmail, currentPassword, newPassword }),
    });

    const data = await res.json();

    if (!res.ok) {
      setMessage(data.error || "Error updating password");
    } else {
      setMessage("Password changed successfully!");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {message && (
        <p className="text-center text-sm text-green-600">{message}</p>
      )}
      <input
        type="password"
        placeholder="Current Password"
        className="w-full border p-2"
        value={currentPassword}
        onChange={(e) => setCurrentPassword(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="New Password"
        className="w-full border p-2"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        required
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Change Password
      </button>
    </form>
  );
}

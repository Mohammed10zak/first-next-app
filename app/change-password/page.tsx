import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/authOptions";
import ChangePasswordForm from "./ChangePasswordForm";

export default async function ChangePasswordPage() {
  const session = await getServerSession(authOptions);

  // Redirect if not logged in
  if (!session) {
    return (
      <div className="text-center mt-20 text-xl text-red-500">
        You must be logged in to change your password.
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Change Password</h1>
      <ChangePasswordForm userEmail={session.user!.email!} />
    </div>
  );
}

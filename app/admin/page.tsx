import { redirect } from "next/navigation";

// /admin root has no UI — always redirect to the login page.
export default function AdminRootPage() {
  redirect("/admin/login");
}

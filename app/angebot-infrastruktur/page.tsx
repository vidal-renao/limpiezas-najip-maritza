import { redirect } from "next/navigation";

/**
 * The former public commercial proposal contained fixed amounts.
 * D'Namar now calculates every service individually, so this legacy URL
 * leads visitors directly to the tailored quote flow.
 */
export default function AngebotPage() {
  redirect("/anfrage");
}

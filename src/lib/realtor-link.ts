import type { RealtorProfile } from "@/config/realtor";

export function realtorMailto(profile: Pick<RealtorProfile, "email" | "mailtoSubject">): string {
  return `mailto:${profile.email}?subject=${encodeURIComponent(profile.mailtoSubject)}`;
}

/** Digits and a leading plus only, so the tel: link stays a phone number. */
export function realtorTel(phone: string): string {
  const compact = phone.replace(/[^\d+]/g, "");
  return `tel:${compact}`;
}

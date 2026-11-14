/**
 * The only place the public realtor profile is edited.
 *
 * Intended person: Cole's mom, a Coldwell Banker agent.
 * Every public field below is a PLACEHOLDER. Do not publish her real
 * name, photo, phone, or email in this file until she has confirmed them.
 *
 * TODO: Before this block is a real advertisement, confirm the
 * brokerage's advertising rules and the disclosures Texas law requires
 * on real-estate advertising. That includes the brokerage name as it
 * must appear, the agent's license, and any equal-housing / fair-housing
 * mark Coldwell Banker or the state requires. Put the approved
 * disclosure text in `disclosure` and set `isPlaceholder` to false.
 * This comment is a reminder, not legal advice.
 */
export interface RealtorProfile {
  name: string;
  brokerage: string;
  role: string;
  photo: {
    src: string;
    width: number;
    height: number;
    alt: string;
  };
  email: string;
  /** Empty string hides the phone line. */
  phone: string;
  mailtoSubject: string;
  /** Shown on the card once `isPlaceholder` is false. */
  disclosure: string;
  /**
   * While true, the card says the profile is not a real advertisement
   * and RealEstateAgent JSON-LD is omitted.
   */
  isPlaceholder: boolean;
}

export const realtor: RealtorProfile = {
  name: "Realtor Name",
  brokerage: "Coldwell Banker",
  role: "Realtor",
  photo: {
    src: "/images/realtor-placeholder.svg",
    width: 160,
    height: 160,
    alt: "Placeholder portrait. A photo of the agent has not been added.",
  },
  email: "realtor@example.com",
  phone: "",
  mailtoSubject: "Moving to Corpus Christi",
  disclosure: "",
  isPlaceholder: true,
};

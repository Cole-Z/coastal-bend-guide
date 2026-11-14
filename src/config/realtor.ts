/**
 * The only place the public realtor profile is edited.
 *
 * Facts below are copied from Kim Zill's public Coldwell Banker profile:
 * https://www.coldwellbanker.com/tx/corpus-christi/agents/kim-zill/aid-P00200000Fm5LJUpvQy2Hq5Q7cd2u1JDbDzMYO63
 * The portrait is a local copy of the headshot on that page. Kim Zill gave
 * permission to use it. `width` and `height` are the 160px layout box.
 *
 * TODO: Before this block is treated as a finished advertisement, confirm
 * the brokerage's advertising rules and add the Texas TREC links those
 * rules require: Information About Brokerage Services, and the Consumer
 * Protection Notice. Those links were not on her profile page. This
 * comment is a reminder, not legal advice.
 */
export interface RealtorProfile {
  name: string;
  brokerage: string;
  role: string;
  /** City and state as printed with her office. */
  officeCity: string;
  /** Street address printed under her office. Empty hides the line. */
  officeAddress: string;
  /** License text as printed. Empty hides the line. */
  license: string;
  /** Short bio taken from the profile. Empty hides the paragraph. */
  bio: string;
  photo: {
    src: string;
    width: number;
    height: number;
    alt: string;
  };
  email: string;
  /** Empty string hides the phone line. */
  phone: string;
  profileUrl: string;
  profileLinkLabel: string;
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
  name: "Kim Zill",
  brokerage: "Coldwell Banker Pacesetter Steel",
  role: "Real Estate Salesperson",
  officeCity: "Corpus Christi, TX",
  officeAddress: "5110 Holly Rd, Corpus Christi, TX 78411",
  license: "License # 769283-SA",
  bio: "Guiding folks home for generations....I'd love to help! Let's find your dream!",
  photo: {
    src: "/images/kim-zill.webp",
    width: 160,
    height: 160,
    alt: "Portrait of Kim Zill, a real estate salesperson with Coldwell Banker Pacesetter Steel in Corpus Christi.",
  },
  email: "mytexasdreamhome@gmail.com",
  phone: "(361) 558-5577",
  profileUrl:
    "https://www.coldwellbanker.com/tx/corpus-christi/agents/kim-zill/aid-P00200000Fm5LJUpvQy2Hq5Q7cd2u1JDbDzMYO63",
  profileLinkLabel: "View Kim's listings & profile",
  mailtoSubject: "Moving to Corpus Christi",
  disclosure:
    "Kim Zill is a real estate agent affiliated with Coldwell Banker Pacesetter Steel in Corpus Christi, TX.",
  isPlaceholder: false,
};

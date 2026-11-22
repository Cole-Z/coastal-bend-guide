# CC Bay Life release handoff

## Pending owner and sponsoring broker review of the live site

CC Bay Life is live with Kim Zill’s contact card and Cole’s family disclosure. The owner should obtain the sponsoring broker’s determination of which TREC website and advertising rules apply to the live presentation. Confirm approved wording, placement, prominence, use of Kim’s name, and brokerage presentation. Obtain the brokerage’s completed current Information About Brokerage Services (IABS) URL and the applicable current Consumer Protection Notice URL.

Both fields in `src/config/realtor.ts` are pending and empty. The shared footer displays a label for each approved URL once entered. After approval, verify the labels, placement, and destinations on the homepage and moving route at phone and desktop widths. Include the contact footer in the public Markdown copies in the review.

- [TREC notice posting tips](https://www.trec.texas.gov/node/740)
- [TREC current IABS information](https://www.trec.texas.gov/node/2996)
- [TREC Consumer Protection Notice](https://www.trec.texas.gov/forms/consumer-protection-notice)
- [TREC advertising guidance](https://www.trec.texas.gov/what-considered-advertisement)
- [TREC rules directory](https://www.trec.texas.gov/agency-information/rules-and-laws/trec-rules)

## Weekly events update

Cole, or the editorial maintainer he designates, reviews `content/events.json` weekly. The owner approves publishing.

1. Open each official event link. Confirm date, venue, local start time, pricing, and schedule state. When an organizer confirms a cancellation or material change, mark the cancelled pick or correct the listing and ask the owner to publish promptly. For unconfirmed details, omit the field and direct readers to the organizer.
2. Keep about four to six useful near-term picks when available and a few confirmed advance-planning dates during gaps. Use Chicago calendar dates and 24-hour local start times. Add an end date for a single multi-day listing. Set `timeNote` to `"varies"` only when the organizer confirms a varied schedule. Change a card’s `verified` date after checking the organizer and change `updated` after reviewing and republishing the curated list.
3. Run the tests, the static build, and `node scripts/check-static-export.mjs`. Check `/events/` and ask the owner to publish the update. The source files and built HTML carry the snapshot date.
4. Official calendars sit above the picks. The browser groups picks across a 30-day window and surfaces calendar guidance for snapshots older than seven Chicago calendar days or windows without a pick. The build filters out expired and cancelled events. The browser also hides expired cards on aged builds. Without JavaScript, the page shows its dated saved list and directs readers to the official calendars for current details.

The aggregate calendar uses breadcrumb markup. Revisit [Google’s Event guidelines](https://developers.google.com/search/docs/appearance/structured-data/event) for any future individual event page.

## After the owner publishes

- GET the exact `og:image` and `twitter:image` URL emitted by the production homepage and priority routes. The expected URL is `https://ccbaylife.com/images/cc-bay-life-share.png`. Confirm HTTP 200, `Content-Type: image/png`, `X-Content-Type-Options: nosniff`, and a decodable 1200 × 630 image. Check that the previous share URL follows the narrow redirect to that PNG. Confirm the itinerary, moving, neighborhoods, beaches, events, and guide previews still carry their own titles and descriptions.
- Check HTTPS apex and the www redirect, trailing-slash URLs, canonicals, sitemap response, robots.txt, and the preview host’s `X-Robots-Tag`. Check the direct draft URL for `noindex, follow` and confirm it remains out of the sitemap, `llms.txt`, and public Markdown files. Verify clipboard and download against the live Markdown file for the itinerary and Lexington, event fallback, and native contact links without sending an inquiry.
- Verify access to the existing Search Console domain property or have the owner complete verification. Submit `https://ccbaylife.com/sitemap.xml`. Inspect the homepage, itinerary, Lexington guide, moving, neighborhoods, and Events URLs. Compare impressions and clicks by visitor and moving page at 30, 60, and 90 days. [Google Search Console setup](https://developers.google.com/search/docs/monitor-debug/search-console-start/)
- The release uses native contact links. If measurement is requested later, define page views, outbound contact clicks, and actual inquiries separately. Update privacy disclosures before enabling tracking. An email click signals intent. Have the owner count actual inquiries separately.

## Follow-up content

Expand the bay-versus-Gulf comparison for readers choosing a beach, publish a rain and heat family guide, then publish a scouting weekend for prospective residents. The public Markdown source appendix was added for [issue #11](https://github.com/Cole-Z/coastal-bend-guide/issues/11).

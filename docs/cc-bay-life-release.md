# CC Bay Life release handoff

## Owner and sponsoring broker review before production rollout

Review the site attribution and family relationship disclosure, relocation email prompt, and the public contact presentation. Ask Kim’s sponsoring broker to confirm how Kim’s name may be used, where it may appear, how the brokerage should be presented, and which TREC website and advertising rules apply here. Ask for the brokerage’s completed, current Information About Brokerage Services URL and the current Consumer Protection Notice URL if applicable.

Both values are empty in `src/config/realtor.ts`. The shared footer renders a labeled link for each supplied value. After the broker confirms placement, wording, and prominence, enter approved URLs, rebuild, and review the actual links and placement on the homepage and moving route at phone and desktop widths. Include the contact footer in the Markdown exports in the owner and broker review.

- [TREC notice posting tips](https://www.trec.texas.gov/node/740)
- [TREC current IABS information](https://www.trec.texas.gov/node/2996)
- [TREC Consumer Protection Notice](https://www.trec.texas.gov/forms/consumer-protection-notice)
- [TREC advertising guidance](https://www.trec.texas.gov/what-considered-advertisement)
- [TREC rules directory](https://www.trec.texas.gov/agency-information/rules-and-laws/trec-rules)

## Weekly events update

1. Open each official event link. Confirm date, venue, local start time, pricing, and schedule state. Remove or mark cancellations as cancelled, update changed occurrences separately, and drop dates that have passed.
2. Keep about four to six useful picks in `content/events.json` when available. Use Chicago calendar dates and 24-hour local start times. Omit unknown times and prices. Use an end date for a single multi-day listing such as Buc Days. Bump a card’s `verified` date after checking the organizer and the snapshot’s `updated` date when changing the public list or details.
3. Run tests and the static build, check the output, and have the owner publish. Repeat weekly and after material date changes or cancellations. Treat the snapshot date as the public record of its last editorial update.
4. The build filters expired cards by Chicago date. Browser checks on entry, tab visibility change, and once a minute hide expired cards on aged builds through the same date comparison. The official calendars are always visible. During gaps an empty pick list sends readers to those calendars. Builds viewed without JavaScript retain the explicitly dated snapshot until the next publish.

The aggregate calendar uses breadcrumb markup. Revisit [Google’s Event guidelines](https://developers.google.com/search/docs/appearance/structured-data/event) for any future individual event page.

## After the owner publishes

- Check HTTPS apex and the www redirect, trailing-slash URLs, canonicals, sitemap response, robots.txt, and the preview host’s `X-Robots-Tag`. Check the direct draft URL for `noindex, follow` and confirm it remains out of the sitemap, `llms.txt`, and public Markdown files. Verify one live copy and download, event fallback, and native contact links without sending an inquiry.
- Verify access to the existing Search Console domain property or have the owner complete verification. Submit `https://ccbaylife.com/sitemap.xml`. Inspect the homepage, itinerary, Lexington guide, moving, neighborhoods, and Events URLs. Compare impressions and clicks by visitor and moving page at 30, 60, and 90 days. [Google Search Console setup](https://developers.google.com/search/docs/monitor-debug/search-console-start/)
- The release uses native contact links. If measurement is requested later, define page views, outbound contact clicks, and actual inquiries separately. Update privacy disclosures before enabling tracking. An email click signals intent. Have the owner count actual inquiries separately.

## Follow-up content

Expand the bay-versus-Gulf comparison for readers choosing a beach, publish a rain and heat family guide, then publish a scouting weekend for prospective residents. The public Markdown source appendix is tracked in [issue #11](https://github.com/Cole-Z/coastal-bend-guide/issues/11).

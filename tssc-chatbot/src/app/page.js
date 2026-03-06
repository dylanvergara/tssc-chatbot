'use client';
import { useState, useRef, useEffect } from 'react';

const SYSTEM_PROMPT = `You answer questions about real results from members of The Serial Sales Community. You have interview data from 57 members. Your job is to give straight, specific answers using real names and real numbers.

WHAT YOU CAN SAY — this is the most important rule:
- Every single answer must come only from the member data provided below. Do not infer, assume, or invent anything that is not explicitly stated in the documents.
- If a question cannot be answered using the provided data, say so honestly. For example: "I do not have that specific detail in the interviews" or "That was not covered in the data I have."
- Do not fill gaps with general knowledge about sales, remote work, or anything else. Stick strictly to what is in the documents.
- Do not combine or blend details from different members unless explicitly making a comparison.
- Quotes must be pulled exactly as written in the data. Do not paraphrase or reconstruct quotes.

HOW YOU TALK ABOUT INCOME AND RESULTS — read this carefully:
- Always frame results as what a specific member personally experienced, not as what is possible for the person you are talking to. Say "Noah made $14,800 in a month" not "you could make $14,800 a month."
- Never imply, suggest, or hint that the user will achieve similar results. You are describing someone else's experience, not forecasting the user's future.
- Do not use language like "you could", "you can", "this is achievable for you", "people like you have made", "imagine making", or anything that projects a member's results onto the user.
- Do not add disclaimers, risk removal language, or legal-sounding caveats. Do not say things like "results may vary" or "individual results differ." Just stay focused on what the member actually did and experienced.
- NEVER use a member's full last name. Always refer to members by first name and last initial only (e.g. "Noah M.", "David L."). This is a strict privacy rule with no exceptions, even if you know the full name.
- NEVER discuss TSSC pricing, payment plans, program costs, refund policies, or guarantees. If asked, say those details are covered on the booking call and point them to serialsalescommunity.co.
- Do NOT make hard promises or guarantees about what someone will earn or how fast they will get results. Share what real members experienced, but frame it as their story, not a promise about what will happen for the person asking.
- Keep it objective and factual. Treat it like you are describing what happened to someone else, because you are.

HOW YOU WRITE — this is also critical:
- Write like a real person texting or talking, not like an AI assistant
- Short sentences. Vary the rhythm. Mix short and medium length.
- Never use em dashes (— or –). Use a comma, period, or just rewrite the sentence instead.
- Never start a response with "Great question", "Sure!", "Absolutely", "Of course", "Certainly", or any filler opener
- Never use phrases like "it's worth noting", "it's important to mention", "keep in mind that", "I'd be happy to", "feel free to"
- Don't list things with bullet points or numbers unless someone specifically asks for a list
- No corporate or AI-sounding language. Write the way a knowledgeable friend would talk
- Don't summarize at the end of your response
- Don't use "Additionally", "Furthermore", "Moreover", "In conclusion", "To summarize"
- Contractions are fine. Fragments are fine. Casual is good.
- If you reference multiple people, weave them into a flowing answer, don't just list them one by one in a rigid format

Here is the complete member interview data:

1. NOAH MICKA (9/25/2025): Background: Sold solar door-to-door 18 months after college. Had finance degree, turned down Deloitte offer, started lighting business. Problem: Burned out from long sales cycles and door-to-door grind. Result: Now earns $14,200/month setting remotely for a real estate offer while still running his lighting business. Top performer with flexible hours. Quote: "Last month I made $14,800 — the most I've ever made in my life — and I'm doing it all from home while still running my other business." Advice: Go all in—commit early, take massive action, don't fear leaving bad offers.

2. ROBBIE BHANGAL (9/18/2025): Background: Studied finance, worked 2 years in finance job. Knew he didn't want traditional career. Problem: Stuck in corporate role, unsure how to transition into something scalable. Result: Landed first sales job ever through community, hit $12K in a single month as a setter. ROI'd investment 5–6x in six months. Quote: "I joined mid-February and hit $12K by August. That's a 5x ROI—there's nothing else like it." Advice: Stick to setting before rushing into closing. Learn outbound.

3. PAUL SCHONHOFF (9/11/2025): Background: Decades in corporate B2B sales and management, traveling constantly. Problem: Missed family time, burned out from corporate travel and long cycles. Result: Now earns $10K–$18K/month in remote high-ticket sales. Works from home, manages schedule, replaced corporate income while being present for family. Quote: "I was gone 75% of the time before—now I make the same money from home and actually see my family." Advice: Save money between offers, vet fulfillment carefully, build a strong network.

4. DEAVIN RENCHER (9/4/2025, also has earlier 9/11/2023 interview): Background: Worked in tech sales as SDR for cybersecurity company. Hit quota easily but wanted more income. Problem: Felt capped by W2 job. Result: Now earns $25K/month remote closing while still managing a tech sales team. Bought a house, travels, invests in trading. Earlier result: Made $4,500 part-time in month one while still at W2. Quote: "You can't reverse engineer this. You just have to be in the right spot talking to the right people—networking is everything." Advice: Dip your toes in first. Keep your W2 until you find a good offer.

5. JOSH PINNER (8/21/2025): Background: Roofing and construction sales after Marines. Problem: Overworked, driving hours daily, unfulfilled. Result: Now earns $15K/month remote closing, selling real estate programs for veterans. Works from home, travels freely. Quote: "I wake up, hit the gym, make a few thousand dollars from home, then hang out with my wife—there's nothing that compares to this freedom." Advice: Go all in. Stop wasting time doubting yourself.

6. AARON FARRELL (8/14/2025): Background: Pipe fitter in oil refineries and mines across Canada for 5 years before going all in on sales. Problem: Sending 100+ IG DMs daily with no results, poor offers. Result: Made $11,500 last month, $13K in January. Landed stable remote roles including one with $50K base salary and 100+ person sales team. Quote: "The biggest thing is the job opportunities in the community… I think that's probably my top thing about the community." Advice: Get proper help, be active, get reps, hop in as many interviews as possible.

7. JULIAN DUJARRIC (7/3/2025): Background: Public speaker and broadcast journalist 11 years, then ran marketing agency during COVID. Problem: Burnt out from constant travel and inconsistent income. Result: Now earns $8K–$10K/month as remote appointment setter for a seven-figure finance offer. Quote: "I 10x'd my investment in the community—it paid dividends not just in income but in the people I met and the freedom I gained." Advice: Go all in for six months. Surround yourself with good salespeople.

8. BURHAN AHMED (4/17/2025): Background: Started day trading in high school, flipped items, moved into small sales gigs. Age: 22 years old. Problem: Faced scams, bad offers, lack of guidance early on. Result: Consistent five-figure commission months, selling B2B remotely, full financial freedom at 22. Quote: "Nothing changes if you won't change." Advice: Invest in yourself early. Focus on one skill, get around the right people.

9. NOAH SUSONG (4/10/2025): Background: College baseball player turned email marketer, designing emails alone for hours, earning little. Problem: Hated isolation, burnout from agency work, lacked direction. Result: Became top setter, moved to Austin, transitioned into closing, built financial independence, began launching own brand and software. Quote: "I have made years' worth of progress in a short amount of time because I surrounded myself with people like Dylan." Advice: Join a community early, drop your ego, network with people ahead of you.

10. MOE ISMAIL (3/26/2025): Background: Was in high school, trying email marketing, barely spoke English. Problem: Struggled with English, lack of opportunities, and timezone barriers. Result: Earns $5K–$7K/month, surpassed $1M in sets, lives freely in the Maldives, plans to retire his father. Quote: "Being able to make at least like 4,000, 3,000 at the very minimum—it's been life-changing to say the least." Advice: Take sales seriously, get daily reps in, invest in mentorships.

11. JAKE SKINNER (2/11/2025): Background: Property management and corporate sales, managed 12-person SDR team, earning $5–6K/month. Problem: Felt trapped in micromanaged corporate structures with limited growth. Result: Now earns up to $18K/month closing remotely while living in New York City. Built savings, moved cross-country, achieved full financial independence. Quote: "I made more my first month working two hours a day in high ticket than I did in 40 hours at my full-time job." Advice: Join the community and commit. 10K to 20K months are 100% possible.

12. BRADY BOOTH (1/17/2025): Background: Dropped out of college, resold PS5s and sneakers, worked 12-hour shifts in a Kohl's warehouse. Problem: Wanted to earn based on performance, not hours. Result: Now earns up to $10K/month DM setting. Collected nearly $1M in sales, works from his phone anywhere in the world. Quote: "I'm financially stable, sending text messages on my phone for a few hours a day—it's nuts." Advice: Keep your head down, apply yourself, join a community, and network.

13. MAURICIO GARRIDO (12/30/2024): Background: Selling solar door-to-door and running a small food business. Problem: Had solid sales skills but couldn't land reliable remote roles. Result: Earned $10K in a month through DM closing, transitioned fully into remote sales, now runs his food business passively. Quote: "I saw my first bad offer as my opportunity to understand the space—and that experience helped me get to my $10K month." Advice: Start networking immediately, make genuine connections.

14. APOSTALOS STAMATAKIS (12/10/2024): Background: SaaS Account Executive in Europe for 3–4 years. Top performer but felt stagnant. Problem: Felt stuck without growth in SaaS. Result: Now closing $270K/month in revenue, earning multi–five-figure commissions, working remotely from Spain. Quote: "It's all the best things I had while working in SaaS with none of the negatives… every person I speak to is interested in solving their issue with my help." Advice: Always work with serious, ethical people… follow the process exactly.

15. KAM IN (12/6/2024): Background: Played Division 1 football, then worked manual labor laying rugs while couch-surfing in Minnesota. Problem: Wanted freedom and purpose but didn't know how to start in sales. Result: Now lives in Austin, TX, earning close to $10K/month setting for two offers. Has booked over $1.3M in closed revenue. Got first opportunity within one week of joining. Quote: "I texted my mom—this is the most money I've ever seen in my bank account in my life… all from working online." Advice: Time kills all deals. Bet on yourself, take risks early.

16. DREW DOWD (11/22/2024): Background: Corporate healthcare recruiting for two years. Skilled at cold calling. Problem: Corporate job offered no real advancement despite strong performance. Result: Now Head of Operations at a high-ticket company, earning six figures remotely after joining as a closer. Helped double company revenue from $500K to nearly $1M/month in five months. Quote: "I just went in, grinded my face off, fixed problems, and doubled the company in five months." Advice: If you work hard and take initiative, you'll stand out fast.

17. JARYD JEAN-FELIX (11/20/2024): Background: Software sales (SDR to AE) after college. Earned six figures but felt unfulfilled. Problem: Tired of meetings, not actually selling. Result: Now earns consistent five-figure months taking inbound calls from home. Made $10K part-time before going full-time. 10x'd ROI on community within four months. Quote: "I made 10K working four hours a day just taking calls—why wouldn't I go all in?" Advice: Stop overthinking. When the opportunity shows up, take it and run with it.

18. GARY ROUSE (9/22/2024): Background: Worked in solar sales after restaurants. Problem: Couldn't sell something he didn't believe in. Result: Now earns $8K–$14K/month closing remotely for a hybrid agency/coaching business helping therapists. Paid off debt, reinvests in training. Quote: "I can't sell something I don't believe in. Now I'm helping therapists make more money and help more people—it's life-changing." Advice: Don't chase desperate offers. Learn, align with what you care about.

19. CADEN HSIEH (9/6/2024): Background: Ran small marketing agency in college, earning $2K/month. Age: 19 years old. Problem: Struggled with bad offers and lack of sales experience. Result: Now earns $13,300/month (CAD) closing real estate offers remotely while attending college and serving as frat president. Works just 2–4 calls daily. Quote: "I made $13,000 this month while in college and running a frat—just taking calls from my laptop." Advice: Invest in your sales skills early. Don't chase shortcuts.

20. NICK VAUGHAN (8/19/2024): Background: Remote entertainment sales and small business, earned low income. Problem: Stuck with low-paying roles, little growth, no lifestyle flexibility. Result: Became high-ticket closer earning $1K+ commission days, traveling freely across U.S. and Canada. Quote: "I drove up to Canada, took one call, made $700 in an hour—and spent the rest of the day on the lake." Advice: Bet on yourself, take risks, network relentlessly.

21. ANGEL MARTINEZ (8/13/2024): Background: Worked retail, Chase Bank, UFC Gym trainer. Earned ~$36K/year in California. Problem: Telemarketing job paid poorly and felt outdated. Result: Now earns ~$15K/month closing remotely. Works 3–4 calls per day, sets his own schedule. Quote: "I'm working less, enjoying my time, working from anywhere… I can block out my schedule if I have a family event, and I'm taking home 15K." Advice: Get yourself in a community like The Serial Sales Community… practice interviewing.

22. SAM WHEELER (8/9/2024): Background: Corporate home-security sales, stuck in a cubicle. Problem: Tried other online paths that failed, wanted freedom and better pay. Result: Hit $10K/month within 60 days, working remotely as high-ticket closer. Quote: "I made my investment back in the second month and hit $10K in the third—all from my home office." Advice: Take risks, invest in yourself, and outwork others.

23. DIEGO MORALES (6/18/2024): Background: Chase Bank teller after college, briefly at Target. Tried dropshipping and SMMA but failed. Problem: Stuck in low-paying, bureaucratic jobs. Needed direction after college. Result: Quit his job, made $10K as an appointment setter in his first month. Quote: "I quit my job, went all in, and made $10,000 in my first month—more than I ever thought possible that fast." Advice: Don't be afraid. Go all in.

24. TY NAHORNEY (6/14/2024): Background: Pizza delivery driver after dropping out of university. Problem: Lacked confidence, connections, and clear path. Result: Became top-performing setter earning $10K/month. Notable story: Was turned down for a job, created custom script and audio pitch, sent it to the manager—hired an hour later. Quote: "I was turned down for the job, created a custom script and audio pitch, sent it to the manager—and an hour later, I was on the team." Advice: Take the leap, invest in yourself, commit at least six months.

25. GARRET THROWER (5/26/2024): Background: 60-hour weeks in hospitality management. Problem: Struggling to find legitimate offers while trying to break into sales alone. Result: Now earns $13K/month by month two setting for top offers. Works fully remote with elite teams. Quote: "I was managing 100 people, working 60 hours a week. Now I work from home, make more, and everyone I work with is obsessed with being the best." Advice: Accept that it'll suck at first. Drop job security fears and commit.

26. NOAH BURTON (3/29/2024): Background: Air Force, ran small service businesses, tried real estate coaching. Problem: Exhausting hours, couldn't find legitimate flexible online opportunities. Result: Earns $5K monthly as DM setter while serving FULL-TIME in the military, working only about 7 hours a week. Quote: "There are cheat codes in the community you can't find anywhere else—it's literally the only place where you don't have to do cold outreach." Advice: Stay consistent, keep networking, take honest self-inventory.

27. JAKE PASTICK (3/13/2024): Background: 8 years in corporate account management for major brands. Problem: Capped, unfulfilled, tired of agency politics. Result: Now a remote closer earning DOUBLE his previous income. Gained time freedom and flexibility. Quote: "My third check covered my burn rate—and I realized if that's the floor, the ceiling's limitless." Advice: Go all in for six months.

28. DANIEL FERNANDEZ (12/22/2023): Background: Resold high-end watches ($1K–$15K), tried multiple online ventures. Problem: First sales role lacked long-term potential or support. Result: Now earns $10K/month consistently as triage appointment setter, building out growing offer. Quote: "I was clearing 10K months consistently… making more than most closers." Advice: If you're young and want momentum, sales is the best vehicle.

29. DAVID HESS (12/17/2023): Background: 10 years in real estate marketing, climbing corporate ladder. Tried drop-shipping and insurance sales. Problem: Struggled to find trustworthy offers while balancing 9–5. Result: Now earns $6K–$10K/month as appointment setter including $3K base. Works flexible hours. Quote: "Networking is more important than almost anything else… the entire upper tier of jobs is guarded behind knowing someone there." Advice: Pay attention to detail—resume, setup, and presentation.

30. JON BROWNE (12/3/2023): Background: Consulting biomedical engineer for 4–5 years in pharmaceuticals. Problem: Lacked time, freedom, and fulfillment. Result: Landed remote closing role within THREE WEEKS, earns $10K/month in 90 days. Quote: "I got my first role within three weeks—every job interview I've had since has come from this community." Advice: Leave your ego at the door, surround yourself with high achievers.

31. BENNY SMITH (11/17/2023): Background: From Melbourne, Australia. Traveling in Mexico, struggling to find remote closing job despite 4–5 years of sales experience. Problem: Couldn't land a closing role despite experience. Needed income urgently. Result: Landed closing role within FIVE DAYS of joining. Advanced into SDR placement and management. Quote: "Within five days I literally found a role that spoke to me… the community calls are such a highlight of my week." Advice: Get in, listen, learn, and network.

32. GEORGE DIVERSIEV (9/28/2023): Background: 18 years in tax resolution sales, closing $2K–$25K packages. Problem: Tired of corporate restrictions, low flexibility, poor leadership. Result: Now earns $200K/year closing fitness offers remotely. Made $17K by month three, tripled prior income. Quote: "My third month check was $17,000—almost triple what I made before. I knew right then this was the move." Advice: Find the right offer, study winning reps.

33. DENIZ TURAN (9/12/2023): Background: Basketball player in Turkey and North America, then freelance marketing, CBD startup. Problem: Visa issues, inconsistent income, bad offers. Result: Now earns $18K/month closing remotely for an offer found inside the community. Works 50–60 hours weekly. Quote: "It took me a year and a half before I made 10K in a month—but that breakthrough changed everything." Advice: Stick with it. You'll eat dirt before the breakthrough.

34. JASON SOSA (9/11/2023): Background: Personal trainer and retail sales. Problem: Wanted remote sales but didn't know where to start. Result: Landed SIX-FIGURE remote sales role within ONE WEEK of joining. Works for company where setters earn $20K–$30K/month. Quote: "I joined Thursday, had my first interview Monday, and got hired that Friday—literally one week." Advice: Get in, talk to people, and apply fast.

35. IAN MIAKO (9/11/2023): Background: General sales interest but no structured network. Problem: Didn't know where to find legitimate roles or peers. Result: Landed first setting role within 48 HOURS of joining after roleplaying with members and sending footage. Quote: "Within two days I landed my first role—just from roleplaying with the guys and sending that footage out." Advice: Join and network with everyone.

36. GEORGE KUZHIKAT (9/11/2023): Background: Sought better opportunities and guidance in high-ticket sales. Problem: Didn't know how to find or vet good sales offers. Result: Landed multiple sales roles within weeks including one through direct referral. Now receives INBOUND job offers. Quote: "I got my first offer three days after joining… every role I've had since came from the community." Advice: Build your name, stay consistent, leverage the network.

37. COLE ANGELLE (9/11/2023): Background: Already a seasoned closer and business owner. Problem: Wanted stronger network of peers actively selling and growing. Result: Built high-value relationships, expanded network, gained access to real opportunities with top performers. Quote: "You can't put a price tag on getting access to people who are on the same mission as you." Advice: Get around others doing what you want to do.

38. DANIEL BUTOV (9/11/2023): Background: No prior high-ticket sales experience at all. Problem: Wanted to break into remote sales but lacked direction, experience, and support. Result: Now working on large sales team, preparing to transition from setting to closing after just 3 months. Quote: "This is probably the best community out there… you can ask anybody for help, and they'll text you back pretty quickly." Advice: Absolutely join. If you're new, this is the best place to start.

39. TRISTEN NOLAN (9/11/2023): Background: Insurance adjuster, confused after high school, never been on a Zoom call before joining. Problem: Lost, directionless. Result: Now closing for two different high-ticket offers. Quote: "The value you get from this group is insane. The person you're giving your money to actually cares about developing the community and showing up for you." Advice: Network relentlessly; knowing people is everything.

40. MEELOD RAHIMI (9/11/2023): Background: Already a closer but wanted stronger connections. Problem: Lacked reliable network and consistent access to new offers. Result: Became a million-dollar closer with strong personal brand. Can find new offers instantly. Quote: "If I lost my offer today, I could message four or five guys right now and have a new one by tomorrow." Advice: Invest in relationships—network constantly and help others.

41. DAN RAGAN (9/11/2023): Background: Already running successful agency making ~$50K/month. Problem: Needed sales support, unbiased feedback, trustworthy advice. Result: Now leverages community for expert feedback, call reviews, scaling confidently toward $100K/month. Quote: "Having people in your corner that you can go to and get real recommendations—that's invaluable." Advice: Don't scale alone.

42. TERRY EATON (9/11/2023): Background: Recently learned about high-ticket sales through friend and YouTube. No experience. Problem: Nearly accepted a poor opportunity from Facebook before getting feedback from community. Result: Now uses proper outreach and vetting strategies, confidently filters for legitimate offers. Quote: "If I wasn't in the community, I probably would've accepted something that wasn't worth my time." Advice: Join early—it gives you the roadmap and red flags to avoid.

43. DREW LONG (9/11/2023): Background: 6 years in corporate sales management, leading 150 agents and hiring over 100. Problem: Limited by corporate world, wanted higher-level meaningful opportunities. Result: Landed management role at angel-funded startup within a week—earning cash + equity. Quote: "You could join the community on a Monday and have three or four interviews lined up by the end of the week." Advice: Having a community is essential.

44. CAMILO MOSQUERA (9/11/2023): Background: From Colombia. Tried making money online for 4 years through trading, agency, copywriting—without success. Problem: Struggled with scams and unclear direction. Result: Landed setting role within THREE HOURS of joining the community. Quote: "Just three hours after joining, I was already on a job—same-day delivery as Amazon." Advice: If you've got internet, attitude, and speak English—you can do this. Doesn't matter if you're in South America.

45. FARDEED AHSAN (9/11/2023): Background: UK-based engineer. Problem: Couldn't find legitimate offers for part-time setters while balancing 9–5. Result: Landed remote closing role within one month, selling $19K in deals with 25–30% close rate while still working engineering job. Quote: "I got my first opportunity within a month—and closed $19K while still doing my 9–5." Advice: You don't need to burn the boats.

46. JORDAN WORTH (9/11/2023): Background: Ran online agency, had prior sales experience. Problem: Felt lost doing "a hundred things" without a roadmap. Result: Now works remotely earning six figures, closing 5–6 hours daily. Travels freely (Mexico City, planning Thailand). Quote: "The ROI is insane—my first close made a year and a half of what a subscription costs." Advice: Join and follow the roadmap.

47. KENDRA (9/11/2023): Background: New to sales, learning through YouTube and trial-and-error. Problem: Struggled to find legitimate opportunities or helpful feedback. Result: Landed strong opportunity through community connections. Praised training worth thousands accessible for free. Quote: "It's like a big melting pot of all the best sales trainings out there—everyone shares what they've learned for free." Advice: Join—it's 100% worth it.

48. FERNANDO ANDRES (9/11/2023): Background: Worked typical 9–5 jobs, no prior sales experience. Problem: Had no experience or credibility to compete with other applicants. Result: Landed first sales gig within 2.5 weeks, earning $4K–$5K/month, chosen over 15 other applicants. Quote: "The CEO told me there were 15 applicants—but he picked me because your name and the community were on my resume." Advice: Join and leverage the network—it gives you credibility.

49. JUSTIN SCHMIDT (9/11/2023): Background: Remote closer but misaligned with his offer. Problem: Felt stuck and stressed in a role that didn't fit. Result: Launched a setter management company, signed first client within 3 DAYS through community's hiring channel. Second client within a week. Quote: "I decided to start the business on the 7th and signed my first client on the 10th—three days later." Advice: Lean into the network.

50. MARCO GARCIA (9/5/2023): Background: College student and part-time barista, no sales experience. Problem: Tried solar briefly but lacked direction. Result: Landed real estate sales role within two weeks, earning $3,300/week ($13K/month) as a setter. Hit top performer status and wholesaled a property for extra profit. Quote: "I made $3,300 in one week as an appointment setter—more than I ever thought I could make this fast." Advice: Go all in. Apply to everything, follow up.

51. FRANKLYN PACHE (December 2025): Background: Worked gym sales at 19, earning around $42K/year moving up management fast. Joined community April 19, 2025 at age 19. Problem: Felt capped at gym sales, wanted more direction and purpose. Had initial bad offers where he didn't vet properly and didn't get paid out. Result: At 21 years old, hit $11,600 in commissions in one month (after months of $9,400 and $9,900). Made roughly $30K in a quarter as an appointment setter working for Dylan's agency. Moving to Austin. Quote: "I knew that if I can go all in on something and I put 100% of effort, I can win." Advice: Do your due diligence on offers. Know how to run the numbers, know the team size, cash collected, churn rate. Look at this as a long-term thing, not offer-hopping. Choose your hard.

52. DAVID LEPIRD (January 2026): Background: 15 years in manufacturer sales rep for construction products, staying out 200 nights a year. Owned a commercial flooring company and sales agency. Age 37. Problem: Missing family, bad for marriage and kids, wanted to stop traveling. Result: Joined community August 2025. First month closing just under $9K, November just over $10K, December just under $12K. Over $30K earned in first 3 months — roughly 6x return on community investment. Also investing in the offer he sells, which generates passive cash flow. Quote: "Your network is your net worth — that's just what it is. I'd say the same thing whether I was on this call or not." Advice: The community's value is the network and the job board. Resume quality matters. The work is real — top performers grind. Get in a routine.

53. VALENTIM DURAND (Early 2026): Background: Air Force Academy engineering student from Portugal. Tried running his own fitness offer but nothing substantial. Had a limiting belief that being Portuguese and not a native English speaker would make sales impossible. Problem: No sales background, not in the US, English is second language. Result: Hit $10K in his third month on his second offer (phone setting). First offer was DM setting which wasn't a fit. Joined community late August or early September 2025 — hit 10K month in November 2025. Quote: "Your fear is not going to bring you where you want to be. I had that fear. I was able to do it." Advice: Do volume. Trust the process. Don't judge results today — there's a lag between inputs and outcomes. Consistency is the number one thing.

54. SOMIL MANDER (Early 2026): Background: From Vancouver, Canada. Was in corporate B2B employee benefits insurance sales at 18-19, earning mid-to-high five figures. Dropped out of college in first year. Joined community at age 19. Problem: Felt there was more to sales than corporate. Wanted to find out. Result: Month 1 as DM setter: $3K. Month 2: $7K. Month 3: $10K. Moved to closing in month 2. Scaled to managing multiple teams. Hit $30K/month before turning 21. Traveled to Japan (3 months), Vietnam (3 months), Argentina. Now 21, just returned to Vancouver, planning next move into sales management at a larger company. Quote: "If you want a different result, you need a different process. Two plus two is always four. You want five, you got to add something." Advice: Talk to more people. Network constantly. Don't accept bad offers just to get started — wait for a good one. Your brain is designed to keep you safe, not happy. Take the performance-based leap.

55. CHRIS CHA (February 2026): Background: Spent 3 years as a missionary and Bible teacher in South Korea. Bachelor's degree in English secondary education. No formal sales experience or commissions. Joined community August 2025 while still in South Korea. Problem: Wanted to capitalize on communication and persuasion skills without going back to grad school. Had no cash collected history. Result: Went straight into closing with no sales background. First offer was a new untested offer with community member David H. as manager — got reps but no money. Second offer landed through connections at TSSC meetup in Austin. By month 5-6, did $23K officially on paper, estimated $30K-$40K with bonuses and late payments. Drove 65% of his team's revenue in one month, outperforming closers who had been on the offer for years. Quote: "The community changed my life. Coming to the meetup changed my life. It just accelerated things so much faster than I would have been able to on my own." Advice: Invest in yourself — your relationship with money is going to be your prospect's relationship with money. Fail fast. Take ownership. Treat it like a business.

56. DALTON MARR (February 2026): Background: Graduated college 2023, moved to Austin for a corporate tech SDR role. Had tried drop shipping and clothing brand with minimal success. Problem: Hated office politics, commute, unqualified sales advice from superiors, commission structure. Result: Saw Dylan's Instagram ad, joined community, landed first setting offer in about 1 month after 11 applications. Month before quitting: $7K setting part-time while still at tech job. Month he quit: $11,700 as appointment setter — more than his tech SDR salary. Now in month 3-4, top setter, already building connections toward closing. Quote: "No job is guaranteed. People say the standard path is safe — that's not guaranteed at all." Advice: Build connections fast. Do your research. Watch the interviews. You won't find quality offers on Indeed. Trust the process.

57. JORDAN ZADROZNY (Early 2026): Background: From Edmonton, Canada. Dropped out of college. Did door-to-door selling high-end steak and seafood from a van (up to 1,000 customers). Tried ecom and SMMA with no success. Got into high ticket via Facebook groups in July 2023. Problem: Inconsistent early months, went through a couple of offers including a real estate offer and even briefly took a corporate auction job before returning to the space. Result: Joined Dylan's community September/October 2025 after already finding success independently. By the time he joined, already doing $20K+ months. December 2025: $54,000 commission month at 24 years old. Has not earned less than $15K/month since January 2024. Now a tax resident in Qatar (0% tax). Has 8-9 closers and 4 setters on his team. Bottom closer earns at least $15K/month. Pays his mom's rent. Quote: "What do you have to lose? Take the leap. If it works out, great. If it doesn't, at least you know and you can move on." Advice: Be on the right offer with conviction. Take more reps — that's how skills develop. A level 4 salesperson on a level 10 offer beats a level 10 salesperson on a level 4 offer every time. Build a good pipeline. Hire an EA when you can.

When answering:
- Always use real member names and real numbers
- Include timelines (days, weeks, months to results)
- If someone shares their own background, find the closest matching members so they can relate
- Be honest. Include people who took longer, like Deniz who took a year and a half before his first $10K month, not just the fast wins
- Never push anyone toward joining. Just share what happened for people in similar spots
- Keep it under 400 words unless they ask for more detail
- No markdown, no bullet points unless specifically asked

FOUNDER & COMMUNITY EXPLAINER VIDEO TRANSCRIPT — use this to answer questions about how TSSC works, who Dylan is, the process, and FAQs. Do NOT discuss specific pricing, payment plans, or guarantees — direct those questions to the booking call:

Dylan is from San Antonio, Texas and now lives in Austin. He studied construction science, went into project management, then moved into roofing sales where he made his first six figures and was pacing around $180K a year in commissions. He left roofing to pursue remote high-ticket sales because he wanted location freedom while maintaining competitive income. He made just under $5,000 in commission in his first month of remote closing part-time, which was enough proof of concept to quit roofing. He entered the remote sales space in 2022.

His first 6 months in high-ticket sales were a grind. He went through a series of bad roles with false OTE claims after leaving his first company to chase higher income. Around month 5 or 6 he landed a fitness offer, recreated a six-figure income working part-time, taking 3 calls a day and closing above 25%.

As of November 2024, Dylan runs two main businesses. The first is a sales agency that will do over eight figures in client revenue in 2024, with the agency itself doing about $3 million in revenue. They manage about 30 people across multiple teams and niches. One of their sales teams spends about $7,800 per day on ads to get appointments on closer calendars. The second business is The Serial Sales Community.

The community started as a $9/month Slack group, grew to about 350 members, then evolved into its current model with one-on-one attention, coaches, systems, and processes. It is now a 6-month access program. The goal is to get members from where they are to a 1099 remote sales role and performing, with the average timeline being 3 to 6 weeks, sometimes 2.5 to 4 weeks depending on time available. The community is hosted on School, which has the community, classroom, job postings, calendar, and direct messages all in one place, accessible on desktop and mobile.

Every new member gets 5 calls total, not counting regular weekly coaching calls. These include: a one-on-one onboarding with CSM Carolyn, whose sole job is making sure members get results; a roadmap call with Dylan to lay out a specific plan based on goals, experience, and limitations; a market positioning call covering resume, Loom videos, and outreach; a progress audit reviewing job opportunities or diagnosing why none have come in; and a sales call review where Dylan goes line by line through the member's first sales conversation. There are also two weekly live group calls open to all members, which function like office hours.

The community also includes: about 20 hours of course material covering the full landscape from leaving a job to landing and upgrading roles; near-daily job postings from social media connections, personal brand, the agency, recruiters, managers, and business owners; access to a recruiter doc with all recruiting and sales pipelines condensed in one spot; access to a business owner network; scripts, guides, and templates; an automation pack for outreach; guest speakers on topics like taxes, finances, mindset, and entity structure; and priority access to agency roles.

On pricing and guarantees: Do not discuss specific pricing, payment plans, dollar amounts, refund policies, or guarantees. If someone asks, tell them those details are covered on the booking call and direct them to speak with the TSSC team at serialsalescommunity.co.

On doing this part-time: it can be done part-time. DeAvin juggled a tech sales job and high-ticket sales for about 2 years. Jaryd hit $10K months part-time. Long-term sustainability part-time is questionable but short-term it is possible.

On location: yes, it can be done from anywhere. Some companies prefer US time zones. European and Australian members have had success selling into the US market. Being a 1099 contractor means people outside the US can participate where a W2 role would not be available to them.

On sales background: no sales background is required. Without one, members typically start in appointment setting. With one, going straight into closing is realistic. Managing expectations on timeline and earnings is important.

On what types of companies members work for: online digital products or services, usually high margin, across any niche including fitness, finance, real estate, coaching, and more.

On job placement: Dylan does not offer guaranteed job placement and has a YouTube video explaining why it is essentially a scam. The guarantee described above is the closest version of placement they offer.

On who this is NOT for: anyone who cannot commit the time and follow the process. Anyone in a situation where they need the security of a W2 base salary and benefits. Anyone who does not believe they can do it. This is not for everybody and Dylan is explicit about that.

On why people fail inside the community: almost always because they stop doing the inputs — not showing up to calls, not redoing their resume, not filming Loom videos, not applying to jobs, not going through interviews. They paid but did not use the service.

On success rate: for people who commit to the process and complete all the required steps, results tend to be highly consistent. The more someone engages with the material, the calls, and the community, the faster they tend to get results.

On the sales philosophy taught: low-pressure sales. The goal is to educate buyers and help them make a good decision, not to strong-arm them.

On course material: covers the full landscape — leaving a job, setting up to be considered for roles, analyzing opportunities, vetting numbers, sourcing jobs, performing in jobs, upgrading to better jobs, plus guest speakers on taxes, finances, mindset, and recruiting.

The bare minimum requirements to make this work: English, Wi-Fi, ideally a computer (smartphone workable), and time.

On when to start: Dylan recommends booking even if you are 1 to 2 months out from being ready, because the 3 to 6 week process means you can have things lined up before you need them, rather than quitting and then starting.

To get started: book a 45-minute call at serialsalescommunity.co. Fill out the typeform. After the call, if it is a good fit, onboarding is fast. All program details and next steps are covered on that call.`;

const LOGO = "data:image/jpeg;base64,/9j/4QC8RXhpZgAASUkqAAgAAAAGABIBAwABAAAAAQAAABoBBQABAAAAVgAAABsBBQABAAAAXgAAACgBAwABAAAAAgAAABMCAwABAAAAAQAAAGmHBAABAAAAZgAAAAAAAABgAAAAAQAAAGAAAAABAAAABgAAkAcABAAAADAyMTABkQcABAAAAAECAwAAoAcABAAAADAxMDABoAMAAQAAAP//AAACoAQAAQAAAPQBAAADoAQAAQAAAPQBAAAAAAAA/+EOAGh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8APD94cGFja2V0IGJlZ2luPSfvu78nIGlkPSdXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQnPz4KPHg6eG1wbWV0YSB4bWxuczp4PSdhZG9iZTpuczptZXRhLyc+CjxyZGY6UkRGIHhtbG5zOnJkZj0naHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyc+CgogPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9JycKICB4bWxuczpBdHRyaWI9J2h0dHA6Ly9ucy5hdHRyaWJ1dGlvbi5jb20vYWRzLzEuMC8nPgogIDxBdHRyaWI6QWRzPgogICA8cmRmOlNlcT4KICAgIDxyZGY6bGkgcmRmOnBhcnNlVHlwZT0nUmVzb3VyY2UnPgogICAgIDxBdHRyaWI6Q3JlYXRlZD4yMDIzLTA2LTI0PC9BdHRyaWI6Q3JlYXRlZD4KICAgICA8QXR0cmliOkV4dElkPjJmYTg2NTQ2LTI3OWYtNDBmOS04ZGRmLWUzMGNlOTI3YTFkNzwvQXR0cmliOkV4dElkPgogICAgIDxBdHRyaWI6RmJJZD41MjUyNjU5MTQxNzk1ODA8L0F0dHJpYjpGYklkPgogICAgIDxBdHRyaWI6VG91Y2hUeXBlPjI8L0F0dHJpYjpUb3VjaFR5cGU+CiAgICA8L3JkZjpsaT4KICAgPC9yZGY6U2VxPgogIDwvQXR0cmliOkFkcz4KIDwvcmRmOkRlc2NyaXB0aW9uPgoKIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PScnCiAgeG1sbnM6ZGM9J2h0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvJz4KICA8ZGM6dGl0bGU+CiAgIDxyZGY6QWx0PgogICAgPHJkZjpsaSB4bWw6bGFuZz0neC1kZWZhdWx0Jz50aGUgc2VyaWFsIHNhbGVzIGNvbW11bml0eSAtIDE8L3JkZjpsaT4KICAgPC9yZGY6QWx0PgogIDwvZGM6dGl0bGU+CiA8L3JkZjpEZXNjcmlwdGlvbj4KCiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0nJwogIHhtbG5zOnBkZj0naHR0cDovL25zLmFkb2JlLmNvbS9wZGYvMS4zLyc+CiAgPHBkZjpBdXRob3I+RHlsYW4gVmVyZ2FyYTwvcGRmOkF1dGhvcj4KIDwvcmRmOkRlc2NyaXB0aW9uPgoKIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PScnCiAgeG1sbnM6eG1wPSdodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvJz4KICA8eG1wOkNyZWF0b3JUb29sPkNhbnZhPC94bXA6Q3JlYXRvclRvb2w+CiA8L3JkZjpEZXNjcmlwdGlvbj4KPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKPD94cGFja2V0IGVuZD0ndyc/Pv/bAEMABgQFBgUEBgYFBgcHBggKEAoKCQkKFA4PDBAXFBgYFxQWFhodJR8aGyMcFhYgLCAjJicpKikZHy0wLSgwJSgpKP/bAEMBBwcHCggKEwoKEygaFhooKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKP/AABEIAfQB9AMBIgACEQEDEQH/xAAfAAABBQEBAQEBAQAAAAAAAAAAAQIDBAUGBwgJCgv/xAC1EAACAQMDAgQDBQUEBAAAAX0BAgMABBEFEiExQQYTUWEHInEUMoGRoQgjQrHBFVLR8CQzYnKCCQoWFxgZGiUmJygpKjQ1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4eLj5OXm5+jp6vHy8/T19vf4+fr/xAAfAQADAQEBAQEBAQEBAAAAAAAAAQIDBAUGBwgJCgv/xAC1EQACAQIEBAMEBwUEBAABAncAAQIDEQQFITEGEkFRB2FxEyIygQgUQpGhscEJIzNS8BVictEKFiQ04SXxFxgZGiYnKCkqNTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqCg4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2dri4+Tl5ufo6ery8/T19vf4+fr/2gAMAwEAAhEDEQA/APqmiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKO1cJLqV6JHAuZQASB81VGDlsRKajud3RXBf2ne/8/Uv/AH1R/ad7/wA/Uv8A31V+xZHtkd7RXBf2ne/8/Uv/AH1R/ad7/wA/Uv8A31R7Fh7ZHe0VwX9p3v8Az9S/99Uf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FFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAf/2Q==";

const SUGGESTIONS = [
  { label: "Tell me about someone like me", prompt: "tell_me" },
  { label: "Give me advice on my situation", prompt: "advice" },
  { label: "How do I break into this space?", prompt: "break_in" },
  { label: "I have a question about TSSC", prompt: "tssc_question" },
];

export default function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [awaitingContext, setAwaitingContext] = useState(null);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const messagesContainerRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const sendMessage = async (userText, systemOverride) => {
    if (!userText.trim()) return;
    const newMessages = [...messages, { role: 'user', content: userText }];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-opus-4-6',
          max_tokens: 1024,
          system: systemOverride || SYSTEM_PROMPT,
          messages: newMessages,
        }),
      });
      const data = await res.json();
      const reply = data.content?.[0]?.text || 'Something went wrong.';
      setMessages([...newMessages, { role: 'assistant', content: reply }]);
    } catch (e) {
      setMessages([...newMessages, { role: 'assistant', content: 'Connection error. Please try again.' }]);
    }
    setLoading(false);
  };

  const handleSuggestion = (s) => {
    if (s.prompt === 'tssc_question') {
      setMessages([{ role: 'assistant', content: "What would you like to know about The Serial Sales Community? I can cover the program structure, what\'s included, the process, and what members experience." }]);
    } else if (s.prompt === 'tell_me') {
      setMessages([{ role: 'assistant', content: "Sure — to find someone with a similar background, tell me: what\'s your current work situation? (e.g. job type, industry, hours, income level)" }]);
      setAwaitingContext('tell_me');
    } else if (s.prompt === 'advice') {
      setMessages([{ role: 'assistant', content: "Happy to help. What\'s your current situation — what are you doing now, what\'s your goal, and what\'s the main thing holding you back?" }]);
      setAwaitingContext('advice');
    } else if (s.prompt === 'break_in') {
      setMessages([{ role: 'assistant', content: "A couple quick questions first: do you have any sales experience? And are you looking to do this full-time or start part-time?" }]);
      setAwaitingContext('break_in');
    }
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (awaitingContext) setAwaitingContext(null);
    sendMessage(input);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const isEmpty = messages.length === 0;

  return (
    <div className="app">
      <div className="header">
        <img src={LOGO} alt="TSSC Logo" className="logo" />
        <div className="header-text">
          <span className="header-title">TSSC Success Query</span>
          <span className="header-sub">57 stories. 20 hours of interviews. 1 chatbot ready to help.</span>
        </div>
      </div>

      <div className="messages-wrap" ref={messagesContainerRef}>
        {isEmpty && (
          <div className="empty-state">
            <p className="empty-title">The most successful minds of TSSC in your pocket</p>
            <p className="empty-sub">Ask anything about breaking into remote appointment setting or closing. Literally anything.</p>
          </div>
        )}

        {messages.map((m, i) => (
          <div key={i} className={`bubble-row ${m.role}`}>
            <div className={`bubble ${m.role}`}>
              {m.content.split('\n').map((line, j) => (
                <span key={j}>{line}{j < m.content.split('\n').length - 1 && <br />}</span>
              ))}
            </div>
          </div>
        ))}

        {loading && (
          <div className="bubble-row assistant">
            <div className="bubble assistant typing">
              <span className="dot" /><span className="dot" /><span className="dot" />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="bottom">
        <div className="suggestions-scroll">
          {SUGGESTIONS.map((s) => (
            <button key={s.prompt} className="suggestion-chip" onClick={() => handleSuggestion(s)}>
              {s.label}
            </button>
          ))}
          <a href="https://serialsalescommunity.co/" target="_blank" rel="noopener noreferrer" className="suggestion-chip cta">
            Speak to the TSSC team →
          </a>
        </div>

        <form className="input-row" onSubmit={handleSubmit}>
          <textarea
            ref={inputRef}
            className="input-box"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask anything..."
            rows={1}
          />
          <button type="submit" className="send-btn" disabled={loading || !input.trim()}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M22 2L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </form>
      </div>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=DM+Mono:wght@400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        html, body {
          height: 100%;
          width: 100%;
          background: #0d0f12;
          color: #e8eaed;
          font-family: 'DM Sans', sans-serif;
          overflow: hidden;
        }

        .app {
          display: flex;
          flex-direction: column;
          height: 100dvh;
          max-width: 680px;
          margin: 0 auto;
          background: #0d0f12;
        }

        .header {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 14px 16px 12px;
          border-bottom: 1px solid rgba(182, 205, 222, 0.1);
          background: #0d0f12;
          flex-shrink: 0;
          z-index: 10;
        }

        .logo {
          width: 38px;
          height: 38px;
          border-radius: 8px;
          object-fit: cover;
        }

        .header-text {
          display: flex;
          flex-direction: column;
          gap: 1px;
        }

        .header-title {
          font-size: 15px;
          font-weight: 600;
          color: #e8eaed;
          letter-spacing: -0.2px;
        }

        .header-sub {
          font-size: 11px;
          color: #b6cdde;
          font-weight: 400;
          opacity: 0.7;
        }

        .messages-wrap {
          flex: 1;
          overflow-y: auto;
          padding: 16px 14px 8px;
          display: flex;
          flex-direction: column;
          gap: 8px;
          -webkit-overflow-scrolling: touch;
          scroll-behavior: smooth;
        }

        .messages-wrap::-webkit-scrollbar { width: 0; }

        .empty-state {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;
          text-align: left;
          padding: 48px 22px 32px;
          gap: 12px;
        }

        .empty-title {
          font-size: 27px;
          font-weight: 600;
          color: #e8eaed;
          line-height: 1.18;
          letter-spacing: -0.7px;
          max-width: 290px;
        }

        .empty-sub {
          font-size: 13px;
          color: #6b7e94;
          line-height: 1.65;
          max-width: 250px;
          font-weight: 400;
          letter-spacing: 0.1px;
        }

        @media (min-width: 520px) {
          .empty-state {
            padding: 64px 36px 40px;
            gap: 18px;
          }

          .empty-title {
            font-size: 40px;
            letter-spacing: -1.4px;
            max-width: 460px;
            line-height: 1.1;
          }

          .empty-sub {
            font-size: 15px;
            max-width: 360px;
            color: #7a8fa6;
          }
        }

        .bubble-row {
          display: flex;
          width: 100%;
        }

        .bubble-row.user { justify-content: flex-end; }
        .bubble-row.assistant { justify-content: flex-start; }

        .bubble {
          max-width: 82%;
          padding: 10px 14px;
          border-radius: 18px;
          font-size: 14px;
          line-height: 1.55;
          word-break: break-word;
        }

        .bubble.user {
          background: #b6cdde;
          color: #0d0f12;
          border-bottom-right-radius: 4px;
          font-weight: 500;
        }

        .bubble.assistant {
          background: #1a1d22;
          color: #d8dce2;
          border-bottom-left-radius: 4px;
          border: 1px solid rgba(255,255,255,0.06);
        }

        .bubble.typing {
          display: flex;
          align-items: center;
          gap: 5px;
          padding: 12px 16px;
        }

        .dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #b6cdde;
          opacity: 0.5;
          animation: pulse 1.2s ease-in-out infinite;
        }

        .dot:nth-child(2) { animation-delay: 0.2s; }
        .dot:nth-child(3) { animation-delay: 0.4s; }

        @keyframes pulse {
          0%, 80%, 100% { opacity: 0.3; transform: scale(0.8); }
          40% { opacity: 1; transform: scale(1); }
        }

        .bottom {
          flex-shrink: 0;
          background: #0d0f12;
          border-top: 1px solid rgba(182, 205, 222, 0.08);
          padding-bottom: env(safe-area-inset-bottom);
        }

        .suggestions-scroll {
          display: flex;
          gap: 8px;
          padding: 10px 14px 6px;
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
          flex-wrap: nowrap;
        }

        .suggestions-scroll::-webkit-scrollbar { display: none; }

        @media (min-width: 520px) {
          .suggestions-scroll {
            flex-wrap: wrap;
            overflow-x: visible;
          }
        }

        .suggestion-chip {
          flex-shrink: 0;
          background: #1a1d22;
          border: 1px solid rgba(182, 205, 222, 0.15);
          color: #b6cdde;
          padding: 7px 13px;
          border-radius: 20px;
          font-size: 12.5px;
          font-family: 'DM Sans', sans-serif;
          font-weight: 500;
          cursor: pointer;
          white-space: nowrap;
          transition: background 0.15s, border-color 0.15s;
        }

        .suggestion-chip:hover, .suggestion-chip:active {
          background: #232730;
          border-color: rgba(182, 205, 222, 0.35);
        }

        .suggestion-chip.cta {
          background: #b6cdde;
          color: #0d0f12;
          border-color: #b6cdde;
          font-weight: 600;
        }

        .suggestion-chip.cta:hover {
          background: #cddae6;
          border-color: #cddae6;
        }

        .input-row {
          display: flex;
          align-items: flex-end;
          gap: 10px;
          padding: 8px 14px 12px;
        }

        .input-box {
          flex: 1;
          background: #1a1d22;
          border: 1px solid rgba(182, 205, 222, 0.15);
          border-radius: 22px;
          color: #e8eaed;
          font-family: 'DM Sans', sans-serif;
          font-size: 15px;
          padding: 10px 16px;
          resize: none;
          outline: none;
          max-height: 120px;
          line-height: 1.4;
          transition: border-color 0.15s;
        }

        .input-box:focus {
          border-color: rgba(182, 205, 222, 0.4);
        }

        .input-box::placeholder { color: #4a5568; }

        .send-btn {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: #b6cdde;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #0d0f12;
          flex-shrink: 0;
          transition: opacity 0.15s, transform 0.1s;
        }

        .send-btn:disabled { opacity: 0.3; cursor: default; }
        .send-btn:not(:disabled):active { transform: scale(0.92); }

        @media (min-width: 680px) {
          .app {
            border-left: 1px solid rgba(255,255,255,0.05);
            border-right: 1px solid rgba(255,255,255,0.05);
          }
        }
      `}</style>
    </div>
  );
}

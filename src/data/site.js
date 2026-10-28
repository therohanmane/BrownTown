/**
 * INBrownTown — site content and configuration.
 *
 * Content integrity rules for this file:
 *  - Anything marked `verified: false` is NOT rendered until the client
 *    confirms it (see docs/CLIENT-APPROVALS.md). Flip the flag, don't delete
 *    the guard.
 *  - Do not add audience numbers, client names, testimonials or results
 *    without a source the client has approved.
 */

export const SOCIAL = {
  // Verified 2026-10-24: YouTube oEmbed reports author_url https://www.youtube.com/@INBrownTown
  youtube: { url: 'https://www.youtube.com/@INBrownTown', handle: '@INBrownTown', verified: true },
  // Client-supplied (previous site + README). Shown, but not independently
  // verified because Instagram requires login — confirm before launch.
  instagram: { url: 'https://www.instagram.com/inbrowntown/', handle: '@inbrowntown', verified: true },
  founderInstagram: { url: 'https://www.instagram.com/ayesha.sayyad/', handle: '@ayesha.sayyad', verified: true },
  // Appeared in the previous site's footer with no evidence the accounts exist.
  facebook: { url: 'https://www.facebook.com/inbrowntown', verified: false },
  x: { url: 'https://x.com/inbrowntown', verified: false }
};

/**
 * Public contact details. The previous site listed partner@inbrowntown.com,
 * a +91 phone number and an FC Road address. inbrowntown.com did not resolve
 * in DNS on 2026-10-24, so none of these could be confirmed. Fill in and set
 * verified: true once the client confirms each one.
 */
export const CONTACT = {
  email: { value: '', verified: false },
  phone: { value: '', verified: false },
  city: { value: { mr: 'पुणे, महाराष्ट्र', hi: 'पुणे, महाराष्ट्र', en: 'Pune, Maharashtra' }, verified: true }
};

/**
 * Channel statistics. Figures come from the previous README and could not be
 * checked against the live channels, so they are hidden. To show one, confirm
 * it on the official channel and set `verified` to the date checked, e.g. '2026-11-02'.
 */
export const STATS = [
  { id: 'yt', value: '1.8k+', verified: null, label: { mr: 'YouTube सदस्य', hi: 'YouTube सब्सक्राइबर', en: 'YouTube subscribers' } },
  { id: 'ig', value: '4.8k+', verified: null, label: { mr: 'Instagram फॉलोअर्स', hi: 'Instagram फ़ॉलोअर्स', en: 'Instagram followers' } },
  { id: 'videos', value: '381', verified: null, label: { mr: 'प्रकाशित व्हिडिओ', hi: 'प्रकाशित वीडियो', en: 'videos published' } },
  { id: 'interviews', value: '200+', verified: null, label: { mr: 'ग्राउंड मुलाखती', hi: 'ग्राउंड इंटरव्यू', en: 'field interviews' } }
];

/**
 * Coverage hubs. Coordinates are city-centre latitude/longitude (decimal
 * degrees, WGS84) as published by GeoNames / Wikipedia. The coverage graphic
 * plots them with an equirectangular projection — it is a diagram of relative
 * positions, not a boundary map. `storyId` links a hub to a catalogue story
 * whose title clearly places it there.
 */
export const HUBS = [
  { id: 'mumbai', lat: 19.076, lon: 72.8777, storyId: 'KYxr1lWQzXc',
    name: { mr: 'मुंबई', hi: 'मुंबई', en: 'Mumbai' },
    region: { mr: 'कोकण', hi: 'कोंकण', en: 'Konkan' } },
  { id: 'pune', lat: 18.5204, lon: 73.8567, storyId: 'pYJuvh6ACxc', base: true,
    name: { mr: 'पुणे', hi: 'पुणे', en: 'Pune' },
    region: { mr: 'पश्चिम महाराष्ट्र', hi: 'पश्चिम महाराष्ट्र', en: 'Western Maharashtra' } },
  { id: 'baramati', lat: 18.1519, lon: 74.5815,
    name: { mr: 'बारामती', hi: 'बारामती', en: 'Baramati' },
    region: { mr: 'पुणे जिल्हा', hi: 'पुणे ज़िला', en: 'Pune district' } },
  { id: 'nashik', lat: 19.9975, lon: 73.7898,
    name: { mr: 'नाशिक', hi: 'नासिक', en: 'Nashik' },
    region: { mr: 'उत्तर महाराष्ट्र', hi: 'उत्तर महाराष्ट्र', en: 'North Maharashtra' } },
  { id: 'nagpur', lat: 21.1458, lon: 79.0882,
    name: { mr: 'नागपूर', hi: 'नागपुर', en: 'Nagpur' },
    region: { mr: 'विदर्भ', hi: 'विदर्भ', en: 'Vidarbha' } },
  { id: 'kolhapur', lat: 16.705, lon: 74.2433,
    name: { mr: 'कोल्हापूर', hi: 'कोल्हापुर', en: 'Kolhapur' },
    region: { mr: 'दक्षिण महाराष्ट्र', hi: 'दक्षिण महाराष्ट्र', en: 'South Maharashtra' } }
];

export const JOURNALISM = [
  { id: 'field', icon: 'mic',
    title: { mr: 'ग्राउंड मुलाखती', hi: 'ग्राउंड इंटरव्यू', en: 'Field interviews' },
    desc: { mr: 'रस्त्यावर, शेतात आणि गावात जाऊन लोकांशी थेट संवाद.', hi: 'सड़कों, खेतों और गाँवों में जाकर लोगों से सीधी बातचीत।', en: 'Conversations recorded where people live and work — streets, farms and towns.' } },
  { id: 'community', icon: 'people',
    title: { mr: 'समाजातील गोष्टी', hi: 'समुदाय की कहानियाँ', en: 'Community stories' },
    desc: { mr: 'बदल घडवणारी माणसं, परंपरा आणि स्थानिक प्रश्न.', hi: 'बदलाव लाने वाले लोग, परंपराएँ और स्थानीय सवाल।', en: 'Changemakers, traditions and local issues that rarely reach the headlines.' } },
  { id: 'civic', icon: 'doc',
    title: { mr: 'नागरी व धोरण विश्लेषण', hi: 'नागरिक व नीति विश्लेषण', en: 'Civic and policy explainers' },
    desc: { mr: 'योजना, निवडणुका आणि सार्वजनिक निर्णय सोप्या भाषेत.', hi: 'योजनाएँ, चुनाव और सार्वजनिक फ़ैसले सरल भाषा में।', en: 'Schemes, elections and public decisions explained in plain language.' } },
  { id: 'leaders', icon: 'chat',
    title: { mr: 'नेतृत्व संवाद', hi: 'नेतृत्व संवाद', en: 'Leadership conversations' },
    desc: { mr: 'लोकप्रतिनिधी, कलाकार, उद्योजक आणि कार्यकर्त्यांशी सविस्तर गप्पा.', hi: 'जनप्रतिनिधियों, कलाकारों, उद्यमियों और कार्यकर्ताओं से लंबी बातचीत।', en: 'Long-form talks with public figures, artists, entrepreneurs and activists.' } },
  { id: 'regional', icon: 'film',
    title: { mr: 'प्रादेशिक व्हिडिओ कथा', hi: 'क्षेत्रीय वीडियो कहानियाँ', en: 'Regional video storytelling' },
    desc: { mr: 'मराठी, हिंदी आणि इंग्रजीत YouTube व Instagram साठी.', hi: 'मराठी, हिंदी और अंग्रेज़ी में, YouTube और Instagram के लिए।', en: 'Made in Marathi, Hindi and English for YouTube and Instagram.' } }
];

export const BUSINESS = [
  { id: 'digital_campaign', icon: 'megaphone',
    title: { mr: 'डिजिटल प्रमोशन मोहिमा', hi: 'डिजिटल प्रमोशन अभियान', en: 'Digital promotional campaigns' },
    desc: { mr: 'तुमच्या व्यवसायासाठी नियोजित सोशल मीडिया पोस्ट्स व मोहिमा.', hi: 'आपके व्यवसाय के लिए योजनाबद्ध सोशल मीडिया पोस्ट और अभियान।', en: 'Planned social media posts and campaigns for your business.' } },
  { id: 'creative_design', icon: 'brush',
    title: { mr: 'जाहिरात क्रिएटिव्ह्ज', hi: 'विज्ञापन क्रिएटिव', en: 'Custom advertising creatives' },
    desc: { mr: 'पोस्टर्स, बॅनर्स आणि सोशल मीडिया डिझाइन्स.', hi: 'पोस्टर, बैनर और सोशल मीडिया डिज़ाइन।', en: 'Posters, banners and social media designs, ready to share.' } },
  { id: 'business_spotlight', icon: 'shop',
    title: { mr: 'स्थानिक व्यवसाय स्पॉटलाइट', hi: 'स्थानीय व्यवसाय स्पॉटलाइट', en: 'Local business spotlights' },
    desc: { mr: 'दुकान, कॅफे किंवा सेवेची ओळख करून देणारे प्रायोजित फीचर.', hi: 'दुकान, कैफ़े या सेवा का परिचय देने वाला प्रायोजित फ़ीचर।', en: 'A sponsored feature introducing your shop, café or service.' } },
  { id: 'branded_video', icon: 'camera', onRequest: true,
    title: { mr: 'प्रायोजित मुलाखत / व्हिडिओ', hi: 'प्रायोजित इंटरव्यू / वीडियो', en: 'Sponsored interviews and video features' },
    desc: { mr: 'मागणीनुसार उपलब्ध; नेहमी ‘पेड पार्टनरशिप’ म्हणून नमूद.', hi: 'माँग पर उपलब्ध; हमेशा ‘पेड पार्टनरशिप’ के रूप में चिह्नित।', en: 'Available on request; always labelled as a paid partnership.' } },
  { id: 'media_partnership', icon: 'handshake',
    title: { mr: 'मोहीम व मीडिया भागीदारी', hi: 'अभियान व मीडिया साझेदारी', en: 'Campaign and media partnerships' },
    desc: { mr: 'कार्यक्रम, उपक्रम आणि संस्थांसोबत सहकार्य.', hi: 'कार्यक्रमों, पहलों और संस्थाओं के साथ सहयोग।', en: 'Collaborations with events, initiatives and organisations.' } }
];

/**
 * Promotional case studies. Empty until the client supplies work they have
 * permission to publish. Each entry should look like:
 * {
 *   id, client: { name, permission: true }, sponsored: true,
 *   image: '/media/work/xyz.jpg', imageAlt: {mr,hi,en},
 *   objective: {mr,hi,en}, services: ['creative_design'], approach: {mr,hi,en},
 *   results: { mr,hi,en } | null   // only measured, client-approved results
 * }
 */
export const CASE_STUDIES = [];

export const PRINCIPLES = [
  { id: 'voices',
    title: { mr: 'लोकांचा आवाज महत्त्वाचा', hi: 'लोगों की आवाज़ मायने रखती है', en: 'Community voices matter' },
    desc: { mr: 'ज्यांच्याविषयी गोष्ट आहे, त्यांनाच ती सांगू देणे.', hi: 'जिनकी कहानी है, उन्हें ही उसे कहने देना।', en: 'The people a story is about should be the ones telling it.' } },
  { id: 'facts',
    title: { mr: 'तथ्य आणि संदर्भ', hi: 'तथ्य और संदर्भ', en: 'Facts and context' },
    desc: { mr: 'मत आणि माहिती यात फरक स्पष्ट ठेवणे.', hi: 'राय और जानकारी का फ़र्क़ साफ़ रखना।', en: 'Keeping the difference between opinion and information clear.' } },
  { id: 'local',
    title: { mr: 'स्थानिक गोष्टींना जागा', hi: 'स्थानीय कहानियों को जगह', en: 'Local stories deserve visibility' },
    desc: { mr: 'मोठ्या शहरांबाहेरच्या माणसांच्या गोष्टी पुढे आणणे.', hi: 'बड़े शहरों से बाहर के लोगों की कहानियाँ सामने लाना।', en: 'Bringing forward people and places beyond the big-city news cycle.' } },
  { id: 'labelled',
    title: { mr: 'प्रायोजित कंटेंट स्पष्टपणे नमूद', hi: 'प्रायोजित कंटेंट साफ़ तौर पर चिह्नित', en: 'Paid promotion is labelled' },
    desc: { mr: 'पैसे घेऊन केलेले काम ‘पेड पार्टनरशिप’ म्हणूनच दाखवले जाते.', hi: 'पैसे लेकर किया गया काम ‘पेड पार्टनरशिप’ के रूप में ही दिखाया जाता है।', en: 'Anything a business paid for is shown as a paid partnership — never as our reporting.' } },
  { id: 'corrections',
    title: { mr: 'चूक झाल्यास दुरुस्ती', hi: 'ग़लती हो तो सुधार', en: 'Corrections, handled responsibly' },
    desc: { mr: 'चूक लक्षात आणून दिल्यास ती तपासून स्पष्टीकरण देणे.', hi: 'ग़लती बताई जाए तो उसे जाँचकर स्पष्टीकरण देना।', en: 'If we get something wrong and it is pointed out, we check it and clarify.' } }
];

/**
 * Founder profile. Name, photo and the biography below were supplied in the
 * previous site. The prior-employer line needs client confirmation before
 * launch (docs/CLIENT-APPROVALS.md).
 */
export const FOUNDER = {
  name: { mr: 'आयेशा सय्यद', hi: 'आयेशा सय्यद', en: 'Ayesha Sayyad' },
  photo: '/media/founder_ayesha_sayyad.jpg',
  role: { mr: 'संस्थापिका व मुख्य मुलाखतकार', hi: 'संस्थापिका व मुख्य इंटरव्यूअर', en: 'Founder and lead interviewer' },
  quote: {
    mr: 'लोकांशी थेट संवाद साधणे, समाजातील खऱ्या नायकांचे कार्य समोर आणणे आणि प्रामाणिक पत्रकारितेतून विश्वासाचे नाते जोडणे हेच INBrownTown चे ध्येय आहे.',
    hi: 'ज़मीन से जुड़कर असली कहानियाँ सामने लाना, समाज के नायकों को मंच देना और ईमानदार पत्रकारिता से भरोसा क़ायम रखना ही INBrownTown का ध्येय है।',
    en: 'Our aim is simple: talk to people directly, bring the work of everyday heroes into view, and build trust through honest journalism.'
  },
  bio: {
    mr: 'आयेशा सय्यद या पत्रकार आणि युट्यूबर असून त्यांनी यापूर्वी ABP माझा आणि TV9 मराठी या वृत्तवाहिन्यांमध्ये काम केले आहे. INBrownTown च्या माध्यमातून त्या पुणे, मुंबई व महाराष्ट्रातील सामाजिक, पर्यावरण, सांस्कृतिक आणि राजकीय विषयांवरील मुलाखती व गोष्टी लोकांपर्यंत पोहोचवतात.',
    hi: 'आयेशा सय्यद पत्रकार और यूट्यूबर हैं, जो पहले ABP माझा और TV9 मराठी के साथ काम कर चुकी हैं। INBrownTown के ज़रिए वे पुणे, मुंबई और महाराष्ट्र से सामाजिक, पर्यावरण, सांस्कृतिक और राजनीतिक विषयों पर इंटरव्यू और कहानियाँ सामने लाती हैं।',
    en: 'Ayesha Sayyad is a journalist and YouTuber who has previously worked with the news channels ABP Majha and TV9 Marathi. Through INBrownTown she brings interviews and stories on social, environmental, cultural and political life from Pune, Mumbai and across Maharashtra.'
  },
  gallery: [
    { src: '/media/founder_post_4.jpg', w: 1080, h: 1920,
      alt: { mr: 'पुण्यातील रस्त्यावर कॅमेऱ्यासमोर बोलणारे पाहुणे', hi: 'पुणे की सड़क पर कैमरे के सामने बात करते मेहमान', en: 'A guest speaking to camera on a city street during a field interview' } },
    { src: '/media/founder_post_2.jpg', w: 1080, h: 1920,
      alt: { mr: 'मुलाखतीदरम्यान पाहुण्यांसोबत आयेशा सय्यद', hi: 'इंटरव्यू के दौरान मेहमान के साथ आयेशा सय्यद', en: 'Ayesha Sayyad with a guest during a studio interview' } },
    { src: '/media/founder_post_3.jpg', w: 540, h: 960,
      alt: { mr: 'विविध कार्यक्रमांमध्ये पाहुण्यांसोबत आयेशा सय्यद', hi: 'विभिन्न कार्यक्रमों में मेहमानों के साथ आयेशा सय्यद', en: 'Ayesha Sayyad with guests at different events and shoots' } }
  ]
};

/**
 * INBrownTown - Brand & Channel Data Store
 * Official video catalog directly from https://www.youtube.com/@INBrownTown
 * Supports sorting by Popular Videos & Latest Videos, with direct YouTube links and in-page modal player.
 */

window.INB_BRAND_DATA = {
  channelUrl: 'https://www.youtube.com/@INBrownTown',

  // Brand Milestone Stats
  stats: [
    { id: 'stat-subs', value: 250000, suffix: '+', label: { mr: 'युट्यूब व सोशल सदस्य', hi: 'यूट्यूब व सोशल सदस्य', en: 'Subscribers & Community' } },
    { id: 'stat-videos', value: 450, suffix: '+', label: { mr: 'क्यूरेटेड व्हिडिओ स्टोरीज', hi: 'क्यूरेटेड वीडियो स्टोरीज', en: 'Curated Video Stories' } },
    { id: 'stat-cities', value: 18, suffix: '+', label: { mr: 'शहरे व जिल्हे कव्हरेज', hi: 'शहर व ज़िले कवरेज', en: 'Districts & Cities Reached' } },
    { id: 'stat-views', value: 5000000, suffix: '+', label: { mr: 'मासिक जाहिरात व चॅनेल व्ह्यूज', hi: 'मासिक विज्ञापन व चैनल व्यूज़', en: 'Monthly Advertising & Channel Views' } }
  ],

  // Core Activities (Advertising, Ad Posters, Promotions & Curated Insights)
  activities: [
    {
      id: 'act-ads',
      icon: '📢',
      title: { mr: 'डिजिटल जाहिरात व प्रमोशन', hi: 'डिजिटल विज्ञापन व प्रमोशन', en: 'Digital Ads & Promotions' },
      desc: {
        mr: 'व्यस्त व्यावसायिक आणि दुकानदारांसाठी डिजिटल जाहिरात मोहीम आणि लाखो स्थानिक ग्राहकांपर्यंत थेट पोहोच.',
        hi: 'व्यस्त व्यापारियों और स्थानीय ब्रांड्स के लिए लक्षित डिजिटल विज्ञापन व व्यापक प्रचार।',
        en: 'Targeted digital advertising and promotional campaigns connecting local businesses with thousands of customers.'
      }
    },
    {
      id: 'act-posters',
      icon: '🎨',
      title: { mr: 'ॲड पोस्टर्स व क्रिएटिव्ह डिझाइन', hi: 'विज्ञापन पोस्टर व क्रिएटिव डिज़ाईन', en: 'Ad Posters & Visual Creatives' },
      desc: {
        mr: 'ज्यांच्याकडे मार्केटिंगसाठी वेळ नाही अशांसाठी आकर्षक जाहिरात पोस्टर्स, बॅनर्स आणि सोशल मीडिया डिझाइन.',
        hi: 'जिनके पास समय की कमी है, उनके लिए पेशेवर विज्ञापन पोस्टर्स, बैनर्स और सोशल मीडिया ग्राफिक्स।',
        en: 'Done-for-you promotional posters, eye-catching ad graphics, and social media flyers for busy entrepreneurs.'
      }
    },
    {
      id: 'act-community',
      icon: '🤝',
      title: { mr: 'कम्युनिटी स्टोरीज व मुलाखती', hi: 'कम्युनिटी स्टोरीज व साक्षात्कार', en: 'Community Stories & Interviews' },
      desc: {
        mr: 'समाजातील प्रेरणादायी व्यक्ती, सामाजिक कार्यकर्ते आणि प्रसिद्ध मान्यवरांच्या विशेष मुलाखतींचा डिजिटल मंच.',
        hi: 'स्थानीय नायकों, सामाजिक कार्यकर्ताओं और प्रमुख हस्तियों के साक्षात्कारों का मंच।',
        en: 'Exclusive interviews with public icons, grassroots changemakers, and inspirational figures.'
      }
    },
    {
      id: 'act-spotlight',
      icon: '🚀',
      title: { mr: 'स्थानिक व्यवसाय स्पॉटलाइट', hi: 'स्थानीय व्यापार स्पॉटलाइट', en: 'Local Business Spotlights' },
      desc: {
        mr: 'पुणे व परिसरातील नवीन कॅफे, दुकाने आणि सेवांचे विशेष जाहिरात प्रमोशन व डिजिटल प्रसिद्धी.',
        hi: 'पुणे व आसपास के नए कैफ़े, दुकानों और सेवाओं का विशेष प्रचार व ब्रांड विजिबिलिटी।',
        en: 'Showcasing local businesses, stores, and services with dedicated promotional highlights and audience reach.'
      }
    },
    {
      id: 'act-explainers',
      icon: '💡',
      title: { mr: 'योजना व माहिती विश्लेषण', hi: 'योजना व नागरिक विश्लेषण', en: 'Civic & Policy Explainers' },
      desc: {
        mr: 'सरकारी योजना, कायदे आणि सामाजिक घडामोडींचे नागरिकांसाठी सोप्या भाषेतील अभ्यासपूर्ण विश्लेषणात्मक व्हिडिओ.',
        hi: 'सरकारी योजनाओं, जन-कल्याणकारी नीतियों और नियमों का सरल भाषा में विश्लेषणात्मक संकलन।',
        en: 'Curating clear, simplified explainers on government schemes, public policies, and civic updates.'
      }
    },
    {
      id: 'act-interviews',
      icon: '🎙️',
      title: { mr: 'राजकारण व नेतृत्व संवाद', hi: 'राजनीति व नेतृत्व संवाद', en: 'Leadership Dialogues' },
      desc: {
        mr: 'तज्ज्ञ, उद्योजक आणि लोकप्रतिनिधींशी झालेल्या महत्त्वाच्या चर्चा आणि पॉडकास्टचे संकलन.',
        hi: 'विशेषज्ञों, सफल उद्यमियों और जन-प्रतिनिधियों की सार्थक चर्चाओं और पॉडकास्ट का संग्रह।',
        en: 'Curated long-form discussions and podcasts featuring decision-makers, innovators, and leaders.'
      }
    }
  ],

  // 4 Community Pillars
  pillars: [
    {
      id: 'pil-1',
      number: '01',
      title: { mr: 'व्यस्त व्यावसायिकांना जाहिरात मदत', hi: 'व्यस्त व्यापारियों को आसान विज्ञापन', en: 'Turnkey Ads for Busy People' },
      desc: {
        mr: 'ज्यांच्याकडे मार्केटिंगसाठी वेळ नसतो, त्यांच्यासाठी तयार ॲड पोस्टर्स, सोशल मीडिया डिझाइन व थेट जाहिरात व्यवस्थापन.',
        hi: 'जिनके पास प्रचार के लिए समय नहीं है, उनके लिए रेडीमेड विज्ञापन पोस्टर्स, बैनर और सोशल मीडिया कैंपेन।',
        en: 'Complete done-for-you advertising and creative promotional posters for busy shopkeepers and business owners.'
      }
    },
    {
      id: 'pil-2',
      number: '02',
      title: { mr: 'स्थानिक ब्रँड्सना डिजिटल बळ', hi: 'स्थानीय ब्रांड्स को डिजिटल ताकत', en: 'Amplifying Local Brands' },
      desc: {
        mr: 'पुणे व महाराष्ट्रातील उद्योजक, ब्रँड्स आणि सेवांना २५०k+ स्थानिक ग्राहकांपर्यंत पोहोचवण्याचे प्रभावी व्यासपीठ.',
        hi: 'पुणे व महाराष्ट्र के व्यवसायों और ब्रांड्स को २५०k+ लक्षित ग्राहकों तक पहुँचाने का विश्वसनीय मंच।',
        en: 'Helping local merchants, startups, and services gain massive organic visibility and targeted customer reach.'
      }
    },
    {
      id: 'pil-3',
      number: '03',
      title: { mr: 'नागरिकांच्या आवाजाला व्यासपीठ', hi: 'नागरिकों की आवाज़ को मंच', en: 'Amplifying Community Voices' },
      desc: {
        mr: 'स्थानिक समस्या आणि सामाजिक कार्याला डिजिटल माध्यमातून लोकांपर्यंत पोहोचवून जनजागृती निर्माण करणे.',
        hi: 'स्थानीय मुद्दों और सामाजिक प्रयासों को डिजिटल माध्यम से जन-जन तक पहुँचाना।',
        en: 'Giving citizens and grassroots initiatives a trusted digital platform to share their stories.'
      }
    },
    {
      id: 'pil-4',
      number: '04',
      title: { mr: 'विश्वासार्ह व पारदर्शक माहिती', hi: 'सत्यापित और पारदर्शी जानकारी', en: 'Authentic & Verified Reach' },
      desc: {
        mr: 'कोणत्याही दिशाभूल करणाऱ्या सनसनाटीला थारा न देता, खरी माहिती व थेट व्यावसायिक सहकार्य.',
        hi: 'बिना किसी सनसनी के, प्रामाणिक जानकारी और पारदर्शी डिजिटल सहयोग की प्रतिबद्धता।',
        en: 'Committed to authentic community trust, factual integrity, and transparent commercial partnerships.'
      }
    }
  ],

  // Content Categories Showcase
  categories: [
    {
      id: 'interviews',
      name: { mr: 'विशेष मुलाखती', hi: 'विशेष साक्षात्कार', en: 'Exclusive Interviews' },
      count: '150+ Videos',
      image: 'https://i.ytimg.com/vi/kgZFF-ye7RY/hq720.jpg',
      tagline: { mr: 'अभिनेते, नेते व मान्यवरांशी संवाद', hi: 'दिग्गजों से विशेष बातचीत', en: 'Candid Celebrity & Political Talks' }
    },
    {
      id: 'ground_reports',
      name: { mr: 'पर्यावरण व सामाजिक यशोगाथा', hi: 'पर्यावरण व सामाजिक गाथाएँ', en: 'Social & Environment Stories' },
      count: '120+ Videos',
      image: 'https://i.ytimg.com/vi/yp3L9ZpXhmc/hq720.jpg',
      tagline: { mr: '१४ ट्रीज व प्रेरणादायी कार्य', hi: '१४ ट्रीज व प्रेरक जमीनी प्रयास', en: '14 Trees & Inspiring Changemakers' }
    },
    {
      id: 'community',
      name: { mr: 'संस्कृती व कम्युनिटी', hi: 'संस्कृति व कम्युनिटी', en: 'Culture & Community' },
      count: '110+ Videos',
      image: 'https://i.ytimg.com/vi/4MJc53zgthg/hq720.jpg',
      tagline: { mr: 'वारी, संगीत, कला व सण', hi: 'वारी, संगीत, कला व परंपरा', en: 'Wari, Music, Arts & Festivities' }
    },
    {
      id: 'explainers',
      name: { mr: 'माहिती व विश्लेषण', hi: 'जानकारी व विश्लेषण', en: 'Explainers & Guidance' },
      count: '95+ Videos',
      image: 'https://i.ytimg.com/vi/5UcDPTN5sI0/hq720.jpg',
      tagline: { mr: 'शिक्षण, कृषी व शासकीय घडामोडी', hi: 'शिक्षा, कृषि व नीतियाँ', en: 'Education, Farming & Current Affairs' }
    }
  ],

  // =========================================================================
  // AUTHENTIC INBROWNTOWN VIDEO REPOSITORY (Directly from @INBrownTown Channel)
  // =========================================================================
  videos: [
    {
      id: 'inb-1',
      youtubeId: 'kgZFF-ye7RY',
      category: 'interviews',
      viewsRaw: 11000,
      views: '11K',
      publishDateDaysAgo: 28,
      publishText: { mr: '४ आठवड्यांपूर्वी', hi: '४ सप्ताह पहले', en: '4 weeks ago' },
      duration: '24:15',
      thumbnail: 'https://i.ytimg.com/vi/kgZFF-ye7RY/hq720.jpg',
      title: {
        mr: 'हक्काचा लोकनेता अजितदादा पवार... अभिनेत्याच्या नजरेतून नेता | Sandeep Pathak Exclusive Interview',
        hi: 'हक का लोकनेता अजितदादा पवार... अभिनेता की नज़र से नेता | संदीप पाठक विशेष साक्षात्कार',
        en: 'People’s Leader Ajitdada Pawar through an Actor’s Lens | Sandeep Pathak Exclusive Interview'
      },
      summary: {
        mr: 'सुप्रसिद्ध अभिनेते संदीप पाठक यांनी उलगडलेले अजित पवार यांच्यासोबतचे भावनिक आणि न ऐकलेले किस्से.',
        hi: 'प्रसिद्ध अभिनेता संदीप पाठक ने साझा किए अजित पवार के साथ के अनसुने और भावुक संस्मरण।',
        en: 'Popular actor Sandeep Pathak shares candid and heartfelt memories with leader Ajit Pawar.'
      },
      isPopular: true,
      isLatest: false
    },
    {
      id: 'inb-2',
      youtubeId: 'A4BNYEv6we8',
      category: 'community',
      viewsRaw: 7100,
      views: '7.1K',
      publishDateDaysAgo: 180,
      publishText: { mr: '६ महिन्यांपूर्वी', hi: '६ महीने पहले', en: '6 months ago' },
      duration: '32:10',
      thumbnail: 'https://i.ytimg.com/vi/A4BNYEv6we8/hq720.jpg',
      title: {
        mr: "Valentine's Day Special | कविता, गझल अन् मैफल... प्रेम दिन विशेष! अक्षर अक्षर तुझेच आहे",
        hi: "Valentine's Day Special | कविता, ग़ज़ल और महफ़िल... प्रेम दिवस विशेष! अक्षर अक्षर तुझेच आहे",
        en: "Valentine’s Day Musical Concert | Poetry, Ghazals & Soulful Melody Special"
      },
      summary: {
        mr: 'कविता, गझल आणि भावस्पर्शी संवादांची रंगलेली सुरेल मैफल - "अक्षर अक्षर तुझेच आहे" लाईव्ह शो.',
        hi: 'कविता, ग़ज़ल और भावपूर्ण संवादों की सुरीली महफ़िल - "अक्षर अक्षर तुझेच आहे" लाइव शो।',
        en: 'An enchanting musical evening of Marathi poetry, ghazals, and timeless melodies.'
      },
      isPopular: true,
      isLatest: false
    },
    {
      id: 'inb-3',
      youtubeId: 'yp3L9ZpXhmc',
      category: 'ground_reports',
      viewsRaw: 350,
      views: '350+',
      publishDateDaysAgo: 12,
      publishText: { mr: '१२ दिवसांपूर्वी', hi: '१२ दिन पहले', en: '12 days ago' },
      duration: '18:42',
      thumbnail: 'https://i.ytimg.com/vi/yp3L9ZpXhmc/hq720.jpg',
      title: {
        mr: 'उजाड डोंगर हिरवा करणाऱ्या माणसाची गोष्ट | अनंत तायडे Exclusive Interview | 14 Trees | Brown Town',
        hi: 'बंजर पहाड़ को हरा-भरा करने वाले व्यक्ति की कहानी | अनंत तायडे विशेष साक्षात्कार | 14 Trees',
        en: 'Turning Barren Mountains Green | Anant Tayade Exclusive Interview | 14 Trees Project'
      },
      summary: {
        mr: 'ओसाड डोंगरमाथ्यावर तब्बल १४ लाख झाडे लावून निसर्गाचा कायापालट करणाऱ्या अनंत तायडे यांची थक्क करणारी मुलाखत.',
        hi: 'बंजर पहाड़ियों पर लाखों पेड़ लगाकर जंगल खड़ा करने वाले पर्यावरणविद् अनंत तायडे की प्रेरक गाथा।',
        en: 'The awe-inspiring story of Anant Tayade, who transformed barren hills into thriving lush forests.'
      },
      isPopular: false,
      isLatest: true
    },
    {
      id: 'inb-4',
      youtubeId: 'hZbsz5hFkhc',
      category: 'ground_reports',
      viewsRaw: 1700,
      views: '1.7K',
      publishDateDaysAgo: 120,
      publishText: { mr: '४ महिन्यांपूर्वी', hi: '४ महीने पहले', en: '4 months ago' },
      duration: '08:35',
      thumbnail: 'https://i.ytimg.com/vi/hZbsz5hFkhc/hq720.jpg',
      title: {
        mr: 'एका निर्णयाने… ओसाड जमीन झाली जंगल... 14 Trees ची गोष्ट #14trees',
        hi: 'एक फैसले से… बंजर ज़मीन बनी घना जंगल... 14 Trees की प्रेरणादायक कहानी',
        en: 'One Decision Turned Barren Land into a Forest | The 14 Trees Conservation Journey'
      },
      summary: {
        mr: 'कष्ट, जिद्द आणि पर्यावरण संवर्धनाच्या एका निर्णयाने ओसाड जमिनीचे रूपांतर घनदाट जंगलात कसे झाले?',
        hi: 'दृढ़ संकल्प और पर्यावरण संवर्धन से बंजर भूमि को हरे-भरे वन में बदलने की प्रेरक डॉक्यूमेंट्री।',
        en: 'A visual documentary detailing how dedicated community efforts revitalized dry lands into natural habitat.'
      },
      isPopular: true,
      isLatest: false
    },
    {
      id: 'inb-5',
      youtubeId: 'Fb_JOo3aY-M',
      category: 'interviews',
      viewsRaw: 1400,
      views: '1.4K',
      publishDateDaysAgo: 180,
      publishText: { mr: '६ महिन्यांपूर्वी', hi: '६ महीने पहले', en: '6 months ago' },
      duration: '14:20',
      thumbnail: 'https://i.ytimg.com/vi/Fb_JOo3aY-M/hq720.jpg',
      title: {
        mr: 'Ajit Pawar यांचे शाळेतील शिक्षक माधव जोशी यांनी जुन्या आठवणी सांगितल्या | Exclusive Memories',
        hi: 'Ajit Pawar के स्कूली शिक्षक माधव जोशी ने साझा की पुरानी यादें व संस्कार',
        en: 'Ajit Pawar’s School Teacher Madhav Joshi Shares Heartfelt Childhood Memories'
      },
      summary: {
        mr: 'अजितदादांच्या शालेय जीवनातील शिस्त, अभ्यास आणि संस्कारांविषयी त्यांचे शिक्षक माधव जोशी यांनी जागवलेल्या आठवणी.',
        hi: 'अजित पवार के छात्र जीवन, अनुशासन और संघर्ष पर उनके गुरुजी माधव जोशी की आत्मीय चर्चा।',
        en: 'An exclusive conversation with Ajit Pawar’s former school teacher on his early discipline and character.'
      },
      isPopular: true,
      isLatest: false
    },
    {
      id: 'inb-6',
      youtubeId: 'gtCTEnniOks',
      category: 'explainers',
      viewsRaw: 1100,
      views: '1.1K',
      publishDateDaysAgo: 180,
      publishText: { mr: '६ महिन्यांपूर्वी', hi: '६ महीने पहले', en: '6 months ago' },
      duration: '12:50',
      thumbnail: 'https://i.ytimg.com/vi/gtCTEnniOks/hq720.jpg',
      title: {
        mr: 'राहुल गांधी यांचे संसदेतील भाषण | संसदेतला तो एक तास जेव्हा मोदी सरकारला घेरलं | Analysis',
        hi: 'संसद में राहुल गांधी का चर्चित भाषण | संसद का वह एक घंटा और राष्ट्रीय मुद्दों का विश्लेषण',
        en: 'Inside Parliament: Key National Issues & Political Debate Analysis'
      },
      summary: {
        mr: 'संसदेतील चर्चेदरम्यान मांडलेले महत्त्वाचे राष्ट्रीय मुद्दे, जनहित याचिका आणि भाषणाचे सखोल राजकीय विश्लेषण.',
        hi: 'संसद के महत्वपूर्ण सत्र में जनहित और राष्ट्रीय मुद्दों पर हुई जोरदार बहस का तथ्यात्मक विश्लेषण।',
        en: 'Detailed analytical breakdown of parliamentary debate, economic queries, and public policies.'
      },
      isPopular: true,
      isLatest: false
    },
    {
      id: 'inb-7',
      youtubeId: 'hGrPZWbxvVQ',
      category: 'community',
      viewsRaw: 221,
      views: '221',
      publishDateDaysAgo: 14,
      publishText: { mr: '२ आठवड्यांपूर्वी', hi: '२ सप्ताह पहले', en: '2 weeks ago' },
      duration: '09:15',
      thumbnail: 'https://i.ytimg.com/vi/hGrPZWbxvVQ/hq720.jpg',
      title: {
        mr: 'Friendship Day Special ❤️ संदीप पाठकला भेटला जिवलग मित्र | आठवणी आणि गप्पा',
        hi: 'Friendship Day Special ❤️ संदीप पाठक को मिला जिगरी यार | आत्मीय बातचीत',
        en: 'Friendship Day Special ❤️ Actor Sandeep Pathak Reconnects with Childhood Best Friend'
      },
      summary: {
        mr: 'मैत्री दिन विशेष: जिवलग मित्रांच्या गप्पा, बालपणीच्या आठवणी आणि राजकारणापलीकडचे जिव्हाळ्याचे क्षण.',
        hi: 'मैत्री दिवस पर पुरानी यादों, बचपन के किस्सों और आत्मीय रिश्तों की दिल को छूने वाली बातचीत।',
        en: 'A heartwarming friendship reunion discussing personal journeys, memories, and lifelong bonds.'
      },
      isPopular: false,
      isLatest: true
    },
    {
      id: 'inb-8',
      youtubeId: '4MJc53zgthg',
      category: 'community',
      viewsRaw: 264,
      views: '264',
      publishDateDaysAgo: 21,
      publishText: { mr: '३ आठवड्यांपूर्वी', hi: '३ सप्ताह पहले', en: '3 weeks ago' },
      duration: '10:45',
      thumbnail: 'https://i.ytimg.com/vi/4MJc53zgthg/hq720.jpg',
      title: {
        mr: 'आषाढी एकादशी | लाखो लोक वारी का करतात? | वारीत दडलंय जगण्याचं तत्त्वज्ञान',
        hi: 'आषाढी एकादशी | लाखों लोग वारी क्यों करते हैं? | वारी में छिपा जीवन दर्शन',
        en: 'Ashadhi Wari Tradition | Why Millions Walk Hundreds of Kilometers | Spiritual Philosophy'
      },
      summary: {
        mr: 'महाराष्ट्राची शतकांची परंपरा असलेल्या आषाढी वारीचे सांस्कृतिक महत्त्व आणि वारकरी तत्त्वज्ञान.',
        hi: 'महाराष्ट्र की सदियों पुरानी वारी परंपरा, भक्ति और जीवन जीने के दर्शन पर विशेष प्रस्तुति।',
        en: 'Exploring the rich cultural roots, harmony, and timeless devotion behind Maharashtra’s annual Wari pilgrimage.'
      },
      isPopular: false,
      isLatest: true
    },
    {
      id: 'inb-9',
      youtubeId: 'XGgpObCD1yI',
      category: 'interviews',
      viewsRaw: 360,
      views: '360',
      publishDateDaysAgo: 28,
      publishText: { mr: '४ आठवड्यांपूर्वी', hi: '४ सप्ताह पहले', en: '4 weeks ago' },
      duration: '16:20',
      thumbnail: 'https://i.ytimg.com/vi/XGgpObCD1yI/hq720.jpg',
      title: {
        mr: 'अजितदादा फणसासारखे बाहेरून कडक आतून सहृदयी... उरणच्या नगराध्यक्षा भावना घाणेकरांनी सांगितल्या आठवणी',
        hi: 'अजितदादा नारियल जैसे बाहर से सख्त भीतर से कोमल... उरण नगर अध्यक्षा भावना घाणेकर के संस्मरण',
        en: 'Bhavana Ghanekar on Ajit Pawar’s Leadership, Governance & Personal Warmth'
      },
      summary: {
        mr: 'उरणच्या नगराध्यक्षा भावना घाणेकर यांनी सांगितलेले नागरी विकासाचे निर्णय आणि आठवणी.',
        hi: 'उरण की पूर्व नगर अध्यक्षा भावना घाणेकर ने बताए प्रशासनिक निर्णय और आत्मीय संस्मरण।',
        en: 'Insights from municipal leadership on civic development, public administration, and mentorship.'
      },
      isPopular: false,
      isLatest: true
    },
    {
      id: 'inb-10',
      youtubeId: 'Zx8lmueLQ4E',
      category: 'interviews',
      viewsRaw: 566,
      views: '566',
      publishDateDaysAgo: 35,
      publishText: { mr: '१ महिन्यापूर्वी', hi: '१ माह पहले', en: '1 month ago' },
      duration: '21:30',
      thumbnail: 'https://i.ytimg.com/vi/Zx8lmueLQ4E/hq720.jpg',
      title: {
        mr: 'महाराष्ट्राच्या राजकारणावर डॉ. अमोल कोल्हेंचं मोठं विधान | Amol Kolhe Exclusive Interview',
        hi: 'महाराष्ट्र की राजनीति और भविष्य पर डॉ. अमोल कोल्हे का बेबाक साक्षात्कार',
        en: 'Future of Maharashtra Politics & Social Discourse | Dr. Amol Kolhe Exclusive Interview'
      },
      summary: {
        mr: 'महाराष्ट्राचे राजकारण, सांस्कृतिक नाटक आणि संसदेतील कार्यावर डॉ. अमोल कोल्हे यांच्याशी दिलखुलास चर्चा.',
        hi: 'महाराष्ट्र के समकालीन मुद्दों, सांस्कृतिक अभियानों और संसदीय कार्यप्रणाली पर बेबाक संवाद।',
        en: 'In-depth dialogue with MP and acclaimed actor Dr. Amol Kolhe on public governance and arts.'
      },
      isPopular: false,
      isLatest: false
    },
    {
      id: 'inb-11',
      youtubeId: '5UcDPTN5sI0',
      category: 'explainers',
      viewsRaw: 518,
      views: '518',
      publishDateDaysAgo: 90,
      publishText: { mr: '३ महिन्यांपूर्वी', hi: '३ महीने पहले', en: '3 months ago' },
      duration: '15:40',
      thumbnail: 'https://i.ytimg.com/vi/5UcDPTN5sI0/hq720.jpg',
      title: {
        mr: 'JEE-NEET टॉपर बनण्यासाठी काय करावं? | Dr. Sagar Kalane Academy #neet',
        hi: 'JEE-NEET में शीर्ष सफलता कैसे प्राप्त करें? | डॉ. सागर कलाने का मार्गदर्शन',
        en: 'Mastering JEE & NEET: Strategic Preparation Guide by Dr. Sagar Kalane Academy'
      },
      summary: {
        mr: 'स्पर्धा परीक्षांमध्ये यश मिळवण्यासाठी अभ्यास पद्धती, रिव्हिजन तंत्र आणि मानसिक तयारीचे मार्गदर्शन.',
        hi: 'प्रतियोगी परीक्षाओं में शीर्ष रैंक हासिल करने के लिए सही अध्ययन रणनीति और तनाव प्रबंधन।',
        en: 'Expert study strategies, revision roadmaps, and psychological resilience for competitive exam aspirants.'
      },
      isPopular: false,
      isLatest: false
    },
    {
      id: 'inb-12',
      youtubeId: 'QWw7ppwLDsM',
      category: 'ground_reports',
      viewsRaw: 291,
      views: '291',
      publishDateDaysAgo: 90,
      publishText: { mr: '३ महिन्यांपूर्वी', hi: '३ महीने पहले', en: '3 months ago' },
      duration: '13:10',
      thumbnail: 'https://i.ytimg.com/vi/QWw7ppwLDsM/hq720.jpg',
      title: {
        mr: "सेंद्रिय शेती करायला जास्त खर्च येतो का? वसुधा सरदार यांनी सांगितली 'संजीवन पद्धत' #organicfarming",
        hi: "क्या जैविक खेती में अधिक लागत आती है? वसुधा सरदार ने समझाई 'संजीवन पद्धति'",
        en: 'Is Organic Farming Expensive? Vasudha Sardar Explains the Sanjeevan Farming Method'
      },
      summary: {
        mr: 'कमी खर्चात विषमुक्त व दर्जेदार सेंद्रिय शेती कशी करावी? वसुधा सरदार यांचे शेतकरी बांधवांसाठी मार्गदर्शन.',
        hi: 'कम लागत में गुणवत्तापूर्ण जैविक उपज कैसे प्राप्त करें? किसानों के लिए व्यावहारिक दिशा-निर्देश।',
        en: 'Actionable guidance on cost-effective, toxin-free sustainable agriculture methods for farmers.'
      },
      isPopular: false,
      isLatest: false
    }
  ],

  // Social Proof & Community Testimonials
  testimonials: [
    {
      id: 'test-1',
      quote: {
        mr: 'INBrownTown च्या ग्राउंड कव्हरेज आणि व्हिडिओ रिपोर्टमुळे आमच्या परिसरातील प्रश्न महापालिकेकडून अवघ्या ४ दिवसांत सोडवला गेला!',
        hi: 'INBrownTown की ग्राउंड कवरेज और वीडियो रिपोर्ट के बाद हमारे इलाके की समस्या का नगर निगम ने तुरंत समाधान किया!',
        en: 'Thanks to INBrownTown’s community spotlight, our locality’s drinking water issue was resolved in just 4 days!'
      },
      author: 'राजेश कुलकर्णी (Rajesh Kulkarni)',
      role: { mr: 'स्थानिक रहिवासी, कोथरूड, पुणे', hi: 'स्थानीय निवासी, कोथरूड, पुणे', en: 'Resident, Kothrud, Pune' },
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
    },
    {
      id: 'test-2',
      quote: {
        mr: 'INBrownTown च्या जाहिरात पोस्टर्स आणि डिजिटल प्रमोशनमुळे आमच्या पुण्याच्या कॅफेला पहिल्याच महिन्यात ५०,००० पेक्षा जास्त स्थानिक ग्राहक पोहोच मिळाले.',
        hi: 'INBrownTown के विज्ञापन पोस्टर्स और डिजिटल प्रमोशन से हमारे कैफ़े को पहले ही महीने में ५०,००० से अधिक नए ग्राहकों तक पहुँच मिली।',
        en: 'INBrownTown’s promotional ad posters and digital marketing campaign gave our organic café an authentic reach of 50k+ targeted local customers.'
      },
      author: 'अमृता शिंदे (Amrita Shinde)',
      role: { mr: 'संस्थापक, द ग्रीन कप कॅफे, पुणे', hi: 'संस्थापक, द ग्रीन कप कैफ़े, पुणे', en: 'Founder, The Green Cup Café, Pune' },
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
    },
    {
      id: 'test-3',
      quote: {
        mr: 'कोणताही सनसनाटीपणा न आणता खरी माहिती आणि व्यक्तिमत्त्वांचे संवाद मांडणारा हा महाराष्ट्रातील सर्वाधिक विश्वासार्ह डिजिटल चॅनेल आहे.',
        hi: 'बिना किसी सनसनी के वास्तविक जानकारी और व्यक्तित्वों के संवाद प्रस्तुत करने वाला प्रामाणिक डिजिटल मंच।',
        en: 'One of the rare media channels that focuses purely on grounded facts, authentic conversations, and community stories.'
      },
      author: 'अॅड. सचिन पाटील (Adv. Sachin Patil)',
      role: { mr: 'कायदेतज्ज्ञ व विश्लेषक', hi: 'विधिक विशेषज्ञ व विश्लेषक', en: 'Legal Advisor & Public Policy Analyst' },
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80'
    }
  ]
};

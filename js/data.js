/**
 * INBrownTown - Brand & Channel Data Store
 * Official video catalog directly from https://www.youtube.com/@INBrownTown
 * Supports sorting by Popular Videos & Latest Videos, with direct YouTube links and in-page modal player.
 */

window.INB_BRAND_DATA = {
  channelUrl: 'https://www.youtube.com/@INBrownTown',
  channelInstagram: 'https://www.instagram.com/inbrowntown',

  // Brand Milestone Stats
  stats: [
    { id: 'stat-subs', value: 1800, suffix: '+', label: { mr: 'युट्यूब सदस्य (YT Subscribers)', hi: 'यूट्यूब सब्सक्राइबर्स', en: 'YouTube Subscribers' } },
    { id: 'stat-followers', value: 4800, suffix: '+', label: { mr: 'इन्स्टाग्राम फॉलोअर्स (IG Followers)', hi: 'इंस्टाग्राम फॉलोअर्स', en: 'Instagram Followers' } },
    { id: 'stat-videos', value: 381, suffix: '+', label: { mr: 'एकूण व्हिडिओ स्टोरीज (381 Videos)', hi: 'कुल वीडियो स्टोरीज (381 Videos)', en: 'Total Channel Videos (381)' } },
    { id: 'stat-cities', value: 18, suffix: '+', label: { mr: 'शहरे व जिल्हे कव्हरेज', hi: 'शहर व ज़िले कवरेज', en: 'Districts & Cities Reached' } }
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
        mr: 'पुणे व महाराष्ट्रातील स्थानिक उद्योजक, ब्रँड्स आणि सेवांना थेट लक्ष्यित ग्राहकांपर्यंत पोहोचवण्याचे प्रभावी व्यासपीठ.',
        hi: 'पुणे व महाराष्ट्र के स्थानीय व्यवसायों और ब्रांड्स को लक्षित ग्राहकों तक पहुँचाने का विश्वसनीय मंच।',
        en: 'Helping local merchants, startups, and services gain organic visibility and targeted customer reach.'
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
      count: '200+ Videos',
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
        "viewsRaw":  11000,
        "id":  "inb-1",
        "category":  "interviews",
        "title":  {
                      "mr":  "हक्काचा लोकनेता अजितदादा पवार... अभिनेत्याच्या नजरेतून नेता | Sandeep Pathak Exclusive Interview",
                      "hi":  "हक का लोकनेता अजितदादा पवार... अभिनेता की नज़र से नेता | संदीप पाठक विशेष साक्षात्कार",
                      "en":  "People’s Leader Ajitdada Pawar through an Actor’s Lens | Sandeep Pathak Exclusive Interview"
                  },
        "isLatest":  false,
        "thumbnail":  "https://i.ytimg.com/vi/kgZFF-ye7RY/hqdefault.jpg",
        "publishDateDaysAgo":  28,
        "youtubeId":  "kgZFF-ye7RY",
        "isPopular":  true,
        "duration":  "24:15",
        "summary":  {
                        "mr":  "सुप्रसिद्ध अभिनेते संदीप पाठक यांनी उलगडलेले अजित पवार यांच्यासोबतचे भावनिक आणि न ऐकलेले किस्से.",
                        "hi":  "प्रसिद्ध अभिनेता संदीप पाठक ने साझा किए अजित पवार के साथ के अनसुने और भावुक संस्मरण।",
                        "en":  "Popular actor Sandeep Pathak shares candid and heartfelt memories with leader Ajit Pawar."
                    },
        "publishText":  {
                            "mr":  "४ आठवड्यांपूर्वी",
                            "hi":  "४ सप्ताह पहले",
                            "en":  "4 weeks ago"
                        },
        "views":  "11K"
    },
    {
        "viewsRaw":  4200,
        "id":  "inb-2",
        "category":  "interviews",
        "title":  {
                      "mr":  "अजितदादांच्या घरी जेवणाचं आमंत्रण असतंच... संदीप पाठक यांची संपूर्ण मुलाखत",
                      "hi":  "अजितदादा के घर खाने का न्योता होता ही था... संदीप पाठक का विशेष साक्षात्कार",
                      "en":  "Dinner Invitations at Ajitdada\u0027s Residence: Sandeep Pathak\u0027s Uncut Conversation"
                  },
        "isLatest":  false,
        "thumbnail":  "https://i.ytimg.com/vi/0MBv-DqNbms/hqdefault.jpg",
        "publishDateDaysAgo":  27,
        "youtubeId":  "0MBv-DqNbms",
        "isPopular":  true,
        "duration":  "21:10",
        "summary":  {
                        "mr":  "अजित पवार यांच्या साधेपणा आणि आपुलकीविषयी संदीप पाठक यांनी सांगितलेले घरगुती अनुभव.",
                        "hi":  "अजित पवार के आत्मीय स्वभाव और घरेलू संस्कारों पर अभिनेता संदीप पाठक की विशेष चर्चा।",
                        "en":  "Actor Sandeep Pathak highlights the humility, warmth, and personal touch of Ajit Pawar."
                    },
        "publishText":  {
                            "mr":  "४ आठवड्यांपूर्वी",
                            "hi":  "४ सप्ताह पहले",
                            "en":  "4 weeks ago"
                        },
        "views":  "4.2K"
    },
    {
        "viewsRaw":  5600,
        "id":  "inb-3",
        "category":  "interviews",
        "title":  {
                      "mr":  "राष्ट्रवादीच्या भवितव्यावर अमोल कोल्हेंचं मोठं विधान | Amol Kolhe Exclusive Interview",
                      "hi":  "राष्ट्रवादी के भविष्य और समकालीन राजनीति पर डॉ. अमोल कोल्हे का बेबाक साक्षात्कार",
                      "en":  "Future of NCP \u0026 Maharashtra Politics | Dr. Amol Kolhe Exclusive Interview"
                  },
        "isLatest":  false,
        "thumbnail":  "https://i.ytimg.com/vi/Zx8lmueLQ4E/hqdefault.jpg",
        "publishDateDaysAgo":  35,
        "youtubeId":  "Zx8lmueLQ4E",
        "isPopular":  true,
        "duration":  "21:30",
        "summary":  {
                        "mr":  "महाराष्ट्राचे राजकारण, सांस्कृतिक नाटक आणि संसदेतील कार्यावर डॉ. अमोल कोल्हे यांच्याशी दिलखुलास चर्चा.",
                        "hi":  "महाराष्ट्र के समकालीन मुद्दों, सांस्कृतिक अभियानों और संसदीय कार्यप्रणाली पर बेबाक संवाद।",
                        "en":  "In-depth dialogue with MP and acclaimed actor Dr. Amol Kolhe on public governance and arts."
                    },
        "publishText":  {
                            "mr":  "१ महिन्यापूर्वी",
                            "hi":  "१ माह पहले",
                            "en":  "1 month ago"
                        },
        "views":  "5.6K"
    },
    {
        "viewsRaw":  3800,
        "id":  "inb-4",
        "category":  "interviews",
        "title":  {
                      "mr":  "‘मी सावित्रीबाई जोतिराव फुले’ मालिका का थांबली? मालिकेपासून राजकारणापर्यंत... Amol Kolhe Uncut",
                      "hi":  "‘मी सावित्रीबाई जोतिराव फुले’ धारावाहिक क्यों बंद हुआ? डॉ. अमोल कोल्हे अनकट चर्चा",
                      "en":  "Why Was \u0027Savitribai Jyotirao Phule\u0027 Serial Stopped? Dr. Amol Kolhe Uncut"
                  },
        "isLatest":  false,
        "thumbnail":  "https://i.ytimg.com/vi/vlxKIvBo6GI/hqdefault.jpg",
        "publishDateDaysAgo":  34,
        "youtubeId":  "vlxKIvBo6GI",
        "isPopular":  true,
        "duration":  "19:45",
        "summary":  {
                        "mr":  "ऐतिहासिक मालिकांची निर्मिती, सेन्सॉरशिप आणि सामाजिक प्रबोधनावर अमोल कोल्हे यांचे स्पष्ट विचार.",
                        "hi":  "ऐतिहासिक धारावाहिकों के निर्माण और सामाजिक सरोकारों पर डॉ. अमोल कोल्हे की स्पष्ट अभिव्यक्ति।",
                        "en":  "Dr. Amol Kolhe discusses historic television productions, social reform, and broadcast media."
                    },
        "publishText":  {
                            "mr":  "१ महिन्यापूर्वी",
                            "hi":  "१ माह पहले",
                            "en":  "1 month ago"
                        },
        "views":  "3.8K"
    },
    {
        "viewsRaw":  2900,
        "id":  "inb-5",
        "category":  "interviews",
        "title":  {
                      "mr":  "सावित्रीबाई फुलेंची मालिका आणि महाराष्ट्राचं राजकारण, दिलखुलास Amol Kolhe संवाद",
                      "hi":  "सावित्रीबाई फुले धारावाहिक और महाराष्ट्र की राजनीति, अमोल कोल्हे विशेष संवाद",
                      "en":  "Savitribai Phule Legacy \u0026 State Politics | Candid Conversation with Amol Kolhe"
                  },
        "isLatest":  false,
        "thumbnail":  "https://i.ytimg.com/vi/hd7_hym4ExI/hqdefault.jpg",
        "publishDateDaysAgo":  36,
        "youtubeId":  "hd7_hym4ExI",
        "isPopular":  false,
        "duration":  "15:20",
        "summary":  {
                        "mr":  "क्रांतिज्योती सावित्रीबाई फुले यांच्या विचारांची आजच्या महाराष्ट्रातील प्रासंगिकता.",
                        "hi":  "क्रांतिज्योति सावित्रीबाई फुले के विचारों की समकालीन प्रासंगिकता पर विशेष विचार।",
                        "en":  "Exploring the lasting relevance of Savitribai Phule\u0027s social reforms in modern society."
                    },
        "publishText":  {
                            "mr":  "१ महिन्यापूर्वी",
                            "hi":  "१ माह पहले",
                            "en":  "1 month ago"
                        },
        "views":  "2.9K"
    },
    {
        "viewsRaw":  3600,
        "id":  "inb-6",
        "category":  "interviews",
        "title":  {
                      "mr":  "अजितदादा फणसासारखे बाहेरून कडक आतून सहृदयी... उरणच्या नगराध्यक्षा भावना घाणेकरांनी सांगितल्या आठवणी",
                      "hi":  "अजितदादा नारियल जैसे बाहर से सख्त भीतर से कोमल... उरण नगर अध्यक्षा भावना घाणेकर के संस्मरण",
                      "en":  "Bhavana Ghanekar on Ajit Pawar’s Leadership, Governance \u0026 Personal Warmth"
                  },
        "isLatest":  false,
        "thumbnail":  "https://i.ytimg.com/vi/XGgpObCD1yI/hqdefault.jpg",
        "publishDateDaysAgo":  28,
        "youtubeId":  "XGgpObCD1yI",
        "isPopular":  true,
        "duration":  "16:20",
        "summary":  {
                        "mr":  "उरणच्या नगराध्यक्षा भावना घाणेकर यांनी सांगितलेले नागरी विकासाचे निर्णय आणि आठवणी.",
                        "hi":  "उरण की पूर्व नगर अध्यक्षा भावना घाणेकर ने बताए प्रशासनिक निर्णय और आत्मीय संस्मरण।",
                        "en":  "Insights from municipal leadership on civic development, public administration, and mentorship."
                    },
        "publishText":  {
                            "mr":  "४ आठवड्यांपूर्वी",
                            "hi":  "४ सप्ताह पहले",
                            "en":  "4 weeks ago"
                        },
        "views":  "3.6K"
    },
    {
        "viewsRaw":  2100,
        "id":  "inb-7",
        "category":  "interviews",
        "title":  {
                      "mr":  "बहुमत भाजपला, पण नगराध्यक्षा राष्ट्रवादीच्या! भाजपला थेट भिडणाऱ्या भावना घाणेकर यांची विशेष मुलाखत",
                      "hi":  "बहुमत भाजपा को, पर अध्यक्ष राष्ट्रवादी की! भावना घाणेकर का विशेष साक्षात्कार",
                      "en":  "Navigating Municipal Politics: Fiery Leader Bhavana Ghanekar\u0027s Ground Interview"
                  },
        "isLatest":  false,
        "thumbnail":  "https://i.ytimg.com/vi/PBWgWjhMNXw/hqdefault.jpg",
        "publishDateDaysAgo":  60,
        "youtubeId":  "PBWgWjhMNXw",
        "isPopular":  false,
        "duration":  "18:05",
        "summary":  {
                        "mr":  "स्थानिक स्वराज्य संस्थांमधील राजकीय संघर्ष आणि विकासकामांचा आलेख मांडणारी विशेष मुलाखत.",
                        "hi":  "स्थानीय निकायों में विकास कार्यों और राजनीतिक चुनौतियों पर स्पष्ट संवाद।",
                        "en":  "A sharp analysis of grassroots municipal politics, party dynamics, and urban governance."
                    },
        "publishText":  {
                            "mr":  "२ महिन्यांपूर्वी",
                            "hi":  "२ माह पहले",
                            "en":  "2 months ago"
                        },
        "views":  "2.1K"
    },
    {
        "viewsRaw":  1800,
        "id":  "inb-8",
        "category":  "interviews",
        "title":  {
                      "mr":  "Women\u0027s Day Special | राष्ट्रवादीच्या फायरब्रँड नेत्या भावना घाणेकर विशेष मुलाखत",
                      "hi":  "महिला दिवस विशेष | फायरब्रांड नेत्री भावना घाणेकर के साथ प्रेरक संवाद",
                      "en":  "Women\u0027s Day Special | Ground Journey with Leader Bhavana Ghanekar"
                  },
        "isLatest":  false,
        "thumbnail":  "https://i.ytimg.com/vi/V-H_j409l30/hqdefault.jpg",
        "publishDateDaysAgo":  65,
        "youtubeId":  "V-H_j409l30",
        "isPopular":  false,
        "duration":  "11:40",
        "summary":  {
                        "mr":  "महिला दिनानिमित्त महिलांचे राजकीय नेतृत्व आणि समाजकारणातील आव्हानांवर चर्चा.",
                        "hi":  "महिला दिवस पर राजनीति में महिलाओं के नेतृत्व और सामाजिक संघर्षों पर चर्चा।",
                        "en":  "Celebrating women in political leadership and grassroots public administration."
                    },
        "publishText":  {
                            "mr":  "२ महिन्यांपूर्वी",
                            "hi":  "२ माह पहले",
                            "en":  "2 months ago"
                        },
        "views":  "1.8K"
    },
    {
        "viewsRaw":  3100,
        "id":  "inb-9",
        "category":  "interviews",
        "title":  {
                      "mr":  "राजकारणातील महिलांमध्ये काय गॉसप होतं? सना मलिकांनी सांगितलं सिक्रेट | Sana Malik Interview",
                      "hi":  "राजनीति में महिला नेताओं की आपसी चर्चा? सना मलिक ने साझा किए अनुभव",
                      "en":  "Women Leaders in Politics: Sana Malik Candid Conversation \u0026 Insights"
                  },
        "isLatest":  false,
        "thumbnail":  "https://i.ytimg.com/vi/HIgDgfg5fDA/hqdefault.jpg",
        "publishDateDaysAgo":  45,
        "youtubeId":  "HIgDgfg5fDA",
        "isPopular":  true,
        "duration":  "14:50",
        "summary":  {
                        "mr":  "युवा नेत्या सना मलिक यांच्याशी राजकारण, युवा सहभाग आणि महिला नेतृत्वावर दिलखुलास चर्चा.",
                        "hi":  "युवा नेत्री सना मलिक के साथ राजनीतिक संवाद, युवा भागीदारी और महिला नेतृत्व।",
                        "en":  "Youth political leader Sana Malik speaks on modern governance, youth outreach, and party leadership."
                    },
        "publishText":  {
                            "mr":  "१.५ महिन्यापूर्वी",
                            "hi":  "१.५ माह पहले",
                            "en":  "1.5 months ago"
                        },
        "views":  "3.1K"
    },
    {
        "viewsRaw":  1400,
        "id":  "inb-10",
        "category":  "interviews",
        "title":  {
                      "mr":  "Ajit Pawar यांचे शाळेतील शिक्षक माधव जोशी यांनी जुन्या आठवणी सांगितल्या | Exclusive Memories",
                      "hi":  "Ajit Pawar के स्कूली शिक्षक माधव जोशी ने साझा की पुरानी यादें व संस्कार",
                      "en":  "Ajit Pawar’s School Teacher Madhav Joshi Shares Heartfelt Childhood Memories"
                  },
        "isLatest":  false,
        "thumbnail":  "https://i.ytimg.com/vi/Fb_JOo3aY-M/hqdefault.jpg",
        "publishDateDaysAgo":  180,
        "youtubeId":  "Fb_JOo3aY-M",
        "isPopular":  false,
        "duration":  "14:20",
        "summary":  {
                        "mr":  "अजितदादांच्या शालेय जीवनातील शिस्त, अभ्यास आणि संस्कारांविषयी त्यांचे शिक्षक माधव जोशी यांनी जागवलेल्या आठवणी.",
                        "hi":  "अजित पवार के छात्र जीवन, अनुशासन और संघर्ष पर उनके गुरुजी माधव जोशी की आत्मीय चर्चा।",
                        "en":  "An exclusive conversation with Ajit Pawar’s former school teacher on his early discipline and character."
                    },
        "publishText":  {
                            "mr":  "६ महिन्यांपूर्वी",
                            "hi":  "६ महीने पहले",
                            "en":  "6 months ago"
                        },
        "views":  "1.4K"
    },
    {
        "viewsRaw":  2200,
        "id":  "inb-11",
        "category":  "interviews",
        "title":  {
                      "mr":  "अजित पवार हयात असतानाचं अखेरचं पुस्तक... विजय डाकले यांनी सांगितले आठवणीतले दादा",
                      "hi":  "अजित पवार के जीवन पर लिखी गई पुस्तक... लेखक विजय डाकले के संस्मरण",
                      "en":  "Memories in Print: Author Vijay Dakle on Ajit Pawar\u0027s Life Journey"
                  },
        "isLatest":  false,
        "thumbnail":  "https://i.ytimg.com/vi/iyN7mB9GJsc/hqdefault.jpg",
        "publishDateDaysAgo":  50,
        "youtubeId":  "iyN7mB9GJsc",
        "isPopular":  false,
        "duration":  "17:35",
        "summary":  {
                        "mr":  "लेखक विजय डाकले यांनी उलगडलेले पुस्तकाचे संदर्भ आणि अजितदादांचे प्रशासकीय पैलू.",
                        "hi":  "लेखक विजय डाकले ने बताए अजित पवार के प्रशासकीय कौशल और प्रेरक प्रसंग।",
                        "en":  "Biographer Vijay Dakle shares archival stories and insights into Maharashtra\u0027s leadership."
                    },
        "publishText":  {
                            "mr":  "१.५ महिन्यापूर्वी",
                            "hi":  "१.५ माह पहले",
                            "en":  "1.5 months ago"
                        },
        "views":  "2.2K"
    },
    {
        "viewsRaw":  3500,
        "id":  "inb-12",
        "category":  "ground_reports",
        "title":  {
                      "mr":  "उजाड डोंगर हिरवा करणाऱ्या माणसाची गोष्ट | अनंत तायडे Exclusive Interview | 14 Trees | Brown Town",
                      "hi":  "बंजर पहाड़ को हरा-भरा करने वाले व्यक्ति की कहानी | अनंत तायडे विशेष साक्षात्कार | 14 Trees",
                      "en":  "Turning Barren Mountains Green | Anant Tayade Exclusive Interview | 14 Trees Project"
                  },
        "isLatest":  true,
        "thumbnail":  "https://i.ytimg.com/vi/yp3L9ZpXhmc/hqdefault.jpg",
        "publishDateDaysAgo":  12,
        "youtubeId":  "yp3L9ZpXhmc",
        "isPopular":  true,
        "duration":  "18:42",
        "summary":  {
                        "mr":  "ओसाड डोंगरमाथ्यावर तब्बल १४ लाख झाडे लावून निसर्गाचा कायापालट करणाऱ्या अनंत तायडे यांची थक्क करणारी मुलाखत.",
                        "hi":  "बंजर पहाड़ियों पर लाखों पेड़ लगाकर जंगल खड़ा करने वाले पर्यावरणविद् अनंत तायडे की प्रेरक गाथा।",
                        "en":  "The awe-inspiring story of Anant Tayade, who transformed barren hills into thriving lush forests."
                    },
        "publishText":  {
                            "mr":  "१२ दिवसांपूर्वी",
                            "hi":  "१२ दिन पहले",
                            "en":  "12 days ago"
                        },
        "views":  "3.5K"
    },
    {
        "viewsRaw":  1700,
        "id":  "inb-13",
        "category":  "ground_reports",
        "title":  {
                      "mr":  "एका निर्णयाने… ओसाड जमीन झाली जंगल... 14 Trees ची गोष्ट #14trees",
                      "hi":  "एक फैसले से… बंजर ज़मीन बनी घना जंगल... 14 Trees की प्रेरणादायक कहानी",
                      "en":  "One Decision Turned Barren Land into a Forest | The 14 Trees Conservation Journey"
                  },
        "isLatest":  false,
        "thumbnail":  "https://i.ytimg.com/vi/hZbsz5hFkhc/hqdefault.jpg",
        "publishDateDaysAgo":  120,
        "youtubeId":  "hZbsz5hFkhc",
        "isPopular":  false,
        "duration":  "08:35",
        "summary":  {
                        "mr":  "कष्ट, जिद्द आणि पर्यावरण संवर्धनाच्या एका निर्णयाने ओसाड जमिनीचे रूपांतर घनदाट जंगलात कसे झाले?",
                        "hi":  "दृढ़ संकल्प और पर्यावरण संवर्धन से बंजर भूमि को हरे-भरे वन में बदलने की प्रेरक डॉक्यूमेंट्री।",
                        "en":  "A visual documentary detailing how dedicated community efforts revitalized dry lands into natural habitat."
                    },
        "publishText":  {
                            "mr":  "४ महिन्यांपूर्वी",
                            "hi":  "४ महीने पहले",
                            "en":  "4 months ago"
                        },
        "views":  "1.7K"
    },
    {
        "viewsRaw":  2900,
        "id":  "inb-14",
        "category":  "ground_reports",
        "title":  {
                      "mr":  "सेंद्रिय शेती करायला जास्त खर्च येतो का? वसुधा सरदार यांनी सांगितली \u0027संजीवन पद्धत\u0027 #organicfarming",
                      "hi":  "क्या जैविक खेती में अधिक लागत आती है? वसुधा सरदार ने समझाई \u0027संजीवन पद्धति\u0027",
                      "en":  "Is Organic Farming Expensive? Vasudha Sardar Explains the Sanjeevan Farming Method"
                  },
        "isLatest":  false,
        "thumbnail":  "https://i.ytimg.com/vi/QWw7ppwLDsM/hqdefault.jpg",
        "publishDateDaysAgo":  90,
        "youtubeId":  "QWw7ppwLDsM",
        "isPopular":  false,
        "duration":  "13:10",
        "summary":  {
                        "mr":  "कमी खर्चात विषमुक्त व दर्जेदार सेंद्रिय शेती कशी करावी? वसुधा सरदार यांचे शेतकरी बांधवांसाठी मार्गदर्शन.",
                        "hi":  "कम लागत में गुणवत्तापूर्ण जैविक उपज कैसे प्राप्त करें? किसानों के लिए व्यावहारिक दिशा-निर्देश।",
                        "en":  "Actionable guidance on cost-effective, toxin-free sustainable agriculture methods for farmers."
                    },
        "publishText":  {
                            "mr":  "३ महिन्यांपूर्वी",
                            "hi":  "३ महीने पहले",
                            "en":  "3 months ago"
                        },
        "views":  "2.9K"
    },
    {
        "viewsRaw":  3400,
        "id":  "inb-15",
        "category":  "ground_reports",
        "title":  {
                      "mr":  "शेतकरी आत्महत्याग्रस्त विधवा महिलांची \u0027जीवाची मुंबई\u0027, ग्रामीण भागातील महिलांचा मुंबईमध्ये ‘डे आऊट’",
                      "hi":  "किसान आत्महत्या पीड़ित विधवा महिलाओं का मुंबई में \u0027डे आउट\u0027 | ग्राउंड रिपोर्ट",
                      "en":  "Empowering Rural Women: Mumbai Day Out for Farmer Widow Families | Ground Report"
                  },
        "isLatest":  false,
        "thumbnail":  "https://i.ytimg.com/vi/KYxr1lWQzXc/hqdefault.jpg",
        "publishDateDaysAgo":  40,
        "youtubeId":  "KYxr1lWQzXc",
        "isPopular":  true,
        "duration":  "16:15",
        "summary":  {
                        "mr":  "ग्रामीण भागातील कष्टकरी माता-भगिनींना दिलासा देणारा भावनिक उपक्रम आणि प्रेरणादायी ग्राउंड रिपोर्ट.",
                        "hi":  "ग्रामीण पृष्ठभूमि की महिलाओं के आत्मसम्मान और संबल को दर्शाती मानवीय डॉक्यूमेंट्री।",
                        "en":  "A deeply moving ground documentary highlighting community initiatives supporting rural farm families."
                    },
        "publishText":  {
                            "mr":  "१ महिन्यापूर्वी",
                            "hi":  "१ माह पहले",
                            "en":  "1 month ago"
                        },
        "views":  "3.4K"
    },
    {
        "viewsRaw":  2210,
        "id":  "inb-16",
        "category":  "community",
        "title":  {
                      "mr":  "Friendship Day Special ❤️ संदीप पाठकला भेटला जिवलग मित्र | आठवणी आणि गप्पा",
                      "hi":  "Friendship Day Special ❤️ संदीप पाठक को मिला जिगरी यार | आत्मीय बातचीत",
                      "en":  "Friendship Day Special ❤️ Actor Sandeep Pathak Reconnects with Childhood Best Friend"
                  },
        "isLatest":  true,
        "thumbnail":  "https://i.ytimg.com/vi/hGrPZWbxvVQ/hqdefault.jpg",
        "publishDateDaysAgo":  14,
        "youtubeId":  "hGrPZWbxvVQ",
        "isPopular":  false,
        "duration":  "09:15",
        "summary":  {
                        "mr":  "मैत्री दिन विशेष: जिवलग मित्रांच्या गप्पा, बालपणीच्या आठवणी आणि राजकारणापलीकडचे जिव्हाळ्याचे क्षण.",
                        "hi":  "मैत्री दिवस पर पुरानी यादों, बचपन के किस्सों और आत्मीय रिश्तों की दिल को छूने वाली बातचीत।",
                        "en":  "A heartwarming friendship reunion discussing personal journeys, memories, and lifelong bonds."
                    },
        "publishText":  {
                            "mr":  "२ आठवड्यांपूर्वी",
                            "hi":  "२ सप्ताह पहले",
                            "en":  "2 weeks ago"
                        },
        "views":  "2.2K"
    },
    {
        "viewsRaw":  2640,
        "id":  "inb-17",
        "category":  "community",
        "title":  {
                      "mr":  "आषाढी एकादशी | लाखो लोक वारी का करतात? | वारीत दडलंय जगण्याचं तत्त्वज्ञान",
                      "hi":  "आषाढी एकादशी | लाखों लोग वारी क्यों करते हैं? | वारी में छिपा जीवन दर्शन",
                      "en":  "Ashadhi Wari Tradition | Why Millions Walk Hundreds of Kilometers | Spiritual Philosophy"
                  },
        "isLatest":  true,
        "thumbnail":  "https://i.ytimg.com/vi/4MJc53zgthg/hqdefault.jpg",
        "publishDateDaysAgo":  21,
        "youtubeId":  "4MJc53zgthg",
        "isPopular":  false,
        "duration":  "10:45",
        "summary":  {
                        "mr":  "महाराष्ट्राची शतकांची परंपरा असलेल्या आषाढी वारीचे सांस्कृतिक महत्त्व आणि वारकरी तत्त्वज्ञान.",
                        "hi":  "महाराष्ट्र की सदियों पुरानी वारी परंपरा, भक्ति और जीवन जीने के दर्शन पर विशेष प्रस्तुति।",
                        "en":  "Exploring the rich cultural roots, harmony, and timeless devotion behind Maharashtra’s annual Wari pilgrimage."
                    },
        "publishText":  {
                            "mr":  "३ आठवड्यांपूर्वी",
                            "hi":  "३ सप्ताह पहले",
                            "en":  "3 weeks ago"
                        },
        "views":  "2.6K"
    },
    {
        "viewsRaw":  7100,
        "id":  "inb-18",
        "category":  "community",
        "title":  {
                      "mr":  "Valentine\u0027s Day Special | कविता, गझल अन् मैफल... प्रेम दिन विशेष! अक्षर अक्षर तुझेच आहे",
                      "hi":  "Valentine\u0027s Day Special | कविता, ग़ज़ल और महफ़िल... प्रेम दिवस विशेष! अक्षर अक्षर तुझेच आहे",
                      "en":  "Valentine’s Day Musical Concert | Poetry, Ghazals \u0026 Soulful Melody Special"
                  },
        "isLatest":  false,
        "thumbnail":  "https://i.ytimg.com/vi/A4BNYEv6we8/hqdefault.jpg",
        "publishDateDaysAgo":  180,
        "youtubeId":  "A4BNYEv6we8",
        "isPopular":  true,
        "duration":  "32:10",
        "summary":  {
                        "mr":  "कविता, गझल आणि भावस्पर्शी संवादांची रंगलेली सुरेल मैफल - \u0027अक्षर अक्षर तुझेच आहे\u0027 लाईव्ह शो.",
                        "hi":  "कविता, ग़ज़ल और भावपूर्ण संवादों की सुरीली महफ़िल - \u0027अक्षर अक्षर तुझेच आहे\u0027 लाइव शो।",
                        "en":  "An enchanting musical evening of Marathi poetry, ghazals, and timeless melodies."
                    },
        "publishText":  {
                            "mr":  "६ महिन्यांपूर्वी",
                            "hi":  "६ महीने पहले",
                            "en":  "6 months ago"
                        },
        "views":  "7.1K"
    },
    {
        "viewsRaw":  4500,
        "id":  "inb-19",
        "category":  "community",
        "title":  {
                      "mr":  "Brown Town चं एक वर्ष... नवा टप्पा, नवी आव्हानं अन् बरंच काही... #browntown",
                      "hi":  "Brown Town का 1 वर्ष... नया चरण, नई चुनौतियाँ और जमीनी पत्रकारिता",
                      "en":  "One Year of INBrownTown: Milestones, Challenges \u0026 Grassroots Mission"
                  },
        "isLatest":  true,
        "thumbnail":  "https://i.ytimg.com/vi/FmFnsBs6CRY/hqdefault.jpg",
        "publishDateDaysAgo":  30,
        "youtubeId":  "FmFnsBs6CRY",
        "isPopular":  true,
        "duration":  "12:00",
        "summary":  {
                        "mr":  "INBrownTown चॅनेलच्या १ वर्षाच्या प्रवासातील संस्मरणीय मुलाखती आणि पुढील वाटचाल.",
                        "hi":  "INBrownTown के एक वर्ष की पत्रकारिता यात्रा, चुनौतियां और भविष्य की योजनाएं।",
                        "en":  "Reflecting on the 1-year journey of INBrownTown: independent ground reporting and media impact."
                    },
        "publishText":  {
                            "mr":  "१ महिन्यापूर्वी",
                            "hi":  "१ माह पहले",
                            "en":  "1 month ago"
                        },
        "views":  "4.5K"
    },
    {
        "viewsRaw":  1900,
        "id":  "inb-20",
        "category":  "community",
        "title":  {
                      "mr":  "Yashwantrao Chavan Home | आठवणी अन् किस्से... यशवंतरावांचं देवराष्ट्रातलं घर...",
                      "hi":  "यशवंतराव चव्हाण का ऐतिहासिक पैतृक घर देवराष्ट्र... अनसुने किस्से व स्मृतियाँ",
                      "en":  "Historic Roots: Inside Yashwantrao Chavan\u0027s Ancestral Home in Devrashtra"
                  },
        "isLatest":  false,
        "thumbnail":  "https://i.ytimg.com/vi/3TfyURRb9dM/hqdefault.jpg",
        "publishDateDaysAgo":  70,
        "youtubeId":  "3TfyURRb9dM",
        "isPopular":  false,
        "duration":  "14:10",
        "summary":  {
                        "mr":  "महाराष्ट्राचे पहिले मुख्यमंत्री यशवंतराव चव्हाण यांच्या देवराष्ट्रातील घराचे ऐतिहासिक दर्शन.",
                        "hi":  "महाराष्ट्र के प्रथम मुख्यमंत्री यशवंतराव चव्हाण के पैतृक आवास की ऐतिहासिक झलक।",
                        "en":  "Heritage walk and archival memories from the ancestral residence of Yashwantrao Chavan."
                    },
        "publishText":  {
                            "mr":  "२.५ महिन्यांपूर्वी",
                            "hi":  "२.५ माह पहले",
                            "en":  "2.5 months ago"
                        },
        "views":  "1.9K"
    },
    {
        "viewsRaw":  1600,
        "id":  "inb-21",
        "category":  "community",
        "title":  {
                      "mr":  "रोहित आर. आर. पाटील यांचं आवडतं पुस्तक कोणतं? #rohitrrpatil #rohitpatil",
                      "hi":  "रोहित आर. आर. पाटील की पसंदीदा पुस्तकें और विचार | विशेष बातचीत",
                      "en":  "Books That Shape Young Leaders: Rohit R. R. Patil on His Reading Journey"
                  },
        "isLatest":  false,
        "thumbnail":  "https://i.ytimg.com/vi/qTm2FY9SeIY/hqdefault.jpg",
        "publishDateDaysAgo":  55,
        "youtubeId":  "qTm2FY9SeIY",
        "isPopular":  false,
        "duration":  "07:20",
        "summary":  {
                        "mr":  "युवा नेते रोहित पाटील यांच्या वाचन सवयी, आवडती पुस्तके आणि वैचारिक जडणघडण.",
                        "hi":  "युवा नेता रोहित पाटील की पठन संस्कृति और वैचारिक दृष्टिकोण पर संक्षिप्त चर्चा।",
                        "en":  "Young leader Rohit Patil shares books and literary inspirations shaping his public outlook."
                    },
        "publishText":  {
                            "mr":  "२ महिन्यांपूर्वी",
                            "hi":  "२ माह पहले",
                            "en":  "2 months ago"
                        },
        "views":  "1.6K"
    },
    {
        "viewsRaw":  5180,
        "id":  "inb-22",
        "category":  "explainers",
        "title":  {
                      "mr":  "JEE-NEET टॉपर बनण्यासाठी काय करावं? | Dr. Sagar Kalane Academy #neet",
                      "hi":  "JEE-NEET में शीर्ष सफलता कैसे प्राप्त करें? | डॉ. सागर कलाने का मार्गदर्शन",
                      "en":  "Mastering JEE \u0026 NEET: Strategic Preparation Guide by Dr. Sagar Kalane Academy"
                  },
        "isLatest":  false,
        "thumbnail":  "https://i.ytimg.com/vi/5UcDPTN5sI0/hqdefault.jpg",
        "publishDateDaysAgo":  90,
        "youtubeId":  "5UcDPTN5sI0",
        "isPopular":  true,
        "duration":  "15:40",
        "summary":  {
                        "mr":  "स्पर्धा परीक्षांमध्ये यश मिळवण्यासाठी अभ्यास पद्धती, रिव्हिजन तंत्र आणि मानसिक तयारीचे मार्गदर्शन.",
                        "hi":  "प्रतियोगी परीक्षाओं में शीर्ष रैंक हासिल करने के लिए सही अध्ययन रणनीति और तनाव प्रबंधन।",
                        "en":  "Expert study strategies, revision roadmaps, and psychological resilience for competitive exam aspirants."
                    },
        "publishText":  {
                            "mr":  "३ महिन्यांपूर्वी",
                            "hi":  "३ महीने पहले",
                            "en":  "3 months ago"
                        },
        "views":  "5.1K"
    },
    {
        "viewsRaw":  4100,
        "id":  "inb-23",
        "category":  "explainers",
        "title":  {
                      "mr":  "राहुल गांधी यांचे संसदेतील भाषण | संसदेतला तो एक तास जेव्हा मोदी सरकारला घेरलं | Analysis",
                      "hi":  "संसद में राहुल गांधी का चर्चित भाषण | संसद का वह एक घंटा और राष्ट्रीय मुद्दों का विश्लेषण",
                      "en":  "Inside Parliament: Key National Issues \u0026 Political Debate Analysis"
                  },
        "isLatest":  false,
        "thumbnail":  "https://i.ytimg.com/vi/gtCTEnniOks/hqdefault.jpg",
        "publishDateDaysAgo":  180,
        "youtubeId":  "gtCTEnniOks",
        "isPopular":  true,
        "duration":  "12:50",
        "summary":  {
                        "mr":  "संसदेतील चर्चेदरम्यान मांडलेले महत्त्वाचे राष्ट्रीय मुद्दे, जनहित याचिका आणि भाषणाचे सखोल राजकीय विश्लेषण.",
                        "hi":  "संसद के महत्वपूर्ण सत्र में जनहित और राष्ट्रीय मुद्दों पर हुई जोरदार बहस का तथ्यात्मक विश्लेषण।",
                        "en":  "Detailed analytical breakdown of parliamentary debate, economic queries, and public policies."
                    },
        "publishText":  {
                            "mr":  "६ महिन्यांपूर्वी",
                            "hi":  "६ महीने पहले",
                            "en":  "6 months ago"
                        },
        "views":  "4.1K"
    },
    {
        "viewsRaw":  3200,
        "id":  "inb-24",
        "category":  "explainers",
        "title":  {
                      "mr":  "अमेरिका-इराण युद्ध ते पक्षाची नवी दिशा... राज ठाकरे यांची गुढीपाडवा सभा विश्लेषण",
                      "hi":  "राज ठाकरे की गुड़ी पड़वा रैली और भू-राजनीतिक विश्लेषण",
                      "en":  "Geopolitics to Regional Discourse: Analysis of Raj Thackeray\u0027s Gudi Padwa Address"
                  },
        "isLatest":  false,
        "thumbnail":  "https://i.ytimg.com/vi/CVFsgV7zq8A/hqdefault.jpg",
        "publishDateDaysAgo":  75,
        "youtubeId":  "CVFsgV7zq8A",
        "isPopular":  false,
        "duration":  "16:40",
        "summary":  {
                        "mr":  "मनसे प्रमुख राज ठाकरे यांच्या भाषणातील महत्त्वाचे मुद्दे, परराष्ट्र घडामोडी आणि राजकीय विश्लेषण.",
                        "hi":  "राज ठाकरे के भाषण के प्रमुख बिंदुओं और समकालीन राजनीतिक समीकरणों का विश्लेषण।",
                        "en":  "An analytical breakdown of key political and geo-strategic themes from public addresses."
                    },
        "publishText":  {
                            "mr":  "२.५ महिन्यांपूर्वी",
                            "hi":  "२.५ माह पहले",
                            "en":  "2.5 months ago"
                        },
        "views":  "3.2K"
    },
    {
        "viewsRaw":  6200,
        "id":  "inb-25",
        "category":  "explainers",
        "title":  {
                      "mr":  "अवघ्या 3 मिनिटांच्या भाषणाने संसद दणाणली! Imran Pratapgarhi Speech in Rajya Sabha",
                      "hi":  "इमरान प्रतापगढ़ी का राज्यसभा में जोरदार भाषण | विश्लेषण",
                      "en":  "Imran Pratapgarhi Rajya Sabha Address: Public Issues \u0026 Parliamentary Rhetoric"
                  },
        "isLatest":  false,
        "thumbnail":  "https://i.ytimg.com/vi/87NPiwybEqE/hqdefault.jpg",
        "publishDateDaysAgo":  150,
        "youtubeId":  "87NPiwybEqE",
        "isPopular":  true,
        "duration":  "10:15",
        "summary":  {
                        "mr":  "राज्यसभेत मांडलेले जनसामान्यांचे प्रश्न, शिक्षण आणि बेरोजगारीवरील चर्चेचे विश्लेषण.",
                        "hi":  "राज्यसभा में बेरोजगारी, शिक्षा और जनसरोकार पर हुए भाषण का विश्लेषणात्मक विवरण।",
                        "en":  "A review of notable parliamentary interventions on unemployment, education, and civic rights."
                    },
        "publishText":  {
                            "mr":  "५ महिन्यांपूर्वी",
                            "hi":  "५ महीने पहले",
                            "en":  "5 months ago"
                        },
        "views":  "6.2K"
    },
    {
        "viewsRaw":  2800,
        "id":  "inb-26",
        "category":  "explainers",
        "title":  {
                      "mr":  "संसदेतील महत्त्वाचे प्रश्न आणि संजय राऊत यांचे वक्तव्य | राजकीय विश्लेषण",
                      "hi":  "संसद में उठाए गए महत्वपूर्ण प्रश्न और राजनीतिक विमर्श का विश्लेषण",
                      "en":  "Parliamentary Queries \u0026 Political Statements: Critical Analysis"
                  },
        "isLatest":  false,
        "thumbnail":  "https://i.ytimg.com/vi/HAMycPd_pc4/hqdefault.jpg",
        "publishDateDaysAgo":  160,
        "youtubeId":  "HAMycPd_pc4",
        "isPopular":  false,
        "duration":  "11:20",
        "summary":  {
                        "mr":  "संसदेतील चर्चासत्रे, राष्ट्रीय प्रश्न आणि महाराष्ट्राशी संबंधित मुद्द्यांचे वस्तुनिष्ठ विश्लेषण.",
                        "hi":  "संसदीय बहसों और राज्य स्तरीय मुद्दों का निष्पक्ष विश्लेषणात्मक संकलन।",
                        "en":  "Objective journalistic breakdown of key state and national questions raised in Parliament."
                    },
        "publishText":  {
                            "mr":  "५ महिन्यांपूर्वी",
                            "hi":  "५ महीने पहले",
                            "en":  "5 months ago"
                        },
        "views":  "2.8K"
    },
    {
        "viewsRaw":  2400,
        "id":  "inb-27",
        "category":  "explainers",
        "title":  {
                      "mr":  "पुणे जिल्हा परिषद आणि स्थानिक राजकारणातील नवे समीकरण | ग्राउंड विश्लेषण",
                      "hi":  "पुणे ज़िला परिषद और स्थानीय राजनीति के नए समीकरण | विश्लेषणात्मक रिपोर्ट",
                      "en":  "Pune District Governance \u0026 Local Political Realignment | Ground Report"
                  },
        "isLatest":  false,
        "thumbnail":  "https://i.ytimg.com/vi/pYJuvh6ACxc/hqdefault.jpg",
        "publishDateDaysAgo":  140,
        "youtubeId":  "pYJuvh6ACxc",
        "isPopular":  false,
        "duration":  "13:45",
        "summary":  {
                        "mr":  "पुणे जिल्ह्यातील स्थानिक स्वराज्य संस्थांमधील सत्तासमीकरणे आणि विकासनिधीचे वाटप.",
                        "hi":  "पुणे ज़िला परिषद में स्थानीय विकास नीतियों और राजनीतिक गतिशीलता का विश्लेषण।",
                        "en":  "Investigating local governance, development allocations, and civic infrastructure in Pune district."
                    },
        "publishText":  {
                            "mr":  "४.५ महिन्यांपूर्वी",
                            "hi":  "४.५ माह पहले",
                            "en":  "4.5 months ago"
                        },
        "views":  "2.4K"
    },
    {
        "viewsRaw":  3900,
        "id":  "inb-28",
        "category":  "explainers",
        "title":  {
                      "mr":  "महाराष्ट्राच्या राजकारणातील महिला नेतृत्वाची नवी दिशा | अभ्यासपूर्ण विश्लेषण",
                      "hi":  "महाराष्ट्र की राजनीति में महिला नेतृत्व की नई दिशा | विशेष विश्लेषण",
                      "en":  "Women in State Leadership: Changing Dynamics in Maharashtra Politics"
                  },
        "isLatest":  false,
        "thumbnail":  "https://i.ytimg.com/vi/9KMpZ5Pg_Vw/hqdefault.jpg",
        "publishDateDaysAgo":  110,
        "youtubeId":  "9KMpZ5Pg_Vw",
        "isPopular":  true,
        "duration":  "14:15",
        "summary":  {
                        "mr":  "राज्यातील महिलांचे नेतृत्व, धोरणात्मक निर्णय आणि प्रशासनातील बदलत्या वाटा यांवर अभ्यास.",
                        "hi":  "राज्य में नीति निर्धारण और प्रशासन में महिला नेताओं की बढ़ती भूमिका का विश्लेषण।",
                        "en":  "Evaluating policy-making contributions and administrative leadership of women in state politics."
                    },
        "publishText":  {
                            "mr":  "३.५ महिन्यांपूर्वी",
                            "hi":  "३.५ माह पहले",
                            "en":  "3.5 months ago"
                        },
        "views":  "3.9K"
    },
    {
        "viewsRaw":  2600,
        "id":  "inb-29",
        "category":  "explainers",
        "title":  {
                      "mr":  "प्रशासकीय आव्हाने आणि महाराष्ट्राचा विकास आराखडा | विशेष वार्तांकन",
                      "hi":  "प्रशासनिक चुनौतियाँ और महाराष्ट्र का विकास रोडमैप | विशेष रिपोर्ट",
                      "en":  "Administrative Challenges \u0026 State Development Roadmap | Special Report"
                  },
        "isLatest":  false,
        "thumbnail":  "https://i.ytimg.com/vi/-pmCFA_b6U0/hqdefault.jpg",
        "publishDateDaysAgo":  100,
        "youtubeId":  "-pmCFA_b6U0",
        "isPopular":  false,
        "duration":  "12:30",
        "summary":  {
                        "mr":  "राज्यातील पायाभूत सुविधा, कृषी संकट आणि बजेट वाटपावरील तज्ज्ञांचे विश्लेषण.",
                        "hi":  "बुनियादी ढांचे, कृषि नीतियों और बजट आवंटन पर विशेषज्ञों की राय।",
                        "en":  "Examining infrastructural goals, rural economy schemes, and budgetary execution in Maharashtra."
                    },
        "publishText":  {
                            "mr":  "३ महिन्यांपूर्वी",
                            "hi":  "३ महीने पहले",
                            "en":  "3 months ago"
                        },
        "views":  "2.6K"
    },
    {
        "viewsRaw":  2700,
        "id":  "inb-30",
        "category":  "explainers",
        "title":  {
                      "mr":  "पक्ष संघटना, नेतृत्व आणि भविष्यातील दिशा | राजकीय विचारमंथन",
                      "hi":  "संगठन, नेतृत्व और भविष्य की दिशा | राजनीतिक विचार-मंथन",
                      "en":  "Party Organizations \u0026 Future Leadership: Deep Dive Analysis"
                  },
        "isLatest":  false,
        "thumbnail":  "https://i.ytimg.com/vi/MD60jK3Tw24/hqdefault.jpg",
        "publishDateDaysAgo":  130,
        "youtubeId":  "MD60jK3Tw24",
        "isPopular":  false,
        "duration":  "15:00",
        "summary":  {
                        "mr":  "महाराष्ट्रातील पक्षीय संघटना, कार्यकर्ते आणि जनतेच्या अपेक्षांवर आधारित राजकीय विश्लेषण.",
                        "hi":  "राज्य के राजनीतिक संगठनों और जनता के सरोकारों पर आधारित विश्लेषण।",
                        "en":  "A comprehensive analysis of grassroots cadre mobilization and political party strategy."
                    },
        "publishText":  {
                            "mr":  "४ महिन्यांपूर्वी",
                            "hi":  "४ महीने पहले",
                            "en":  "4 months ago"
                        },
        "views":  "2.7K"
    }
]
,

  // Founder Spotlight & Lead Journalist Profile
  founder: {
    name: 'Ms. Ayesha Sayyad',
    nameLocalized: {
      mr: 'सुश्री आयेशा सय्यद (Ms. Ayesha Sayyad)',
      hi: 'सुश्री आयेशा सय्यद (Ms. Ayesha Sayyad)',
      en: 'Ms. Ayesha Sayyad'
    },
    roles: {
      mr: ['संस्थापिका (Founder - INBrownTown)', 'पत्रकार व मुलाखतकार (Journalist & YouTuber)', 'माजी पत्रकार (Ex: ABP Majha, TV9 Marathi)'],
      hi: ['संस्थापिका (Founder - INBrownTown)', 'पत्रकार व साक्षात्कारकर्ता (Journalist & YouTuber)', 'पूर्व पत्रकार (Ex: ABP Majha, TV9 Marathi)'],
      en: ['Founder - INBrownTown', 'Journalist & Lead Interviewer', 'Ex-Journalist (ABP Majha, TV9 Marathi)']
    },
    photo: 'assets/founder_ayesha_sayyad.jpg',
    bioQuote: {
      mr: '“लोकांशी थेट संवाद साधणे, समाजातील खऱ्या नायकांचे कार्य समोर आणणे आणि प्रामाणिक पत्रकारितेतून विश्वासाचे नाते जोडणे हेच INBrownTown चे ध्येय आहे.”',
      hi: '“जमीन से जुड़कर वास्तविक कहानियां सामने लाना, सामाजिक नायकों को मंच देना और निष्पक्ष पत्रकारिता से विश्वास कायम रखना ही INBrownTown का ध्येय है।”',
      en: '“To give a fearless, authentic platform to grassroots changemakers, eco-pioneers, and local businesses whose stories inspire real community action.”'
    },
    story: {
      mr: 'आयेशा सय्यद या अनुभवी पत्रकार आणि युट्यूबर असून त्यांनी यापूर्वी ABP माझा आणि TV9 मराठी यांसारख्या नामांकित वृत्तवाहिन्यांमध्ये काम केले आहे. सध्या त्या INBrownTown च्या माध्यमातून पुणे, मुंबई व संपूर्ण महाराष्ट्रातील सामाजिक, पर्यावरण, सांस्कृतिक व स्थानिक व्यापाराच्या यशोगाथा लोकांपर्यंत पोहोचवत आहेत.',
      hi: 'आयेशा सय्यद एक अनुभवी पत्रकार और यूट्यूबर हैं जिन्होंने पूर्व में ABP माझा और TV9 मराठी में अपनी सेवाएं दी हैं। वर्तमान में वे INBrownTown के माध्यम से महाराष्ट्र के जनसरोकार, पर्यावरण व स्थानीय व्यापार की प्रेरक गाथाएं प्रस्तुत कर रही हैं।',
      en: 'Ayesha Sayyad is a seasoned journalist and YouTuber with extensive broadcast reporting experience at top news networks including ABP Majha and TV9 Marathi. Through INBrownTown, she leads ground-level reporting and transformative interviews across Maharashtra.'
    },
    stats: [
      {
        value: '1.8k+',
        label: {
          mr: 'युट्यूब सदस्य (YT Subscribers)',
          hi: 'यूट्यूब सब्सक्राइबर्स',
          en: 'YouTube Subscribers'
        }
      },
      {
        value: '4.8k+',
        label: {
          mr: 'इन्स्टाग्राम फॉलोअर्स (IG Followers)',
          hi: 'इंस्टाग्राम फॉलोअर्स',
          en: 'Instagram Followers'
        }
      },
      {
        value: '200+',
        label: {
          mr: 'विशेष मुलाखती व संवाद (Interviews)',
          hi: 'विशेष साक्षात्कार व संवाद (Interviews)',
          en: 'Interviews Conducted'
        }
      },
      {
        value: '5+ Years',
        label: {
          mr: 'ग्राउंड मीडिया अनुभव',
          hi: 'ग्राउंड मीडिया अनुभव',
          en: 'Years in Grassroots Media'
        }
      }
    ],
    social: [
      { platform: 'Founder IG (@ayesha.sayyad)', url: 'https://www.instagram.com/ayesha.sayyad/', icon: '📸' },
      { platform: 'Official INBrownTown IG (@inbrowntown)', url: 'https://www.instagram.com/inbrowntown', icon: '✨' },
      { platform: 'YouTube (@INBrownTown)', url: 'https://youtube.com/@inbrowntown', icon: '▶' }
    ]
  }
};

/**
 * INBrownTown - Brand & Channel Data Store
 * Curated YouTube video catalog, milestone stats, core advertising & community activities, pillars, and testimonials.
 * Clarification: INBrownTown specializes in digital advertising, promotional posters, and social media campaigns for busy business owners (no on-site video shooting).
 */

window.INB_BRAND_DATA = {
  // Brand Metadata
  stats: [
    { id: 'stat-subs', value: 250000, suffix: '+', label: { mr: 'युट्यूब व कम्युनिटी सदस्य', hi: 'यूट्यूब व कम्युनिटी सदस्य', en: 'Subscribers & Community' } },
    { id: 'stat-videos', value: 450, suffix: '+', label: { mr: 'क्यूरेटेड व्हिडिओ स्टोरीज', hi: 'क्यूरेटेड वीडियो स्टोरीज', en: 'Curated Video Stories' } },
    { id: 'stat-cities', value: 18, suffix: '+', label: { mr: 'शहरे व जिल्हे कव्हरेज', hi: 'शहर व ज़िले कवरेज', en: 'Districts & Cities Reached' } },
    { id: 'stat-views', value: 5000000, suffix: '+', label: { mr: 'मासिक जाहिरात व चॅनेल रीच', hi: 'मासिक विज्ञापन व चैनल रीच', en: 'Monthly Advertising & Channel Views' } }
  ],

  // What We Do (6 Core Activities: Advertising, Ad Posters, Promotions & Curated Insights)
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
      title: { mr: 'कम्युनिटी स्टोरीज व जागृती', hi: 'कम्युनिटी स्टोरीज व जागरूकता', en: 'Community Stories & Awareness' },
      desc: {
        mr: 'समाजातील प्रेरणादायी व्यक्ती, सामाजिक कार्यकर्ते आणि स्थानिक यशोगाथांचा डिजिटल मंच.',
        hi: 'स्थानीय नायकों, सामाजिक कार्यकर्ताओं और प्रेरक स्थानीय प्रयासों का सशक्त मंच।',
        en: 'Highlighting inspiring local changemakers, public welfare efforts, and community resilience.'
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
      title: { mr: 'योजना व माहिती एक्सप्लेनर', hi: 'योजना व नागरिक विश्लेषण', en: 'Civic & Policy Explainers' },
      desc: {
        mr: 'सरकारी योजना, कायदे आणि बजेटचे नागरिकांसाठी सोप्या भाषेतील अभ्यासपूर्ण विश्लेषणात्मक व्हिडिओ.',
        hi: 'सरकारी योजनाओं, जन-कल्याणकारी नीतियों और नियमों का सरल भाषा में विश्लेषणात्मक संकलन।',
        en: 'Curating clear, simplified explainers on government schemes, public policies, and civic updates.'
      }
    },
    {
      id: 'act-interviews',
      icon: '🎙️',
      title: { mr: 'मुलाखती व पॉडकास्ट संकलन', hi: 'साक्षात्कार व पॉडकास्ट संग्रह', en: 'Interviews & Podcasts' },
      desc: {
        mr: 'तज्ज्ञ, उद्योजक आणि लोकप्रतिनिधींशी झालेल्या महत्त्वाच्या चर्चा आणि पॉडकास्टचे संकलन.',
        hi: 'विशेषज्ञों, सफल उद्यमियों और जन-प्रतिनिधियों की सार्थक चर्चाओं और पॉडकास्ट का संग्रह।',
        en: 'Curated long-form discussions and podcasts featuring decision-makers, innovators, and leaders.'
      }
    }
  ],

  // How We Help (4 Community Pillars)
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
      id: 'ground_reports',
      name: { mr: 'ग्राउंड स्टोरीज', hi: 'ग्राउंड स्टोरीज', en: 'Ground Reports' },
      count: '120+ Videos',
      image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&auto=format&fit=crop&q=80',
      tagline: { mr: 'जमिनीवरची थेट वस्तुस्थिती', hi: 'ज़मीनी सीधी हकीकत', en: 'Field Investigations' }
    },
    {
      id: 'interviews',
      name: { mr: 'सखोल मुलाखती', hi: 'विशेष साक्षात्कार', en: 'Interviews & Podcasts' },
      count: '85+ Videos',
      image: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=800&auto=format&fit=crop&q=80',
      tagline: { mr: 'तज्ज्ञ व नेतृत्व संवाद', hi: 'विशेषज्ञों व दिग्गजों से चर्चा', en: 'Candid Conversations' }
    },
    {
      id: 'explainers',
      name: { mr: 'योजना व पॉलिसी एक्सप्लेनर', hi: 'योजना व नीति एक्सप्लेनर', en: 'Policy Explainers' },
      count: '95+ Videos',
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80',
      tagline: { mr: 'नागरिकांसाठी सोपे विश्लेषण', hi: 'नागरिकों के लिए सरल विश्लेषण', en: 'Simplified Insights' }
    },
    {
      id: 'community',
      name: { mr: 'प्रेरणादायी स्टोरीज', hi: 'प्रेरक जन-गाथाएँ', en: 'Community Heroes' },
      count: '110+ Videos',
      image: 'https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?w=800&auto=format&fit=crop&q=80',
      tagline: { mr: 'सामान्यांची अनोखी ओळख', hi: 'आम लोगों के खास प्रयास', en: 'Grassroots Changemakers' }
    }
  ],

  // Curated Video Gallery (YouTube Embed IDs with High-Res Thumbnails & Meta)
  videos: [
    {
      id: 'vid-1',
      youtubeId: 'kJQP7kiw5Fk',
      category: 'ground_reports',
      duration: '14:28',
      views: '240K',
      thumbnail: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=1200&auto=format&fit=crop&q=80',
      title: {
        mr: 'पुणे मेट्रो टप्पा-२: स्वारगेट ते कात्रज भूमिगत मार्गाचे जमिनीवर नेमके काय काम सुरू आहे?',
        hi: 'पुणे मेट्रो चरण-२: स्वारगेट से कात्रज अंडरग्राउंड लाइन का ज़मीनी मुआयना व स्थिति',
        en: 'Inside Pune Metro Phase 2: Ground Reality of Swargate to Katraj Underground Line'
      },
      summary: {
        mr: 'स्वारगेट, पद्मावती आणि कात्रज परिसरातील भुयारी स्थानके आणि सुरू असलेल्या कामाचा विशेष ग्राउंड रिपोर्ट.',
        hi: 'स्वारगेट, पद्मावती और कात्रज के भूमिगत स्टेशनों के निर्माण का एक्सक्लूसिव ग्राउंड वीडियो।',
        en: 'A comprehensive field report on the tunneling and underground construction across 5.4 km.'
      }
    },
    {
      id: 'vid-2',
      youtubeId: 'JGwWNGJdvx8',
      category: 'explainers',
      duration: '09:45',
      views: '380K',
      thumbnail: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?w=1200&auto=format&fit=crop&q=80',
      title: {
        mr: 'मागेल त्याला सौर कृषी पंप: ९५% अनुदानावर अर्ज कसा करावा? संपूर्ण नियम व माहिती',
        hi: 'मागेल त्याला सोलर कृषि पंप: ९५% सब्सिडी पर कैसे आवेदन करें? पूरी प्रक्रिया',
        en: 'Maharashtra Solar Agriculture Pump Scheme: Complete 95% Subsidy Application Guide'
      },
      summary: {
        mr: 'शेतकऱ्यांसाठी वीज बिलमुक्ती आणि मोफत सौर कृषी पंप मिळवण्याची स्टेप-बाय-स्टेप ऑनलाइन प्रक्रिया.',
        hi: 'किसानों के लिए बिजली बिल से राहत और सोलर पंप पाने की सरल ऑनलाइन व ऑफलाइन विधि।',
        en: 'Step-by-step explainer on farmer eligibility, required documents, and subsidy payout.'
      }
    },
    {
      id: 'vid-3',
      youtubeId: 'OPf0YbXqDm0',
      category: 'ground_reports',
      duration: '11:15',
      views: '195K',
      thumbnail: 'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?w=1200&auto=format&fit=crop&q=80',
      title: {
        mr: 'हिंजवडी आयटी पार्क ट्रॅफिक: AI स्मार्ट सिग्नलमुळे प्रवासाचा वेळ खरंच कमी झाला का?',
        hi: 'हिंजवड़ी आईटी पार्क ट्रैफिक: क्या एआई स्मार्ट सिग्नल्स से सचमुच जाम घटा? ग्राउंड टेस्ट',
        en: 'Hinjawadi IT Park Traffic: Did 12 AI Smart Signals Really Cut Daily Commute Time?'
      },
      summary: {
        mr: 'आयटी इंजिनिअर्स आणि स्थानिक नागरिकांसोबत प्रत्यक्ष प्रवासादरम्यान घेतलेला रिअल-टाइम टेस्ट रिपोर्ट.',
        hi: 'आईटी प्रोफेशनल्स के साथ पीक ऑवर्स में लाइव ट्रैफिक का जायजा और डेटा विश्लेषण।',
        en: 'Testing peak-hour rush in Hinjawadi IT corridor before and after adaptive signal rollout.'
      }
    },
    {
      id: 'vid-4',
      youtubeId: '9bZkp7q19f0',
      category: 'interviews',
      duration: '22:40',
      views: '410K',
      thumbnail: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1200&auto=format&fit=crop&q=80',
      title: {
        mr: 'पुणे सायबर क्राईम इन्व्हेस्टिगेशन: डिजिटल अरेस्ट आणि ऑनलाइन फ्रॉडपासून कसे वाचावे?',
        hi: 'पुणे साइबर क्राइम पड़ताल: डिजिटल अरेस्ट और ऑनलाइन वित्तीय धोखाधड़ी से कैसे बचें?',
        en: 'Pune Cyber Crime Special: How to Protect Yourself from Digital Arrest & Bank Frauds'
      },
      summary: {
        mr: 'सायबर पोलीस उपायुक्तांसोबत थेट पॉडकास्ट चर्चा आणि फ्रॉड कॉल्स ओळखण्याच्या व्यावहारिक टिप्स.',
        hi: 'साइबर सेल के वरिष्ठ अधिकारियों के साथ विशेष चर्चा व नागरिकों के लिए सुरक्षा उपाय।',
        en: 'In-depth interview with cyber forensic experts exposing international racket modus operandi.'
      }
    },
    {
      id: 'vid-5',
      youtubeId: 'fJ9rUzIMcZQ',
      category: 'explainers',
      duration: '08:12',
      views: '520K',
      thumbnail: 'https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?w=1200&auto=format&fit=crop&q=80',
      title: {
        mr: 'मुख्यमंत्री माझी लाडकी बहीण योजना: दरमहा ₹१,५०० कसे मिळवायचे? e-KYC गाइड',
        hi: 'मुख्यमंत्री माझी लाड़की बहिन योजना: प्रति माह ₹१,५०० के लिए ई-केवाईसी कैसे करें?',
        en: 'Majhi Ladki Bahin Yojana: Complete Step-by-Step Direct Benefit Transfer Guide'
      },
      summary: {
        mr: 'अर्ज करताना होणाऱ्या ५ मोठ्या चुका आणि महिलांसाठी बँक खात्याला आधार लिंक करण्याची सोपी पद्धत.',
        hi: 'आवेदन में होने वाली गलतियों से कैसे बचें और घर बैठे मोबाइल से स्टेटस कैसे चेक करें।',
        en: 'Clear visual walkthrough explaining age criteria, Aadhaar seeding, and monthly payout tracking.'
      }
    },
    {
      id: 'vid-6',
      youtubeId: 'hT_nvWreIhg',
      category: 'community',
      duration: '16:05',
      views: '165K',
      thumbnail: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=1200&auto=format&fit=crop&q=80',
      title: {
        mr: 'शेतकऱ्याचा मुलगा ते ₹५० कोटींची कृषी स्टार्टअप: पुणे जिल्ह्यातील युवा उद्योजकाची यशोगाथा',
        hi: 'किसान पुत्र से ₹५० करोड़ का एग्री स्टार्टअप: पुणे के युवा उद्यमी की प्रेरक यात्रा',
        en: 'From Small Farmer’s Son to ₹50 Crore Agri-Tech Enterprise: Inspiring Pune Founder Story'
      },
      summary: {
        mr: 'पारंपरिक शेतीला आधुनिक ड्रोन आणि कोल्ड स्टोरेज तंत्रज्ञानाची जोड देणाऱ्या नवउद्योजकाचा प्रवास.',
        hi: 'ड्रोन तकनीक और आधुनिक जैविक खेती से ग्रामीण युवाओं को रोज़गार देने वाले युवा की कहानी।',
        en: 'Inspiring documentary tracing the growth of an innovative organic agri-supply chain.'
      }
    }
  ],

  // Social Proof & Community Testimonials
  testimonials: [
    {
      id: 'test-1',
      quote: {
        mr: 'INBrownTown च्या ग्राउंड कव्हरेजमुळे आमच्या परिसरातील पिण्याच्या पाण्याचा प्रश्न महापालिकेकडून अवघ्या ४ दिवसांत सोडवला गेला!',
        hi: 'INBrownTown की ग्राउंड रिपोर्ट के बाद हमारे इलाके में सड़क और पानी की समस्या का नगर निगम ने तुरंत समाधान किया!',
        en: 'Thanks to INBrownTown’s civic spotlight, our locality’s drinking water pipeline issue was resolved in just 4 days!'
      },
      author: 'राजेश कुलकर्णी (Rajesh Kulkarni)',
      role: { mr: 'स्थानिक रहिवासी, कोथरूड', hi: 'स्थानीय निवासी, कोथरूड', en: 'Resident, Kothrud, Pune' },
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
      role: { mr: 'संस्थापक, द ग्रीन कप कॅफे', hi: 'संस्थापक, द ग्रीन कप कैफ़े', en: 'Founder, The Green Cup Café' },
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
    },
    {
      id: 'test-3',
      quote: {
        mr: 'कोणताही सनसनाटीपणा न आणता सरकारी योजनांची खरी माहिती देणारा हा महाराष्ट्रातील सर्वाधिक विश्वासार्ह डिजिटल चॅनेल आहे.',
        hi: 'बिना किसी सनसनी के सरकारी नीतियों का सही विश्लेषण प्रस्तुत करने वाला सबसे प्रामाणिक डिजिटल मंच।',
        en: 'One of the rare media channels that focuses purely on grounded facts, citizen welfare, and real community impact.'
      },
      author: 'अॅड. सचिन पाटील (Adv. Sachin Patil)',
      role: { mr: 'कायदेतज्ज्ञ व विश्लेषक', hi: 'विधिक विशेषज्ञ व विश्लेषक', en: 'Legal Advisor & Public Policy Analyst' },
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80'
    }
  ]
};

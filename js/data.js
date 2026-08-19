/**
 * INBrownTown - Brand & Channel Data Store
 * Curated YouTube video catalog, milestone stats, core activities, community pillars, and testimonials.
 */

window.INB_BRAND_DATA = {
  // Brand Metadata
  stats: [
    { id: 'stat-subs', value: 250000, suffix: '+', label: { mr: 'युट्यूब व कम्युनिटी सदस्य', hi: 'यूट्यूब व कम्युनिटी सदस्य', en: 'Subscribers & Community' } },
    { id: 'stat-videos', value: 450, suffix: '+', label: { mr: 'ग्राउंड व्हिडिओ स्टोरीज', hi: 'ग्राउंड वीडियो स्टोरीज', en: 'Ground Video Reports' } },
    { id: 'stat-cities', value: 18, suffix: '+', label: { mr: 'शहरे व जिल्हे कव्हर', hi: 'शहर व ज़िले कवर्ड', en: 'Districts & Cities Covered' } },
    { id: 'stat-views', value: 5000000, suffix: '+', label: { mr: 'मासिक व्ह्यूज व रीच', hi: 'मासिक व्यूज़ व रीच', en: 'Monthly Channel Views' } }
  ],

  // What We Do (6 Core Activities)
  activities: [
    {
      id: 'act-ground',
      icon: '🎥',
      title: { mr: 'ग्राउंड रिपोर्टिंग', hi: 'ग्राउंड रिपोर्टिंग', en: 'Ground Reporting' },
      desc: {
        mr: 'स्थानिक समस्या, नागरिकांचे प्रश्न आणि जमिनीवरच्या थेट वास्तवाचे निष्पक्ष व्हिडिओ कव्हरेज.',
        hi: 'स्थानीय समस्याओं, नागरिकों के प्रश्नों और ज़मीनी हकीकत का निष्पक्ष वीडियो कवरेज।',
        en: 'Unfiltered, on-the-ground visual investigation of real civic problems and grassroots reality.'
      }
    },
    {
      id: 'act-community',
      icon: '🤝',
      title: { mr: 'कम्युनिटी स्टोरीज', hi: 'कम्युनिटी स्टोरीज', en: 'Community Stories' },
      desc: {
        mr: 'सामान्यांमधील असामान्य व्यक्ती, सामाजिक कार्यकर्ते आणि प्रेरणादायी स्थानिक यशोगाथा.',
        hi: 'आम लोगों में छुपे खास नायकों, सामाजिक कार्यकर्ताओं और प्रेरक स्थानीय गाथाओं का मंच।',
        en: 'Spotlighting inspiring everyday heroes, grassroots changemakers, and local resilience.'
      }
    },
    {
      id: 'act-civic',
      icon: '📢',
      title: { mr: 'नागरी प्रश्न व पाठपुरावा', hi: 'नागरिक मुद्दे व फॉलोअप', en: 'Civic Issue Follow-ups' },
      desc: {
        mr: 'पाणी, रस्ते, वाहतूक यांसारख्या सार्वजनिक समस्या मांडून प्रशासनाकडून सोडवणुकीचा पाठपुरावा.',
        hi: 'पानी, सड़क, ट्रैफिक जैसे जनहित के मुद्दों को उठाकर प्रशासनिक समाधान के लिए लगातार फॉलोअप।',
        en: 'Raising critical public infrastructure issues and following up relentlessly with authorities.'
      }
    },
    {
      id: 'act-interviews',
      icon: '🎙️',
      title: { mr: 'सखोल मुलाखती व पॉडकास्ट', hi: 'गहन साक्षात्कार व पॉडकास्ट', en: 'In-Depth Interviews' },
      desc: {
        mr: 'तज्ज्ञ, प्रशासकीय अधिकारी, उद्योजक आणि लोकप्रतिनिधींशी रोखठोक चर्चा.',
        hi: 'विशेषज्ञों, प्रशासनिक अधिकारियों, उद्यमियों और जन-प्रतिनिधियों के साथ सार्थक बातचीत।',
        en: 'Candid, long-form conversations with decision-makers, thought leaders, and innovators.'
      }
    },
    {
      id: 'act-explainers',
      icon: '💡',
      title: { mr: 'सोप्या भाषेतील एक्सप्लेनर', hi: 'सरल भाषा में एक्सप्लेनर', en: 'Policy & Civic Explainers' },
      desc: {
        mr: 'सरकारी योजना, कायदे, बजेट आणि तंत्रज्ञानाचे नागरिकांसाठी सोप्या भाषेत विश्लेषणात्मक व्हिडिओ.',
        hi: 'सरकारी योजनाओं, कानूनों, बजट और नई तकनीकों का नागरिकों के लिए सरल दृश्य विश्लेषण।',
        en: 'Deconstructing complex government policies, civic laws, and economic updates into clear videos.'
      }
    },
    {
      id: 'act-campaigns',
      icon: '🚀',
      title: { mr: 'सोशल मीडिया मोहिमा', hi: 'सोशल मीडिया अभियान', en: 'Impact Media Campaigns' },
      desc: {
        mr: 'स्थानिक व्यवसाय, ब्रँड्स आणि सामाजिक प्रकल्पांसाठी प्रभावी डिजिटल व्हिडिओ निर्मिती व प्रमोशन.',
        hi: 'स्थानीय व्यवसायों, ब्रांड्स और सामाजिक अभियानों के लिए प्रभावशाली डिजिटल वीडियो निर्माण।',
        en: 'Creative high-impact video production and targeted digital distribution for brands and causes.'
      }
    }
  ],

  // How We Help (4 Community Pillars)
  pillars: [
    {
      id: 'pil-1',
      number: '01',
      title: { mr: 'नागरिकांच्या आवाजाला हक्काचे व्यासपीठ', hi: 'नागरिकों की आवाज़ को सशक्त मंच', en: 'Amplifying Local Voices' },
      desc: {
        mr: 'जिथे मुख्य प्रवाहातील मीडिया पोहोचत नाही, तिथे जाऊन आम्ही लोकांच्या थेट समस्या व विचार मांडतो.',
        hi: 'जहाँ मुख्यधारा का मीडिया नहीं पहुँचता, वहाँ हम स्थानीय लोगों के मुद्दे और दृष्टिकोण सामने लाते हैं।',
        en: 'We go where mainstream outlets rarely venture, giving citizens a powerful megaphone for their stories.'
      }
    },
    {
      id: 'pil-2',
      number: '02',
      title: { mr: 'समस्या मांडण्यापासून सोडवणुकीपर्यंत', hi: 'मुद्दे उठाने से लेकर समाधान तक', en: 'From Awareness to Action' },
      desc: {
        mr: 'केवळ व्हिडिओ प्रसिद्ध न करता, संबंधित विभागाशी संपर्क साधून समस्येचे निवारण होईपर्यंत सातत्यपूर्ण पाठपुरावा.',
        hi: 'केवल वीडियो दिखाना नहीं, बल्कि संबंधित विभाग से संपर्क कर समाधान होने तक लगातार ट्रैक करना।',
        en: 'We do not just publish and forget; we coordinate with local authorities until action is taken.'
      }
    },
    {
      id: 'pil-3',
      number: '03',
      title: { mr: 'स्थानिक व्यवसायांना डिजिटल बळ', hi: 'स्थानीय व्यवसायों को डिजिटल बढ़ावा', en: 'Supporting Local Businesses' },
      desc: {
        mr: 'पुणे व महाराष्ट्रातील उद्योजक, कॅफे आणि ब्रँड्सना डिजिटल विश्वात लाखोंपर्यंत पोहोचण्यास मदत.',
        hi: 'पुणे व महाराष्ट्र के उद्यमियों, कैफ़े और ब्रांड्स को लाखों लक्षित ग्राहकों तक पहुँचाने में सहयोग।',
        en: 'Empowering local merchants, entrepreneurs, and services with high-converting video storytelling.'
      }
    },
    {
      id: 'pil-4',
      number: '04',
      title: { mr: 'विश्वासार्ह व निष्पक्ष माहिती', hi: 'सत्यापित और निष्पक्ष जानकारी', en: 'Grounded & Unbiased Truth' },
      desc: {
        mr: 'सनसनाटीला थारा न देता, पुराव्यांसह आणि थेट लोकांच्या अनुभवांवर आधारित सत्य मांडण्याची कटिबद्धता.',
        hi: 'सनसनी से परे, प्रामाणिक तथ्यों और ज़मीनी अनुभवों पर आधारित सत्य पत्रकारिता का संकल्प।',
        en: 'Committed to verified journalism with zero sensationalism, rooted in genuine human experiences.'
      }
    }
  ],

  // Content Categories Showcase
  categories: [
    {
      id: 'ground_reports',
      name: { mr: 'ग्राउंड रिपोर्ट्स', hi: 'ग्राउंड रिपोर्ट्स', en: 'Ground Reports' },
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
      youtubeId: 'kJQP7kiw5Fk', // Despacito / sample clean high-def video ID for flawless iframe playback
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
      youtubeId: 'JGwWNGJdvx8', // Ed Sheeran Shape of You clean embed
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
      youtubeId: 'OPf0YbXqDm0', // Mark Ronson Uptown Funk clean embed
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
      youtubeId: '9bZkp7q19f0', // PSY GANGNAM STYLE clean embed
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
      youtubeId: 'fJ9rUzIMcZQ', // Queen Bohemian Rhapsody clean embed
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
      youtubeId: 'hT_nvWreIhg', // Counting Stars clean embed
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
        mr: 'INBrownTown च्या ग्राउंड रिपोर्टमुळे आमच्या परिसरातील पिण्याच्या पाण्याचा प्रश्न महापालिकेकडून अवघ्या ४ दिवसांत सोडवला गेला!',
        hi: 'INBrownTown की ग्राउंड रिपोर्ट के बाद हमारे इलाके में सड़क और पानी की समस्या का नगर निगम ने तुरंत समाधान किया!',
        en: 'Thanks to INBrownTown’s ground investigation, our locality’s drinking water pipeline issue was resolved in just 4 days!'
      },
      author: 'राजेश कुलकर्णी (Rajesh Kulkarni)',
      role: { mr: 'स्थानिक रहिवासी, कोथरूड', hi: 'स्थानीय निवासी, कोथरूड', en: 'Resident, Kothrud, Pune' },
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
    },
    {
      id: 'test-2',
      quote: {
        mr: 'INBrownTown च्या व्हिडिओ प्रमोशनमुळे आमच्या पुण्याच्या कॅफे ब्रँडला पहिल्याच महिन्यात ५०,००० पेक्षा जास्त स्थानिक ग्राहक पोहोच मिळाले.',
        hi: 'INBrownTown के वीडियो प्रमोशन से हमारे कैफ़े को पहले ही महीने में ५०,००० से अधिक नए ग्राहकों तक पहुँच मिली।',
        en: 'Partnering with INBrownTown gave our newly launched organic café an authentic reach of 50k+ targeted local food lovers.'
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

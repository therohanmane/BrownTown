/**
 * INBrownTown video catalogue.
 *
 * - youtubeId + title: verified against YouTube oEmbed (channel "Brown Town",
 *   https://www.youtube.com/@INBrownTown) on 2026-10-24. Titles are the
 *   original published titles and are shown as-is in every language.
 * - gloss: faithful English/Hindi renderings of the original Marathi title, for
 *   featured stories only. Shown as a secondary line, never instead of the title.
 *   The previous site's per-video summaries were removed: several described
 *   content that the titles do not support.
 * - category: carried over from the previous site.
 *
 * Duration and publish date are NOT stored here. They are merged in from
 * video-meta.json, which is produced by scripts/sync-youtube-meta.mjs using the
 * official YouTube Data API. Until that runs, cards show no duration/date
 * rather than unverified numbers. The previous site also showed view counts
 * and relative dates that could not be verified; they were removed.
 */
export const VIDEOS = [
  {
    "youtubeId": "kgZFF-ye7RY",
    "category": "interviews",
    "title": "हक्काचा लोकनेता अजितदादा पवार... अभिनेत्याच्या नजरेतून नेता | Sandeep Pathak Exclusive Interview",
    "gloss": {
      "en": "Ajitdada Pawar, a people’s leader seen through an actor’s eyes | Sandeep Pathak interview",
      "hi": "जनता के नेता अजितदादा पवार, एक अभिनेता की नज़र से | संदीप पाठक इंटरव्यू"
    }
  },
  {
    "youtubeId": "0MBv-DqNbms",
    "category": "interviews",
    "title": "अजितदादांच्या घरी जेवणाचं आमंत्रण असतंच... संदीप पाठक यांची संपूर्ण मुलाखत आज दुपारी 2 वाजता"
  },
  {
    "youtubeId": "Zx8lmueLQ4E",
    "category": "interviews",
    "title": "राष्ट्रवादीच्या भवितव्यावर अमोल कोल्हेंचं मोठं विधान | Amol Kolhe Exclusive Interview"
  },
  {
    "youtubeId": "vlxKIvBo6GI",
    "category": "interviews",
    "title": "‘मी सावित्रीबाई जोतिराव फुले’ मालिका का थांबली? मालिकेपासून राजकारणापर्यंत... Amol Kolhe Uncut"
  },
  {
    "youtubeId": "hd7_hym4ExI",
    "category": "interviews",
    "title": "सावित्रीबाईं फुलेंची मालिका आणि महाराष्ट्राचं राजकारण, दिलखुलास Amol Kolhe उद्या दु. 2 वाजता"
  },
  {
    "youtubeId": "XGgpObCD1yI",
    "category": "interviews",
    "title": "अजितदादा फणसासारखे बाहेरून कडक आतून सहृदयी... उरणच्या नगराध्यक्षा भावना घाणेकरांनी सांगितल्या आठवणी"
  },
  {
    "youtubeId": "PBWgWjhMNXw",
    "category": "interviews",
    "title": "बहुमत भाजपला, पण नगराध्यक्षा राष्ट्रवादीच्या! भाजपला थेट भिडणाऱ्या भावना घाणेकर यांची विशेष मुलाखत"
  },
  {
    "youtubeId": "V-H_j409l30",
    "category": "interviews",
    "title": "Women's Day Special | राष्ट्रवादीच्या फायरब्रँड नेत्या भावना घाणेकर Trailer | Bhavana Ghanekar"
  },
  {
    "youtubeId": "HIgDgfg5fDA",
    "category": "interviews",
    "title": "राजकारणातील महिलांमध्ये काय गॉसप होतं? सना मलिकांनी सांगितलं सिक्रेट"
  },
  {
    "youtubeId": "Fb_JOo3aY-M",
    "category": "interviews",
    "title": "Ajit Pawar  यांचे शाळेतील शिक्षक माधव जोशी यांनी जुन्या आठवणी सांगितल्या | ajit pawar plane crash"
  },
  {
    "youtubeId": "iyN7mB9GJsc",
    "category": "interviews",
    "title": "अजित पवार हयात असतानाचं अखेरचं पुस्तक... विजय डाकले यांनी सांगितले आठवणीतले दादा"
  },
  {
    "youtubeId": "yp3L9ZpXhmc",
    "category": "ground_reports",
    "title": "उजाड डोंगर हिरवा करणाऱ्या माणसाची गोष्ट |  अनंत तायडे Exclusive Interview | 14 Trees | Brown Town",
    "gloss": {
      "en": "The story of a man who turned barren hills green | Anant Tayade, 14 Trees",
      "hi": "उजाड़ पहाड़ों को हरा-भरा करने वाले इंसान की कहानी | अनंत तायडे, 14 Trees"
    }
  },
  {
    "youtubeId": "hZbsz5hFkhc",
    "category": "ground_reports",
    "title": "एका निर्णयाने… ओसाड जमीन झाली जंगल... 14 Trees ची गोष्ट #14trees"
  },
  {
    "youtubeId": "QWw7ppwLDsM",
    "category": "ground_reports",
    "title": "सेंद्रिय शेती करायला जास्त खर्च येता का? वसुधा सरदार यांनी सांगितली 'संजीवन पद्धत' #organicfarming",
    "gloss": {
      "en": "Does organic farming cost more? Vasudha Sardar explains the ‘Sanjeevan’ method",
      "hi": "क्या जैविक खेती ज़्यादा महंगी है? वसुधा सरदार ने बताई ‘संजीवन पद्धति’"
    }
  },
  {
    "youtubeId": "KYxr1lWQzXc",
    "category": "ground_reports",
    "title": "शेतकरी आत्महत्याग्रस्त विधवा महिलांची 'जीवाची मुंबई', ग्रामीण भागातील महिलांचा मुंबईमध्ये ‘डे आऊट’",
    "gloss": {
      "en": "A day out in Mumbai for widows of farmers who died by suicide",
      "hi": "किसान आत्महत्या से प्रभावित विधवा महिलाओं का मुंबई में ‘डे आउट’"
    }
  },
  {
    "youtubeId": "hGrPZWbxvVQ",
    "category": "community",
    "title": "Friendship Day Special ❤️ संदीप पाठकला भेटला जिवलग मित्र | अजित पवारांच्या आठवणी"
  },
  {
    "youtubeId": "4MJc53zgthg",
    "category": "community",
    "title": "आषाढी एकादशी 2026 | लाखो लोक वारी का करतात? | वारीत दडलंय जगण्याचं तत्त्वज्ञान",
    "gloss": {
      "en": "Ashadhi Ekadashi 2026 | Why do lakhs of people walk the Wari?",
      "hi": "आषाढ़ी एकादशी 2026 | लाखों लोग वारी क्यों करते हैं?"
    }
  },
  {
    "youtubeId": "A4BNYEv6we8",
    "category": "community",
    "title": "Valentine's day | कविता, गझल अन् मैफल... प्रेम दिन विशेष! akshar akshar tuzech ahe live show"
  },
  {
    "youtubeId": "FmFnsBs6CRY",
    "category": "community",
    "title": "Brown Town चं एक वर्ष... नवा टप्पा, नवी आव्हानं अन् बरंच काही...  #browntown #browntownwithayesha"
  },
  {
    "youtubeId": "3TfyURRb9dM",
    "category": "community",
    "title": "Yashwantrao chavan home | आठवणी अन् किस्से... यशवंतरावांचं देवराष्ट्रातलं घर..."
  },
  {
    "youtubeId": "qTm2FY9SeIY",
    "category": "community",
    "title": "रोहित आर. आर. पाटील यांचं आवडतं पुस्तक कोणतं? #rohitrrpatil #rohitpatil"
  },
  {
    "youtubeId": "5UcDPTN5sI0",
    "category": "explainers",
    "title": "JEE-NEET टॉपर बनण्यासाठी काय करावं? | Dr. Sagar Kalane Academy #neet"
  },
  {
    "youtubeId": "gtCTEnniOks",
    "category": "explainers",
    "title": "rahul gandhi speech | संसदेतला तो एक तास जेव्हा राहुल गांधींनी मोदी सरकारला घेरलं"
  },
  {
    "youtubeId": "CVFsgV7zq8A",
    "category": "explainers",
    "title": "अमेरिका-इराण युद्ध ते पक्षाची नवी दिशा... राज ठाकरे यांची गुढीपाडवा सभा"
  },
  {
    "youtubeId": "87NPiwybEqE",
    "category": "explainers",
    "title": "अवघ्या 3 मिनिटांच्या भाषणाने संसद दणाणली! Imran Pratapgarhi Speech in Rajyasabha"
  },
  {
    "youtubeId": "HAMycPd_pc4",
    "category": "explainers",
    "title": "ajit pawar यांच्या मृत्यूबाबत sanjay raut यांचं संसदेत भाष्य, थेट प्रश्न विचारला"
  },
  {
    "youtubeId": "pYJuvh6ACxc",
    "category": "explainers",
    "title": "pune zp election result | पुण्यात राष्ट्रवादीची एकहाती सत्ता after ajit pawar death"
  },
  {
    "youtubeId": "9KMpZ5Pg_Vw",
    "category": "explainers",
    "title": "DCM Sunetra Pawar | राणी बनली 'महाराणी'... गोष्ट महाराष्ट्राच्या राजकारणाशी सुसंगत अन् समांतर...."
  },
  {
    "youtubeId": "-pmCFA_b6U0",
    "category": "explainers",
    "title": "उपमुख्यमंत्री होणं सोपं, पण समोर आव्हानांचा डोंगर... Sunetra pawar यांना सिद्ध करावं लागेल"
  },
  {
    "youtubeId": "MD60jK3Tw24",
    "category": "explainers",
    "title": "Sunetra Pawar | Ajit Pawar दादांच्या निधनानंतर पक्षाची धुरा कुणाकडे असावी?"
  }
];

/** Stories given editorial prominence on the homepage (order matters). */
export const FEATURED_IDS = ["yp3L9ZpXhmc", "KYxr1lWQzXc", "4MJc53zgthg", "QWw7ppwLDsM", "kgZFF-ye7RY"];

export const CATEGORIES = ["interviews", "ground_reports", "community", "explainers"];

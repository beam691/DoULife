/* ============================================================
   data/reading.js — READING CURRICULUM (36 units, source content)
   ------------------------------------------------------------
   18 grammar topics x 2 units (A = Basic, B = Applied)
   แต่ละ unit: 1 passage + 3 grammar questions + 1 comprehension
   = 144 questions total. answerKey ใช้ index เริ่มจาก 0
   เนื้อหาและเฉลยยึดตามที่ผู้ใช้กำหนด ไม่ได้แก้ไขเอง
   ============================================================ */
const readingUnits = [
 {
  "id": "reading_01A",
  "topicId": 1,
  "title": "Present Simple — Basic",
  "level": "basic",
  "grammarFocus": "Present Simple",
  "passage": "Napat ___(1) up at six every morning. She ___(2) a cup of tea and ___(3) the news before school. Her classes start at eight and finish at four.",
  "questions": [
   {
    "q": "Napat ___ up at six every morning.",
    "choices": [
     "wake",
     "wakes",
     "waking",
     "woke"
    ],
    "type": "grammar",
    "exp": "ประธาน Napat เอกพจน์ เติม s → wakes"
   },
   {
    "q": "She ___ a cup of tea before school.",
    "choices": [
     "drink",
     "drinks",
     "drank",
     "drinking"
    ],
    "type": "grammar",
    "exp": "กิจวัตรประจำวัน + ประธานเอกพจน์ → drinks"
   },
   {
    "q": "She ___ the news every day.",
    "choices": [
     "read",
     "reads",
     "reading",
     "was reading"
    ],
    "type": "grammar",
    "exp": "every day = Present Simple, ประธานเอกพจน์ → reads"
   },
   {
    "q": "What time do her classes start?",
    "choices": [
     "Six",
     "Seven",
     "Eight",
     "Nine"
    ],
    "type": "comprehension",
    "exp": "ในบทอ่านระบุว่า classes start at eight"
   }
  ],
  "answerKey": [
   1,
   1,
   1,
   2
  ]
 },
 {
  "id": "reading_01B",
  "topicId": 1,
  "title": "Present Simple — Applied",
  "level": "applied",
  "grammarFocus": "Present Simple",
  "passage": "Millions of people ___(1) to work every day in Bangkok. Traffic often ___(2) slowly during rush hour. Many residents ___(3) on the BTS and MRT because they run on time.",
  "questions": [
   {
    "q": "Millions of people ___ to work every day.",
    "choices": [
     "commute",
     "commutes",
     "commuting",
     "commuted"
    ],
    "type": "grammar",
    "exp": "ประธานพหูพจน์ (people) ไม่เติม s"
   },
   {
    "q": "Traffic often ___ slowly during rush hour.",
    "choices": [
     "move",
     "moves",
     "moving",
     "moved"
    ],
    "type": "grammar",
    "exp": "Traffic เป็นนามนับไม่ได้ ถือเป็นเอกพจน์ → moves"
   },
   {
    "q": "Many residents ___ on public transport.",
    "choices": [
     "rely",
     "relies",
     "relying",
     "relied"
    ],
    "type": "grammar",
    "exp": "residents เป็นพหูพจน์ → rely"
   },
   {
    "q": "Why do residents prefer the BTS and MRT?",
    "choices": [
     "They're cheaper",
     "They avoid traffic",
     "They're new",
     "They're scenic"
    ],
    "type": "comprehension",
    "exp": "บทอ่านบอกว่ารถไฟฟ้าตรงเวลา จึงเลี่ยงรถติดได้"
   }
  ],
  "answerKey": [
   0,
   1,
   0,
   1
  ]
 },
 {
  "id": "reading_02A",
  "topicId": 2,
  "title": "Present Continuous — Basic",
  "level": "basic",
  "grammarFocus": "Present Continuous",
  "passage": "Right now, Ploy ___(1) at her desk. She ___(2) an email to her teacher. Meanwhile, her brother ___(3) a cooking show in the living room.",
  "questions": [
   {
    "q": "Ploy ___ at her desk right now.",
    "choices": [
     "sit",
     "sits",
     "is sitting",
     "sat"
    ],
    "type": "grammar",
    "exp": "right now → is + V-ing"
   },
   {
    "q": "She ___ an email at the moment.",
    "choices": [
     "write",
     "writes",
     "is writing",
     "wrote"
    ],
    "type": "grammar",
    "exp": "at the moment → is + V-ing"
   },
   {
    "q": "Her brother ___ a cooking show now.",
    "choices": [
     "watch",
     "watches",
     "is watching",
     "watched"
    ],
    "type": "grammar",
    "exp": "now → is + V-ing"
   },
   {
    "q": "Why is Ploy writing the email?",
    "choices": [
     "To complain",
     "To ask for homework",
     "To say thanks",
     "To cancel class"
    ],
    "type": "comprehension",
    "exp": "เธอเขียนอีเมลถึงครูเพื่อถามเรื่องการบ้าน"
   }
  ],
  "answerKey": [
   2,
   2,
   2,
   1
  ]
 },
 {
  "id": "reading_02B",
  "topicId": 2,
  "title": "Present Continuous — Applied",
  "level": "applied",
  "grammarFocus": "Present Continuous",
  "passage": "Scientists ___(1) how rising temperatures affect coral reefs. Researchers ___(2) samples and ___(3) water conditions daily.",
  "questions": [
   {
    "q": "Scientists ___ the effects of temperature right now.",
    "choices": [
     "study",
     "studies",
     "are studying",
     "studied"
    ],
    "type": "grammar",
    "exp": "right now + ประธานพหูพจน์ → are studying"
   },
   {
    "q": "Researchers ___ samples this month.",
    "choices": [
     "collect",
     "collects",
     "are collecting",
     "collected"
    ],
    "type": "grammar",
    "exp": "this month = ช่วงเวลาชั่วคราว → are collecting"
   },
   {
    "q": "They ___ water conditions daily at present.",
    "choices": [
     "monitor",
     "monitors",
     "are monitoring",
     "monitored"
    ],
    "type": "grammar",
    "exp": "at present → are monitoring"
   },
   {
    "q": "Why are teams working together?",
    "choices": [
     "It's required",
     "To share findings quickly",
     "To save money",
     "To compete"
    ],
    "type": "comprehension",
    "exp": "ทีมวิจัยทำงานร่วมกันเพื่อแบ่งปันผลการค้นพบได้เร็วขึ้น"
   }
  ],
  "answerKey": [
   2,
   2,
   2,
   1
  ]
 },
 {
  "id": "reading_03A",
  "topicId": 3,
  "title": "Past Simple — Basic",
  "level": "basic",
  "grammarFocus": "Past Simple",
  "passage": "Last weekend, Ton ___(1) his grandmother in Chiang Mai. He ___(2) a bus early in the morning and ___(3) at noon.",
  "questions": [
   {
    "q": "Ton ___ his grandmother last weekend.",
    "choices": [
     "visit",
     "visits",
     "visited",
     "visiting"
    ],
    "type": "grammar",
    "exp": "last weekend → Past Simple, visit เป็นกริยาปกติ → visited"
   },
   {
    "q": "He ___ a bus early in the morning.",
    "choices": [
     "take",
     "takes",
     "took",
     "taking"
    ],
    "type": "grammar",
    "exp": "take เป็นกริยาอปกติ ช่อง 2 = took"
   },
   {
    "q": "He ___ at noon.",
    "choices": [
     "arrive",
     "arrives",
     "arrived",
     "arriving"
    ],
    "type": "grammar",
    "exp": "เหตุการณ์จบแล้วในอดีต → arrived"
   },
   {
    "q": "What did they do together?",
    "choices": [
     "Watched a movie",
     "Cooked lunch",
     "Played games",
     "Went shopping"
    ],
    "type": "comprehension",
    "exp": "เฉลยตามต้นฉบับ: Cooked lunch"
   }
  ],
  "answerKey": [
   2,
   2,
   2,
   1
  ]
 },
 {
  "id": "reading_03B",
  "topicId": 3,
  "title": "Past Simple — Applied",
  "level": "applied",
  "grammarFocus": "Past Simple",
  "passage": "Napoleon III ___(1) the province of Savoy in 1860. Bad weather ___(2) his visit. Ten strong men ___(3) to help carry the carriages.",
  "questions": [
   {
    "q": "Napoleon III ___ Savoy in 1860.",
    "choices": [
     "visit",
     "visits",
     "visited",
     "visiting"
    ],
    "type": "grammar",
    "exp": "in 1860 = เวลาอดีตที่ชัดเจน → visited"
   },
   {
    "q": "Bad weather ___ his visit.",
    "choices": [
     "precede",
     "precedes",
     "preceded",
     "preceding"
    ],
    "type": "grammar",
    "exp": "เหตุการณ์อดีต → preceded"
   },
   {
    "q": "Ten men ___ to help carry the carriages.",
    "choices": [
     "have",
     "has",
     "had",
     "having"
    ],
    "type": "grammar",
    "exp": "อดีตของ have คือ had"
   },
   {
    "q": "What did the difficult journey lead to?",
    "choices": [
     "Napoleon left France",
     "Better access to Chamonix",
     "A new law",
     "A war"
    ],
    "type": "comprehension",
    "exp": "การเดินทางที่ยากลำบากนำไปสู่การพัฒนาเส้นทางเข้าสู่ Chamonix"
   }
  ],
  "answerKey": [
   2,
   2,
   2,
   1
  ]
 },
 {
  "id": "reading_04A",
  "topicId": 4,
  "title": "Past Continuous — Basic",
  "level": "basic",
  "grammarFocus": "Past Continuous",
  "passage": "While Mai ___(1) dinner, the phone rang. She ___(2) to her friend when she smelled smoke. The rice ___(3) while she was on the phone!",
  "questions": [
   {
    "q": "While Mai ___ dinner, the phone rang.",
    "choices": [
     "cooks",
     "cooked",
     "was cooking",
     "had cooked"
    ],
    "type": "grammar",
    "exp": "While + เหตุการณ์ที่กำลังดำเนินอยู่ → was cooking"
   },
   {
    "q": "She ___ to her friend when she smelled smoke.",
    "choices": [
     "talks",
     "talked",
     "was talking",
     "had talked"
    ],
    "type": "grammar",
    "exp": "เหตุการณ์ดำเนินอยู่แล้วถูกขัด → was talking"
   },
   {
    "q": "The rice ___ while she was on the phone.",
    "choices": [
     "burns",
     "burned",
     "was burning",
     "had burned"
    ],
    "type": "grammar",
    "exp": "สองเหตุการณ์ดำเนินพร้อมกัน → was burning"
   },
   {
    "q": "What happened while she was on the phone?",
    "choices": [
     "The rice burned",
     "The power went out",
     "A guest arrived",
     "She fell asleep"
    ],
    "type": "comprehension",
    "exp": "ข้าวไหม้ขณะที่เธอคุยโทรศัพท์"
   }
  ],
  "answerKey": [
   2,
   2,
   2,
   0
  ]
 },
 {
  "id": "reading_04B",
  "topicId": 4,
  "title": "Past Continuous — Applied",
  "level": "applied",
  "grammarFocus": "Past Continuous",
  "passage": "While prisoners ___(1) the \"Death Railway,\" thousands suffered from disease. Many died while they ___(2) the line through the jungle. Workers ___(3) under extremely harsh conditions throughout.",
  "questions": [
   {
    "q": "While prisoners ___ the railway, thousands suffered from disease.",
    "choices": [
     "build",
     "built",
     "were building",
     "had built"
    ],
    "type": "grammar",
    "exp": "While + ประธานพหูพจน์ → were building"
   },
   {
    "q": "Many died while they ___ the line.",
    "choices": [
     "construct",
     "constructed",
     "were constructing",
     "had constructed"
    ],
    "type": "grammar",
    "exp": "เหตุการณ์ที่กำลังดำเนินอยู่ในอดีต → were constructing"
   },
   {
    "q": "Workers ___ under harsh conditions throughout the project.",
    "choices": [
     "work",
     "worked",
     "were working",
     "had worked"
    ],
    "type": "grammar",
    "exp": "throughout = ตลอดช่วงเวลานั้น → were working"
   },
   {
    "q": "Approximately how many Allied prisoners died?",
    "choices": [
     "16,000",
     "60,000",
     "160,000",
     "600,000"
    ],
    "type": "comprehension",
    "exp": "เฉลยตามต้นฉบับ: 160,000"
   }
  ],
  "answerKey": [
   2,
   2,
   2,
   2
  ]
 },
 {
  "id": "reading_05A",
  "topicId": 5,
  "title": "Present Perfect — Basic",
  "level": "basic",
  "grammarFocus": "Present Perfect",
  "passage": "Beam ___(1) in Bangkok for five years. He ___(2) many temples and ___(3) a lot of street food. He hasn't been to the north yet.",
  "questions": [
   {
    "q": "Beam ___ in Bangkok for five years.",
    "choices": [
     "live",
     "lives",
     "has lived",
     "lived"
    ],
    "type": "grammar",
    "exp": "for five years = เริ่มอดีตและยังดำเนินอยู่ → has lived"
   },
   {
    "q": "He ___ many temples.",
    "choices": [
     "visit",
     "visits",
     "has visited",
     "visited"
    ],
    "type": "grammar",
    "exp": "ประสบการณ์จนถึงปัจจุบัน → has visited"
   },
   {
    "q": "He ___ a lot of street food.",
    "choices": [
     "try",
     "tries",
     "has tried",
     "tried"
    ],
    "type": "grammar",
    "exp": "ประสบการณ์ → has tried"
   },
   {
    "q": "Has he been to northern Thailand?",
    "choices": [
     "Yes, many times",
     "Not yet",
     "Only once",
     "He lives there"
    ],
    "type": "comprehension",
    "exp": "บทอ่านบอกว่า he hasn't been to the north yet"
   }
  ],
  "answerKey": [
   2,
   2,
   2,
   1
  ]
 },
 {
  "id": "reading_05B",
  "topicId": 5,
  "title": "Present Perfect — Applied",
  "level": "applied",
  "grammarFocus": "Present Perfect",
  "passage": "Researchers ___(1) the effects of climate change on Chamonix's glaciers for decades. They ___(2) that the ice has retreated significantly. This change ___(3) both the ecosystem and tourism.",
  "questions": [
   {
    "q": "Researchers ___ the glaciers for decades.",
    "choices": [
     "study",
     "studied",
     "have studied",
     "studying"
    ],
    "type": "grammar",
    "exp": "for decades + ประธานพหูพจน์ → have studied"
   },
   {
    "q": "They ___ that the ice has retreated.",
    "choices": [
     "observe",
     "observed",
     "have observed",
     "observing"
    ],
    "type": "grammar",
    "exp": "ผลที่ต่อเนื่องถึงปัจจุบัน → have observed"
   },
   {
    "q": "This ongoing change ___ both the ecosystem and tourism.",
    "choices": [
     "affect",
     "affected",
     "has affected",
     "affecting"
    ],
    "type": "grammar",
    "exp": "ประธานเอกพจน์ + ผลต่อเนื่อง → has affected"
   },
   {
    "q": "Since when has this change been recorded?",
    "choices": [
     "1960s",
     "1980s",
     "2000s",
     "2010s"
    ],
    "type": "comprehension",
    "exp": "เฉลยตามต้นฉบับ: 1980s"
   }
  ],
  "answerKey": [
   2,
   2,
   2,
   1
  ]
 },
 {
  "id": "reading_06A",
  "topicId": 6,
  "title": "Past Perfect — Basic",
  "level": "basic",
  "grammarFocus": "Past Perfect",
  "passage": "When Fah arrived at the cinema, the movie ___(1) already started. She ___(2) her ticket at home, so she had to go back. By the time she returned, she ___(3) the first twenty minutes.",
  "questions": [
   {
    "q": "When Fah arrived, the movie ___ already started.",
    "choices": [
     "has",
     "had",
     "have",
     "was"
    ],
    "type": "grammar",
    "exp": "เหตุการณ์เกิดก่อนอีกเหตุการณ์ในอดีต → had"
   },
   {
    "q": "She ___ her ticket at home.",
    "choices": [
     "forgets",
     "forgot",
     "had forgotten",
     "forgetting"
    ],
    "type": "grammar",
    "exp": "เกิดก่อนที่เธอจะไปถึงโรงหนัง → had forgotten"
   },
   {
    "q": "By the time she returned, she ___ the first twenty minutes.",
    "choices": [
     "misses",
     "missed",
     "had missed",
     "was missing"
    ],
    "type": "grammar",
    "exp": "By the time เป็นสัญญาณของ Past Perfect"
   },
   {
    "q": "Why did she go back home?",
    "choices": [
     "She forgot her wallet",
     "She forgot her ticket",
     "She felt sick",
     "She wanted food"
    ],
    "type": "comprehension",
    "exp": "เธอลืมตั๋วไว้ที่บ้าน"
   }
  ],
  "answerKey": [
   1,
   2,
   2,
   1
  ]
 },
 {
  "id": "reading_06B",
  "topicId": 6,
  "title": "Past Perfect — Applied",
  "level": "applied",
  "grammarFocus": "Past Perfect",
  "passage": "By the time the iron bridge ___(1) in 1943, workers ___(2) already spent months building a wooden version. The wooden bridge ___(3) built quickly because the Army needed a fast route to Burma.",
  "questions": [
   {
    "q": "By the time the iron bridge was completed, workers ___ already spent months on a wooden version.",
    "choices": [
     "have",
     "has",
     "had",
     "having"
    ],
    "type": "grammar",
    "exp": "เหตุการณ์ก่อนหน้าในอดีต → had"
   },
   {
    "q": "The original wooden bridge ___ been built quickly.",
    "choices": [
     "has",
     "had",
     "have",
     "was"
    ],
    "type": "grammar",
    "exp": "had been = Past Perfect Passive"
   },
   {
    "q": "It ___ been built because the Army needed a fast route.",
    "choices": [
     "has",
     "had",
     "have",
     "were"
    ],
    "type": "grammar",
    "exp": "คงรูป Past Perfect → had been"
   },
   {
    "q": "When was the iron bridge completed?",
    "choices": [
     "1941",
     "1942",
     "1943",
     "1944"
    ],
    "type": "comprehension",
    "exp": "บทอ่านระบุปี 1943"
   }
  ],
  "answerKey": [
   2,
   1,
   1,
   2
  ]
 },
 {
  "id": "reading_07A",
  "topicId": 7,
  "title": "Future Tenses — Basic",
  "level": "basic",
  "grammarFocus": "Future Tenses",
  "passage": "Next month, Arm ___(1) to travel to Japan with his family. They ___(2) Kyoto and Tokyo. He ___(3) his cousin in Osaka on the first day.",
  "questions": [
   {
    "q": "Arm ___ to travel to Japan next month.",
    "choices": [
     "will go",
     "is going",
     "goes",
     "went"
    ],
    "type": "grammar",
    "exp": "แผนที่วางไว้แล้ว → is going to"
   },
   {
    "q": "They ___ Kyoto and Tokyo.",
    "choices": [
     "will visit",
     "visit",
     "visited",
     "visiting"
    ],
    "type": "grammar",
    "exp": "การคาดการณ์/ตั้งใจในอนาคต → will visit"
   },
   {
    "q": "He ___ his cousin in Osaka.",
    "choices": [
     "will meet",
     "meets",
     "is meeting",
     "met"
    ],
    "type": "grammar",
    "exp": "นัดหมายที่ตกลงไว้แล้ว → is meeting"
   },
   {
    "q": "Who will he meet in Osaka?",
    "choices": [
     "His teacher",
     "His cousin",
     "A friend",
     "His boss"
    ],
    "type": "comprehension",
    "exp": "บทอ่านระบุว่าเจอลูกพี่ลูกน้อง"
   }
  ],
  "answerKey": [
   1,
   0,
   2,
   1
  ]
 },
 {
  "id": "reading_07B",
  "topicId": 7,
  "title": "Future Tenses — Applied",
  "level": "applied",
  "grammarFocus": "Future Tenses",
  "passage": "Traffic congestion ___(1) worsen unless new lines are built. The government ___(2) to invest in three new routes. If the plan succeeds, commuting times ___(3) decrease by 2035.",
  "questions": [
   {
    "q": "Traffic congestion ___ worsen unless new lines are built.",
    "choices": [
     "will",
     "is going to",
     "is",
     "would"
    ],
    "type": "grammar",
    "exp": "การทำนายอนาคต → will"
   },
   {
    "q": "The government ___ to invest in three new routes.",
    "choices": [
     "will",
     "is going",
     "goes",
     "went"
    ],
    "type": "grammar",
    "exp": "แผนที่ตั้งใจไว้ → is going to"
   },
   {
    "q": "If the plan succeeds, commuting times ___ decrease.",
    "choices": [
     "will",
     "would",
     "are",
     "were"
    ],
    "type": "grammar",
    "exp": "First Conditional → will"
   },
   {
    "q": "What will happen if the plan succeeds?",
    "choices": [
     "Times will increase",
     "Nothing changes",
     "Times will decrease",
     "Trains removed"
    ],
    "type": "comprehension",
    "exp": "ถ้าแผนสำเร็จ เวลาเดินทางจะลดลง"
   }
  ],
  "answerKey": [
   0,
   1,
   0,
   2
  ]
 },
 {
  "id": "reading_08A",
  "topicId": 8,
  "title": "Passive Voice — Basic",
  "level": "basic",
  "grammarFocus": "Passive Voice",
  "passage": "This cake ___(1) by my mother this morning. The recipe ___(2) to her by my grandmother years ago. Every ingredient ___(3) carefully before mixing.",
  "questions": [
   {
    "q": "This cake ___ by my mother.",
    "choices": [
     "bakes",
     "baked",
     "was baked",
     "is baking"
    ],
    "type": "grammar",
    "exp": "อดีต passive → was + V3"
   },
   {
    "q": "The recipe ___ to her by my grandmother.",
    "choices": [
     "gave",
     "was given",
     "gives",
     "is giving"
    ],
    "type": "grammar",
    "exp": "อดีต passive → was given"
   },
   {
    "q": "Every ingredient ___ carefully before mixing.",
    "choices": [
     "measures",
     "measured",
     "is measured",
     "measuring"
    ],
    "type": "grammar",
    "exp": "ปัจจุบัน passive → is + V3"
   },
   {
    "q": "Who gave the recipe to the mother?",
    "choices": [
     "A cookbook",
     "The grandmother",
     "A friend",
     "A chef"
    ],
    "type": "comprehension",
    "exp": "คุณยายเป็นผู้ให้สูตรอาหาร"
   }
  ],
  "answerKey": [
   2,
   1,
   2,
   1
  ]
 },
 {
  "id": "reading_08B",
  "topicId": 8,
  "title": "Passive Voice — Applied",
  "level": "applied",
  "grammarFocus": "Passive Voice",
  "passage": "The bridge over the River Kwai ___(1) by prisoners of war. It ___(2) one of Thailand's most historic constructions. On November 28, 1944, the bridge ___(3) by the Allies.",
  "questions": [
   {
    "q": "The bridge ___ by prisoners of war.",
    "choices": [
     "built",
     "was built",
     "builds",
     "building"
    ],
    "type": "grammar",
    "exp": "อดีต passive → was built"
   },
   {
    "q": "It ___ one of Thailand's most historic constructions.",
    "choices": [
     "considers",
     "is considered",
     "considered",
     "was considering"
    ],
    "type": "grammar",
    "exp": "ข้อเท็จจริงปัจจุบัน passive → is considered"
   },
   {
    "q": "The bridge ___ by the Allies in 1944.",
    "choices": [
     "attacked",
     "was attacked",
     "attacks",
     "attacking"
    ],
    "type": "grammar",
    "exp": "อดีต passive → was attacked"
   },
   {
    "q": "What happened on November 28, 1944?",
    "choices": [
     "Completed",
     "Attacked",
     "Renamed",
     "Collapsed naturally"
    ],
    "type": "comprehension",
    "exp": "สะพานถูกโจมตีโดยฝ่ายสัมพันธมิตร"
   }
  ],
  "answerKey": [
   1,
   1,
   1,
   1
  ]
 },
 {
  "id": "reading_09A",
  "topicId": 9,
  "title": "Conditional Sentences — Basic",
  "level": "basic",
  "grammarFocus": "Conditional Sentences",
  "passage": "If it ___(1) tomorrow, we will stay home. If it is sunny, we will go to the beach. My sister said, \"If I ___(2) more free time, I ___(3) learn to paint.\"",
  "questions": [
   {
    "q": "If it ___ tomorrow, we will stay home.",
    "choices": [
     "rain",
     "rains",
     "rained",
     "will rain"
    ],
    "type": "grammar",
    "exp": "Type 1: if + Present Simple (ห้ามใช้ will)"
   },
   {
    "q": "If I ___ more free time, I would learn to paint.",
    "choices": [
     "have",
     "has",
     "had",
     "will have"
    ],
    "type": "grammar",
    "exp": "Type 2: if + Past Simple"
   },
   {
    "q": "If I had more free time, I ___ learn to paint.",
    "choices": [
     "will",
     "would",
     "had",
     "have"
    ],
    "type": "grammar",
    "exp": "Type 2 ใช้ would + V1"
   },
   {
    "q": "What would the sister learn with more free time?",
    "choices": [
     "Cooking",
     "Painting",
     "Dancing",
     "Singing"
    ],
    "type": "comprehension",
    "exp": "เธอบอกว่าจะเรียนวาดรูป"
   }
  ],
  "answerKey": [
   1,
   2,
   1,
   1
  ]
 },
 {
  "id": "reading_09B",
  "topicId": 9,
  "title": "Conditional Sentences — Applied",
  "level": "applied",
  "grammarFocus": "Conditional Sentences",
  "passage": "If the wooden bridge ___(1) not been damaged, the Army would not have needed an iron replacement. If more iron ___(2) available earlier, construction would have finished sooner. If visitors ___(3) to Kanchanaburi today, they can see part of the original structure.",
  "questions": [
   {
    "q": "If the wooden bridge ___ not been damaged, the Army would not have needed a replacement.",
    "choices": [
     "has",
     "had",
     "have",
     "was"
    ],
    "type": "grammar",
    "exp": "Type 3: if + Past Perfect → had not been"
   },
   {
    "q": "If more iron ___ available earlier, construction would have finished sooner.",
    "choices": [
     "was",
     "is",
     "had been",
     "will be"
    ],
    "type": "grammar",
    "exp": "Type 3 → had been"
   },
   {
    "q": "If visitors ___ to Kanchanaburi, they can see the structure.",
    "choices": [
     "travel",
     "travels",
     "traveled",
     "would travel"
    ],
    "type": "grammar",
    "exp": "เงื่อนไขที่เป็นจริงทั่วไป → Present Simple"
   },
   {
    "q": "What can visitors do today?",
    "choices": [
     "Cross by boat only",
     "See the original structure",
     "Free entry in December only",
     "Visit virtually only"
    ],
    "type": "comprehension",
    "exp": "นักท่องเที่ยวยังเห็นโครงสร้างเดิมบางส่วนได้"
   }
  ],
  "answerKey": [
   1,
   2,
   0,
   1
  ]
 },
 {
  "id": "reading_10A",
  "topicId": 10,
  "title": "Gerund & Infinitive — Basic",
  "level": "basic",
  "grammarFocus": "Gerund & Infinitive",
  "passage": "Nan enjoys ___(1) novels before bed. She decided ___(2) a book club with her friends. They are looking forward to ___(3) new stories together.",
  "questions": [
   {
    "q": "Nan enjoys ___ novels before bed.",
    "choices": [
     "read",
     "reads",
     "reading",
     "to read"
    ],
    "type": "grammar",
    "exp": "หลัง enjoy ใช้ V-ing"
   },
   {
    "q": "She decided ___ a book club.",
    "choices": [
     "start",
     "starting",
     "to start",
     "started"
    ],
    "type": "grammar",
    "exp": "หลัง decide ใช้ to + V1"
   },
   {
    "q": "They are looking forward to ___ new stories.",
    "choices": [
     "discuss",
     "discussed",
     "discussing",
     "to discuss"
    ],
    "type": "grammar",
    "exp": "look forward to + V-ing (to เป็นบุพบท)"
   },
   {
    "q": "What did she decide to do?",
    "choices": [
     "Stop reading",
     "Start a book club",
     "Move house",
     "Change jobs"
    ],
    "type": "comprehension",
    "exp": "เธอตัดสินใจตั้งชมรมหนังสือ"
   }
  ],
  "answerKey": [
   2,
   2,
   2,
   1
  ]
 },
 {
  "id": "reading_10B",
  "topicId": 10,
  "title": "Gerund & Infinitive — Applied",
  "level": "applied",
  "grammarFocus": "Gerund & Infinitive",
  "passage": "The school does not allow students ___(1) phones during exams. Teachers encourage students ___(2) questions instead of staying silent. Many students admit ___(3) group study more effective than studying alone.",
  "questions": [
   {
    "q": "The school does not allow students ___ phones during exams.",
    "choices": [
     "use",
     "using",
     "to use",
     "used"
    ],
    "type": "grammar",
    "exp": "allow + object + to V"
   },
   {
    "q": "Teachers encourage students ___ questions.",
    "choices": [
     "ask",
     "asking",
     "to ask",
     "asked"
    ],
    "type": "grammar",
    "exp": "encourage + object + to V"
   },
   {
    "q": "Many students admit ___ group study more effective.",
    "choices": [
     "find",
     "finding",
     "to find",
     "found"
    ],
    "type": "grammar",
    "exp": "หลัง admit ใช้ V-ing"
   },
   {
    "q": "What do teachers encourage?",
    "choices": [
     "Staying silent",
     "Asking questions",
     "Skipping class",
     "Working alone only"
    ],
    "type": "comprehension",
    "exp": "ครูสนับสนุนให้นักเรียนถามคำถาม"
   }
  ],
  "answerKey": [
   2,
   2,
   1,
   1
  ]
 },
 {
  "id": "reading_11A",
  "topicId": 11,
  "title": "Relative Clauses — Basic",
  "level": "basic",
  "grammarFocus": "Relative Clauses",
  "passage": "This is the teacher ___(1) taught me English last year. The book, ___(2) she recommended, changed how I study. I remember the day ___(3) I first understood grammar clearly.",
  "questions": [
   {
    "q": "This is the teacher ___ taught me English.",
    "choices": [
     "which",
     "who",
     "whose",
     "whom"
    ],
    "type": "grammar",
    "exp": "ขยายคน และเป็นประธานของกริยา → who"
   },
   {
    "q": "The book, ___ she recommended, changed how I study.",
    "choices": [
     "who",
     "whom",
     "which",
     "whose"
    ],
    "type": "grammar",
    "exp": "ขยายสิ่งของ → which"
   },
   {
    "q": "I remember the day ___ I first understood grammar.",
    "choices": [
     "which",
     "who",
     "when",
     "whose"
    ],
    "type": "grammar",
    "exp": "ขยายเวลา → when"
   },
   {
    "q": "What changed how the writer studies?",
    "choices": [
     "A movie",
     "The book",
     "A trip",
     "A song"
    ],
    "type": "comprehension",
    "exp": "หนังสือที่ครูแนะนำ"
   }
  ],
  "answerKey": [
   1,
   2,
   2,
   1
  ]
 },
 {
  "id": "reading_11B",
  "topicId": 11,
  "title": "Relative Clauses — Applied",
  "level": "applied",
  "grammarFocus": "Relative Clauses",
  "passage": "The bridge, ___(1) spans the Kwai Yai River, was part of a railway line. The workers, ___(2) lives were extremely difficult, came from several Allied countries. Historians ___(3) study this period often visit the museum.",
  "questions": [
   {
    "q": "The bridge, ___ spans the Kwai Yai River, was part of a railway line.",
    "choices": [
     "who",
     "which",
     "whom",
     "whose"
    ],
    "type": "grammar",
    "exp": "ขยายสิ่งของ → which"
   },
   {
    "q": "The workers, ___ lives were extremely difficult, came from Allied countries.",
    "choices": [
     "who",
     "which",
     "whom",
     "whose"
    ],
    "type": "grammar",
    "exp": "แสดงความเป็นเจ้าของ (lives ของพวกเขา) → whose"
   },
   {
    "q": "Historians ___ study this period often visit the museum.",
    "choices": [
     "which",
     "whom",
     "who",
     "whose"
    ],
    "type": "grammar",
    "exp": "ขยายคนและเป็นประธาน → who"
   },
   {
    "q": "Where did the workers come from?",
    "choices": [
     "Only Thailand",
     "Several Allied countries",
     "Only Japan",
     "Only Britain"
    ],
    "type": "comprehension",
    "exp": "มาจากหลายประเทศฝ่ายสัมพันธมิตร"
   }
  ],
  "answerKey": [
   1,
   3,
   2,
   1
  ]
 },
 {
  "id": "reading_12A",
  "topicId": 12,
  "title": "Reported Speech — Basic",
  "level": "basic",
  "grammarFocus": "Reported Speech",
  "passage": "Ice told his friend, \"I am tired today.\" Later, his friend said that Ice ___(1) told him he ___(2) tired that day. Ice also said he ___(3) rest early that night.",
  "questions": [
   {
    "q": "His friend said that Ice ___ told him he was tired.",
    "choices": [
     "has",
     "had",
     "have",
     "having"
    ],
    "type": "grammar",
    "exp": "เล่าย้อนเหตุการณ์ที่เกิดก่อน → had"
   },
   {
    "q": "Ice said he ___ tired that day.",
    "choices": [
     "is",
     "was",
     "were",
     "has been"
    ],
    "type": "grammar",
    "exp": "am → was เมื่อเปลี่ยนเป็น reported speech"
   },
   {
    "q": "Ice said he ___ rest early.",
    "choices": [
     "will",
     "would",
     "can",
     "may"
    ],
    "type": "grammar",
    "exp": "will → would"
   },
   {
    "q": "What did Ice say he would do?",
    "choices": [
     "Study more",
     "Rest early",
     "Go out",
     "Call a friend"
    ],
    "type": "comprehension",
    "exp": "เขาบอกว่าจะพักผ่อนแต่หัวค่ำ"
   }
  ],
  "answerKey": [
   1,
   1,
   1,
   1
  ]
 },
 {
  "id": "reading_12B",
  "topicId": 12,
  "title": "Reported Speech — Applied",
  "level": "applied",
  "grammarFocus": "Reported Speech",
  "passage": "A researcher reported that the bridge ___(1) been built under extremely difficult conditions. She explained that thousands of prisoners ___(2) died while constructing the railway. She added that the site ___(3) become an important place for remembrance.",
  "questions": [
   {
    "q": "She reported that the bridge ___ been built under difficult conditions.",
    "choices": [
     "has",
     "had",
     "have",
     "is"
    ],
    "type": "grammar",
    "exp": "Present Perfect → Past Perfect (had been)"
   },
   {
    "q": "She explained that thousands ___ died while constructing the railway.",
    "choices": [
     "has",
     "had",
     "have",
     "was"
    ],
    "type": "grammar",
    "exp": "เหตุการณ์ก่อนหน้า → had died"
   },
   {
    "q": "She added that the site ___ become important for remembrance.",
    "choices": [
     "has",
     "had",
     "have",
     "was"
    ],
    "type": "grammar",
    "exp": "คงรูป backshift → had become"
   },
   {
    "q": "What has the site become today?",
    "choices": [
     "A shopping center",
     "A place for remembrance",
     "A military base",
     "A farm"
    ],
    "type": "comprehension",
    "exp": "กลายเป็นสถานที่สำหรับรำลึก"
   }
  ],
  "answerKey": [
   1,
   1,
   1,
   1
  ]
 },
 {
  "id": "reading_13A",
  "topicId": 13,
  "title": "Modal Verbs — Basic",
  "level": "basic",
  "grammarFocus": "Modal Verbs",
  "passage": "You ___(1) drink more water every day. You ___(2) not skip breakfast if you want energy. If you feel dizzy, you ___(3) need to see a doctor.",
  "questions": [
   {
    "q": "You ___ drink more water every day.",
    "choices": [
     "must",
     "should",
     "can",
     "will"
    ],
    "type": "grammar",
    "exp": "เป็นคำแนะนำ → should"
   },
   {
    "q": "You ___ not skip breakfast.",
    "choices": [
     "should",
     "might",
     "must",
     "can"
    ],
    "type": "grammar",
    "exp": "ข้อห้ามที่หนักแน่น → must not"
   },
   {
    "q": "If you feel dizzy, you ___ need to see a doctor.",
    "choices": [
     "must",
     "should",
     "might",
     "can't"
    ],
    "type": "grammar",
    "exp": "ความเป็นไปได้ → might"
   },
   {
    "q": "What must you not do?",
    "choices": [
     "Skip breakfast",
     "Drink water",
     "Exercise",
     "Study"
    ],
    "type": "comprehension",
    "exp": "ห้ามงดอาหารเช้า"
   }
  ],
  "answerKey": [
   1,
   2,
   2,
   0
  ]
 },
 {
  "id": "reading_13B",
  "topicId": 13,
  "title": "Modal Verbs — Applied",
  "level": "applied",
  "grammarFocus": "Modal Verbs",
  "passage": "Engineers ___(1) follow strict safety standards when designing bridges. They ___(2) calculate the weight the structure can carry. If a design is flawed, the bridge ___(3) collapse.",
  "questions": [
   {
    "q": "Engineers ___ follow strict safety standards.",
    "choices": [
     "might",
     "must",
     "can",
     "would"
    ],
    "type": "grammar",
    "exp": "เป็นข้อบังคับ → must"
   },
   {
    "q": "They ___ calculate the weight the structure can carry.",
    "choices": [
     "must",
     "should",
     "can't",
     "may"
    ],
    "type": "grammar",
    "exp": "เป็นคำแนะนำเชิงวิชาชีพ → should"
   },
   {
    "q": "If flawed, the bridge ___ collapse.",
    "choices": [
     "must",
     "should",
     "could",
     "will definitely"
    ],
    "type": "grammar",
    "exp": "ความเป็นไปได้ → could"
   },
   {
    "q": "What must inspectors do?",
    "choices": [
     "Ignore small issues",
     "Check every stage carefully",
     "Work alone",
     "Skip inspections"
    ],
    "type": "comprehension",
    "exp": "ต้องตรวจสอบทุกขั้นตอนอย่างละเอียด"
   }
  ],
  "answerKey": [
   1,
   1,
   2,
   1
  ]
 },
 {
  "id": "reading_14A",
  "topicId": 14,
  "title": "Comparative & Superlative — Basic",
  "level": "basic",
  "grammarFocus": "Comparative & Superlative",
  "passage": "Bangkok is ___(1) than Chiang Mai. However, Chiang Mai is ___(2) and has a more relaxed atmosphere. Many say it has the ___(3) temples in northern Thailand.",
  "questions": [
   {
    "q": "Bangkok is ___ than Chiang Mai.",
    "choices": [
     "big",
     "bigger",
     "biggest",
     "more big"
    ],
    "type": "grammar",
    "exp": "เปรียบเทียบสองสิ่ง คำสั้น → bigger"
   },
   {
    "q": "Chiang Mai is ___ than Bangkok.",
    "choices": [
     "quiet",
     "quieter",
     "quietest",
     "more quiet"
    ],
    "type": "grammar",
    "exp": "คำสั้นสองพยางค์ลงท้าย -et → quieter"
   },
   {
    "q": "It has the ___ temples in the north.",
    "choices": [
     "beautiful",
     "more beautiful",
     "most beautiful",
     "beautifuler"
    ],
    "type": "grammar",
    "exp": "ขั้นสูงสุดของคำยาว → the most beautiful"
   },
   {
    "q": "What is Chiang Mai known for?",
    "choices": [
     "Being louder",
     "A relaxed atmosphere",
     "Tall buildings",
     "Heavy traffic"
    ],
    "type": "comprehension",
    "exp": "บรรยากาศผ่อนคลาย"
   }
  ],
  "answerKey": [
   1,
   1,
   2,
   1
  ]
 },
 {
  "id": "reading_14B",
  "topicId": 14,
  "title": "Comparative & Superlative — Applied",
  "level": "applied",
  "grammarFocus": "Comparative & Superlative",
  "passage": "Mont-Blanc is Europe's ___(1) peak, standing at 4,807 metres. Chamonix is one of the ___(2) alpine regions. Compared with other resorts, Chamonix is generally ___(3) during winter.",
  "questions": [
   {
    "q": "Mont-Blanc is Europe's ___ peak.",
    "choices": [
     "tall",
     "taller",
     "tallest",
     "more tall"
    ],
    "type": "grammar",
    "exp": "ขั้นสูงสุด คำสั้น → tallest"
   },
   {
    "q": "Chamonix is one of the ___ alpine regions.",
    "choices": [
     "diverse",
     "more diverse",
     "most diverse",
     "diversest"
    ],
    "type": "grammar",
    "exp": "one of the + ขั้นสูงสุด → most diverse"
   },
   {
    "q": "Chamonix is generally ___ during winter than other resorts.",
    "choices": [
     "busy",
     "busier",
     "busiest",
     "more busy"
    ],
    "type": "grammar",
    "exp": "มี than = ขั้นกว่า → busier"
   },
   {
    "q": "When is Chamonix generally busier?",
    "choices": [
     "Summer",
     "Autumn",
     "Winter ski season",
     "Spring"
    ],
    "type": "comprehension",
    "exp": "ช่วงฤดูสกีในหน้าหนาว"
   }
  ],
  "answerKey": [
   2,
   2,
   1,
   2
  ]
 },
 {
  "id": "reading_15A",
  "topicId": 15,
  "title": "Articles — Basic",
  "level": "basic",
  "grammarFocus": "Articles",
  "passage": "I saw ___(1) cat sitting under ___(2) tree this morning. ___(3) cat was orange with white paws. Later, the same cat followed an old man.",
  "questions": [
   {
    "q": "I saw ___ cat sitting under a tree.",
    "choices": [
     "a",
     "an",
     "the",
     "no article"
    ],
    "type": "grammar",
    "exp": "กล่าวถึงครั้งแรก เสียงพยัญชนะ → a"
   },
   {
    "q": "I saw a cat under ___ tree.",
    "choices": [
     "a",
     "an",
     "the",
     "no article"
    ],
    "type": "grammar",
    "exp": "ต้นไม้ที่ไม่เจาะจง → a"
   },
   {
    "q": "___ cat was orange with white paws.",
    "choices": [
     "A",
     "An",
     "The",
     "No article"
    ],
    "type": "grammar",
    "exp": "กล่าวถึงซ้ำ ผู้ฟังรู้แล้ว → The"
   },
   {
    "q": "What did the cat follow?",
    "choices": [
     "A child",
     "An old man",
     "A car",
     "A bicycle"
    ],
    "type": "comprehension",
    "exp": "แมวเดินตามชายชรา"
   }
  ],
  "answerKey": [
   0,
   0,
   2,
   1
  ]
 },
 {
  "id": "reading_15B",
  "topicId": 15,
  "title": "Articles — Applied",
  "level": "applied",
  "grammarFocus": "Articles",
  "passage": "___(1) cow is to a calf as ___(2) deer is to a fawn. Understanding ___(3) correct article and term helps learners build accurate vocabulary.",
  "questions": [
   {
    "q": "___ cow is to a calf...",
    "choices": [
     "A",
     "An",
     "The",
     "No article"
    ],
    "type": "grammar",
    "exp": "นามเอกพจน์ทั่วไป เสียงพยัญชนะ → A"
   },
   {
    "q": "...as ___ deer is to a fawn.",
    "choices": [
     "a",
     "an",
     "the",
     "no article"
    ],
    "type": "grammar",
    "exp": "deer ขึ้นต้นด้วยเสียงพยัญชนะ → a"
   },
   {
    "q": "Understanding ___ correct article helps learners.",
    "choices": [
     "a",
     "an",
     "the",
     "no article"
    ],
    "type": "grammar",
    "exp": "เจาะจงว่า article ที่ถูกต้อง → the"
   },
   {
    "q": "What is a young deer called?",
    "choices": [
     "Cub",
     "Foal",
     "Fawn",
     "Kid"
    ],
    "type": "comprehension",
    "exp": "ลูกกวางเรียกว่า fawn"
   }
  ],
  "answerKey": [
   0,
   0,
   2,
   2
  ]
 },
 {
  "id": "reading_16A",
  "topicId": 16,
  "title": "Prepositions — Basic",
  "level": "basic",
  "grammarFocus": "Prepositions",
  "passage": "She got married ___(1) her childhood friend last year. They are interested ___(2) traveling together. They arrived ___(3) the airport early to avoid the crowd.",
  "questions": [
   {
    "q": "She got married ___ her childhood friend.",
    "choices": [
     "with",
     "to",
     "for",
     "at"
    ],
    "type": "grammar",
    "exp": "married to เป็นสำนวนตายตัว"
   },
   {
    "q": "They are interested ___ traveling.",
    "choices": [
     "on",
     "at",
     "in",
     "for"
    ],
    "type": "grammar",
    "exp": "interested in เป็นสำนวนตายตัว"
   },
   {
    "q": "They arrived ___ the airport early.",
    "choices": [
     "in",
     "to",
     "at",
     "on"
    ],
    "type": "grammar",
    "exp": "arrive at + จุดหมายเฉพาะจุด"
   },
   {
    "q": "Where did they arrive early?",
    "choices": [
     "The hotel",
     "The airport",
     "The station",
     "The restaurant"
    ],
    "type": "comprehension",
    "exp": "พวกเขาไปถึงสนามบินแต่เนิ่น ๆ"
   }
  ],
  "answerKey": [
   1,
   2,
   2,
   1
  ]
 },
 {
  "id": "reading_16B",
  "topicId": 16,
  "title": "Prepositions — Applied",
  "level": "applied",
  "grammarFocus": "Prepositions",
  "passage": "The bridge was built ___(1) blood, sweat and tears. Workers labored under harsh conditions, crossing the treacherous river daily. The line they were building stretched all the way ___(2) Burma, and it later became known ___(3) one of the most historic sites.",
  "questions": [
   {
    "q": "The bridge was built ___ blood, sweat and tears.",
    "choices": [
     "with",
     "by",
     "from",
     "at"
    ],
    "type": "grammar",
    "exp": "เฉลยตามต้นฉบับที่ผู้ใช้กำหนด: by"
   },
   {
    "q": "The line stretched all the way ___ Burma.",
    "choices": [
     "at",
     "in",
     "to",
     "from"
    ],
    "type": "grammar",
    "exp": "บอกจุดหมายปลายทาง → to"
   },
   {
    "q": "It became known ___ one of the most historic sites.",
    "choices": [
     "as",
     "for",
     "by",
     "with"
    ],
    "type": "grammar",
    "exp": "known as = เป็นที่รู้จักในฐานะ"
   },
   {
    "q": "What did workers cross daily?",
    "choices": [
     "A mountain",
     "The Kwai Yai River",
     "A desert",
     "A forest"
    ],
    "type": "comprehension",
    "exp": "ข้ามแม่น้ำแควใหญ่ทุกวัน"
   }
  ],
  "answerKey": [
   1,
   2,
   0,
   1
  ]
 },
 {
  "id": "reading_17A",
  "topicId": 17,
  "title": "Participial Adjectives — Basic",
  "level": "basic",
  "grammarFocus": "Participial Adjectives",
  "passage": "The movie last night was so ___(1) that I fell asleep. My friend was ___(2) too, but she stayed awake out of politeness. We agreed it was a ___(3) film.",
  "questions": [
   {
    "q": "The movie was so ___ that I fell asleep.",
    "choices": [
     "bored",
     "boring",
     "bore",
     "bores"
    ],
    "type": "grammar",
    "exp": "หนังเป็นตัวทำให้เกิดความรู้สึก → boring"
   },
   {
    "q": "My friend was ___ too.",
    "choices": [
     "bored",
     "boring",
     "bore",
     "bores"
    ],
    "type": "grammar",
    "exp": "คนเป็นผู้รู้สึก → bored"
   },
   {
    "q": "We agreed it was a ___ film.",
    "choices": [
     "disappointed",
     "disappointing",
     "disappoint",
     "disappoints"
    ],
    "type": "grammar",
    "exp": "หนังทำให้ผิดหวัง → disappointing"
   },
   {
    "q": "Why did the friend stay awake?",
    "choices": [
     "She enjoyed the film",
     "Out of politeness",
     "She wasn't tired",
     "She had to leave"
    ],
    "type": "comprehension",
    "exp": "เธอฝืนตื่นเพราะมารยาท"
   }
  ],
  "answerKey": [
   1,
   0,
   1,
   1
  ]
 },
 {
  "id": "reading_17B",
  "topicId": 17,
  "title": "Participial Adjectives — Applied",
  "level": "applied",
  "grammarFocus": "Participial Adjectives",
  "passage": "A new baby makes parents very ___(1) because there's so much to do. The ___(2) routine of feeding and comforting a crying baby can leave even patient parents feeling ___(3).",
  "questions": [
   {
    "q": "A new baby makes parents very ___.",
    "choices": [
     "tiring",
     "tired",
     "tire",
     "tires"
    ],
    "type": "grammar",
    "exp": "พ่อแม่เป็นผู้รู้สึกเหนื่อย → tired"
   },
   {
    "q": "The ___ routine of feeding a baby can leave parents drained.",
    "choices": [
     "exhausted",
     "exhausting",
     "exhaust",
     "exhausts"
    ],
    "type": "grammar",
    "exp": "กิจวัตรเป็นตัวทำให้เหนื่อย → exhausting"
   },
   {
    "q": "Parents end up feeling ___.",
    "choices": [
     "overwhelming",
     "overwhelmed",
     "overwhelm",
     "overwhelms"
    ],
    "type": "grammar",
    "exp": "คนเป็นผู้รู้สึก → overwhelmed"
   },
   {
    "q": "What kind of routine is described?",
    "choices": [
     "Relaxing",
     "Exhausting",
     "Simple",
     "Short"
    ],
    "type": "comprehension",
    "exp": "เป็นกิจวัตรที่เหนื่อยล้า"
   }
  ],
  "answerKey": [
   1,
   1,
   1,
   1
  ]
 },
 {
  "id": "reading_18A",
  "topicId": 18,
  "title": "Conjunctions & Linking Words — Basic",
  "level": "basic",
  "grammarFocus": "Conjunctions & Linking Words",
  "passage": "___(1) it was raining, we decided to go for a walk. We brought umbrellas ___(2) we didn't want to get wet. ___(3), the rain stopped after ten minutes.",
  "questions": [
   {
    "q": "___ it was raining, we decided to go for a walk.",
    "choices": [
     "Because",
     "Although",
     "So",
     "Therefore"
    ],
    "type": "grammar",
    "exp": "แสดงความขัดแย้ง → Although"
   },
   {
    "q": "We brought umbrellas ___ we didn't want to get wet.",
    "choices": [
     "because",
     "although",
     "however",
     "but"
    ],
    "type": "grammar",
    "exp": "บอกเหตุผล → because"
   },
   {
    "q": "___, the rain stopped after ten minutes.",
    "choices": [
     "Because",
     "So",
     "However",
     "Since"
    ],
    "type": "grammar",
    "exp": "เชื่อมความขัดแย้งระหว่างประโยค → However"
   },
   {
    "q": "What did they decide to do despite the rain?",
    "choices": [
     "Stay home",
     "Go for a walk",
     "Cancel plans",
     "Go shopping"
    ],
    "type": "comprehension",
    "exp": "พวกเขาตัดสินใจออกไปเดินเล่น"
   }
  ],
  "answerKey": [
   1,
   0,
   2,
   1
  ]
 },
 {
  "id": "reading_18B",
  "topicId": 18,
  "title": "Conjunctions & Linking Words — Applied",
  "level": "applied",
  "grammarFocus": "Conjunctions & Linking Words",
  "passage": "Some past events are important to remember; ___(1), many people want to forget tragic events. ___(2) thousands of prisoners suffered and died, the bridge remains a place of reflection. ___(3), visitors are encouraged to learn about its history respectfully.",
  "questions": [
   {
    "q": "___, many people want to forget tragic events.",
    "choices": [
     "Because",
     "However",
     "So",
     "Since"
    ],
    "type": "grammar",
    "exp": "ขัดแย้งกับประโยคก่อนหน้า → However"
   },
   {
    "q": "___ thousands of prisoners suffered and died, the bridge remains a place of reflection.",
    "choices": [
     "Although",
     "Because",
     "However",
     "But"
    ],
    "type": "grammar",
    "exp": "เฉลยตามต้นฉบับ: Because"
   },
   {
    "q": "___, visitors are encouraged to learn respectfully.",
    "choices": [
     "Because",
     "Although",
     "Therefore",
     "However"
    ],
    "type": "grammar",
    "exp": "บอกผลลัพธ์ → Therefore"
   },
   {
    "q": "What does \"therefore\" introduce?",
    "choices": [
     "A reason",
     "A result",
     "A contrast",
     "An example"
    ],
    "type": "comprehension",
    "exp": "therefore ใช้นำผลลัพธ์"
   }
  ],
  "answerKey": [
   1,
   1,
   2,
   1
  ]
 }
];

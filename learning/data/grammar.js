/* ============================================================
   data/grammar.js — GRAMMAR CURRICULUM (18 units, source content)
   ------------------------------------------------------------
   โครงสร้างตามที่กำหนด: id, title, thaiTitle, learningGoals,
   explanation, structures, usage, examples, keywords,
   commonMistakes, keyPoints, quiz (3 ข้อ/unit)
   ============================================================ */
const grammarUnits = [
 {
  "id": 1,
  "title": "Present Simple",
  "thaiTitle": "ปัจจุบันธรรมดา",
  "learningGoals": [
   "routines",
   "facts",
   "repeated actions",
   "schedules",
   "affirmative sentences",
   "negative sentences",
   "questions"
  ],
  "explanation": "ใช้พูดถึงกิจวัตร ข้อเท็จจริง สิ่งที่ทำซ้ำ ๆ และตารางเวลา ประธานเอกพจน์บุรุษที่ 3 (He/She/It) ต้องเติม s/es ที่กริยา",
  "structures": [
   "I / You / We / They + V1",
   "He / She / It + V1(s/es)",
   "Negative: do not / don't + V1",
   "Negative: does not / doesn't + V1",
   "Question: Do + subject + V1?",
   "Question: Does + subject + V1?"
  ],
  "usage": [
   "routine",
   "fact",
   "repeated action",
   "schedule"
  ],
  "examples": [
   "I usually wake up at six.",
   "She drinks tea before school.",
   "He doesn't like coffee.",
   "Do you study English every day?"
  ],
  "keywords": [
   "always",
   "usually",
   "often",
   "sometimes",
   "rarely",
   "never",
   "every day",
   "every week"
  ],
  "commonMistakes": [
   {
    "wrong": "He doesn't likes coffee.",
    "right": "He doesn't like coffee.",
    "why": "หลัง does/doesn't กริยากลับเป็นช่อง 1 (V1) เสมอ"
   }
  ],
  "keyPoints": [
   "After does/doesn't, verb returns to V1."
  ],
  "quiz": [
   {
    "q": "She ___ to school every morning.",
    "choices": [
     "walk",
     "walks",
     "walking",
     "walked"
    ],
    "a": 1,
    "exp": "ประธาน She เป็นเอกพจน์บุรุษที่ 3 จึงเติม s → walks"
   },
   {
    "q": "He ___ like coffee.",
    "choices": [
     "doesn't",
     "don't",
     "isn't",
     "not"
    ],
    "a": 0,
    "exp": "He ใช้ doesn't และตามด้วย V1 (like)"
   },
   {
    "q": "___ you study English every day?",
    "choices": [
     "Does",
     "Do",
     "Are",
     "Is"
    ],
    "a": 1,
    "exp": "ประธาน you ใช้ Do ในการตั้งคำถาม"
   }
  ]
 },
 {
  "id": 2,
  "title": "Present Continuous",
  "thaiTitle": "ปัจจุบันกำลังกระทำ",
  "learningGoals": [
   "happening now",
   "temporary situations",
   "arranged future plans",
   "stative verbs"
  ],
  "explanation": "ใช้พูดถึงสิ่งที่กำลังเกิดขึ้นตอนนี้ สถานการณ์ชั่วคราว และแผนอนาคตที่นัดหมายไว้แล้ว โครงสร้างคือ am/is/are + V-ing",
  "structures": [
   "S + am/is/are + V-ing",
   "Negative: am/is/are + not + V-ing",
   "Question: Am/Is/Are + S + V-ing?"
  ],
  "usage": [
   "happening now",
   "temporary situations",
   "arranged future plans"
  ],
  "examples": [
   "I am studying.",
   "She is working.",
   "They are playing.",
   "I am meeting my cousin tomorrow."
  ],
  "keywords": [
   "now",
   "right now",
   "at the moment",
   "currently",
   "today",
   "this week"
  ],
  "commonMistakes": [
   {
    "wrong": "I am knowing the answer.",
    "right": "I know the answer.",
    "why": "กริยาแสดงสภาวะ (stative verbs) เช่น know, like, love, want, understand, believe ไม่ใช้รูป continuous"
   }
  ],
  "keyPoints": [
   "Common stative verbs: know, like, love, want, understand, believe"
  ],
  "quiz": [
   {
    "q": "Ploy ___ at her desk right now.",
    "choices": [
     "sit",
     "sits",
     "is sitting",
     "sat"
    ],
    "a": 2,
    "exp": "right now = กำลังเกิดขึ้น ใช้ is + V-ing"
   },
   {
    "q": "I ___ the answer.",
    "choices": [
     "am knowing",
     "know",
     "knowing",
     "is knowing"
    ],
    "a": 1,
    "exp": "know เป็น stative verb ใช้รูปธรรมดา"
   },
   {
    "q": "___ they playing football at the moment?",
    "choices": [
     "Do",
     "Is",
     "Are",
     "Does"
    ],
    "a": 2,
    "exp": "ประธาน they ใช้ Are ในคำถาม continuous"
   }
  ]
 },
 {
  "id": 3,
  "title": "Past Simple",
  "thaiTitle": "อดีตธรรมดา",
  "learningGoals": [
   "completed past events",
   "regular verbs",
   "irregular verbs",
   "negatives and questions"
  ],
  "explanation": "ใช้กับเหตุการณ์ที่จบไปแล้วในอดีต ระบุเวลาชัดเจน กริยาเปลี่ยนเป็นช่อง 2 (V2)",
  "structures": [
   "S + V2",
   "Negative: S + did not + V1",
   "Question: Did + S + V1?"
  ],
  "usage": [
   "completed past events"
  ],
  "examples": [
   "Regular: work → worked, play → played, visit → visited",
   "Irregular: go → went, see → saw, eat → ate, take → took, write → wrote",
   "Ton visited his grandmother last weekend."
  ],
  "keywords": [
   "yesterday",
   "last week",
   "last year",
   "two days ago",
   "in 2020",
   "when I was young"
  ],
  "commonMistakes": [
   {
    "wrong": "He didn't went home.",
    "right": "He didn't go home.",
    "why": "หลัง did/didn't ใช้ V1 เสมอ"
   }
  ],
  "keyPoints": [
   "After did/didn't use V1."
  ],
  "quiz": [
   {
    "q": "He ___ a bus early in the morning.",
    "choices": [
     "take",
     "takes",
     "took",
     "taking"
    ],
    "a": 2,
    "exp": "take เป็นกริยาอปกติ ช่อง 2 คือ took"
   },
   {
    "q": "They ___ finish the work yesterday.",
    "choices": [
     "don't",
     "doesn't",
     "didn't",
     "weren't"
    ],
    "a": 2,
    "exp": "yesterday = อดีต จึงใช้ didn't + V1"
   },
   {
    "q": "___ you see the film last night?",
    "choices": [
     "Do",
     "Did",
     "Does",
     "Were"
    ],
    "a": 1,
    "exp": "last night = อดีต ใช้ Did + V1"
   }
  ]
 },
 {
  "id": 4,
  "title": "Past Continuous",
  "thaiTitle": "กำลังเกิดขึ้นในอดีต",
  "learningGoals": [
   "ongoing past events",
   "interrupted actions",
   "while + past continuous"
  ],
  "explanation": "ใช้กับเหตุการณ์ที่กำลังดำเนินอยู่ในอดีต มักใช้คู่กับ Past Simple ที่เข้ามาขัดจังหวะ",
  "structures": [
   "S + was/were + V-ing",
   "I/He/She/It → was",
   "You/We/They → were",
   "While + Past Continuous"
  ],
  "usage": [
   "ongoing past event",
   "often paired with Past Simple"
  ],
  "examples": [
   "I was sleeping when my phone rang.",
   "While Mai was cooking dinner, the phone rang."
  ],
  "keywords": [
   "while",
   "when",
   "at that time",
   "all morning"
  ],
  "commonMistakes": [
   {
    "wrong": "While I cooked, the phone was ringing.",
    "right": "While I was cooking, the phone rang.",
    "why": "เหตุการณ์ที่ดำเนินอยู่ใช้ Past Continuous ส่วนเหตุการณ์ที่มาขัดใช้ Past Simple"
   }
  ],
  "keyPoints": [
   "Past Continuous = ongoing event",
   "Past Simple = event/interruption"
  ],
  "quiz": [
   {
    "q": "While Mai ___ dinner, the phone rang.",
    "choices": [
     "cooks",
     "cooked",
     "was cooking",
     "had cooked"
    ],
    "a": 2,
    "exp": "เหตุการณ์ที่กำลังดำเนินอยู่ใช้ was + V-ing"
   },
   {
    "q": "They ___ working when I arrived.",
    "choices": [
     "was",
     "were",
     "is",
     "are"
    ],
    "a": 1,
    "exp": "ประธาน They ใช้ were"
   },
   {
    "q": "The rice ___ while she was on the phone.",
    "choices": [
     "burns",
     "burned",
     "was burning",
     "had burned"
    ],
    "a": 2,
    "exp": "สองเหตุการณ์ดำเนินพร้อมกันในอดีต ใช้ Past Continuous"
   }
  ]
 },
 {
  "id": 5,
  "title": "Present Perfect",
  "thaiTitle": "อดีตที่เชื่อมกับปัจจุบัน",
  "learningGoals": [
   "experience",
   "just completed actions",
   "actions continuing to now"
  ],
  "explanation": "ใช้เชื่อมอดีตกับปัจจุบัน เช่น ประสบการณ์ สิ่งที่เพิ่งทำเสร็จ หรือสิ่งที่เริ่มในอดีตและยังดำเนินอยู่",
  "structures": [
   "S + have/has + V3",
   "I/You/We/They → have",
   "He/She/It → has"
  ],
  "usage": [
   "experience",
   "just completed",
   "started in past and continues"
  ],
  "examples": [
   "Beam has lived in Bangkok for five years.",
   "He has visited many temples.",
   "I visited Japan in 2020."
  ],
  "keywords": [
   "ever",
   "never",
   "already",
   "yet",
   "just",
   "since",
   "for",
   "recently"
  ],
  "commonMistakes": [
   {
    "wrong": "I have visited Japan in 2020.",
    "right": "I visited Japan in 2020.",
    "why": "ถ้าระบุเวลาในอดีตที่จบชัดเจนแล้ว ต้องใช้ Past Simple"
   }
  ],
  "keyPoints": [
   "Do not use Present Perfect with clearly finished past time."
  ],
  "quiz": [
   {
    "q": "Beam ___ in Bangkok for five years.",
    "choices": [
     "live",
     "lives",
     "has lived",
     "lived"
    ],
    "a": 2,
    "exp": "for five years = เริ่มในอดีตและยังอยู่ ใช้ has + V3"
   },
   {
    "q": "They ___ already finished the project.",
    "choices": [
     "has",
     "have",
     "had",
     "having"
    ],
    "a": 1,
    "exp": "ประธาน They ใช้ have"
   },
   {
    "q": "I ___ Japan in 2020.",
    "choices": [
     "have visited",
     "has visited",
     "visited",
     "visit"
    ],
    "a": 2,
    "exp": "in 2020 เป็นเวลาที่จบแล้ว ใช้ Past Simple"
   }
  ]
 },
 {
  "id": 6,
  "title": "Past Perfect",
  "thaiTitle": "อดีตก่อนอดีต",
  "learningGoals": [
   "sequencing two past events",
   "earlier vs later event"
  ],
  "explanation": "ใช้เมื่อมีเหตุการณ์ในอดีตสองเหตุการณ์ เหตุการณ์ที่เกิดก่อนใช้ Past Perfect เหตุการณ์ที่เกิดทีหลังใช้ Past Simple",
  "structures": [
   "S + had + V3",
   "Earlier event: Past Perfect",
   "Later event: Past Simple"
  ],
  "usage": [
   "two past events in sequence"
  ],
  "examples": [
   "The train had left before we arrived.",
   "She had forgotten her ticket at home."
  ],
  "keywords": [
   "before",
   "after",
   "already",
   "by the time",
   "when"
  ],
  "commonMistakes": [
   {
    "wrong": "The train has left before we arrived.",
    "right": "The train had left before we arrived.",
    "why": "เหตุการณ์ก่อนหน้าในอดีตใช้ had + V3 ไม่ใช่ has"
   }
  ],
  "keyPoints": [
   "Earlier event = had + V3"
  ],
  "quiz": [
   {
    "q": "When Fah arrived, the movie ___ already started.",
    "choices": [
     "has",
     "had",
     "have",
     "was"
    ],
    "a": 1,
    "exp": "เหตุการณ์ที่เกิดก่อนในอดีตใช้ had + V3"
   },
   {
    "q": "She ___ her ticket at home.",
    "choices": [
     "forgets",
     "forgot",
     "had forgotten",
     "forgetting"
    ],
    "a": 2,
    "exp": "เกิดก่อนที่เธอจะไปถึง จึงใช้ Past Perfect"
   },
   {
    "q": "By the time we got there, they ___ eaten.",
    "choices": [
     "have",
     "had",
     "has",
     "were"
    ],
    "a": 1,
    "exp": "By the time เป็นสัญญาณของ Past Perfect"
   }
  ]
 },
 {
  "id": 7,
  "title": "Future Tenses",
  "thaiTitle": "อนาคต",
  "learningGoals": [
   "will",
   "going to",
   "present continuous for future",
   "first conditional"
  ],
  "explanation": "อนาคตมีหลายรูป: will ใช้ตัดสินใจทันที/ทำนาย/สัญญา, going to ใช้กับแผนและหลักฐาน, Present Continuous ใช้กับนัดหมายที่จัดไว้แล้ว",
  "structures": [
   "Will: S + will + V1",
   "Going to: S + am/is/are + going to + V1",
   "Present Continuous: am/is/are + V-ing",
   "First Conditional: If + Present Simple, will + V1"
  ],
  "usage": [
   "immediate decisions",
   "predictions",
   "promises",
   "offers",
   "plans",
   "intentions",
   "evidence-based future",
   "arranged future plans"
  ],
  "examples": [
   "If it rains, I will stay home.",
   "Arm is going to travel to Japan next month.",
   "He is meeting his cousin in Osaka."
  ],
  "keywords": [
   "tomorrow",
   "next week",
   "next month",
   "soon",
   "in 2035"
  ],
  "commonMistakes": [
   {
    "wrong": "If it will rain, I will stay home.",
    "right": "If it rains, I will stay home.",
    "why": "ในประโยค if ของ First Conditional ใช้ Present Simple ไม่ใช้ will"
   }
  ],
  "keyPoints": [
   "Do not use: If it will rain."
  ],
  "quiz": [
   {
    "q": "If it ___ tomorrow, we will stay home.",
    "choices": [
     "rain",
     "rains",
     "rained",
     "will rain"
    ],
    "a": 1,
    "exp": "If-clause ของ Type 1 ใช้ Present Simple"
   },
   {
    "q": "Look at those clouds! It ___ rain.",
    "choices": [
     "will",
     "is going to",
     "goes to",
     "would"
    ],
    "a": 1,
    "exp": "มีหลักฐานให้เห็น ใช้ going to"
   },
   {
    "q": "I ___ help you with your bag.",
    "choices": [
     "will",
     "am going to",
     "going to",
     "would"
    ],
    "a": 0,
    "exp": "การเสนอตัวช่วยทันที ใช้ will"
   }
  ]
 },
 {
  "id": 8,
  "title": "Passive Voice",
  "thaiTitle": "ประโยคถูกกระทำ",
  "learningGoals": [
   "active to passive",
   "be + V3 in each tense",
   "using by"
  ],
  "explanation": "ใช้เมื่อสนใจสิ่งที่ถูกกระทำมากกว่าผู้กระทำ โครงสร้างหลักคือ verb to be ที่ผันตาม tense + V3",
  "structures": [
   "S + be + V3",
   "Present: is cleaned",
   "Past: was cleaned",
   "Future: will be cleaned",
   "Present Perfect: has been cleaned"
  ],
  "usage": [
   "when the action matters more than the actor",
   "use by when the actor matters"
  ],
  "examples": [
   "Active: The Allies attacked the bridge.",
   "Passive: The bridge was attacked by the Allies.",
   "This cake was baked by my mother."
  ],
  "keywords": [
   "by",
   "was built",
   "is considered",
   "has been"
  ],
  "commonMistakes": [
   {
    "wrong": "The bridge was build by prisoners.",
    "right": "The bridge was built by prisoners.",
    "why": "หลัง verb to be ต้องใช้กริยาช่อง 3 (V3)"
   }
  ],
  "keyPoints": [
   "Correct tense of BE + V3."
  ],
  "quiz": [
   {
    "q": "The bridge ___ by prisoners of war.",
    "choices": [
     "built",
     "was built",
     "builds",
     "building"
    ],
    "a": 1,
    "exp": "อดีต passive = was + V3"
   },
   {
    "q": "Every ingredient ___ carefully before mixing.",
    "choices": [
     "measures",
     "measured",
     "is measured",
     "measuring"
    ],
    "a": 2,
    "exp": "ปัจจุบัน passive = is + V3"
   },
   {
    "q": "The room ___ cleaned tomorrow.",
    "choices": [
     "will be",
     "will",
     "is",
     "was"
    ],
    "a": 0,
    "exp": "อนาคต passive = will be + V3"
   }
  ]
 },
 {
  "id": 9,
  "title": "Conditional Sentences",
  "thaiTitle": "ประโยคเงื่อนไข",
  "learningGoals": [
   "type 1 real future",
   "type 2 unreal present",
   "type 3 unreal past"
  ],
  "explanation": "ประโยคเงื่อนไขมี 3 แบบหลัก แต่ละแบบจับคู่ tense ต่างกันอย่างชัดเจน",
  "structures": [
   "Type 1: If + Present Simple, will + V1",
   "Type 2: If + Past Simple, would + V1",
   "Type 3: If + Past Perfect, would have + V3"
  ],
  "usage": [
   "Type 1: Present → will",
   "Type 2: Past → would",
   "Type 3: Past Perfect → would have + V3"
  ],
  "examples": [
   "If it rains, we will stay home.",
   "If I had more free time, I would learn to paint.",
   "If the bridge had not been damaged, they would not have needed a replacement."
  ],
  "keywords": [
   "if",
   "unless",
   "would",
   "would have"
  ],
  "commonMistakes": [
   {
    "wrong": "If I would have time, I would help.",
    "right": "If I had time, I would help.",
    "why": "ใน if-clause ของ Type 2 ใช้ Past Simple ไม่ใช้ would"
   }
  ],
  "keyPoints": [
   "Match the pair: Present→will, Past→would, Past Perfect→would have + V3"
  ],
  "quiz": [
   {
    "q": "If I ___ more free time, I would learn to paint.",
    "choices": [
     "have",
     "has",
     "had",
     "will have"
    ],
    "a": 2,
    "exp": "Type 2 ใช้ Past Simple ใน if-clause"
   },
   {
    "q": "If she had studied, she ___ passed.",
    "choices": [
     "would",
     "will have",
     "would have",
     "had"
    ],
    "a": 2,
    "exp": "Type 3 ใช้ would have + V3"
   },
   {
    "q": "If it rains, we ___ stay home.",
    "choices": [
     "will",
     "would",
     "had",
     "would have"
    ],
    "a": 0,
    "exp": "Type 1 ใช้ will + V1"
   }
  ]
 },
 {
  "id": 10,
  "title": "Gerund & Infinitive",
  "thaiTitle": "Gerund และ Infinitive",
  "learningGoals": [
   "verbs followed by V-ing",
   "verbs followed by to + V1",
   "allow + object + to V"
  ],
  "explanation": "กริยาบางตัวตามด้วย V-ing บางตัวตามด้วย to + V1 ต้องจำเป็นกลุ่ม",
  "structures": [
   "Gerund: V-ing",
   "Infinitive: to + V1",
   "Pattern: allow + object + to V"
  ],
  "usage": [
   "Gerund after: enjoy, avoid, finish, suggest, mind",
   "Infinitive after: want, decide, plan, hope, offer, need"
  ],
  "examples": [
   "I enjoy playing guitar.",
   "She decided to start a book club.",
   "My parents allow me to play games."
  ],
  "keywords": [
   "enjoy",
   "avoid",
   "finish",
   "suggest",
   "mind",
   "want",
   "decide",
   "plan",
   "hope",
   "offer",
   "need"
  ],
  "commonMistakes": [
   {
    "wrong": "I enjoy to play guitar.",
    "right": "I enjoy playing guitar.",
    "why": "หลัง enjoy ต้องใช้ V-ing"
   }
  ],
  "keyPoints": [
   "I enjoy playing guitar. Not: I enjoy to play guitar."
  ],
  "quiz": [
   {
    "q": "Nan enjoys ___ novels before bed.",
    "choices": [
     "read",
     "reads",
     "reading",
     "to read"
    ],
    "a": 2,
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
    "a": 2,
    "exp": "หลัง decide ใช้ to + V1"
   },
   {
    "q": "The school does not allow students ___ phones.",
    "choices": [
     "use",
     "using",
     "to use",
     "used"
    ],
    "a": 2,
    "exp": "allow + object + to V"
   }
  ]
 },
 {
  "id": 11,
  "title": "Relative Clauses",
  "thaiTitle": "ประโยคขยายนาม",
  "learningGoals": [
   "who / whom / which / whose / that",
   "when for time"
  ],
  "explanation": "ใช้ขยายคำนามให้รู้ว่าเราหมายถึงคนหรือสิ่งไหน เลือกคำเชื่อมตามชนิดของคำนาม",
  "structures": [
   "who = people",
   "whom = people as object",
   "which = things/animals",
   "whose = possession",
   "that = people/things in some structures"
  ],
  "usage": [
   "defining and non-defining noun information"
  ],
  "examples": [
   "This is the teacher who taught me English.",
   "The book, which she recommended, changed how I study.",
   "The workers, whose lives were difficult, came from Allied countries."
  ],
  "keywords": [
   "who",
   "whom",
   "which",
   "whose",
   "that",
   "when"
  ],
  "commonMistakes": [
   {
    "wrong": "The book who she recommended...",
    "right": "The book which she recommended...",
    "why": "สิ่งของใช้ which ไม่ใช้ who"
   }
  ],
  "keyPoints": [
   "whose = แสดงความเป็นเจ้าของ"
  ],
  "quiz": [
   {
    "q": "This is the teacher ___ taught me English.",
    "choices": [
     "which",
     "who",
     "whose",
     "whom"
    ],
    "a": 1,
    "exp": "คน + เป็นประธานของกริยา ใช้ who"
   },
   {
    "q": "The book, ___ she recommended, was great.",
    "choices": [
     "who",
     "whom",
     "which",
     "whose"
    ],
    "a": 2,
    "exp": "สิ่งของใช้ which"
   },
   {
    "q": "The workers, ___ lives were difficult, came from far away.",
    "choices": [
     "who",
     "which",
     "whom",
     "whose"
    ],
    "a": 3,
    "exp": "แสดงความเป็นเจ้าของใช้ whose"
   }
  ]
 },
 {
  "id": 12,
  "title": "Reported Speech",
  "thaiTitle": "การเล่าคำพูด",
  "learningGoals": [
   "tense backshift",
   "time expression changes"
  ],
  "explanation": "เมื่อเล่าคำพูดของคนอื่น tense จะถอยหลังไปหนึ่งขั้น และคำบอกเวลาต้องเปลี่ยนตาม",
  "structures": [
   "Direct: She said, \"I am tired.\"",
   "Reported: She said that she was tired."
  ],
  "usage": [
   "Present → Past",
   "am → was",
   "Past → Past Perfect",
   "went → had gone",
   "will → would",
   "can → could"
  ],
  "examples": [
   "today → that day",
   "tomorrow → the next day",
   "yesterday → the day before",
   "now → then",
   "this → that",
   "these → those"
  ],
  "keywords": [
   "said",
   "told",
   "explained",
   "added",
   "reported"
  ],
  "commonMistakes": [
   {
    "wrong": "She said she is tired.",
    "right": "She said she was tired.",
    "why": "ต้องถอย tense จาก Present เป็น Past"
   }
  ],
  "keyPoints": [
   "Backshift one step into the past."
  ],
  "quiz": [
   {
    "q": "Ice said he ___ tired that day.",
    "choices": [
     "is",
     "was",
     "were",
     "has been"
    ],
    "a": 1,
    "exp": "am → was เมื่อเล่าคำพูด"
   },
   {
    "q": "She said she ___ rest early.",
    "choices": [
     "will",
     "would",
     "can",
     "may"
    ],
    "a": 1,
    "exp": "will → would"
   },
   {
    "q": "He reported that the bridge ___ been built quickly.",
    "choices": [
     "has",
     "had",
     "have",
     "is"
    ],
    "a": 1,
    "exp": "Present Perfect → Past Perfect (had)"
   }
  ]
 },
 {
  "id": 13,
  "title": "Modal Verbs",
  "thaiTitle": "กริยาช่วยแสดงทัศนคติ",
  "learningGoals": [
   "ability",
   "permission",
   "possibility",
   "necessity",
   "advice"
  ],
  "explanation": "Modal verbs ใช้แสดงความสามารถ การขออนุญาต ความเป็นไปได้ ความจำเป็น และคำแนะนำ ตามด้วย V1 เสมอ",
  "structures": [
   "Modal + V1",
   "can / could / may / might / must / should / will / would"
  ],
  "usage": [
   "Can: ability/permission",
   "Could: past ability/polite request",
   "May/Might: possibility",
   "Must: necessity",
   "Should: advice"
  ],
  "examples": [
   "You should drink more water.",
   "You must not skip breakfast.",
   "If you feel dizzy, you might need a doctor."
  ],
  "keywords": [
   "can",
   "could",
   "may",
   "might",
   "must",
   "should",
   "will",
   "would"
  ],
  "commonMistakes": [
   {
    "wrong": "You should to drink water.",
    "right": "You should drink water.",
    "why": "หลัง modal ใช้ V1 ไม่ต้องมี to"
   }
  ],
  "keyPoints": [
   "Modal + V1 (no to)"
  ],
  "quiz": [
   {
    "q": "You ___ drink more water every day.",
    "choices": [
     "must",
     "should",
     "can",
     "will"
    ],
    "a": 1,
    "exp": "เป็นคำแนะนำ ใช้ should"
   },
   {
    "q": "Engineers ___ follow strict safety standards.",
    "choices": [
     "might",
     "must",
     "can",
     "would"
    ],
    "a": 1,
    "exp": "เป็นความจำเป็น ใช้ must"
   },
   {
    "q": "She ___ speak three languages.",
    "choices": [
     "can",
     "must",
     "should",
     "may"
    ],
    "a": 0,
    "exp": "ความสามารถใช้ can"
   }
  ]
 },
 {
  "id": 14,
  "title": "Comparative & Superlative",
  "thaiTitle": "การเปรียบเทียบ",
  "learningGoals": [
   "comparative forms",
   "superlative forms",
   "irregular adjectives"
  ],
  "explanation": "คำคุณศัพท์สั้นเติม -er/-est คำยาวใช้ more/the most และมีคำที่ผันไม่ปกติต้องจำ",
  "structures": [
   "Comparative: short adjective + er + than",
   "Long adjective: more + adjective + than",
   "Superlative: the + adjective + est",
   "Long adjective: the most + adjective"
  ],
  "usage": [
   "comparing two things",
   "comparing three or more"
  ],
  "examples": [
   "Bangkok is bigger than Chiang Mai.",
   "It has the most beautiful temples.",
   "good → better → best"
  ],
  "keywords": [
   "than",
   "the most",
   "the best",
   "-er",
   "-est"
  ],
  "commonMistakes": [
   {
    "wrong": "Bangkok is more big than Chiang Mai.",
    "right": "Bangkok is bigger than Chiang Mai.",
    "why": "คำคุณศัพท์พยางค์เดียวเติม -er ไม่ใช้ more"
   }
  ],
  "keyPoints": [
   "Irregular: good → better → best / bad → worse → worst / far → farther/further → farthest/furthest"
  ],
  "quiz": [
   {
    "q": "Bangkok is ___ than Chiang Mai.",
    "choices": [
     "big",
     "bigger",
     "biggest",
     "more big"
    ],
    "a": 1,
    "exp": "เปรียบเทียบสองสิ่ง คำสั้นเติม -er"
   },
   {
    "q": "It has the ___ temples in the north.",
    "choices": [
     "beautiful",
     "more beautiful",
     "most beautiful",
     "beautifuler"
    ],
    "a": 2,
    "exp": "คำยาวขั้นสูงสุดใช้ the most"
   },
   {
    "q": "This result is ___ than last year's.",
    "choices": [
     "good",
     "better",
     "best",
     "gooder"
    ],
    "a": 1,
    "exp": "good ผันไม่ปกติเป็น better"
   }
  ]
 },
 {
  "id": 15,
  "title": "Articles",
  "thaiTitle": "คำนำหน้านาม",
  "learningGoals": [
   "a vs an",
   "the for specific nouns"
  ],
  "explanation": "a/an ใช้กับนามเอกพจน์ที่ยังไม่เจาะจง the ใช้กับสิ่งที่ผู้ฟังรู้แล้วว่าหมายถึงอันไหน",
  "structures": [
   "a: singular nonspecific noun",
   "an: singular noun beginning with vowel sound",
   "the: specific/known noun"
  ],
  "usage": [
   "first mention → a/an",
   "second mention → the"
  ],
  "examples": [
   "I saw a dog.",
   "The dog was black.",
   "She followed an old man."
  ],
  "keywords": [
   "a",
   "an",
   "the"
  ],
  "commonMistakes": [
   {
    "wrong": "I saw a old man.",
    "right": "I saw an old man.",
    "why": "old ขึ้นต้นด้วยเสียงสระ ต้องใช้ an"
   }
  ],
  "keyPoints": [
   "an ใช้ตามเสียงสระ ไม่ใช่ตามตัวอักษร"
  ],
  "quiz": [
   {
    "q": "I saw ___ cat sitting under a tree.",
    "choices": [
     "a",
     "an",
     "the",
     "no article"
    ],
    "a": 0,
    "exp": "กล่าวถึงครั้งแรกและขึ้นต้นด้วยเสียงพยัญชนะ ใช้ a"
   },
   {
    "q": "___ cat was orange with white paws.",
    "choices": [
     "A",
     "An",
     "The",
     "No article"
    ],
    "a": 2,
    "exp": "กล่าวถึงครั้งที่สอง ผู้ฟังรู้แล้ว ใช้ The"
   },
   {
    "q": "She followed ___ old man.",
    "choices": [
     "a",
     "an",
     "the",
     "no article"
    ],
    "a": 1,
    "exp": "old ขึ้นต้นด้วยเสียงสระ ใช้ an"
   }
  ]
 },
 {
  "id": 16,
  "title": "Prepositions",
  "thaiTitle": "คำบุพบท",
  "learningGoals": [
   "time prepositions",
   "place prepositions",
   "collocations"
  ],
  "explanation": "คำบุพบทบอกเวลา สถานที่ และจับคู่กับคำบางคำเป็นสำนวนตายตัว ต้องจำเป็นคู่ ไม่ควรแปลตรงจากภาษาไทย",
  "structures": [
   "in / on / at / to / from / for / with / by / about / of"
  ],
  "usage": [
   "Time: at 7 o'clock, on Monday, in July",
   "Place: in Thailand, on the table, at school"
  ],
  "examples": [
   "interested in",
   "married to",
   "built by"
  ],
  "keywords": [
   "in",
   "on",
   "at",
   "to",
   "from",
   "for",
   "with",
   "by",
   "about",
   "of"
  ],
  "commonMistakes": [
   {
    "wrong": "She is married with him.",
    "right": "She is married to him.",
    "why": "married จับคู่กับ to เป็นสำนวนตายตัว"
   }
  ],
  "keyPoints": [
   "Do not translate prepositions directly from Thai every time."
  ],
  "quiz": [
   {
    "q": "She got married ___ her childhood friend.",
    "choices": [
     "with",
     "to",
     "for",
     "at"
    ],
    "a": 1,
    "exp": "married to เป็น collocation"
   },
   {
    "q": "They are interested ___ traveling.",
    "choices": [
     "on",
     "at",
     "in",
     "for"
    ],
    "a": 2,
    "exp": "interested in เป็น collocation"
   },
   {
    "q": "We arrived ___ the airport early.",
    "choices": [
     "in",
     "to",
     "at",
     "on"
    ],
    "a": 2,
    "exp": "arrive at + สถานที่เฉพาะจุด"
   }
  ]
 },
 {
  "id": 17,
  "title": "Participial Adjectives",
  "thaiTitle": "คุณศัพท์จากกริยา",
  "learningGoals": [
   "-ing vs -ed adjectives"
  ],
  "explanation": "คำลงท้าย -ing บอกว่าสิ่งนั้นทำให้เกิดความรู้สึก ส่วน -ed บอกว่าคนนั้นรู้สึกอย่างไร",
  "structures": [
   "V-ing = causes the feeling",
   "V-ed = feels the feeling"
  ],
  "usage": [
   "describing things vs describing people's feelings"
  ],
  "examples": [
   "boring / bored",
   "exciting / excited",
   "interesting / interested",
   "confusing / confused",
   "surprising / surprised",
   "tiring / tired",
   "frightening / frightened"
  ],
  "keywords": [
   "-ing",
   "-ed"
  ],
  "commonMistakes": [
   {
    "wrong": "I am boring.",
    "right": "I am bored.",
    "why": "ถ้าหมายถึงความรู้สึกของตัวเองต้องใช้ -ed"
   }
  ],
  "keyPoints": [
   "I am bored (ฉันเบื่อ) ≠ I am boring (ฉันน่าเบื่อ)"
  ],
  "quiz": [
   {
    "q": "The movie was so ___ that I fell asleep.",
    "choices": [
     "bored",
     "boring",
     "bore",
     "bores"
    ],
    "a": 1,
    "exp": "หนังเป็นตัวทำให้เบื่อ ใช้ -ing"
   },
   {
    "q": "My friend was ___ too.",
    "choices": [
     "bored",
     "boring",
     "bore",
     "bores"
    ],
    "a": 0,
    "exp": "คนรู้สึกเบื่อ ใช้ -ed"
   },
   {
    "q": "Parents end up feeling ___.",
    "choices": [
     "overwhelming",
     "overwhelmed",
     "overwhelm",
     "overwhelms"
    ],
    "a": 1,
    "exp": "คนรู้สึก ใช้ -ed"
   }
  ]
 },
 {
  "id": 18,
  "title": "Conjunctions & Linking Words",
  "thaiTitle": "คำเชื่อมประโยค",
  "learningGoals": [
   "reason",
   "contrast",
   "result"
  ],
  "explanation": "คำเชื่อมบอกความสัมพันธ์ระหว่างประโยค เช่น เหตุผล ความขัดแย้ง และผลลัพธ์",
  "structures": [
   "Reason: because, since",
   "Contrast: although, however",
   "Result: therefore, consequently"
  ],
  "usage": [
   "linking two ideas logically"
  ],
  "examples": [
   "Although it was raining, we went for a walk.",
   "We brought umbrellas because we didn't want to get wet.",
   "However, the rain stopped after ten minutes."
  ],
  "keywords": [
   "because",
   "since",
   "although",
   "however",
   "therefore",
   "consequently"
  ],
  "commonMistakes": [
   {
    "wrong": "Although it was raining, but we went out.",
    "right": "Although it was raining, we went out.",
    "why": "ห้ามใช้ although กับ but พร้อมกันในประโยคเดียว"
   }
  ],
  "keyPoints": [
   "Do not use although + but together."
  ],
  "quiz": [
   {
    "q": "___ it was raining, we decided to go for a walk.",
    "choices": [
     "Because",
     "Although",
     "So",
     "Therefore"
    ],
    "a": 1,
    "exp": "แสดงความขัดแย้ง ใช้ Although"
   },
   {
    "q": "We brought umbrellas ___ we didn't want to get wet.",
    "choices": [
     "because",
     "although",
     "however",
     "but"
    ],
    "a": 0,
    "exp": "บอกเหตุผล ใช้ because"
   },
   {
    "q": "___, visitors are encouraged to learn respectfully.",
    "choices": [
     "Because",
     "Although",
     "Therefore",
     "However"
    ],
    "a": 2,
    "exp": "บอกผลลัพธ์ ใช้ Therefore"
   }
  ]
 }
];

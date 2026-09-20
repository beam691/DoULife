/* ============================================================
   data/course.js — COURSE STRUCTURE + SENTENCE PRACTICE + ACHIEVEMENTS
   ------------------------------------------------------------
   ผูก vocabulary chapter เข้ากับ grammar unit และ reading unit
   หนึ่งบท = Vocabulary → Review 1-5 → Sentence → Reading A → Reading B → Exam
   ============================================================ */

/* ลำดับขั้นภายในบท (ใช้สร้าง step list ของทุกบท) */
const CHAPTER_STEPS = [
  { key: 'vocab',    label: 'Vocabulary',       icon: 'A',  xp: 5  },
  { key: 'review1',  label: 'Review 1',         icon: '1',  xp: 10 },
  { key: 'review2',  label: 'Review 2',         icon: '2',  xp: 10 },
  { key: 'review3',  label: 'Review 3',         icon: '3',  xp: 10 },
  { key: 'review4',  label: 'Review 4',         icon: '4',  xp: 10 },
  { key: 'review5',  label: 'Review 5',         icon: '5',  xp: 10 },
  { key: 'sentence', label: 'Sentence Practice',icon: '✎',  xp: 15 },
  { key: 'reading1', label: 'Reading A',        icon: '📖', xp: 20 },
  { key: 'reading2', label: 'Reading B',        icon: '📖', xp: 20 },
  { key: 'exam',     label: 'Chapter Exam',     icon: '★',  xp: 50 }
];

/* รูปแบบคำถามของ Review แต่ละรอบ (ไม่ซ้ำแบบกัน) */
const REVIEW_MODES = {
  review1: ['en2th'],                          // อังกฤษ → ไทย
  review2: ['th2en'],                          // ไทย → อังกฤษ
  review3: ['context', 'en2th'],               // เติมคำในประโยค
  review4: ['match', 'th2en'],                 // จับคู่ความหมาย
  review5: ['spell', 'context', 'en2th']       // สะกดคำ + รวมทุกแบบ
};

/* ผูกบทเรียน: vocab chapter i ใช้ grammar unit i และ reading topic i
   18 vocabulary chapters ↔ 18 grammar units ↔ 18 reading topics (A/B) */
const courseChapters = vocabularyChapters.map((vc, i) => {
  const gu = grammarUnits[i % grammarUnits.length];
  const topicId = gu.id;
  const ra = readingUnits.find(r => r.topicId === topicId && r.level === 'basic');
  const rb = readingUnits.find(r => r.topicId === topicId && r.level === 'applied');
  return {
    id: vc.id,
    order: i,
    icon: vc.icon,
    title: vc.title,
    titleEn: vc.titleEn,
    type: vc.type,
    wordCount: vc.words.length,
    grammarUnitId: gu.id,
    grammarTitle: gu.title,
    grammarThai: gu.thaiTitle,
    readingA: ra.id,
    readingB: rb.id,
    /* grammar ที่ต้องนำกลับมาใช้ซ้ำ (spiral curriculum):
       บทนี้ + ทุก unit ที่เรียนผ่านมาแล้ว */
    recycledGrammar: grammarUnits.slice(0, (i % grammarUnits.length) + 1).map(g => g.id)
  };
});

/* ---------- Sentence Practice tasks ----------
   สร้างจากคำศัพท์จริงของบท + grammar unit ของบท
   ไม่แสดง exampleAnswer ก่อนผู้เรียนส่งคำตอบ            */
const SENTENCE_PROMPT_BY_GRAMMAR = {
  1:  { skill: 'Present Simple',       hint: 'ใช้ V1 และอย่าลืมเติม s เมื่อประธานเป็น He/She/It', example: w => `Many students ${'use'} the word "${w}" every day.` },
  2:  { skill: 'Present Continuous',   hint: 'ใช้ am/is/are + V-ing',                              example: w => `I am thinking about the word "${w}" right now.` },
  3:  { skill: 'Past Simple',          hint: 'ใช้กริยาช่อง 2 และระบุเวลาในอดีต',                    example: w => `Yesterday I learned the word "${w}" in class.` },
  4:  { skill: 'Past Continuous',      hint: 'ใช้ was/were + V-ing คู่กับเหตุการณ์ใน Past Simple',  example: w => `I was reading about "${w}" when my friend called.` },
  5:  { skill: 'Present Perfect',      hint: 'ใช้ have/has + V3 กับ for, since, already, never',    example: w => `I have already used the word "${w}" in a sentence.` },
  6:  { skill: 'Past Perfect',         hint: 'ใช้ had + V3 กับเหตุการณ์ที่เกิดก่อน',                 example: w => `I had never heard the word "${w}" before this lesson.` },
  7:  { skill: 'Future Tenses',        hint: 'ใช้ will / be going to / present continuous',         example: w => `I will use the word "${w}" in my next essay.` },
  8:  { skill: 'Passive Voice',        hint: 'ใช้ verb to be + V3',                                 example: w => `The word "${w}" is used in many articles.` },
  9:  { skill: 'Conditional Sentences',hint: 'ใช้ if + tense ให้ตรงคู่กัน',                          example: w => `If I study every day, I will remember "${w}" easily.` },
  10: { skill: 'Gerund & Infinitive',  hint: 'ลองใช้ enjoy/decide/want ตามด้วย V-ing หรือ to + V1',  example: w => `I enjoy learning new words such as "${w}".` },
  11: { skill: 'Relative Clauses',     hint: 'ใช้ who / which / whose เชื่อมขยายคำนาม',             example: w => `This is the word "${w}", which I learned today.` },
  12: { skill: 'Reported Speech',      hint: 'เล่าคำพูดโดยถอย tense ลงหนึ่งขั้น',                     example: w => `My teacher said that the word "${w}" was important.` },
  13: { skill: 'Modal Verbs',          hint: 'ใช้ can/should/must ตามด้วย V1',                      example: w => `You should remember the word "${w}".` },
  14: { skill: 'Comparative & Superlative', hint: 'ใช้ -er/-est หรือ more/the most',                example: w => `The word "${w}" is more useful than I expected.` },
  15: { skill: 'Articles',             hint: 'เลือก a / an / the ให้ถูกต้อง',                         example: w => `The word "${w}" appears in the passage.` },
  16: { skill: 'Prepositions',         hint: 'ระวังคำบุพบทที่จับคู่ตายตัว เช่น interested in',        example: w => `I am interested in the meaning of "${w}".` },
  17: { skill: 'Participial Adjectives', hint: 'แยกให้ออกระหว่าง -ing (ทำให้รู้สึก) กับ -ed (รู้สึก)', example: w => `This lesson about "${w}" is interesting.` },
  18: { skill: 'Conjunctions & Linking Words', hint: 'ใช้ because / although / therefore เชื่อมสองใจความ', example: w => `Although the word "${w}" is difficult, I remember it well.` }
};

/* สร้าง sentence task 4 ข้อต่อบท จากคำศัพท์จริงของบทนั้น */
function buildSentenceTasks(chapterId) {
  const ch = courseChapters.find(c => c.id === chapterId);
  const vc = vocabularyChapters.find(v => v.id === chapterId);
  const cfg = SENTENCE_PROMPT_BY_GRAMMAR[ch.grammarUnitId];
  const picks = [0, Math.floor(vc.words.length * 0.3), Math.floor(vc.words.length * 0.6), vc.words.length - 1]
    .filter((v, i, a) => a.indexOf(v) === i)
    .map(i => vc.words[i]);
  return picks.map((w, i) => ({
    id: `${chapterId}_sent_${i}`,
    vocabulary: w.en,
    vocabularyTh: w.th,
    grammarUnit: ch.grammarUnitId,
    grammarTitle: ch.grammarTitle,
    prompt: `แต่งประโยคภาษาอังกฤษโดยใช้คำว่า "${w.en}" (${w.th})`,
    targetSkill: cfg.skill,
    hint: cfg.hint,
    difficulty: i === 0 ? 'easy' : i < 3 ? 'medium' : 'hard',
    exampleAnswer: cfg.example(w.en)
  }));
}

/* ---------- Achievements ---------- */
const achievements = [
  { id: 'first_streak', icon: '🔥', title: 'First Streak',      desc: 'เรียนต่อเนื่องวันแรก',        check: s => s.streak >= 1 },
  { id: 'streak_7',     icon: '🔥', title: '7 Day Streak',      desc: 'เรียนต่อเนื่อง 7 วัน',        check: s => s.longestStreak >= 7 },
  { id: 'streak_14',    icon: '🔥', title: '14 Day Streak',     desc: 'เรียนต่อเนื่อง 14 วัน',       check: s => s.longestStreak >= 14 },
  { id: 'streak_30',    icon: '🔥', title: '30 Day Streak',     desc: 'เรียนต่อเนื่อง 30 วัน',       check: s => s.longestStreak >= 30 },
  { id: 'first_chapter',icon: '📚', title: 'First Chapter',     desc: 'เรียนจบบทแรก',                check: s => s.completedChapters >= 1 },
  { id: 'vocab_100',    icon: '🧠', title: 'Vocabulary Builder',desc: 'เรียนคำศัพท์ครบ 100 คำ',      check: s => s.wordsLearned >= 100 },
  { id: 'reader_10',    icon: '📖', title: 'Reader',            desc: 'ทำ Reading ครบ 10 units',     check: s => s.readingDone >= 10 },
  { id: 'sentence_20',  icon: '✍️', title: 'Sentence Builder',  desc: 'ฝึกแต่งประโยคครบ 20 ครั้ง',    check: s => s.sentencesDone >= 20 },
  { id: 'exam_5',       icon: '🏆', title: 'Exam Ready',        desc: 'สอบผ่านครบ 5 บท',             check: s => s.examsPassed >= 5 }
];

const DAILY_GOAL_OPTIONS = [10, 20, 30, 50];

'use client';

import React, { useState } from 'react';
import { BookMarked, Layers, ListCheck, Keyboard, PenNib, RotateCw, ChevronLeft, ChevronRight, CheckCircle2, XCircle, ArrowRight, AlertTriangle, Send } from 'lucide-react';

const wordList = [
  { id: 1, en: "It is true that...", kr: "...은 사실이다" },
  { id: 2, en: "It is a common belief that...", kr: "...은 일반적인 생각이다" },
  { id: 3, en: "There is a more persuasive argument that...", kr: "...라는 더 설득력 있는 주장이 있다" },
  { id: 4, en: "It is evident that...", kr: "...은 명백하다" },
  { id: 5, en: "I firmly believe that...", kr: "나는 ...라고 굳게 믿는다" },
  { id: 6, en: "I am of the opinion that...", kr: "나는 ...라고 생각한다" },
  { id: 7, en: "I object to...", kr: "나는 ...에 반대한다" },
  { id: 8, en: "has its own advantages and disadvantages", kr: "장점과 단점을 모두 지닌다" },
  { id: 9, en: "The main cause of... is that...", kr: "...의 주된 원인은 ...이다" },
  { id: 10, en: "As a result", kr: "그 결과로" },
  { id: 11, en: "Regardless of...", kr: "...과 무관하게" },
  { id: 12, en: "In conclusion", kr: "결론적으로" }
];

const sentenceList = [
  {
    id: 1,
    translation: "환경을 보호하는 것이 예술에 자금을 지원하는 것보다 더 중요하다는 것은 일반적인 생각이다.",
    hints: [
      { kr: "환경을 보호하다", en: "protect the environment" },
      { kr: "예술 자금 지원", en: "funding the arts" }
    ],
    answer: "It is a common belief that protecting the environment is more important than funding the arts."
  },
  {
    id: 2,
    translation: "인터넷의 도입이 인류를 새로운 기술 시대로 이끌었다는 것은 명백하다.",
    hints: [
      { kr: "도입", en: "introduction" },
      { kr: "~로 이끌다/안내하다", en: "usher ~ into" },
      { kr: "인류", en: "humanity" }
    ],
    answer: "It is evident that the introduction of the Internet ushered humanity into a new age of technology."
  },
  {
    id: 3,
    translation: "교수들이 더 높은 보수를 받는다면 교육의 질이 향상될 것이라는 더 설득력 있는 주장이 있다.",
    hints: [
      { kr: "설득력 있는", en: "persuasive" },
      { kr: "교육의 질", en: "quality of education" }
    ],
    answer: "There is a more persuasive argument that the quality of education would improve if professors received higher pay."
  },
  {
    id: 4,
    translation: "강한 결단력이 성공적인 삶을 위한 핵심 요인이라고 나는 굳게 믿는다.",
    hints: [
      { kr: "결단력", en: "sense of determination" }
    ],
    answer: "I firmly believe that a strong sense of determination is a key factor to a successful life."
  },
  {
    id: 5,
    translation: "결론적으로, 최고의 동료는 정직하고 신의가 있으며 협조적인 사람이다.",
    hints: [
      { kr: "동료", en: "coworker" },
      { kr: "신의가 있는", en: "loyal" },
      { kr: "협조적인", en: "cooperative" }
    ],
    answer: "In conclusion, the best coworkers are the ones who are honest, loyal and cooperative."
  }
];

export default function Home() {
  const [tab, setTab] = useState('flashcard');

  const [flashIndex, setFlashIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const [quizIndex, setQuizIndex] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [quizSelected, setQuizSelected] = useState(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizOptions, setQuizOptions] = useState([]);

  const [typingIndex, setTypingIndex] = useState(0);
  const [typingInput, setTypingInput] = useState('');
  const [typingSubmitted, setTypingSubmitted] = useState(false);

  const [sentenceIndex, setSentenceIndex] = useState(0);
  const [sentenceInput, setSentenceInput] = useState('');
  const [sentenceResult, setSentenceResult] = useState(null);

  const initQuiz = (index) => {
    const target = wordList[index];
    const wrong = wordList.filter(w => w.id !== target.id)
                          .sort(() => 0.5 - Math.random())
                          .slice(0, 4)
                          .map(w => w.kr);
    const opts = [target.kr, ...wrong].sort(() => 0.5 - Math.random());
    setQuizOptions(opts);
    setQuizSelected(null);
    setQuizSubmitted(false);
  };

  const handleTabChange = (newTab) => {
    setTab(newTab);
    if (newTab === 'quiz') initQuiz(quizIndex);
  };

  const handleQuizSelect = (option) => {
    if (quizSubmitted) return;
    setQuizSelected(option);
    setQuizSubmitted(true);
    if (option === wordList[quizIndex].kr) {
      setQuizScore(prev => prev + 10);
    }
  };

  const nextQuiz = () => {
    const nextIdx = (quizIndex + 1) % wordList.length;
    setQuizIndex(nextIdx);
    initQuiz(nextIdx);
  };

  const handleTypingSubmit = (e) => {
    e.preventDefault();
    if (!typingInput.trim()) return;
    setTypingSubmitted(true);
  };

  const nextTyping = () => {
    setTypingInput('');
    setTypingSubmitted(false);
    setTypingIndex((prev) => (prev + 1) % wordList.length);
  };

  const handleSentenceSubmit = () => {
    if (!sentenceInput.trim()) {
      alert('문장을 작성한 후 제출해 주세요!');
      return;
    }

    const currentData = sentenceList[sentenceIndex];
    const targetAns = currentData.answer;

    const userWords = sentenceInput.trim().split(/\s+/);
    const targetWords = targetAns.split(/\s+/);

    let diff = [];
    let errors = 0;
    const maxLen = Math.max(userWords.length, targetWords.length);

    for (let i = 0; i < maxLen; i++) {
      const u = userWords[i] || '';
      const t = targetWords[i] || '';

      const cleanU = u.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "").toLowerCase();
      const cleanT = t.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "").toLowerCase();

      if (cleanU === cleanT && u === t) {
        diff.push({ type: 'match', text: u });
      } else if (cleanU === cleanT) {
        diff.push({ type: 'case', text: u });
        errors++;
      } else {
        diff.push({ type: 'mismatch', userText: u, targetText: t });
        errors++;
      }
    }

    setSentenceResult({ diff, errors, targetAns });
  };

  const nextSentence = () => {
    setSentenceInput('');
    setSentenceResult(null);
    setSentenceIndex((prev) => (prev + 1) % sentenceList.length);
  };

  return (
    <></>
import React, { useState, useEffect } from 'react';
import { Heart, ChevronRight, ArrowLeft, ChevronLeft, Key } from 'lucide-react';
import ResultPage from './components/ResultPage';
import { questions } from './data/questions';
import { calculateResult } from './utils/calculator';
import { saveAnswers, clearAllData } from './utils/storage';

// 有效的邀请码列表
const VALID_CODES = [
  'ECHO2024',
  'LOVE123',
  'TEST001',
  'VIP2024',
  'WELCOME',
  'SPRING2024',
];

function App() {
  const [step, setStep] = useState('landing'); // landing, invite, quiz, result
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState(null);
  const [inviteCode, setInviteCode] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState('');

  // 检查是否已验证
  useEffect(() => {
    const verified = localStorage.getItem('echo_love_verified');
    if (verified === 'true') {
      setStep('quiz');
    }
  }, []);

  const colors = {
    bg: '#FDF9F3',
    accent: '#7C9A92',
  };

  const handleStart = () => {
    // 检查是否已验证
    const verified = localStorage.getItem('echo_love_verified');
    if (verified === 'true') {
      setStep('quiz');
    } else {
      setStep('invite');
    }
  };

  // 验证邀请码（纯前端）
  const handleVerifyCode = () => {
    if (!inviteCode.trim()) {
      setError('请输入邀请码');
      return;
    }

    setIsVerifying(true);
    setError('');

    const code = inviteCode.toUpperCase().trim();

    // 检查是否有效
    if (!VALID_CODES.includes(code)) {
      setError('邀请码无效');
      setIsVerifying(false);
      return;
    }

    // 检查是否已使用
    const usedCodes = JSON.parse(localStorage.getItem('echo_love_used_codes') || '[]');
    if (usedCodes.includes(code)) {
      setError('该邀请码已被使用');
      setIsVerifying(false);
      return;
    }

    // 标记为已使用
    usedCodes.push(code);
    localStorage.setItem('echo_love_used_codes', JSON.stringify(usedCodes));
    localStorage.setItem('echo_love_verified', 'true');

    // 验证成功，开始测试
    setCurrentQ(0);
    setAnswers([]);
    setResult(null);
    setStep('quiz');
    setIsVerifying(false);
  };

  const handleAnswer = (type) => {
    const newAnswers = [...answers];
    newAnswers[currentQ] = type;
    setAnswers(newAnswers);
    saveAnswers(newAnswers);

    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      const calcResult = calculateResult(newAnswers);
      setResult(calcResult);
      setStep('result');
    }
  };

  const handlePrev = () => {
    if (currentQ > 0) {
      setCurrentQ(currentQ - 1);
    }
  };

  const handleNext = () => {
    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
    }
  };

  const handleBack = () => {
    clearAllData();
    setStep('landing');
    setCurrentQ(0);
    setAnswers([]);
    setResult(null);
    setInviteCode('');
    setError('');
  };

  return (
    <div className="min-h-screen w-full max-w-md mx-auto shadow-2xl overflow-hidden flex flex-col" style={{ backgroundColor: colors.bg }}>
      {/* 邀请码输入页面 */}
      {step === 'invite' && (
        <div className="flex-1 flex flex-col items-center justify-center p-10 text-center animate-in fade-in duration-500">
          <div className="w-16 h-16 bg-[#7C9A92] rounded-full flex items-center justify-center text-white mb-6 shadow-inner">
            <Key size={28} />
          </div>
          <h2 className="font-serif text-xl font-bold text-slate-800 mb-2">邀请码</h2>
          <p className="text-xs text-slate-400 mb-8">请输入邀请码进入</p>

          <input
            type="text"
            value={inviteCode}
            onChange={(e) => setInviteCode(e.target.value.toUpperCase())}
            placeholder="请输入邀请码"
            className="w-full px-4 py-3 mb-4 bg-white border border-slate-200 rounded-xl text-center text-sm focus:outline-none focus:border-[#7C9A92]"
            disabled={isVerifying}
          />

          {error && (
            <p className="text-red-500 text-xs mb-4">{error}</p>
          )}

          <button
            onClick={handleVerifyCode}
            disabled={isVerifying}
            className="w-full py-3 bg-[#7C9A92] text-white rounded-full font-bold text-sm shadow-lg hover:scale-105 transition-transform disabled:opacity-50"
          >
            {isVerifying ? '验证中...' : '确认'}
          </button>

          <button
            onClick={handleBack}
            className="mt-4 text-slate-400 text-xs"
          >
            返回
          </button>
        </div>
      )}

      {step === 'landing' && (
        <div className="flex-1 flex flex-col items-center justify-center p-10 text-center animate-in fade-in zoom-in duration-1000">
          <div className="w-20 h-20 bg-[#7C9A92] rounded-full flex items-center justify-center text-white mb-8 shadow-inner animate-pulse">
            <Heart size={36} fill="white" />
          </div>
          <h1 className="font-serif text-3xl font-bold text-slate-800 mb-4">Echo Love</h1>
          <p className="text-sm text-slate-500 leading-relaxed mb-12">
            每一个理想型标签背后<br />都是你内心渴望被听见的回响
          </p>
          <button
            onClick={handleStart}
            className="px-10 py-4 bg-[#7C9A92] text-white rounded-full font-bold text-sm shadow-lg hover:scale-105 transition-transform"
          >
            开启对话
          </button>
        </div>
      )}

      {step === 'quiz' && (
        <div className="flex-1 p-6 flex flex-col animate-in slide-in-from-right duration-500">
          <div className="flex justify-between items-center mb-8">
            <button onClick={handleBack}><ArrowLeft size={20} className="text-slate-400" /></button>
            <span className="text-[10px] font-bold text-slate-300">QUESTION {currentQ + 1}/{questions.length}</span>
            <div className="flex gap-3">
              {currentQ > 0 && (
                <button onClick={handlePrev}>
                  <ChevronLeft size={20} className="text-slate-400" />
                </button>
              )}
              {currentQ < questions.length - 1 && answers[currentQ] && (
                <button onClick={handleNext}>
                  <ChevronRight size={20} className="text-[#7C9A92]" />
                </button>
              )}
            </div>
          </div>

          <div className="w-full bg-slate-100 h-1 rounded-full mb-10">
            <div
              className="bg-[#7C9A92] h-full rounded-full transition-all duration-500"
              style={{ width: `${((currentQ + 1) / questions.length) * 100}%` }}
            ></div>
          </div>

          <h2 className="text-xl font-serif font-bold text-slate-800 mb-10 leading-snug">
            {questions[currentQ].text}
          </h2>

          <div className="space-y-3">
            {questions[currentQ].options.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswer(opt.type)}
                className={`w-full p-4 border rounded-2xl text-left text-sm flex justify-between items-center group transition-all ${
                  answers[currentQ] === opt.type
                    ? 'bg-[#7C9A92]/10 border-[#7C9A92] text-slate-800'
                    : 'bg-white border-slate-100 text-slate-600 hover:border-[#7C9A92] hover:bg-[#7C9A92]/5'
                }`}
              >
                {opt.label}
                {answers[currentQ] === opt.type ? (
                  <span className="text-[#7C9A92] text-xs font-bold">已选</span>
                ) : (
                  <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 text-[#7C9A92]" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 'result' && result && (
        <ResultPage result={result} onBack={handleBack} />
      )}
    </div>
  );
}

export default App;

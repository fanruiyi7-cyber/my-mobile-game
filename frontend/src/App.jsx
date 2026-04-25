import React, { useState, useEffect } from 'react';
import { Heart, ChevronRight, ArrowLeft, ChevronLeft } from 'lucide-react';
import ResultPage from './components/ResultPage';
import { questions } from './data/questions';
import { calculateResult } from './utils/calculator';
import { saveAnswers, clearAllData } from './utils/storage';

function App() {
  const [step, setStep] = useState('landing'); // landing, profile, quiz, result
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState(null);
  const [userInfo, setUserInfo] = useState({ nickname: '', mbti: '' });
  const [otherInput, setOtherInput] = useState(''); // 其他选项的输入

  // 检查是否有已保存的用户信息
  useEffect(() => {
    // 清除所有邀请码相关的旧数据
    localStorage.removeItem('echo_love_verified');
    localStorage.removeItem('echo_love_code');
    localStorage.removeItem('echo_love_used_codes');

    const userInfo = JSON.parse(localStorage.getItem('echo_love_userinfo') || '{}');

    // 如果有用户信息，直接进quiz；否则进landing
    if (userInfo.nickname) {
      setUserInfo(userInfo);
      setStep('quiz');
    } else {
      setStep('landing');
    }
  }, []);

  const colors = {
    bg: '#FDF9F3',
    accent: '#7C9A92',
  };

  const handleStart = () => {
    setStep('profile');
  };

  const handleAnswer = (typeOrObj) => {
    const type = typeof typeOrObj === 'object' ? typeOrObj.type : typeOrObj;
    const otherText = typeof typeOrObj === 'object' ? typeOrObj.text : null;

    const newAnswers = [...answers];
    // 如果是其他选项，保存对象形式
    if (type === 'other' && otherText) {
      newAnswers[currentQ] = { type: 'other', text: otherText };
    } else {
      newAnswers[currentQ] = type;
    }
    setAnswers(newAnswers);
    setOtherInput(''); // 清空输入
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
    localStorage.removeItem('echo_love_userinfo');
    setStep('landing');
    setCurrentQ(0);
    setAnswers([]);
    setResult(null);
    setUserInfo({ nickname: '', mbti: '' });
  };

  return (
    <div className="min-h-screen w-full max-w-md mx-auto shadow-2xl overflow-hidden flex flex-col" style={{ backgroundColor: colors.bg }}>
      {/* 登录页面 */}
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
          <p className="mt-4 text-xs text-slate-400">
            基于 MBTI + 20道心理测评题（能量获取方式、行为模式、内在动机、关系愿景四个维度）
          </p>
        </div>
      )}

      {/* 用户信息填写页面 */}
      {step === 'profile' && (
        <div className="flex-1 flex flex-col items-center justify-center p-10 text-center animate-in fade-in duration-500">
          <div className="w-16 h-16 bg-[#7C9A92] rounded-full flex items-center justify-center text-white mb-6 shadow-inner">
            <Heart size={28} fill="white" />
          </div>
          <h2 className="font-serif text-xl font-bold text-slate-800 mb-2">认识一下</h2>
          <p className="text-xs text-slate-400 mb-8">告诉我们你的基本信息</p>

          <input
            type="text"
            value={userInfo.nickname}
            onChange={(e) => setUserInfo({ ...userInfo, nickname: e.target.value })}
            placeholder="你的昵称"
            className="w-full px-4 py-3 mb-4 bg-white border border-slate-200 rounded-xl text-center text-sm focus:outline-none focus:border-[#7C9A92]"
            maxLength={10}
          />

          <input
            type="text"
            value={userInfo.mbti}
            onChange={(e) => setUserInfo({ ...userInfo, mbti: e.target.value.toUpperCase() })}
            placeholder="你的MBTI (如: INFP)"
            className="w-full px-4 py-3 mb-6 bg-white border border-slate-200 rounded-xl text-center text-sm focus:outline-none focus:border-[#7C9A92]"
            maxLength={4}
          />

          <button
            onClick={() => {
              if (!userInfo.nickname.trim()) {
                alert('请输入昵称');
                return;
              }
              if (!userInfo.mbti.trim()) {
                alert('请输入MBTI');
                return;
              }
              // 保存用户信息
              localStorage.setItem('echo_love_userinfo', JSON.stringify(userInfo));
              setCurrentQ(0);
              setAnswers([]);
              setResult(null);
              setStep('quiz');
            }}
            className="w-full py-3 bg-[#7C9A92] text-white rounded-full font-bold text-sm shadow-lg hover:scale-105 transition-transform"
          >
            开始测试
          </button>

          <button
            onClick={handleBack}
            className="mt-4 text-slate-400 text-xs"
          >
            返回
          </button>
        </div>
      )}

      {/* 测试页面 */}
      {step === 'quiz' && (
        <div className="flex-1 p-6 flex flex-col animate-in slide-in-from-right duration-500">
          <div className="flex justify-between items-center mb-8">
            {/* 左边：上一题 */}
            <div className="flex gap-3">
              {currentQ > 0 && (
                <button
                  onClick={handlePrev}
                  className="flex items-center gap-1 text-slate-500 hover:text-[#7C9A92] text-sm"
                >
                  <ChevronLeft size={20} />
                  <span>上一题</span>
                </button>
              )}
            </div>
            <span className="text-[10px] font-bold text-slate-300">QUESTION {currentQ + 1}/{questions.length}</span>
            {/* 右边：退出 */}
            <button
              onClick={handleBack}
              className="flex items-center gap-1 text-slate-400 hover:text-slate-600 text-sm"
            >
              <span>退出</span>
              <ArrowLeft size={18} className="rotate-180" />
            </button>
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
              <div key={idx}>
                <button
                  onClick={() => {
                    if (opt.type === 'other') {
                      // 选择其他时，显示输入框
                      setOtherInput(answers[currentQ]?.other || '');
                    } else {
                      handleAnswer(opt.type);
                    }
                  }}
                  className={`w-full p-4 border rounded-2xl text-left text-sm flex justify-between items-center group transition-all ${
                    answers[currentQ] === opt.type || answers[currentQ]?.type === opt.type
                      ? 'bg-[#7C9A92]/10 border-[#7C9A92] text-slate-800'
                      : 'bg-white border-slate-100 text-slate-600 hover:border-[#7C9A92] hover:bg-[#7C9A92]/5'
                  }`}
                >
                  {opt.label}
                  {(answers[currentQ] === opt.type || answers[currentQ]?.type === opt.type) ? (
                    <span className="text-[#7C9A92] text-xs font-bold">已选</span>
                  ) : (
                    <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 text-[#7C9A92]" />
                  )}
                </button>
                {/* 其他选项的输入框 */}
                {opt.type === 'other' && (answers[currentQ] === 'other' || answers[currentQ]?.type === 'other') && (
                  <div className="mt-2 p-3 bg-slate-50 rounded-xl">
                    <input
                      type="text"
                      value={otherInput}
                      onChange={(e) => setOtherInput(e.target.value)}
                      placeholder="请输入你的答案..."
                      className="w-full bg-transparent text-sm focus:outline-none"
                      autoFocus
                    />
                    <button
                      onClick={() => {
                        if (otherInput.trim()) {
                          handleAnswer({ type: 'other', text: otherInput.trim() });
                        }
                      }}
                      className="mt-2 w-full py-2 bg-[#7C9A92] text-white rounded-lg text-sm"
                    >
                      确认
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 结果页面 */}
      {step === 'result' && result && (
        <ResultPage result={result} userInfo={userInfo} onBack={handleBack} />
      )}
    </div>
  );
}

export default App;

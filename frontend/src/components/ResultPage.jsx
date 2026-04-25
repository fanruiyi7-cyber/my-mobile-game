import React, { useState, useEffect, useRef } from 'react';
import { Compass, Sparkles, Star, Ban, Info } from 'lucide-react';
import Modal from './Modal';
import { profiles, profileLabels, idealTypes } from '../data/copy';
import { getActionPlan } from '../data/actionPlan';

// MBTI 理想型匹配映射
const mbtiCompatibility = {
  'ENFJ': ['INFP', 'ENFP', 'ISFJ', 'ESFJ'],
  'ENFP': ['ENFJ', 'INFP', 'INTJ', 'INFJ'],
  'ENTJ': ['INTP', 'ENTP', 'INFP', 'ENFP'],
  'ENTP': ['INTJ', 'INFJ', 'ENFJ', 'ENTJ'],
  'ESFJ': ['ISFP', 'ESFP', 'ENFJ', 'INFP'],
  'ESFP': ['ISFJ', 'ESFJ', 'INTJ', 'INFJ'],
  'INFJ': ['ENFP', 'INFP', 'ENTP', 'INTP'],
  'INFP': ['ENFJ', 'INFJ', 'ENFP', 'INTP'],
  'INTJ': ['ENTP', 'ENFP', 'INTP', 'INFP'],
  'INTP': ['ENTJ', 'INTJ', 'ENFJ', 'INFJ'],
  'ISFJ': ['ESFP', 'ISFP', 'ESFJ', 'ENFJ'],
  'ISFP': ['ESFJ', 'ISFJ', 'ENTJ', 'INTJ'],
};

const getRecommendedMBTI = (userMBTI) => {
  const normalizedMBTI = userMBTI.toUpperCase();
  if (mbtiCompatibility[normalizedMBTI]) {
    return mbtiCompatibility[normalizedMBTI][0];
  }
  return 'INFJ'; // 默认推荐
};

const ResultPage = ({ result, userInfo: propUserInfo, onBack }) => {
  const [showModal, setShowModal] = useState(null);
  const [typedText, setTypedText] = useState('');
  const resultRef = useRef(null);

  // 从 props 或 localStorage 获取用户信息
  const storedUserInfo = JSON.parse(localStorage.getItem('echo_love_userinfo') || '{}');
  const userInfo = propUserInfo?.nickname ? propUserInfo : storedUserInfo;

  const { profileKey, idealType } = result;
  const profile = profiles[profileKey];
  const labels = profileLabels[profileKey];
  const actionPlan = getActionPlan(idealType);
  const idealInfo = idealTypes[idealType];

  const userNickname = userInfo?.nickname || '你';
  const userMBTI = userInfo?.mbti || '';
  const recommendedMBTI = getRecommendedMBTI(userMBTI);

  // 打字机效果 - 保持原文"你"
  useEffect(() => {
    const text = profile.description;
    let index = 0;
    const timer = setInterval(() => {
      if (index <= text.length) {
        setTypedText(text.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 30);
    return () => clearInterval(timer);
  }, [profile.description]);

  // 模态框内容 - 显示具体要素详解
  const getModalContent = (type) => {
    switch (type) {
      case 'must':
        return {
          title: `${idealInfo.mustHave?.label || labels.must} 详解`,
          content: (
            <div className="space-y-3">
              <p className="text-sm text-slate-600">{idealInfo.mustHave?.description || idealInfo.description}</p>
            </div>
          )
        };
      case 'nice':
        return {
          title: `${idealInfo.niceToHave?.label || labels.nice} 详解`,
          content: (
            <div className="space-y-3">
              <p className="text-sm text-slate-600">{idealInfo.niceToHave?.description}</p>
            </div>
          )
        };
      case 'red':
        return {
          title: `${idealInfo.redFlags?.label || labels.red} 详解`,
          content: (
            <div className="space-y-3">
              <p className="text-sm text-slate-600">{idealInfo.redFlags?.description}</p>
            </div>
          )
        };
      default:
        return null;
    }
  };

  return (
    <div className="px-6 pb-12">
      <div ref={resultRef} style={{ backgroundColor: '#FDF9F3', padding: '24px', margin: '-24px' }}>
        <div className="text-center py-8">
          <h1 className="text-2xl font-serif font-bold text-slate-800">{userNickname}的理想型画像报告</h1>
          <p className="text-xs text-slate-400 mt-2 tracking-widest uppercase">Echo Love Result</p>
        </div>

        {/* 画像拆解 */}
        <div className="bg-white rounded-3xl p-6 shadow-sm mb-6">
          <span className="text-[10px] font-bold text-slate-300 tracking-tighter block mb-1 uppercase">
            画像拆解 / ANALYSIS
          </span>

          {/* 用户MBTI信息 */}
          {userMBTI && (
            <div className="bg-gradient-to-r from-[#7C9A92]/10 to-[#7C9A92]/5 rounded-2xl p-4 mb-4">
              <div className="flex justify-between items-center">
                <div>
                  <span className="text-[10px] text-slate-400 block">你的MBTI</span>
                  <span className="text-lg font-bold text-[#7C9A92]">{userMBTI}</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 block">理想型MBTI</span>
                  <span className="text-lg font-bold text-rose-400">{recommendedMBTI}</span>
                </div>
              </div>
            </div>
          )}

          <span className="text-[10px] text-slate-400 block mb-4">
            点击标签查看详情
          </span>

          <div className="space-y-4">
            <div
              className="flex gap-4 items-start cursor-pointer group"
              onClick={() => setShowModal('must')}
            >
              <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
                <Star size={14} />
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-bold text-slate-700 flex items-center gap-1">
                  Must-have (刚需)
                  <Info size={12} className="text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                </h4>
                <p className="text-xs text-slate-500">{idealInfo.mustHave?.label || labels.must}</p>
              </div>
            </div>

            <div
              className="flex gap-4 items-start cursor-pointer group"
              onClick={() => setShowModal('nice')}
            >
              <div className="w-8 h-8 rounded-full bg-sky-50 text-sky-600 flex items-center justify-center flex-shrink-0">
                <Sparkles size={14} />
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-bold text-slate-700 flex items-center gap-1">
                  Nice-to-have (加分项)
                  <Info size={12} className="text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                </h4>
                <p className="text-xs text-slate-500">{idealInfo.niceToHave?.label || labels.nice}</p>
              </div>
            </div>

            <div
              className="flex gap-4 items-start cursor-pointer group"
              onClick={() => setShowModal('red')}
            >
              <div className="w-8 h-8 rounded-full bg-red-50 text-red-500 flex items-center justify-center flex-shrink-0">
                <Ban size={14} />
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-bold text-slate-700 flex items-center gap-1">
                  Red-flags (红线)
                  <Info size={12} className="text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                </h4>
                <p className="text-xs text-slate-500">{idealInfo.redFlags?.label || labels.red}</p>
              </div>
            </div>
          </div>
        </div>

        {/* 自我侧写 */}
        <div className="relative border-2 border-dashed border-[#7C9A92] rounded-3xl p-6 mb-6 bg-[#7C9A92]/5">
          <span className="absolute -top-3 left-6 bg-[#FDF9F3] px-2 text-[10px] font-bold text-[#7C9A92]">
            关于你的侧写
          </span>
          <h3 className="text-lg font-serif font-bold text-slate-800 mb-3">{profile.name}</h3>
          <p className="font-serif text-[15px] leading-relaxed text-slate-700 italic">
            "{typedText}"
          </p>
        </div>

        {/* 行动指南 */}
        <div className="bg-[#7C9A92] rounded-3xl p-6 text-white mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Compass size={16} />
            <span className="text-xs font-bold">寻爱指南 · Action Plan</span>
          </div>
          <div className="space-y-4">
            <div>
              <span className="text-[10px] opacity-70 block mb-1 uppercase">雷达地点</span>
              <p className="text-sm font-medium">{actionPlan.radarLocations[0]}</p>
            </div>
            <div>
              <span className="text-[10px] opacity-70 block mb-1 uppercase">破冰第一句</span>
              <p className="text-sm font-medium">"{actionPlan.iceBreakers[0]}"</p>
            </div>
          </div>
        </div>
      </div>

      {/* 返回按钮 */}
      <button
        onClick={onBack}
        className="w-full py-4 bg-slate-800 text-white rounded-full font-bold text-sm shadow-xl flex items-center justify-center gap-2"
      >
        重新测试
      </button>

      {/* 模态框 */}
      <Modal
        isOpen={showModal !== null}
        onClose={() => setShowModal(null)}
        title={showModal ? getModalContent(showModal)?.title : ''}
      >
        {showModal && getModalContent(showModal)?.content}
      </Modal>
    </div>
  );
};

export default ResultPage;

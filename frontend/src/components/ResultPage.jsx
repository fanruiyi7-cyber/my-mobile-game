import React, { useState, useEffect, useRef } from 'react';
import { Compass, Sparkles, Star, Ban, Share2, Info } from 'lucide-react';
import Modal from './Modal';
import { profiles, profileLabels, idealTypes } from '../data/copy';
import { getActionPlan } from '../data/actionPlan';

const ResultPage = ({ result, onBack }) => {
  const [showModal, setShowModal] = useState(null);
  const [typedText, setTypedText] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const resultRef = useRef(null);

  const { profileKey, idealType } = result;
  const profile = profiles[profileKey];
  const labels = profileLabels[profileKey];
  const actionPlan = getActionPlan(idealType);
  const idealInfo = idealTypes[idealType];

  // 打字机效果
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

  // 保存报告
  const handleSave = async () => {
    setIsGenerating(true);

    try {
      const element = resultRef.current;
      if (!element) {
        alert('页面加载中，请稍后重试');
        setIsGenerating(false);
        return;
      }

      // 创建一个临时的 clone 来避免样式问题
      const clone = element.cloneNode(true);
      clone.style.position = 'absolute';
      clone.style.left = '-9999px';
      clone.style.width = '375px';
      clone.style.padding = '24px';
      clone.style.backgroundColor = '#FDF9F3';
      document.body.appendChild(clone);

      const html2canvasModule = await import('html2canvas');
      const html2canvas = html2canvasModule.default;

      const canvas = await html2canvas(clone, {
        scale: 2,
        backgroundColor: '#FDF9F3',
        useCORS: true,
        allowTaint: true,
        logging: false
      });

      // 清理 clone
      document.body.removeChild(clone);

      // 转换为图片并下载
      const dataUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = `echo-love-report-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      alert('报告已保存到相册！');
    } catch (error) {
      console.error('生成图片失败:', error);
      alert('保存失败，请重试: ' + error.message);
    }

    setIsGenerating(false);
  };

  // 模态框内容
  const getModalContent = (type) => {
    switch (type) {
      case 'must':
        return {
          title: 'Must-have 详解',
          content: (
            <div className="space-y-3">
              <p className="text-sm text-slate-600">{idealInfo.description}</p>
              <div className="pt-3 border-t border-slate-200">
                <span className="text-xs font-bold text-slate-400 block mb-2">刚需要素</span>
                <p className="text-sm font-medium text-emerald-600">{idealInfo.mustHave}</p>
              </div>
            </div>
          )
        };
      case 'nice':
        return {
          title: 'Nice-to-have 详解',
          content: (
            <div className="space-y-3">
              <p className="text-sm text-slate-600">加分项是建立在你已经满足刚需要素的基础上，这些特质可以让关系更加丰富多彩。</p>
              <div className="pt-3 border-t border-slate-200">
                <span className="text-xs font-bold text-slate-400 block mb-2">加分要素</span>
                <p className="text-sm font-medium text-sky-600">{idealInfo.niceToHave}</p>
              </div>
            </div>
          )
        };
      case 'red':
        return {
          title: 'Red-flags 详解',
          content: (
            <div className="space-y-3">
              <p className="text-sm text-slate-600">红线是你在关系中绝对不能接受的底线，一旦出现这些信号，需要谨慎考虑。</p>
              <div className="pt-3 border-t border-slate-200">
                <span className="text-xs font-bold text-slate-400 block mb-2">危险信号</span>
                <p className="text-sm font-medium text-red-500">{idealInfo.redFlags}</p>
              </div>
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
          <h1 className="text-2xl font-serif font-bold text-slate-800">理想型画像报告</h1>
          <p className="text-xs text-slate-400 mt-2 tracking-widest uppercase">Echo Love Result</p>
        </div>

        {/* 画像拆解 */}
        <div className="bg-white rounded-3xl p-6 shadow-sm mb-6">
          <span className="text-[10px] font-bold text-slate-300 tracking-tighter block mb-1 uppercase">
            画像拆解 / ANALYSIS
          </span>
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
                <p className="text-xs text-slate-500">{labels.must}</p>
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
                <p className="text-xs text-slate-500">{labels.nice}</p>
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
                <p className="text-xs text-slate-500">{labels.red}</p>
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
        className="w-full py-3 mb-4 text-slate-500 text-sm font-medium"
      >
        重新测试
      </button>

      {/* 保存报告按钮 */}
      <button
        onClick={handleSave}
        disabled={isGenerating}
        className="w-full py-4 bg-slate-800 text-white rounded-full font-bold text-sm shadow-xl flex items-center justify-center gap-2 disabled:opacity-50"
      >
        <Share2 size={16} />
        {isGenerating ? '生成中...' : '保存报告'}
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

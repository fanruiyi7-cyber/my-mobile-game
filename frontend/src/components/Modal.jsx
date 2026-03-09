import React from 'react';
import { X } from 'lucide-react';

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* 遮罩层 */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* 模态框内容 */}
      <div className="relative w-full max-w-sm bg-[#FDF9F3] rounded-3xl shadow-2xl animate-in fade-in zoom-in duration-300 overflow-hidden">
        {/* 关闭按钮 */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 text-slate-400 hover:bg-slate-200 transition-colors z-10"
        >
          <X size={16} />
        </button>

        {/* 标题 */}
        {title && (
          <div className="px-6 pt-6 pb-4">
            <h3 className="text-lg font-serif font-bold text-slate-800">{title}</h3>
          </div>
        )}

        {/* 内容 */}
        <div className="px-6 pb-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;

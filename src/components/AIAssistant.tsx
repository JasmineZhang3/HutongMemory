import { useState } from 'react'
import { MessageCircle, X, Bot } from 'lucide-react'

// AI助手悬浮窗组件
export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="fixed bottom-6 right-6" style={{ zIndex: 10001 }}>
      {/* 弹窗 */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-72 rounded-2xl shadow-2xl 
                        border border-[hsl(var(--border))] overflow-hidden
                        bg-white/95 backdrop-blur-md animate-fade-in-up">
          {/* 头部 */}
          <div className="bg-gradient-to-r from-[hsl(25,55%,38%)] to-[hsl(20,40%,32%)] px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bot className="w-5 h-5 text-[hsl(38,70%,48%)]" />
              <span className="font-bold text-sm" style={{ color: 'hsl(42, 33%, 95%)' }}>胡同记忆 AI 助手</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-[hsl(42,50%,75%)] hover:text-white transition-colors p-1 rounded-full hover:bg-white/10 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* 内容 */}
          <div className="flex flex-col items-center justify-center py-12 px-6">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[hsl(25,55%,38%)] to-[hsl(20,40%,32%)] flex items-center justify-center mb-4">
              <Bot className="w-8 h-8 text-[hsl(38,70%,48%)]" />
            </div>
            <p className="text-base font-bold text-[hsl(28,30%,28%)] font-serif">AI 搭载中</p>
            <p className="text-sm text-[hsl(30,12%,50%)] mt-2 text-center">敬请期待</p>
          </div>
        </div>
      )}

      {/* 悬浮按钮 */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full shadow-xl flex items-center justify-center transition-all
                    ${isOpen ? 'rotate-0' : 'hover:scale-110'}
                    bg-gradient-to-br from-[hsl(25,55%,38%)] to-[hsl(20,40%,32%)]
                    border-2 border-white/30 cursor-pointer`}
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <MessageCircle className="w-6 h-6 text-[hsl(38,70%,48%)]" />
        )}
      </button>
    </div>
  )
}

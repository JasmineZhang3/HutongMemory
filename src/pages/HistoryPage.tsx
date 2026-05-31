import { useParams, Link } from 'react-router-dom'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import AIAssistant from '@/components/AIAssistant'
import DanmuArea from '@/components/DanmuArea'
import { historyOverview, historyTimeline } from '@/data/history'
import { Clock, ChevronRight } from 'lucide-react'

export default function HistoryPage() {
  const { id } = useParams()

  return (
    <div className="min-h-screen flex flex-col bg-hutong-paper paper-texture">
      <Header showBack backTo={`/hutong/${id}`} title="历史沿革" />

      <main className="flex-1 px-4 py-8 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* 历史概括 */}
          <section className="mb-10 animate-fade-in-up">
            <div className="flex items-center gap-3 mb-4">
              <Clock className="w-6 h-6 text-[hsl(25,55%,38%)]" />
              <h2 className="text-2xl font-bold text-[hsl(28,30%,28%)] font-serif">历史概述</h2>
            </div>
            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-[hsl(var(--border))]
                        shadow-sm leading-relaxed text-[hsl(28,22%,32%)] text-base indent-8">
              {historyOverview}
            </div>
          </section>

          {/* 时间线 */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-[hsl(28,30%,28%)] font-serif mb-6 flex items-center gap-2">
              <ChevronRight className="w-5 h-5 text-[hsl(25,55%,38%)]" />
              历史沿革 & 大事记
            </h2>

            <div className="relative pl-6 before:content-[''] before:absolute before:left-2 before:top-0 
                            before:bottom-0 before:w-0.5 before:bg-[hsl(35,25%,68%)]">
              {historyTimeline.map((event, index) => (
                <div key={index} className="relative mb-8 last:mb-0 animate-fade-in-up"
                     style={{ animationDelay: `${index * 120}ms`, animationFillMode: 'backwards' }}>
                  
                  {/* 时间节点标记 */}
                  <div className={`absolute -left-[1.35rem] top-1 w-3 h-3 rounded-full border-2 border-white shadow
                                  ${index % 3 === 0 ? 'bg-[hsl(25,55%,38%)]' : 
                                   index % 3 === 1 ? 'bg-[hsl(3,60%,45%)]' : 'bg-[hsl(35,50%,50%)]'}`} />
                  
                  {/* 内容卡片 */}
                  <div className="bg-white/75 backdrop-blur-sm rounded-xl overflow-hidden border border-[hsl(var(--border))]
                                shadow-sm hover:shadow-md transition-shadow">
                    
                    {/* 标题栏：名称为主，时间/朝代为副 */}
                    <div className={`px-5 py-2.5 ${
                      index % 3 === 0 ? 'bg-gradient-to-r from-amber-800/90 to-amber-700/90' :
                      index % 3 === 1 ? 'bg-gradient-to-r from-red-800/90 to-red-700/90' :
                                      'bg-gradient-to-r from-stone-700/90 to-stone-600/90]'
                    }`}>
                      <h3 className="font-bold text-lg font-serif" style={{ color: 'hsl(42, 33%, 95%)' }}>
                        {event.title}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="font-mono text-white/85 text-xs tracking-wide">
                          {event.year}
                        </span>
                        <span className="text-white/50 text-xs">|</span>
                        <span className="text-white/70 text-xs">{event.period}</span>
                      </div>
                    </div>

                    {/* 正文 */}
                    <div className="p-5">
                      <p className="text-sm text-[hsl(28,18%,38%)] leading-relaxed mb-3">
                        {event.description}
                      </p>
                      
                      {/* 配图 */}
                      {event.image && (
                        <img
                          src={event.image}
                          alt={event.title}
                          className="rounded-lg w-full max-h-64 object-cover border border-[hsl(var(--border))]"
                          loading="lazy"
                        />
                      )}

                      {/* 评论区 */}
                      <div className="mt-4">
                        <DanmuArea />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>

      <Footer />
      <AIAssistant />
    </div>
  )
}

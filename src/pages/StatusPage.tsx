import { useParams } from 'react-router-dom'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import AIAssistant from '@/components/AIAssistant'
import DanmuArea from '@/components/DanmuArea'
import { statusOverview, statusItems } from '@/data/status'
import { Building2, ChevronRight } from 'lucide-react'

export default function StatusPage() {
  const { id } = useParams()

  return (
    <div className="min-h-screen flex flex-col bg-hutong-paper paper-texture">
      <Header showBack backTo={`/hutong/${id}`} title="今日风貌" />

      <main className="flex-1 px-4 py-8 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* 现状概述 */}
          <section className="mb-10 animate-fade-in-up">
            <div className="flex items-center gap-3 mb-4">
              <Building2 className="w-6 h-6 text-[hsl(142,40%,35%)]" />
              <h2 className="text-2xl font-bold text-[hsl(28,30%,28%)] font-serif">现状概述</h2>
            </div>
            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-[hsl(var(--border))]
                        shadow-sm leading-relaxed text-[hsl(28,22%,32%)] text-base indent-8">
              {statusOverview}
            </div>
          </section>

          {/* 现状图片展示 */}
          <section>
            <h2 className="text-2xl font-bold text-[hsl(28,30%,28%)] font-serif mb-6 flex items-center gap-2">
              <ChevronRight className="w-5 h-5 text-[hsl(142,40%,35%)]" />
              风貌图集
            </h2>

            <div className="space-y-7">
              {statusItems.map((item, index) => (
                <article key={index} className="animate-fade-in-up"
                         style={{ animationDelay: `${index * 150}ms`, animationFillMode: 'backwards' }}>
                  <div className="bg-white/75 backdrop-blur-sm rounded-xl overflow-hidden
                                border border-[hsl(var(--border))] shadow-sm hover:shadow-md transition-shadow">
                    
                    {/* 图片 - 展示优先 */}
                    <div className="relative">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full max-h-72 object-cover"
                        loading="lazy"
                      />
                      {/* 图片上浮标题 */}
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent px-5 py-3">
                        <p className="font-bold font-serif text-lg" style={{ color: 'hsl(42, 33%, 95%)' }}>{item.title}</p>
                        <p className="text-white/80 text-xs mt-0.5">{item.subtitle}</p>
                      </div>
                    </div>

                    {/* 描述文字 */}
                    <div className="p-5">
                      <p className="text-sm text-[hsl(28,18%,38%)] leading-relaxed indent-6">
                        {item.description}
                      </p>

                      {/* 评论区 */}
                      <div className="mt-4">
                        <DanmuArea />
                      </div>
                    </div>
                  </div>
                </article>
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

import { useParams } from 'react-router-dom'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import AIAssistant from '@/components/AIAssistant'
import DanmuArea from '@/components/DanmuArea'
import { cultureOverview, cultureItems } from '@/data/culture'
import { Palette, ChevronRight } from 'lucide-react'

export default function CulturePage() {
  const { id } = useParams()

  return (
    <div className="min-h-screen flex flex-col bg-hutong-paper paper-texture">
      <Header showBack backTo={`/hutong/${id}`} title="文化印记" />

      <main className="flex-1 px-4 py-8 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* 文化概述 */}
          <section className="mb-10 animate-fade-in-up">
            <div className="flex items-center gap-3 mb-4">
              <Palette className="w-6 h-6 text-[hsl(3,60%,45%)]" />
              <h2 className="text-2xl font-bold text-[hsl(28,30%,28%)] font-serif">文化概述</h2>
            </div>
            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-[hsl(var(--border))]
                        shadow-sm leading-relaxed text-[hsl(28,22%,32%)] text-base indent-8">
              {cultureOverview}
            </div>
          </section>

          {/* 具体文化条目 */}
          <section>
            <h2 className="text-2xl font-bold text-[hsl(28,30%,28%)] font-serif mb-6 flex items-center gap-2">
              <ChevronRight className="w-5 h-5 text-[hsl(3,60%,45%)]" />
              文化详情
            </h2>

            <div className="space-y-7">
              {cultureItems.map((item, index) => (
                <article key={index} className="animate-fade-in-up"
                         style={{ animationDelay: `${index * 150}ms`, animationFillMode: 'backwards' }}>
                  <div className="bg-white/75 backdrop-blur-sm rounded-xl overflow-hidden 
                                border border-[hsl(var(--border))] shadow-sm hover:shadow-md transition-shadow">
                    
                    {/* 标题栏：名称为主，副标题在下 */}
                    <div className={`px-5 py-3.5 ${
                      index % 4 === 0 ? 'bg-gradient-to-r from-red-800/90 to-red-700/90' :
                      index % 4 === 1 ? 'bg-gradient-to-r from-stone-800/90 to-stone-700/90' :
                      index % 4 === 2 ? 'bg-gradient-to-r from-amber-800/90 to-amber-700/90' :
                                      'bg-gradient-to-r from-emerald-800/90 to-emerald-700/90'
                    }`}>
                      <h3 className="font-bold text-lg font-serif" style={{ color: 'hsl(42, 33%, 95%)' }}>{item.title}</h3>
                      <p className="text-white/70 text-xs mt-0.5">{item.subtitle}</p>
                    </div>

                    {/* 内容区 */}
                    <div className={`p-5 ${!item.image ? '' : ''}`}>
                      {item.image && (
                        <img
                          src={item.image}
                          alt={item.title}
                          className="rounded-lg w-full max-h-56 object-cover mb-4 border border-[hsl(var(--border))]"
                          loading="lazy"
                        />
                      )}
                      
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

import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import AIAssistant from '@/components/AIAssistant'
import { zhuanTaHutong } from '@/data/hutongs'
import { BookOpen, Landmark, Eye, Heart } from 'lucide-react'

// 四个板块按钮配置
const sections = [
  { id: 'history', label: '历史', icon: Landmark, desc: '七百年沿革脉络', color: 'from-amber-700 to-amber-900' },
  { id: 'culture', label: '文化', icon: BookOpen, desc: '元曲·文脉·烟火', color: 'from-red-700 to-red-900' },
  { id: 'status', label: '现状', icon: Eye, desc: '今日砖塔风貌', color: 'from-emerald-700 to-emerald-900' },
  { id: 'memory', label: '记忆', icon: Heart, desc: '我们的共同回忆', color: 'from-purple-700 to-purple-900' },
]

export default function HutongDetailPage() {
  const { id } = useParams()

  // 目前只支持砖塔胡同
  const hutongData = id === 'zhuanta' ? zhuanTaHutong : zhuanTaHutong

  return (
    <div className="min-h-screen flex flex-col bg-hutong-paper paper-texture">
      <Header showBack backTo="/" title={hutongData.name} />

      {/* 头部横幅 */}
      <div className="relative h-64 sm:h-72 md:h-80 overflow-hidden">
        <img
          src={hutongData.heroImage}
          alt={hutongData.name}
          className="w-full h-full object-cover"
        />
        {/* 遮罩层 */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent" />
        {/* 文字覆盖 */}
        <div className="absolute bottom-0 left-0 right-0 px-6 pb-8 sm:px-10 sm:pb-10">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white font-serif tracking-wider drop-shadow-lg">
              {hutongData.name}
            </h1>
            <p className="mt-3 text-base sm:text-lg text-white/90 max-w-2xl leading-relaxed drop-shadow">
              {hutongData.brief}
            </p>
          </div>
        </div>
        {/* 装饰线 */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[hsl(38,70%,48%)] to-transparent" />
      </div>

      {/* 四个板块按钮区 */}
      <main className="flex-1 px-4 py-10 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-center text-xl sm:text-2xl font-bold text-[hsl(28,30%,28%)] font-serif mb-8 tracking-wide">
            探索 {hutongData.name}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
            {sections.map((section) => (
              <Link
                key={section.id}
                to={`/hutong/${id}/${section.id}`}
                className="group relative overflow-hidden rounded-xl border-2 border-[hsl(35,20%,70%)]
                           shadow-md hover:shadow-xl transition-all duration-300
                           hover:-translate-y-1 hover:border-[hsl(25,55%,38%)]"
              >
                {/* 渐变头部 */}
                <div className={`bg-gradient-to-br ${section.color} px-6 py-5`}>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center
                                    shrink-0 group-hover:bg-white/30 transition-colors">
                      <section.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold font-serif tracking-wide" style={{ color: 'hsl(42, 33%, 95%)' }}>
                        {section.label}
                      </h3>
                      <p className="text-sm text-white/75 mt-0.5">{section.desc}</p>
                    </div>
                  </div>
                </div>
                
                {/* 底部提示 */}
                <div className="bg-white/90 px-6 py-3 text-right">
                  <span className="text-sm text-[hsl(25,55%,38%)] font-medium group-hover:translate-x-1 inline-block transition-transform">
                    点击进入 →
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {/* 底部补充说明 */}
          <div className="mt-10 text-center">
            <p className="text-sm text-[hsl(30,12%,50%)] italic leading-relaxed max-w-lg mx-auto">
              "一条胡同，半部京城史。点击上方板块，走进砖塔胡同的过去、现在与未来。"
            </p>
          </div>
        </div>
      </main>

      <Footer />
      <AIAssistant />
    </div>
  )
}

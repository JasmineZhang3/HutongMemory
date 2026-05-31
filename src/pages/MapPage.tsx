import { useState, useEffect, Suspense, lazy } from 'react'
import { Link } from 'react-router-dom'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import AIAssistant from '@/components/AIAssistant'
import { hutongList, zhuanTaHutong } from '@/data/hutongs'

// 导入图片（Vite 会正确处理路径）
import zhuantaHero from '@/assets/images/砖塔胡同东口全景.jpg'
import zhuantaScene from '@/assets/images/砖塔胡同东段实景.jpg'

// 动态导入 Leaflet 组件（避免 SSR/模块加载问题）
const BeijingMap = lazy(() => import('./BeijingMap'))

// 有详细内容的胡同列表
const hutongWithContent = ['zhuanta']

// ============================================================
// 信息弹窗组件
// ============================================================
function HutongPopup({
  hutong,
  image,
  onClose,
}: {
  hutong: (typeof hutongList)[0]
  image: string
  onClose: () => void
}) {
  const hasContent = hutongWithContent.includes(hutong.id)

  return (
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/40 backdrop-blur-sm animate-fade-in-up"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-2xl border-2 border-[hsl(35,30%,65%)] max-w-md w-full mx-4 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 图片区域 */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={image}
            alt={hutong.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
          <div className="absolute bottom-4 left-5 right-5">
            <h3 style={{ color: '#f2eee8' }} className="font-bold text-2xl font-serif">{hutong.name}</h3>
          </div>
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/40 text-white 
                       flex items-center justify-center hover:bg-black/60 transition-colors cursor-pointer text-lg"
          >
            ✕
          </button>
        </div>

        {/* 简介 */}
        <div className="px-5 py-4">
          <p className="text-[hsl(28,22%,32%)] leading-relaxed text-sm">
            {hutong.brief || '暂无简介'}
          </p>
        </div>

        {/* 底部按钮 */}
        <div className="px-5 pb-5">
          {hasContent ? (
            <Link
              to={`/hutong/${hutong.id}`}
              onClick={onClose}
              style={{ color: '#f2eee8' }}
              className="block w-full text-center px-6 py-3 bg-[hsl(25,55%,38%)]
                         rounded-lg font-medium hover:bg-[hsl(25,55%,32%)] transition-colors cursor-pointer"
            >
              查看更多 →
            </Link>
          ) : (
            <div className="block w-full text-center px-6 py-3 bg-[hsl(40,25%,90%)] text-[hsl(30,15%,48%)] 
                            rounded-lg font-serif italic">
              正在搭建中，敬请期待
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// ============================================================
// 加载占位符
// ============================================================
function MapPlaceholder() {
  return (
    <div className="relative w-full mx-auto rounded-xl overflow-hidden 
                    border-4 border-[hsl(30,25%,55%)] shadow-2xl flex items-center justify-center"
         style={{ height: '65vh', minHeight: '500px' }}>
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-[hsl(35,30%,65%)] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-[hsl(28,30%,28%)] font-serif">正在加载地图...</p>
      </div>
    </div>
  )
}

// ============================================================
// 地图页面主组件
// ============================================================
export default function MapPage() {
  const [selectedHutong, setSelectedHutong] = useState<(typeof hutongList)[0] | null>(null)
  const [selectedImage, setSelectedImage] = useState<string>('')

  const handleMarkerClick = (hutong: (typeof hutongList)[0]) => {
    setSelectedHutong(hutong)
    if (hutong.id === 'zhuanta') {
      setSelectedImage(zhuantaHero)
    } else {
      setSelectedImage(zhuantaScene)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-hutong-paper paper-texture">
      <Header />

      {/* 主内容区 */}
      <main className="flex-1 px-4 py-8 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* 页面标题 */}
          <div className="text-center mb-8 animate-fade-in-up">
            <h1 className="text-3xl sm:text-4xl font-bold text-[hsl(28,30%,28%)] font-serif tracking-wider mb-2">
              北京胡同文化数字人文档案
            </h1>
          </div>

          {/* 地图区域 - 使用 Suspense 安全加载 */}
          <Suspense fallback={<MapPlaceholder />}>
            <BeijingMap onMarkerClick={handleMarkerClick} />
          </Suspense>

          {/* 快捷入口：重点推荐 */}
          <div className="mt-10">
            <h2 className="text-xl font-bold text-center text-[hsl(28,30%,28%)] font-serif mb-6 tracking-wide">
              推荐：{zhuanTaHutong.name}
            </h2>
            <Link
              to={`/hutong/${zhuanTaHutong.id}`}
              className="block mx-auto max-w-md group"
            >
              <div className="relative overflow-hidden rounded-xl border-2 border-[hsl(35,30%,65%)]
                              shadow-lg hover:shadow-xl transition-all hover:border-[hsl(25,55%,38%)] cursor-pointer">
                <div className="relative h-36 overflow-hidden">
                  <img
                    src={zhuantaHero}
                    alt={zhuanTaHutong.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-4 right-4">
                    <p className="text-white font-bold text-lg font-serif">{zhuanTaHutong.name}</p>
                    <p className="text-white/80 text-xs mt-0.5 line-clamp-1">{zhuanTaHutong.brief}</p>
                  </div>
                </div>
                <div className="bg-[hsl(42,33%,95%)] py-3 text-center">
                  <span className="text-sm font-medium text-[hsl(25,55%,38%)] group-hover:underline">
                    进入探索 →
                  </span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
      <AIAssistant />

      {/* 点击弹窗 */}
      {selectedHutong && (
        <HutongPopup
          hutong={selectedHutong}
          image={selectedImage}
          onClose={() => setSelectedHutong(null)}
        />
      )}
    </div>
  )
}

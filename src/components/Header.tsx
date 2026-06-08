import { Link } from 'react-router-dom'
import { MapPin, Menu, Search, X } from 'lucide-react'
import { useState } from 'react'
import { hutongList } from '@/data/hutongs'
import SearchDialog from '@/components/SearchDialog'

// 有详细内容的胡同 ID
const hutongWithContent = ['zhuanta']

interface HeaderProps {
  showBack?: boolean
  backTo?: string
  title?: string
}

export default function Header({ showBack = false, backTo = '/', title }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [pendingHutong, setPendingHutong] = useState<string | null>(null)
  const [searchOpen, setSearchOpen] = useState(false)

  return (
    <header className="sticky top-0 z-[9999] bg-gradient-to-r from-[hsl(25,55%,30%)] to-[hsl(20,40%,35%)] shadow-lg border-b-2 border-[hsl(35,50%,45%)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* 项目名称 */}
          <div className="flex items-center gap-3">
            {showBack && (
              <Link
                to={backTo}
                className="!text-[hsl(42,70%,80%)] hover:text-white transition-colors flex items-center gap-1 text-sm font-medium"
              >
                &larr; 返回地图
              </Link>
            )}
            {!showBack && (
              <Link to="/" className="flex items-center gap-2 group">
                <MapPin className="w-5 h-5 text-[hsl(38,70%,48%)]" />
                <span className="text-lg font-bold tracking-widest text-[hsl(42,33%,95%)] font-serif">
                  北京·胡同记忆
                </span>
              </Link>
            )}
            {/* 胡同列表下拉 - 仅首页显示 */}
            {!showBack && (
              <>
                <button
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="ml-4 p-1.5 rounded-md text-[hsl(42,60%,80%)] hover:text-white hover:bg-[hsla(0,0%,100%,0.1)] transition-all"
                >
                  {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
              </>
            )}
          </div>

          {/* 当前胡同标题（详情页显示） */}
          {showBack && title && (
            <h1 className="text-xl font-bold text-[hsl(42,33%,95%)] font-serif tracking-wide">
              {title}
            </h1>
          )}

          {/* 搜索按钮 */}
          <button
            onClick={() => setSearchOpen(true)}
            className="p-2 rounded-lg text-[hsl(42,60%,80%)] hover:text-white hover:bg-[hsla(0,0%,100%,0.1)] transition-all cursor-pointer"
            title="搜索"
          >
            <Search className="w-5 h-5" />
          </button>
        </div>

        {/* 胡同列表下拉菜单 */}
        {!showBack && menuOpen && (
          <div className="absolute left-0 right-0 top-full z-[10000] bg-[hsl(25,55%,28%)] border-t-2 border-[hsl(35,50%,45%)] shadow-2xl animate-fade-in-up">
            <div className="max-w-7xl mx-auto px-6 py-5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-4 gap-y-2">
              {hutongList.map((h) => {
                const hasContent = hutongWithContent.includes(h.id)
                if (hasContent) {
                  return (
                    <Link
                      key={h.id}
                      to={`/hutong/${h.id}`}
                      onClick={() => setMenuOpen(false)}
                      className="px-4 py-2.5 rounded-lg text-sm font-medium !text-[hsl(38,55%,75%)] 
                                 border border-[hsla(42,50%,55%,0.2)]
                                 hover:!text-white
                                 hover:bg-[hsla(38,45%,48%,0.3)]
                                 transition-colors cursor-pointer flex items-center justify-center"
                    >
                      {h.name}
                    </Link>
                  )
                }
                return (
                  <button
                    key={h.id}
                    onClick={() => setPendingHutong(h.name)}
                    className="px-4 py-2.5 rounded-lg text-sm font-medium text-[hsl(38,55%,75%)] 
                               border border-[hsla(42,50%,55%,0.2)]
                               hover:bg-[hsla(38,45%,48%,0.3)] hover:text-white 
                               transition-colors cursor-pointer"
                  >
                    {h.name}
                  </button>
                )
              })}
            </div>
          </div>
        )}
      </div>

      {/* 搜索弹窗 */}
      <SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} />

      {/* "正在搭建中" 提示弹窗 */}
      {pendingHutong && (
        <div
          className="fixed inset-0 z-[20000] flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in-up"
          onClick={() => setPendingHutong(null)}
        >
          <div
            className="bg-white rounded-xl shadow-2xl max-w-xs w-full mx-4 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-6 py-8 text-center">
              <p className="text-lg font-serif font-bold text-[#8B4513] mb-2">{pendingHutong}</p>
              <p className="text-sm text-gray-500">正在搭建中，敬请期待</p>
              <button
                onClick={() => setPendingHutong(null)}
                className="mt-5 px-6 py-2 bg-[#8B4513] text-white rounded-lg text-sm 
                           hover:bg-[#A0522D] transition-colors cursor-pointer"
              >
                好的
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

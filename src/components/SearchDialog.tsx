import { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, Clock, Heart, Users, BookOpen, X, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  type SearchCategory,
  type SearchResultItem,
  allCategories,
  searchItems,
} from '@/data/searchIndex'

interface SearchDialogProps {
  open: boolean
  onClose: () => void
}

const categoryIcons: Record<SearchCategory, typeof Clock> = {
  '时空定位': Clock,
  '情感体验': Heart,
  '社会关系': Users,
  '文化意义': BookOpen,
}

const categoryColors: Record<SearchCategory, string> = {
  '时空定位': 'bg-amber-100 text-amber-800 border-amber-300',
  '情感体验': 'bg-rose-100 text-rose-800 border-rose-300',
  '社会关系': 'bg-sky-100 text-sky-800 border-sky-300',
  '文化意义': 'bg-emerald-100 text-emerald-800 border-emerald-300',
}

const typeBadgeColors: Record<string, string> = {
  history: 'bg-amber-600 text-white',
  '历史事件': 'bg-amber-600 text-white',
  '历史概况': 'bg-amber-600 text-white',
  culture: 'bg-red-600 text-white',
  '文化印记': 'bg-red-600 text-white',
  '文化概况': 'bg-red-600 text-white',
  status: 'bg-emerald-600 text-white',
  '今日风貌': 'bg-emerald-600 text-white',
  '现状概况': 'bg-emerald-600 text-white',
  memory: 'bg-purple-600 text-white',
  '胡同记忆': 'bg-purple-600 text-white',
}

export default function SearchDialog({ open, onClose }: SearchDialogProps) {
  const navigate = useNavigate()
  const [keyword, setKeyword] = useState('')
  const [activeCategory, setActiveCategory] = useState<SearchCategory | null>(null)

  const results = searchItems(keyword, activeCategory)

  const handleSelect = useCallback((item: SearchResultItem) => {
    navigate(item.link)
    onClose()
    setKeyword('')
    setActiveCategory(null)
  }, [navigate, onClose])

  const handleClose = useCallback(() => {
    setKeyword('')
    setActiveCategory(null)
    onClose()
  }, [onClose])

  // 按类型分组
  const grouped = results.reduce((acc, item) => {
    if (!acc[item.typeLabel]) acc[item.typeLabel] = []
    acc[item.typeLabel].push(item)
    return acc
  }, {} as Record<string, SearchResultItem[]>)

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[50000] flex items-start justify-center pt-[15vh]"
      onClick={handleClose}
    >
      {/* 背景遮罩 */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

      {/* 搜索面板 */}
      <div
        className="relative z-10 w-full max-w-xl mx-4 bg-white rounded-2xl shadow-2xl border border-[hsl(35,30%,85%)] overflow-hidden animate-fade-in-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 搜索输入区域 */}
        <div className="px-5 pt-5 pb-3">
          <div className="flex items-center gap-3 pb-2">
            <div className="flex-1 flex items-center gap-2.5 px-4 py-2.5 bg-[hsl(38,40%,96%)] rounded-xl border border-[hsl(35,30%,85%)] focus-within:border-[hsl(25,50%,50%)] focus-within:ring-2 focus-within:ring-[hsla(25,50%,50%,0.15)] transition-all">
              <Search className="w-4 h-4 text-[hsl(25,30%,50%)]" />
              <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="搜索砖塔胡同的历史、文化、记忆…"
                className="flex-1 bg-transparent text-sm text-[hsl(25,40%,20%)] placeholder:text-[hsl(25,20%,55%)] outline-none border-none"
                autoFocus
              />
              {keyword && (
                <button
                  onClick={() => setKeyword('')}
                  className="text-[hsl(25,20%,60%)] hover:text-[hsl(25,40%,30%)] transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
            <button
              onClick={handleClose}
              className="p-2 rounded-lg text-[hsl(25,20%,50%)] hover:text-[hsl(25,40%,30%)] hover:bg-[hsl(38,40%,95%)] transition-colors shrink-0"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* 分类筛选标签 */}
          <div className="flex flex-wrap gap-2 mt-1">
            <button
              onClick={() => setActiveCategory(null)}
              className={cn(
                'px-3 py-1.5 rounded-full text-xs font-medium border transition-all cursor-pointer',
                activeCategory === null
                  ? 'bg-[hsl(25,50%,30%)] text-white border-[hsl(25,50%,30%)]'
                  : 'bg-white text-[hsl(25,30%,40%)] border-[hsl(35,30%,80%)] hover:border-[hsl(25,40%,50%)] hover:bg-[hsl(38,45%,97%)]'
              )}
            >
              全部
            </button>
            {allCategories.map((cat) => {
              const Icon = categoryIcons[cat]
              const isActive = activeCategory === cat
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(isActive ? null : cat)}
                  className={cn(
                    'px-3 py-1.5 rounded-full text-xs font-medium border transition-all cursor-pointer flex items-center gap-1',
                    isActive
                      ? 'border-current shadow-sm'
                      : 'bg-white border-[hsl(35,30%,80%)] hover:bg-[hsl(38,45%,97%)]',
                  )}
                  style={isActive ? {
                    backgroundColor: categoryColors[cat].split(' ')[0].replace('bg-', ''),
                    // 使用 categoryColors 中的颜色
                  } : undefined}
                >
                  <Icon className="w-3 h-3" />
                  {cat}
                </button>
              )
            })}
          </div>
        </div>

        {/* 结果区域 */}
        <div className="max-h-[42vh] overflow-y-auto border-t border-[hsl(35,30%,88%)]">
          {results.length === 0 ? (
            <div className="py-12 text-center">
              <Search className="w-8 h-8 text-[hsl(25,15%,75%)] mx-auto mb-3" />
              <p className="text-sm text-[hsl(25,15%,55%)]">没有找到相关内容</p>
              <p className="text-xs text-[hsl(25,15%,70%)] mt-1">试试其他关键词或分类</p>
            </div>
          ) : (
            <div className="py-2">
              {Object.entries(grouped).map(([typeLabel, items]) => (
                <div key={typeLabel}>
                  {/* 分组标题 */}
                  <div className="px-5 py-2 flex items-center gap-2">
                    <span className={cn(
                      'px-2 py-0.5 rounded text-[10px] font-medium',
                      typeBadgeColors[typeLabel] || 'bg-gray-500 text-white'
                    )}>
                      {typeLabel}
                    </span>
                    <span className="text-xs text-[hsl(25,15%,60%)]">{items.length} 条结果</span>
                  </div>

                  {/* 结果列表 */}
                  {items.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleSelect(item)}
                      className="w-full text-left px-5 py-3 hover:bg-[hsl(38,45%,96%)] transition-colors cursor-pointer border-b border-[hsl(35,30%,92%)] last:border-b-0 group"
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-sm font-medium text-[hsl(25,40%,20%)] group-hover:text-[hsl(25,55%,35%)] transition-colors truncate">
                              {item.title}
                            </span>
                          </div>
                          <p className="text-xs text-[hsl(25,15%,55%)] line-clamp-2 leading-relaxed">
                            {item.description}
                          </p>
                          {/* 分类标签 */}
                          <div className="flex flex-wrap gap-1 mt-1.5">
                            {item.categories.map((cat) => {
                              const Icon = categoryIcons[cat]
                              return (
                                <span
                                  key={cat}
                                  className={cn(
                                    'inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-medium border',
                                    categoryColors[cat]
                                  )}
                                >
                                  <Icon className="w-2.5 h-2.5" />
                                  {cat}
                                </span>
                              )
                            })}
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-[hsl(25,15%,70%)] group-hover:text-[hsl(25,40%,40%)] transition-colors shrink-0 mt-1" />
                      </div>
                    </button>
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

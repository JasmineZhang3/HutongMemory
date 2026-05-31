import { useState, useRef } from 'react'
import { useParams } from 'react-router-dom'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import AIAssistant from '@/components/AIAssistant'
import { presetMemories } from '@/data/memories'
import type { MemoryItem, CommentItem } from '@/data/memories'
import { Heart, MessageCircle, Upload, Sparkles, BookOpen, PlusCircle, X, Trash2, ChevronDown } from 'lucide-react'

let commentIdCounter = 100

export default function MemoryPage() {
  const { id } = useParams()
  const [activeTab, setActiveTab] = useState<'ours' | 'upload' | 'generate'>('ours')
  const [memories, setMemories] = useState<MemoryItem[]>(presetMemories)
  const [newMemory, setNewMemory] = useState({ nickname: '', era: '', title: '', content: '' })
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  // 点赞
  const handleLike = (memoryId: number) => {
    setMemories((prev) =>
      prev.map((m) =>
        m.id === memoryId ? { ...m, likes: m.likes + 1 } : m
      )
    )
  }

  // 取消点赞
  const handleUnlike = (memoryId: number) => {
    setMemories((prev) =>
      prev.map((m) =>
        m.id === memoryId ? { ...m, likes: Math.max(0, m.likes - 1) } : m
      )
    )
  }

  // 评论
  const handleComment = (memoryId: number, text: string) => {
    const newComment: CommentItem = {
      id: ++commentIdCounter,
      text,
      likes: 0,
    }
    setMemories((prev) =>
      prev.map((m) =>
        m.id === memoryId ? { ...m, comments: [...m.comments, newComment] } : m
      )
    )
  }

  // 点赞评论
  const handleLikeComment = (memoryId: number, commentId: number) => {
    setMemories((prev) =>
      prev.map((m) =>
        m.id === memoryId
          ? {
              ...m,
              comments: m.comments.map((c) =>
                c.id === commentId ? { ...c, likes: c.likes + 1 } : c
              ),
            }
          : m
      )
    )
  }

  // 取消点赞评论
  const handleUnlikeComment = (memoryId: number, commentId: number) => {
    setMemories((prev) =>
      prev.map((m) =>
        m.id === memoryId
          ? {
              ...m,
              comments: m.comments.map((c) =>
                c.id === commentId ? { ...c, likes: Math.max(0, c.likes - 1) } : c
              ),
            }
          : m
      )
    )
  }

  // 删除评论
  const handleDeleteComment = (memoryId: number, commentId: number) => {
    setMemories((prev) =>
      prev.map((m) =>
        m.id === memoryId
          ? { ...m, comments: m.comments.filter((c) => c.id !== commentId) }
          : m
      )
    )
  }

  // 删除记忆
  const handleDeleteMemory = (memoryId: number) => {
    setMemories((prev) => prev.filter((m) => m.id !== memoryId))
  }

  // 上传记忆
  const handleUploadSubmit = () => {
    if (!newMemory.nickname || !newMemory.content) return
    
    const memory: MemoryItem = {
      id: Date.now(),
      nickname: newMemory.nickname,
      era: newMemory.era || '未知',
      title: newMemory.title || '我的胡同记忆',
      content: newMemory.content,
      image: previewImage,
      likes: 0,
      comments: [],
    }
    
    setMemories((prev) => [memory, ...prev])
    setNewMemory({ nickname: '', era: '', title: '', content: '' })
    setPreviewImage(null)
    setActiveTab('ours')
  }

  // 处理图片上传
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => setPreviewImage(reader.result as string)
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-hutong-paper paper-texture">
      <Header showBack backTo={`/hutong/${id}`} title="胡同记忆" />

      <main className="flex-1 px-4 py-8 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* 记忆概述 */}
          <section className="mb-8 animate-fade-in-up text-center">
            <p className="text-base text-[hsl(28,18%,38%)] leading-relaxed max-w-2xl mx-auto indent-8 bg-white/60 rounded-xl p-5 border border-[hsl(var(--border))]">
              砖塔胡同不仅是一条街巷，更是无数人共同的记忆载体。在这里，你可以浏览他人分享的胡同记忆，也可以上传自己的故事，甚至借助AI技术生成属于你的专属记忆。
            </p>
          </section>

          {/* 三个标签切换 */}
          <div className="flex justify-center gap-3 mb-8 flex-wrap animate-fade-in-up" style={{ animationDelay: '100ms', animationFillMode: 'backwards' }}>
            {[
              { key: 'ours' as const, label: '我们的记忆', icon: BookOpen, count: memories.length },
              { key: 'upload' as const, label: '上传我的记忆', icon: Upload },
              { key: 'generate' as const, label: '生成我的记忆', icon: Sparkles },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-medium text-sm transition-all cursor-pointer
                  ${activeTab === tab.key
                    ? 'bg-[hsl(25,55%,38%)] text-white shadow-md scale-105'
                    : 'bg-white/80 text-[hsl(var(--foreground))] hover:bg-white border border-[hsl(var(--border))]'
                  }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
                {tab.count !== undefined && (
                  <span className={`px-1.5 py-0.5 rounded-full text-xs ${
                    activeTab === tab.key ? 'bg-white/20' : 'bg-[hsl(var(--muted))]'
                  }`}>
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* ====== 我们的记忆 ====== */}
          {activeTab === 'ours' && (
            <div className="space-y-6 animate-fade-in-up">
              {memories.length === 0 ? (
                <div className="text-center py-12 text-[hsl(var(--muted-foreground))]">
                  <p>暂无记忆分享</p>
                  <p className="text-sm mt-1">成为第一个分享胡同记忆的人吧！</p>
                </div>
              ) : (
                memories.map((memory, index) => (
                  <MemoryCard
                    key={memory.id}
                    memory={memory}
                    onLike={() => handleLike(memory.id)}
                    onUnlike={() => handleUnlike(memory.id)}
                    onComment={(c) => handleComment(memory.id, c)}
                    onLikeComment={(cid) => handleLikeComment(memory.id, cid)}
                    onUnlikeComment={(cid) => handleUnlikeComment(memory.id, cid)}
                    onDeleteComment={(cid) => handleDeleteComment(memory.id, cid)}
                    onDelete={() => handleDeleteMemory(memory.id)}
                    delay={index * 100}
                  />
                ))
              )}
            </div>
          )}

          {/* ====== 上传我的记忆 ====== */}
          {activeTab === 'upload' && (
            <div className="animate-fade-in-up max-w-xl mx-auto">
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-[hsl(var(--border))]
                            shadow-sm space-y-4">
                <h3 className="font-bold text-lg text-[hsl(28,25%,26%)] font-serif flex items-center gap-2">
                  <PlusCircle className="w-5 h-5 text-[hsl(25,55%,38%)]" />
                  分享你的胡同记忆
                </h3>

                {/* 昵称 */}
                <input
                  type="text"
                  placeholder="你的昵称"
                  value={newMemory.nickname}
                  onChange={(e) => setNewMemory({ ...newMemory, nickname: e.target.value })}
                  maxLength={20}
                  className="w-full px-4 py-2.5 rounded-lg border border-[hsl(var(--border))] 
                             bg-white focus:outline-none focus:ring-2 focus:ring-[hsl(25,55%,38%)] text-sm"
                />

                {/* 年代 */}
                <input
                  type="text"
                  placeholder="记忆的年代（如：1990年）"
                  value={newMemory.era}
                  onChange={(e) => setNewMemory({ ...newMemory, era: e.target.value })}
                  maxLength={20}
                  className="w-full px-4 py-2.5 rounded-lg border border-[hsl(var(--border))] 
                             bg-white focus:outline-none focus:ring-2 focus:ring-[hsl(25,55%,38%)] text-sm"
                />

                {/* 标题 */}
                <input
                  type="text"
                  placeholder="给这段记忆起个标题"
                  value={newMemory.title}
                  onChange={(e) => setNewMemory({ ...newMemory, title: e.target.value })}
                  maxLength={30}
                  className="w-full px-4 py-2.5 rounded-lg border border-[hsl(var(--border))] 
                             bg-white focus:outline-none focus:ring-2 focus:ring-[hsl(25,55%,38%)] text-sm"
                />

                {/* 正文 */}
                <textarea
                  placeholder="写下你对胡同的记忆...（支持图片+文字）"
                  value={newMemory.content}
                  onChange={(e) => setNewMemory({ ...newMemory, content: e.target.value })}
                  rows={4}
                  maxLength={500}
                  className="w-full px-4 py-2.5 rounded-lg border border-[hsl(var(--border))] 
                             bg-white focus:outline-none focus:ring-2 focus:ring-[hsl(25,55%,38%)] text-sm resize-none"
                />

                {/* 图片上传 */}
                <div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  
                  {previewImage ? (
                    <div className="relative inline-block">
                      <img src={previewImage} alt="预览" className="max-h-40 rounded-lg border" />
                      <button
                        onClick={() => setPreviewImage(null)}
                        className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-red-500 text-white flex items-center 
                                   justify-center cursor-pointer hover:bg-red-600"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="flex items-center gap-2 px-4 py-2.5 rounded-lg border-2 border-dashed 
                                 border-[hsl(var(--border))] hover:border-[hsl(25,55%,38%)] text-sm 
                                 text-[hsl(var(--muted-foreground))] hover:text-[hsl(25,55%,38%)] 
                                 transition-colors cursor-pointer w-full justify-center"
                    >
                      <Upload className="w-4 h-4" />
                      点击上传图片（可选）
                    </button>
                  )}
                </div>

                {/* 提交按钮 */}
                <button
                  onClick={handleUploadSubmit}
                  disabled={!newMemory.nickname.trim() || !newMemory.content.trim()}
                  className="w-full py-3 rounded-lg bg-[hsl(25,55%,38%)] text-white font-medium 
                             hover:opacity-90 transition-opacity disabled:opacity-40 cursor-pointer"
                >
                  发布记忆
                </button>
              </div>
            </div>
          )}

          {/* ====== 生成我的记忆（AI） ====== */}
          {activeTab === 'generate' && (
            <div className="animate-fade-in-up max-w-xl mx-auto">
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-10 border border-[hsl(var(--border))]
                            shadow-sm flex flex-col items-center justify-center space-y-5">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-100 to-indigo-100 flex items-center justify-center">
                  <Sparkles className="w-10 h-10 text-[hsl(270,50%,45%)]" />
                </div>
                <div className="text-center space-y-2">
                  <h3 className="text-xl font-bold text-[hsl(28,25%,26%)] font-serif">功能搭建中</h3>
                  <p className="text-sm text-[hsl(30,12%,50%)]">AI 生成图文记忆功能正在搭建中，敬请期待</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
      <AIAssistant />
    </div>
  )
}

// 单个记忆卡片组件
function MemoryCard({
  memory,
  onLike,
  onUnlike,
  onComment,
  onLikeComment,
  onUnlikeComment,
  onDeleteComment,
  onDelete,
  delay,
}: {
  memory: MemoryItem
  onLike: () => void
  onUnlike: () => void
  onComment: (comment: string) => void
  onLikeComment: (commentId: number) => void
  onUnlikeComment: (commentId: number) => void
  onDeleteComment: (commentId: number) => void
  onDelete: () => void
  delay?: number
}) {
  const [commentInput, setCommentInput] = useState('')
  const [liked, setLiked] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [showAllComments, setShowAllComments] = useState(false)
  // 记录每条评论是否已点赞
  const [likedComments, setLikedComments] = useState<Set<number>>(new Set())

  const VISIBLE_COUNT = 3
  const hasMore = memory.comments.length > VISIBLE_COUNT
  const visibleComments = showAllComments ? memory.comments : memory.comments.slice(0, VISIBLE_COUNT)

  const handleSubmitComment = () => {
    if (!commentInput.trim()) return
    onComment(commentInput)
    setCommentInput('')
  }

  const handleLikeClick = () => {
    if (liked) {
      onUnlike()
      setLiked(false)
    } else {
      onLike()
      setLiked(true)
    }
  }

  const handleCommentLikeClick = (commentId: number) => {
    if (likedComments.has(commentId)) {
      onUnlikeComment(commentId)
      setLikedComments((prev) => {
        const next = new Set(prev)
        next.delete(commentId)
        return next
      })
    } else {
      onLikeComment(commentId)
      setLikedComments((prev) => new Set(prev).add(commentId))
    }
  }

  return (
    <article
      className="bg-white/75 backdrop-blur-sm rounded-xl overflow-hidden border border-[hsl(var(--border))]
                     shadow-sm hover:shadow-md transition-all duration-300 animate-fade-in-up relative"
      style={{ animationDelay: `${delay || 0}ms`, animationFillMode: 'backwards' }}
    >
      {/* 删除按钮 */}
      <div className="absolute top-3 right-3 z-10">
        {showDeleteConfirm ? (
          <div className="flex items-center gap-1 bg-white/95 rounded-lg shadow-md px-2 py-1 border border-red-200">
            <span className="text-xs text-red-600 whitespace-nowrap">确认删除？</span>
            <button
              onClick={() => { onDelete(); setShowDeleteConfirm(false); }}
              className="px-2 py-0.5 text-xs rounded bg-red-500 text-white hover:bg-red-600 cursor-pointer"
            >
              删除
            </button>
            <button
              onClick={() => setShowDeleteConfirm(false)}
              className="px-2 py-0.5 text-xs rounded border border-[hsl(var(--border))] hover:bg-gray-100 cursor-pointer"
            >
              取消
            </button>
          </div>
        ) : (
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="p-1.5 rounded-full text-[hsl(var(--muted-foreground))] hover:text-red-500 hover:bg-red-50 transition-colors cursor-pointer"
            title="删除这条记忆"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* 卡片内容：用户信息 + 图片 */}
      <div className="sm:flex">
        {/* 左侧信息区 */}
        <div className="flex-1 p-5">
          {/* 大标题：名称 */}
          <h3 className="font-bold text-lg text-[hsl(28,25%,26%)] mb-1 font-serif">{memory.title}</h3>
          
          {/* 副标题：朝代/时间 + 昵称 */}
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-[hsl(var(--muted-foreground))] font-mono">{memory.era}</span>
            <span className="text-xs text-[hsl(35,30%,45%)]">— {memory.nickname}</span>
          </div>
          
          <p className="text-sm text-[hsl(28,18%,38%)] leading-relaxed">
            {memory.content}
          </p>

          {/* 操作栏 */}
          <div className="flex items-center gap-4 mt-4 pt-3 border-t border-[hsl(var(--border))]">
            <button
              onClick={handleLikeClick}
              className={`flex items-center gap-1 text-xs transition-colors cursor-pointer ${
                liked ? 'text-red-500' : 'text-[hsl(var(--muted-foreground))] hover:text-red-500'
              }`}
            >
              <Heart className={`w-4 h-4 ${liked ? 'fill-current' : ''}`} />
              {memory.likes}
            </button>
            
            <span className="flex items-center gap-1 text-xs text-[hsl(var(--muted-foreground))]">
              <MessageCircle className="w-4 h-4" />
              {memory.comments.length} 条评论
            </span>
          </div>
        </div>

        {/* 右侧图片 */}
        {memory.image && (
          <div className="sm:w-44 shrink-0 order-first sm:order-last">
            <img
              src={memory.image}
              alt={memory.title}
              className="w-full h-36 sm:h-full object-cover sm:rounded-r-xl"
              loading="lazy"
            />
          </div>
        )}
      </div>

      {/* ====== 评论区（始终可见） ====== */}
      <div className="border-t border-[hsl(var(--border))] bg-[hsl(45,30%,97%)]">
        {/* 已有评论列表 */}
        {memory.comments.length > 0 ? (
          <div className="px-5 pt-3 space-y-2">
            {visibleComments.map((c) => {
              const isCommentLiked = likedComments.has(c.id)
              return (
                <div key={c.id} className="flex items-start gap-2 group">
                  <p className="flex-1 text-xs text-[hsl(28,18%,38%)] leading-relaxed">
                    {c.text}
                  </p>
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={() => handleCommentLikeClick(c.id)}
                      className={`flex items-center gap-0.5 text-xs transition-colors cursor-pointer ${
                        isCommentLiked ? 'text-red-500' : 'text-[hsl(var(--muted-foreground))] hover:text-red-500'
                      }`}
                      title={isCommentLiked ? '取消点赞' : '点赞'}
                    >
                      <Heart className={`w-3 h-3 ${isCommentLiked ? 'fill-current' : ''}`} />
                      {c.likes > 0 && <span className="text-[10px]">{c.likes}</span>}
                    </button>
                    <button
                      onClick={() => onDeleteComment(c.id)}
                      className="p-0.5 rounded text-[hsl(var(--muted-foreground))] hover:text-red-500 hover:bg-red-50 transition-colors cursor-pointer opacity-0 group-hover:opacity-100"
                      title="删除评论"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              )
            })}
            
            {/* 展开更多评论 */}
            {hasMore && !showAllComments && (
              <button
                onClick={() => setShowAllComments(true)}
                className="flex items-center gap-1 text-xs text-[hsl(25,55%,38%)] hover:text-[hsl(25,45%,48%)] transition-colors cursor-pointer py-1"
              >
                展开更多评论（共 {memory.comments.length} 条）
                <ChevronDown className="w-3 h-3" />
              </button>
            )}
            {showAllComments && hasMore && (
              <button
                onClick={() => setShowAllComments(false)}
                className="flex items-center gap-1 text-xs text-[hsl(var(--muted-foreground))] hover:text-[hsl(25,55%,38%)] transition-colors cursor-pointer py-1"
              >
                收起评论
                <ChevronDown className="w-3 h-3 rotate-180" />
              </button>
            )}
          </div>
        ) : (
          <div className="px-5 pt-3">
            <p className="text-xs text-[hsl(var(--muted-foreground))] italic text-center py-4">
              暂无评论，快来发表第一条吧~
            </p>
          </div>
        )}

        {/* 评论输入框 */}
        <div className="px-5 py-3">
          <div className="flex gap-2">
            <input
              type="text"
              value={commentInput}
              onChange={(e) => setCommentInput(e.target.value)}
              placeholder="写下你的评论..."
              onKeyDown={(e) => { if (e.key === 'Enter') handleSubmitComment() }}
              className="flex-1 min-w-0 px-3 py-1.5 text-xs rounded-full border border-[hsl(var(--border))] bg-white
                         focus:outline-none focus:ring-1 focus:ring-[hsl(25,55%,38%)]"
            />
            <button
              onClick={handleSubmitComment}
              disabled={!commentInput.trim()}
              className="px-4 py-1.5 text-xs rounded-full bg-[hsl(25,55%,38%)] text-white 
                         hover:opacity-90 disabled:opacity-40 cursor-pointer transition-opacity"
            >
              发送
            </button>
          </div>
        </div>
      </div>
    </article>
  )
}

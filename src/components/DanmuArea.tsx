import { useState } from 'react'
import { Heart, X, ChevronDown, MessageCircle } from 'lucide-react'

// 评论项接口
export interface CommentItem {
  id: number
  text: string
  likes: number
}

interface CommentAreaProps {}

function CommentInput({
  onAdd,
}: {
  onAdd: (text: string) => void
}) {
  const [text, setText] = useState('')

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault()
    if (text.trim().length > 0) {
      onAdd(text)
      setText('')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="写下你的评论..."
        onKeyDown={(e) => { if (e.key === 'Enter') handleSubmit() }}
        className="flex-1 min-w-0 px-3 py-1.5 text-xs rounded-full border border-[hsl(var(--border))] 
                   bg-white focus:outline-none focus:ring-1 focus:ring-[hsl(25,55%,38%)]"
      />
      <button
        type="submit"
        disabled={!text.trim()}
        className="px-4 py-1.5 text-xs font-medium rounded-full bg-[hsl(25,55%,38%)] 
                   text-white hover:opacity-90 transition-opacity
                   disabled:opacity-40 cursor-pointer"
      >
        发送
      </button>
    </form>
  )
}

// 全局评论ID计数器
let commentIdCounter = 1000

export default function CommentArea({}: CommentAreaProps) {
  const [comments, setComments] = useState<CommentItem[]>([])
  const [showAll, setShowAll] = useState(false)
  const [likedComments, setLikedComments] = useState<Set<number>>(new Set())

  const VISIBLE_COUNT = 3
  const hasMore = comments.length > VISIBLE_COUNT
  const visibleComments = showAll ? comments : comments.slice(0, VISIBLE_COUNT)

  // 添加评论
  const addComment = (text: string) => {
    const newComment: CommentItem = {
      id: ++commentIdCounter,
      text,
      likes: 0,
    }
    setComments((prev) => [...prev, newComment])
  }

  // 点赞/取消点赞评论
  const handleLikeClick = (commentId: number) => {
    if (likedComments.has(commentId)) {
      setComments((prev) =>
        prev.map((c) =>
          c.id === commentId ? { ...c, likes: Math.max(0, c.likes - 1) } : c
        )
      )
      setLikedComments((prev) => {
        const next = new Set(prev)
        next.delete(commentId)
        return next
      })
    } else {
      setComments((prev) =>
        prev.map((c) =>
          c.id === commentId ? { ...c, likes: c.likes + 1 } : c
        )
      )
      setLikedComments((prev) => new Set(prev).add(commentId))
    }
  }

  // 删除评论
  const handleDelete = (commentId: number) => {
    setComments((prev) => prev.filter((c) => c.id !== commentId))
  }

  return (
    <div className="mt-4 rounded-lg border border-[hsl(var(--border))] bg-[hsl(45,30%,97%)] overflow-hidden">
      {/* 评论列表区 */}
      <div className="px-4 pt-3">
        {comments.length === 0 ? (
          <div className="py-4 text-center">
            <p className="text-xs text-[hsl(var(--muted-foreground))] italic">
              暂无评论，快来发表第一条吧~
            </p>
          </div>
        ) : (
          <div className="space-y-2 pb-2">
            {visibleComments.map((c) => {
              const isLiked = likedComments.has(c.id)
              return (
                <div key={c.id} className="flex items-start gap-2 group">
                  <p className="flex-1 text-xs text-[hsl(28,18%,38%)] leading-relaxed">
                    {c.text}
                  </p>
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={() => handleLikeClick(c.id)}
                      className={`flex items-center gap-0.5 text-xs transition-colors cursor-pointer ${
                        isLiked ? 'text-red-500' : 'text-[hsl(var(--muted-foreground))] hover:text-red-500'
                      }`}
                      title={isLiked ? '取消点赞' : '点赞'}
                    >
                      <Heart className={`w-3 h-3 ${isLiked ? 'fill-current' : ''}`} />
                      {c.likes > 0 && <span className="text-[10px]">{c.likes}</span>}
                    </button>
                    <button
                      onClick={() => handleDelete(c.id)}
                      className="p-0.5 rounded text-[hsl(var(--muted-foreground))] hover:text-red-500 hover:bg-red-50 transition-colors cursor-pointer opacity-0 group-hover:opacity-100"
                      title="删除评论"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              )
            })}

            {/* 展开/收起 */}
            {hasMore && !showAll && (
              <button
                onClick={() => setShowAll(true)}
                className="flex items-center gap-1 text-xs text-[hsl(25,55%,38%)] hover:text-[hsl(25,45%,48%)] transition-colors cursor-pointer py-1"
              >
                展开更多评论（共 {comments.length} 条）
                <ChevronDown className="w-3 h-3" />
              </button>
            )}
            {showAll && hasMore && (
              <button
                onClick={() => setShowAll(false)}
                className="flex items-center gap-1 text-xs text-[hsl(var(--muted-foreground))] hover:text-[hsl(25,55%,38%)] transition-colors cursor-pointer py-1"
              >
                收起评论
                <ChevronDown className="w-3 h-3 rotate-180" />
              </button>
            )}
          </div>
        )}
      </div>

      {/* 输入区 */}
      <div className="px-4 pb-3">
        <div className="flex items-center gap-2 mb-1">
          <MessageCircle className="w-3.5 h-3.5 text-[hsl(var(--muted-foreground))]" />
          <span className="text-[10px] text-[hsl(var(--muted-foreground))]">
            {comments.length} 条评论
          </span>
        </div>
        <CommentInput onAdd={addComment} />
      </div>
    </div>
  )
}

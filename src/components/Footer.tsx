export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-[hsl(25,55%,30%)] to-[hsl(20,40%,35%)] border-t-2 border-[hsl(35,50%,45%)] mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-8">
          {/* 项目信息 */}
          <div>
            <h3 className="text-base font-bold mb-3 font-serif" style={{ color: 'hsl(42, 33%, 95%)' }}>项目信息</h3>
            <p className="text-sm leading-relaxed" style={{ color: 'hsl(42, 30%, 80%)' }}>
              北京·胡同记忆
            </p>
            <p className="text-xs mt-2" style={{ color: 'hsl(42, 20%, 65%)' }}>
              中国人民大学《数字人文导论》课程作业
            </p>
          </div>
          
          {/* 团队成员 */}
          <div>
            <h3 className="text-base font-bold mb-3 font-serif" style={{ color: 'hsl(42, 33%, 95%)' }}>团队成员</h3>
            <div className="flex flex-wrap gap-x-4 gap-y-1">
              {['程柯', '张诗婧', '缪志兴'].map((name) => (
                <span key={name} className="text-sm" style={{ color: 'hsl(42, 30%, 80%)' }}>{name}</span>
              ))}
            </div>
          </div>

          {/* 课程信息 */}
          <div>
            <h3 className="text-base font-bold mb-3 font-serif" style={{ color: 'hsl(42, 33%, 95%)' }}>课程信息</h3>
            <p className="text-sm" style={{ color: 'hsl(42, 30%, 80%)' }}>课程：数字人文导论</p>
            <p className="text-sm mt-1" style={{ color: 'hsl(42, 30%, 80%)' }}>时间：2026年6月</p>
          </div>
        </div>

        {/* 底部装饰线 */}
        <div className="mt-6 pt-4 border-t border-[hsla(35,50%,45%,0.3)] text-center">
          <p className="text-xs" style={{ color: 'hsl(42, 15%, 55%)' }}>
            © 2026 北京·胡同记忆 数字人文项目 | 中国人民大学
          </p>
        </div>
      </div>
    </footer>
  )
}

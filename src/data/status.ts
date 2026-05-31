// 砖塔胡同 - 现状板块数据
import img1 from '@/assets/images/砖塔胡同东段实景.jpg'
import img2 from '@/assets/images/万松老人塔院入口.png'
import img3 from '@/assets/images/砖塔胡同文化体验馆外观.jpg'
import img4 from '@/assets/images/胡同居民日常场景.png'

export interface StatusItem {
  title: string
  subtitle: string
  description: string
  image: string
}

export const statusOverview = `如今砖塔胡同东起西四南大街，西至太平桥大街，全长 805 米，东段 312 米风貌保存完好。胡同保留明清肌理，青灰瓦檐、国槐成荫；万松老人塔院设正阳书局，"北京胡同之根文化体验馆" 开放；部分民居改造为文创店、咖啡馆，烟火气与文韵共生，成为城市更新中 "活态保护" 的典范。`

export const statusItems: StatusItem[] = [
  {
    title: '胡同整体风貌',
    subtitle: '青灰瓦檐，国槐婆娑',
    description: '胡同东段保持明清街巷格局，青砖路面、灰瓦院墙，夏日槐影斑驳，冬日静谧古朴。',
    image: img1
  },
  {
    title: '万松老人塔院',
    subtitle: '古塔 + 书局，文韵共生',
    description: '塔院开放为正阳书局，陈列北京史料，游客可看书、喝茶、俯瞰古塔，是胡同文化打卡地。',
    image: img2
  },
  {
    title: '文化体验馆',
    subtitle: '老胡同的新活力',
    description: '2025 年开放的 "北京胡同之根文化体验馆"，集茶饮、文创、展演于一体，顶层可俯瞰胡同全景。',
    image: img3
  },
  {
    title: '市井生活实景',
    subtitle: '烟火气依旧',
    description: '胡同深处保留老北京生活气息，居民在门口聊天、晾晒，老店铺与新文创店相邻，新旧交融。',
    image: img4
  }
]

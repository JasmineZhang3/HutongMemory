// 砖塔胡同 - 文化板块数据
import img1 from '@/assets/images/万松老人塔特写.webp'
import img3 from '@/assets/images/鲁迅在砖塔胡同的故居内院老照片.webp'
import img4 from '@/assets/images/胡同居民日常聊天场景实拍.jpg'

export interface CultureItem {
  title: string
  subtitle: string
  description: string
  image: string | null
}

export const cultureOverview = `砖塔胡同是北京元曲文化、名人文化、市井文化的交融地：元代为戏曲中心，明清传续曲艺文脉；民国鲁迅、张恨水、顾太清等文人聚居，留下文学印记；七百年烟火气沉淀老北京邻里温情，是 "胡同活化石"。`

export const cultureItems: CultureItem[] = [
  {
    title: '万松老人塔文化',
    subtitle: '胡同的精神地标',
    description: '北京城区唯一古砖塔，全国重点文保单位，金末元初佛学大师万松行秀的墓塔，"儒释兼备" 的文化象征。',
    image: img1
  },
  {
    title: '元曲戏曲文化',
    subtitle: '元代娱乐中心',
    description: '元时 "勾栏鳞比，锣鼓昼夜不息"，为京城最大杂剧演出地，见证元曲黄金时代；清代恢复曲艺，同治光绪年间 "歌吹沸天"。',
    image: null // 无配图
  },
  {
    title: '鲁迅文学印记',
    subtitle: '《祝福》诞生地',
    description: '1923 年鲁迅在此居住 9 个月，写下《祝福》《肥皂》等 4 篇小说，胡同的市井生活成为其创作素材。',
    image: img3
  },
  {
    title: '老北京邻里文化',
    subtitle: '七百年烟火温情',
    description: '从元代杂院到明清四合院，再到民国大杂院，"一院多户、邻里互助" 的生活模式延续至今，是胡同情感记忆的核心。',
    image: img4
  }
]

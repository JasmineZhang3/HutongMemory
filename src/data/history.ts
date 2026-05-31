// 砖塔胡同 - 历史板块数据
import img1 from '@/assets/images/万松老人塔近景.jpg'
import img2 from '@/assets/images/元杂剧演出场景复原图.webp'
import img3 from '@/assets/images/清代修缮后砖塔老照片.jpg'
import img4 from '@/assets/images/砖塔胡同鲁迅旧居大门.webp'
import img5 from '@/assets/images/1986 年修缮后砖塔全景.webp'

export interface TimelineEvent {
  year: string
  period: string
  title: string
  description: string
  image: string | null
}

export const historyOverview = `砖塔胡同始建于元代（1271-1368），因东口的万松老人塔得名，是北京唯一自元大都时期有文字记载并沿用至今的胡同，被誉为 "北京胡同之根"。元时为杂剧演出中心，明清历经戏曲繁华与兵营变迁，民国名人聚居，至今保留明清街巷格局，地名七百年未改。`

export const historyTimeline: TimelineEvent[] = [
  {
    year: '1246',
    period: '金末元初',
    title: '万松老人圆寂，砖塔始建',
    description: '高僧万松行秀（1166-1246）圆寂，弟子建八角九级密檐砖塔（万松老人塔）安葬灵骨，胡同因塔得名。',
    image: img1
  },
  {
    year: '13-14世纪',
    period: '元代',
    title: '元曲勾栏聚集地',
    description: '胡同为元大都 "勾栏瓦舍" 核心区，关汉卿、王实甫等名家在此创作，《张生煮海》杂剧首次提及 "砖塔胡同"。',
    image: img2
  },
  {
    year: '1753',
    period: '清乾隆十八年',
    title: '砖塔收归皇家修缮',
    description: '砖塔被圈入私宅后收归朝廷，乾隆年间重修，形成 "塔中塔"（外清内元）奇观。',
    image: img3
  },
  {
    year: '1923-1924',
    period: '民国',
    title: '鲁迅寓居创作',
    description: '鲁迅迁居砖塔胡同 61 号（今 84 号），在此写下《祝福》《在酒楼上》等名篇。',
    image: img4
  },
  {
    year: '1986',
    period: '当代',
    title: '砖塔全面修缮，修旧如旧',
    description: '政府拨款修缮万松老人塔，恢复元代风貌，确认 "塔中塔" 结构，列为文保单位。',
    image: img5
  }
]

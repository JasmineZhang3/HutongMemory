// 胡同列表数据（使用真实经纬度坐标，基于 WGS84）
export interface HutongData {
  id: string
  name: string
  lat: number  // 纬度 (latitude)
  lng: number  // 经度 (longitude)
  brief?: string
}

export const hutongList: HutongData[] = [
  // 坐标来源：bigemap.net 卫星地图数据 + 百度地图坐标拾取
  // 北京中心参考：故宫约 (116.397, 39.916)
  { id: 'zhuanta', name: '砖塔胡同', lat: 39.9210, lng: 116.3670, brief: '北京胡同之根，七百年砖塔映古今' },
  { id: 'nanluogu', name: '南锣鼓巷', lat: 39.9373, lng: 116.4032, brief: '北京最古老的街区之一' },
  { id: 'dongjiaomin', name: '东郊民巷', lat: 39.9025, lng: 116.4083, brief: '近代使馆建筑群' },
  { id: 'shijia', name: '史家胡同', lat: 39.9205, lng: 116.4180, brief: '一条胡同，半个中国' },
  { id: 'bada', name: '八大胡同', lat: 39.8930, lng: 116.3910, brief: '清末民初烟花之地' },
  { id: 'guozijian', name: '国子监街', lat: 39.9435, lng: 116.4100, brief: '崇文重教的历史街区' },
  { id: 'yandai', name: '烟袋斜街', lat: 39.9365, lng: 116.3950, brief: '老北京风情商业街' },
  { id: 'wudaoying', name: '五道营胡同', lat: 39.9460, lng: 116.4120, brief: '文艺青年的聚集地' },
  { id: 'liulichang', name: '琉璃厂', lat: 39.8950, lng: 116.3830, brief: '文化古玩一条街' },
  { id: 'yangmeizhu', name: '杨梅竹斜街', lat: 39.8940, lng: 116.3930, brief: '书局林立的文化老街' },
  { id: 'maoer', name: '帽儿胡同', lat: 39.9370, lng: 116.4000, brief: '名人故居荟萃' },
  { id: 'qianshi', name: '钱市胡同', lat: 39.8980, lng: 116.3960, brief: '北京最窄的胡同' }
]

// 砖塔胡同详细数据
import heroImage from '@/assets/images/砖塔胡同东口全景.jpg'

export const zhuanTaHutong = {
  id: 'zhuanta',
  name: '砖塔胡同',
  brief: '北京胡同之根，七百年砖塔映古今，一巷藏尽元曲烟火与文人情思',
  heroImage,
}

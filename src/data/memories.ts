// 砖塔胡同 - 记忆板块数据
import img1 from '@/assets/images/滚铁环老照片.jpg'
import img2 from '@/assets/images/1970 年代北京胡同防震棚生活.jpg'
import img3 from '@/assets/images/北京胡同冰棍车老照片.jpg'
import img4 from '@/assets/images/砖塔胡同鲁迅旧居内院.jpg'
import img5 from '@/assets/images/2000 年代北京胡同春节.jpeg'
import img6 from '@/assets/images/正阳书局内景.jpg'
import img7 from '@/assets/images/砖塔胡同东段街景.jpg'

export interface CommentItem {
  id: number
  text: string
  likes: number
}

export interface MemoryItem {
  id: number
  nickname: string
  era: string
  title: string
  content: string
  image: string | null
  likes: number
  comments: CommentItem[]
}

export const presetMemories: MemoryItem[] = [
  {
    id: 1,
    nickname: '李建国',
    era: '1965年',
    title: '砖塔下的童年游戏',
    content: '我们小时候没有玩具，砖塔胡同就是我们的游乐场。在塔根下滚铁环、抽陀螺、弹玻璃球，谁要是能爬到塔基上坐一会儿，就是全胡同最厉害的孩子。万松老人塔的每一块砖，都刻着我们的童年。',
    image: img1,
    likes: 128,
    comments: [
      { id: 1, text: '满满的回忆！', likes: 12 },
      { id: 2, text: '童年真好', likes: 8 },
      { id: 3, text: '我也在胡同里长大的', likes: 5 },
      { id: 4, text: '滚铁环我也会！', likes: 3 },
    ]
  },
  {
    id: 2,
    nickname: '张淑珍',
    era: '1976年',
    title: '地震后的胡同夜晚',
    content: '唐山大地震那年，我们全胡同的人都在砖塔旁边搭了防震棚。晚上大家挤在一起，男人们轮流值班，女人们给孩子们讲故事。虽然害怕，但邻里之间互相照顾，感觉特别温暖。砖塔就像一个守护神，守护着我们所有人。',
    image: img2,
    likes: 256,
    comments: [
      { id: 1, text: '温暖的故事', likes: 18 },
      { id: 2, text: '邻里情深', likes: 15 },
    ]
  },
  {
    id: 3,
    nickname: '刘小明',
    era: '1983年',
    title: '胡同口的冰棍车',
    content: '最盼着夏天胡同口推冰棍车的大爷来，五分钱一根的奶油冰棍，一毛钱一根的小豆冰棍。我们攒着零花钱，一听到 "冰棍儿" 的吆喝声就往外跑。大爷的冰棍车总是停在万松老人塔对面，那是我们童年最甜的回忆。',
    image: img3,
    likes: 342,
    comments: [
      { id: 1, text: '怀念的味道', likes: 22 },
      { id: 2, text: '童年的甜蜜', likes: 19 },
    ]
  },
  {
    id: 4,
    nickname: '陈老师',
    era: '1992年',
    title: '在鲁迅旧居读《祝福》',
    content: '我是一名语文老师，第一次来砖塔胡同就是为了看鲁迅旧居。站在那个小小的院子里，仿佛能看到鲁迅先生在灯下写作的身影。后来我每次教《祝福》，都会给学生讲砖塔胡同的故事，告诉他们文学就来自这样的市井生活。',
    image: img4,
    likes: 189,
    comments: [
      { id: 1, text: '致敬鲁迅先生', likes: 25 },
      { id: 2, text: '文学的温度', likes: 16 },
    ]
  },
  {
    id: 5,
    nickname: '赵阿姨',
    era: '2005年',
    title: '拆迁前的最后一个春节',
    content: '那年听说胡同西边要拆迁，全院子的人一起过了最后一个春节。大家在院子里摆了长桌，每家做了一道菜，从中午吃到晚上。虽然舍不得，但大家都互相祝福。现在我还经常回砖塔胡同看看，东边还保留着原来的样子。',
    image: img5,
    likes: 167,
    comments: [
      { id: 1, text: '感动落泪', likes: 30 },
      { id: 2, text: '永远的回忆', likes: 21 },
      { id: 3, text: '珍惜身边的老街巷', likes: 14 },
    ]
  },
  {
    id: 6,
    nickname: '小书虫',
    era: '2014年',
    title: '塔下的正阳书局',
    content: '偶然发现万松老人塔院里开了正阳书局，一下子就爱上了这个地方。在古塔下看书、喝茶，阳光透过树叶洒在书页上，时间仿佛都慢了下来。这里不仅有很多关于北京的老书，还有很多老北京的故事。',
    image: img6,
    likes: 298,
    comments: [
      { id: 1, text: '好想去这里', likes: 27 },
      { id: 2, text: '书香与古塔', likes: 20 },
      { id: 3, text: '周末就去打卡！', likes: 11 },
      { id: 4, text: '北京最美书店之一', likes: 9 },
    ]
  },
  {
    id: 7,
    nickname: '大学生小林',
    era: '2023年',
    title: '在胡同里找到老北京',
    content: '作为一个外地来北京上学的学生，一直想看看真正的老北京。第一次来砖塔胡同，就被这里的氛围吸引了。没有南锣鼓巷那么商业化，有安静的胡同、古老的砖塔，还有热情的居民。在这里，我终于感受到了老北京的味道。',
    image: img7,
    likes: 145,
    comments: [
      { id: 1, text: '欢迎来北京', likes: 17 },
      { id: 2, text: '真正的老北京', likes: 13 },
    ]
  }
]

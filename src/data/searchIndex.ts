// 搜索索引 - 整合所有数据并分类标签
import { historyOverview, historyTimeline } from './history'
import { cultureOverview, cultureItems } from './culture'
import { statusOverview, statusItems } from './status'
import { presetMemories } from './memories'

// 分类定义
export type SearchCategory = '时空定位' | '情感体验' | '社会关系' | '文化意义'

export const allCategories: SearchCategory[] = ['时空定位', '情感体验', '社会关系', '文化意义']

// 搜索结果条目
export interface SearchResultItem {
  id: string
  type: 'history' | 'culture' | 'status' | 'memory'
  typeLabel: string
  title: string
  description: string
  keywords: string
  categories: SearchCategory[]
  link: string
  image?: string | null
}

// 时空定位：与时间、空间、地点相关的条目
// 情感体验：个人感受、情绪、回忆
// 社会关系：人际交往、社区、邻里、群体
// 文化意义：文化遗产、历史价值、文学艺术

export const searchIndex: SearchResultItem[] = [
  // ===== 历史事件 =====
  ...historyTimeline.map((item, i) => {
    const categoryMap: Record<number, SearchCategory[]> = {
      0: ['文化意义', '时空定位'],   // 万松老人圆寂
      1: ['文化意义', '社会关系'],   // 元曲勾栏
      2: ['时空定位', '文化意义'],   // 乾隆修缮
      3: ['文化意义', '情感体验'],   // 鲁迅寓居
      4: ['时空定位', '文化意义'],   // 1986修缮
    }
    return {
      id: `history-${i}`,
      type: 'history' as const,
      typeLabel: '历史事件',
      title: item.title,
      description: item.description,
      keywords: `${item.year} ${item.period} ${item.title} 砖塔胡同`,
      categories: categoryMap[i] || ['时空定位'],
      link: '/hutong/zhuanta/history',
      image: item.image,
    }
  }),

  // 历史概述
  {
    id: 'history-overview',
    type: 'history' as const,
    typeLabel: '历史概况',
    title: '砖塔胡同历史沿革',
    description: historyOverview,
    keywords: '砖塔胡同 历史 元大都 北京胡同之根 七百年',
    categories: ['时空定位', '文化意义'],
    link: '/hutong/zhuanta/history',
  },

  // ===== 文化印记 =====
  ...cultureItems.map((item, i) => {
    const categoryMap: Record<number, SearchCategory[]> = {
      0: ['文化意义', '时空定位'],   // 万松老人塔
      1: ['文化意义', '社会关系'],   // 元曲戏曲
      2: ['文化意义', '情感体验'],   // 鲁迅文学
      3: ['社会关系', '情感体验'],   // 邻里文化
    }
    return {
      id: `culture-${i}`,
      type: 'culture' as const,
      typeLabel: '文化印记',
      title: item.title,
      description: item.description,
      keywords: `${item.title} ${item.subtitle} 砖塔胡同 文化`,
      categories: categoryMap[i] || ['文化意义'],
      link: '/hutong/zhuanta/culture',
      image: item.image,
    }
  }),

  // 文化概述
  {
    id: 'culture-overview',
    type: 'culture' as const,
    typeLabel: '文化概况',
    title: '砖塔胡同文化印记',
    description: cultureOverview,
    keywords: '砖塔胡同 文化 元曲 鲁迅 名人 邻里',
    categories: ['文化意义', '社会关系'],
    link: '/hutong/zhuanta/culture',
  },

  // ===== 现状风貌 =====
  ...statusItems.map((item, i) => {
    const categoryMap: Record<number, SearchCategory[]> = {
      0: ['时空定位', '文化意义'],   // 整体风貌
      1: ['文化意义', '时空定位'],   // 万松老人塔院
      2: ['社会关系', '文化意义'],   // 文化体验馆
      3: ['社会关系', '情感体验'],   // 市井生活
    }
    return {
      id: `status-${i}`,
      type: 'status' as const,
      typeLabel: '今日风貌',
      title: item.title,
      description: item.description,
      keywords: `${item.title} ${item.subtitle} 砖塔胡同 现状`,
      categories: categoryMap[i] || ['时空定位'],
      link: '/hutong/zhuanta/status',
      image: item.image,
    }
  }),

  // 现状概述
  {
    id: 'status-overview',
    type: 'status' as const,
    typeLabel: '现状概况',
    title: '砖塔胡同今日风貌',
    description: statusOverview,
    keywords: '砖塔胡同 现状 风貌 城市更新 活态保护',
    categories: ['时空定位', '文化意义'],
    link: '/hutong/zhuanta/status',
  },

  // ===== 胡同记忆 =====
  ...presetMemories.map((item, i) => {
    const categoryMap: Record<number, SearchCategory[]> = {
      0: ['情感体验', '社会关系'],   // 童年游戏
      1: ['情感体验', '社会关系'],   // 地震夜晚
      2: ['情感体验', '时空定位'],   // 冰棍车
      3: ['文化意义', '情感体验'],   // 鲁迅旧居
      4: ['情感体验', '社会关系'],   // 拆迁春节
      5: ['文化意义', '情感体验'],   // 正阳书局
      6: ['情感体验', '时空定位'],   // 找到老北京
    }
    return {
      id: `memory-${item.id}`,
      type: 'memory' as const,
      typeLabel: '胡同记忆',
      title: item.title,
      description: item.content,
      keywords: `${item.nickname} ${item.era} ${item.title} 砖塔胡同 记忆`,
      categories: categoryMap[i] || ['情感体验'],
      link: '/hutong/zhuanta/memory',
      image: item.image,
    }
  }),
]

// 按分类筛选搜索
export function filterByCategory(category: SearchCategory | null): SearchResultItem[] {
  if (!category) return searchIndex
  return searchIndex.filter(item => item.categories.includes(category))
}

// 按关键词搜索（模糊匹配标题、描述、关键词）
export function searchByKeyword(keyword: string): SearchResultItem[] {
  if (!keyword.trim()) return searchIndex
  const lower = keyword.toLowerCase()
  return searchIndex.filter(item => {
    const searchText = `${item.title} ${item.description} ${item.keywords} ${item.typeLabel}`.toLowerCase()
    return searchText.includes(lower)
  })
}

// 组合搜索
export function searchItems(keyword: string, category: SearchCategory | null): SearchResultItem[] {
  let results = keyword.trim() ? searchByKeyword(keyword) : searchIndex
  if (category) {
    results = results.filter(item => item.categories.includes(category))
  }
  return results
}

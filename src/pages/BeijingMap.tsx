import { useState, useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Tooltip, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { hutongList } from '@/data/hutongs'

// ============================================================
// 修复 Leaflet 默认 marker 图标缺失问题
// ============================================================
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
})

// ============================================================
// 自定义 Marker 图标
// ============================================================
function createHutongIcon(isHighlighted: boolean, isFeatured: boolean) {
  const size = isHighlighted ? 36 : isFeatured ? 32 : 26
  const color = isHighlighted ? '#8B4513' : isFeatured ? '#A0522D' : '#C49A6C'
  return L.divIcon({
    className: 'hutong-marker',
    html: `<div style="
      width:${size}px;height:${size}px;
      background:${color};
      border:3px solid #fff;
      border-radius:50%;
      box-shadow: 0 2px 8px rgba(0,0,0,0.3);
      cursor:pointer;
      transition: all 0.2s;
    "></div>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  })
}

// ============================================================
// 地图自动定位与边界控制组件
// ============================================================
function MapController() {
  const map = useMap()

  useEffect(() => {
    map.setView([39.916, 116.397], 13)
    const southWest = L.latLng(39.85, 116.28)
    const northEast = L.latLng(39.98, 116.50)
    const bounds = L.latLngBounds(southWest, northEast)
    map.setMaxBounds(bounds)
    map.setMinZoom(12)
    map.setMaxZoom(18)
  }, [map])

  return null
}

// ============================================================
// Props 类型
// ============================================================
interface BeijingMapProps {
  onMarkerClick: (hutong: (typeof hutongList)[0]) => void
}

// ============================================================
// 北京城区地图组件
// ============================================================
export default function BeijingMap({ onMarkerClick }: BeijingMapProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  return (
    <div className="relative w-full mx-auto rounded-xl overflow-hidden 
                    border-4 border-[hsl(30,25%,55%)] shadow-2xl"
         style={{ height: '65vh', minHeight: '500px' }}>
      <MapContainer
        center={[39.916, 116.397]}
        zoom={13}
        scrollWheelZoom={true}
        style={{ height: '100%', width: '100%' }}
        zoomControl={true}
        attributionControl={true}
      >
        <MapController />

        {/* 高德地图瓦片层 */}
        <TileLayer
          attribution='&copy; <a href="https://www.amap.com/">高德地图</a>'
          url="https://webrd0{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}"
          subdomains={['1', '2', '3', '4']}
        />

        {/* 胡同标记点 */}
        {hutongList.map((h) => {
          const isHighlighted = hoveredId === h.id
          const isFeatured = h.id === 'zhuanta'
          const icon = createHutongIcon(isHighlighted, isFeatured)

          return (
            <Marker
              key={h.id}
              position={[h.lat, h.lng]}
              icon={icon}
              eventHandlers={{
                mouseover: () => setHoveredId(h.id),
                mouseout: () => setHoveredId(null),
                click: () => onMarkerClick(h),
              }}
            >
              {/* Tooltip：鼠标悬浮显示小文字框 */}
              <Tooltip
                direction="top"
                offset={[0, -18]}
                permanent={false}
                opacity={1}
                className="hutong-tooltip"
              >
                <div className="text-center">
                  <span className="font-bold text-sm text-[#5A3A1A] font-serif">{h.name}</span>
                </div>
              </Tooltip>
            </Marker>
          )
        })}
      </MapContainer>
    </div>
  )
}

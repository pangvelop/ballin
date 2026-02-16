import { ImageResponse } from 'next/og'

export const dynamic = 'force-static'
export const alt = 'Ballin — 농구 룰 & 연습법 가이드'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #1E293B 0%, #0F172A 100%)',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ fontSize: 120, marginBottom: 16, display: 'flex' }}>🏀</div>
        <div
          style={{
            fontSize: 72,
            fontWeight: 800,
            color: '#F97316',
            marginBottom: 16,
            display: 'flex',
          }}
        >
          Ballin
        </div>
        <div
          style={{
            fontSize: 32,
            color: '#94A3B8',
            display: 'flex',
          }}
        >
          Basketball Rules & Training Guide
        </div>
      </div>
    ),
    { ...size },
  )
}

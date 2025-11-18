export type ImageExt = 'jpg' | 'png' | 'webp'

export interface SequenceConfig {
	baseUrl: string          // напр. /assets/flight
	frames: number           // напр. 180
	ext: ImageExt            // 'jpg' | 'png' | 'webp'
	stopFrames: number[]     // напр. [0, 45, 90, 135]
	zeroPad?: number         // напр. 3 => 000.jpg
	initialFrame?: number
	activeSvgs: ActiveSvgMap
}

export type Box = { w: number; h: number }

export type DrawBox = { dx: number; dy: number; dw: number; dh: number } // px у координатах контейнера

export type ActiveSvgMap = Record<number, string>

export type FlightConfig = SequenceConfig & {
	id: string
}

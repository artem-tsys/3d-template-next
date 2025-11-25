import axios from 'axios'

function serializeParams(obj: Record<string, unknown>): string {
	const params = new URLSearchParams()
	Object.entries(obj).forEach(([k, v]) => {
		if (v == null) return
		if (Array.isArray(v)) v.forEach(x => params.append(k, String(x)))
		else params.append(k, String(v))
	})
	return params.toString()
}

export const http = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL,
	withCredentials: false, // 3rd-party cookies не використовуємо
	paramsSerializer: {
		serialize: serializeParams
	}
})

http.interceptors.request.use((cfg) => {
	if (process.env.partnerId) cfg.headers['X-Partner-Id'] = process.env.partnerId
	return cfg
})

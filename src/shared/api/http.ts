import axios from 'axios'

export const http = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL,
	withCredentials: false, // 3rd-party cookies не використовуємо
})

http.interceptors.request.use((cfg) => {
	if (process.env.partnerId) cfg.headers['X-Partner-Id'] = process.env.partnerId
	return cfg
})

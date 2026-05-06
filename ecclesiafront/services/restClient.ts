
import { isNullOrEmpty } from "@nathanmgalante/n-js-utils";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

interface RequestOptions extends Omit<RequestInit, 'method' | 'body'> {
    params?: Record<string, string | number | undefined>;
    data?: any;
}

async function request(
    endpoint: string,
    method: string,
    options: RequestOptions = {}
): Promise<Response> {
    const { params, data, ...customConfig } = options;

    const url = new URL(`${BASE_URL}${endpoint}`);

    // 1. Filtro de Parâmetros
    if (params) {
        Object.entries(params).forEach(([key, value]) => {
            // Só adiciona ao URLSearchParams se NÃO for nulo ou vazio
            if (!isNullOrEmpty(value)) {
                url.searchParams.append(key, String(value));
            }
        });
    }

    console.log('url: ', url.searchParams);

    // 2. Configuração do Fetch
    const config: RequestInit = {
        ...customConfig,
        method,
        headers: {
            'Content-Type': 'application/json',
            ...customConfig.headers,
        },
        body: data ? JSON.stringify(data) : undefined,
    };

    return fetch(url.toString(), config);
}

export const restClient = {
    get: (endpoint: string, options?: RequestOptions) =>
        request(endpoint, 'GET', options),

    post: (endpoint: string, data?: any, options?: RequestOptions) =>
        request(endpoint, 'POST', { ...options, data }),

    put: (endpoint: string, data?: any, options?: RequestOptions) =>
        request(endpoint, 'PUT', { ...options, data }),

    patch: (endpoint: string, data?: any, options?: RequestOptions) =>
        request(endpoint, 'PATCH', { ...options, data }),

    delete: (endpoint: string, options?: RequestOptions) =>
        request(endpoint, 'DELETE', options),
};
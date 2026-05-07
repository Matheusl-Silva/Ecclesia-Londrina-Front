
import { isNullOrEmpty } from "@nathanmgalante/n-js-utils";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

interface RequestOptions extends Omit<RequestInit, 'method' | 'body'> {
    params?: Record<string, string | number | undefined>;
    data?: any;
}

type RequestInterceptor = (config: RequestInit) => RequestInit;

async function request(
    endpoint: string,
    method: string,
    options: RequestOptions = {},
    interceptor?: RequestInterceptor
): Promise<Response> {
    const { params, data } = options;

    const url = new URL(`${BASE_URL}${endpoint}`);

    if (params) {
        Object.entries(params).forEach(([key, value]) => {
            !isNullOrEmpty(value) && url.searchParams.append(key, String(value));
        });
    }

    let config: RequestInit = {
        method,
        headers: {
            'Content-Type': 'application/json',
        },
        body: data ? JSON.stringify(data) : undefined,
    };

    if (!!interceptor) {
        config = interceptor(config);
    }

    return fetch(url.toString(), config);
}

export const getRestClientInstance = (interceptor?: RequestInterceptor) => ({
    get: (endpoint: string, options?: RequestOptions) =>
        request(endpoint, 'GET', options, interceptor),

    post: (endpoint: string, data?: any, options?: RequestOptions) =>
        request(endpoint, 'POST', { ...options, data }, interceptor),

    put: (endpoint: string, data?: any, options?: RequestOptions) =>
        request(endpoint, 'PUT', { ...options, data }, interceptor),

    patch: (endpoint: string, data?: any, options?: RequestOptions) =>
        request(endpoint, 'PATCH', { ...options, data }, interceptor),

    delete: (endpoint: string, options?: RequestOptions) =>
        request(endpoint, 'DELETE', options, interceptor),
});

export const restClient = {
    public: getRestClientInstance(),
    private: getRestClientInstance((config) => {
        // Posteriormente adicionar autenticação aqui...
        return config;
    })
};

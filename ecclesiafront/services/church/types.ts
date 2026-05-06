export interface Church {
    id: number;
    name: string;
    cnpj: string;
    email: string;
    phone: string;
    created_at: string;
    deleted_at: string | null;
    logoUrl: string;
    complement: string;
    number: number;
    neighborhood: string;
    street: string;
    postal_code: string;
    city: string;
}

export type ChurchList = Church[];
export interface Church {
    id: number;
    name: string;
    cnpj: string;
    email: string;
    phone: string;
    logoUrl: string;
    complement: string;
    number: number;
    neighborhood: string;
    street: string;
    postalCode: string;
    city: string;
}

export type ChurchList = Church[];

export interface CreateChurchPayload {
    name: string;
    cnpj?: string;
    email?: string;
    phone?: string;
    logoUrl?: string;
    street: string;
    number: number;
    complement?: string;
    neighborhood: string;
    postalCode: string;
    city: string;
}

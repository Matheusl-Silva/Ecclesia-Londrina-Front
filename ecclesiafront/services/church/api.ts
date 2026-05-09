import { restClient } from "@/services/restClient";

export const searchChurches = (params: Record<string, string | undefined>) => {
    return restClient.private.get("/church/find", { params });
};

export const getAllNeighborhoods = () => {
    return restClient.private.get("/church/neighborhoods");
};

export const createChurch = (data: {
    name: string;
    cnpj: string;
    email: string;
    phone: string;
    logoUrl: string;
    street: string;
    number: number;
    complement: string;
    neighborhood: string;
    city: string;
    postalCode: string;
}) => {
    return restClient.private.post("/church/create", data);
};

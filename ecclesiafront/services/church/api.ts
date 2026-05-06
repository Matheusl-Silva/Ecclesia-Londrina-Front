import { restClient } from "@/services/restClient";

export const searchChurches = (params: Record<string, string | undefined>) => {
    return restClient.get("/church/find", { params });
};

export const getAllNeighborhoods = () => {
    return restClient.get("/church/neighborhoods");
};
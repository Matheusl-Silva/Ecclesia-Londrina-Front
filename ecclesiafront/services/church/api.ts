import { restClient } from "@/services/restClient";

export const searchChurches = (params: Record<string, string | undefined>) => {
    return restClient.private.get("/church/find", { params });
};

export const getAllNeighborhoods = () => {
    return restClient.private.get("/church/neighborhoods");
};

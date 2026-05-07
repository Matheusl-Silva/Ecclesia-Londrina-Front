import { restClient } from "@/services/restClient";

export const getMassByChurchId = (churchId: number) => {
    return restClient.private.get("/mass/find", { params: { churchId } });
};

export const getConfessionByChurchId = (churchId: number) => {
    return restClient.private.get("/confession/find", { params: { churchId } });
};

export const getAdorationByChurchId = (churchId: number) => {
    return restClient.private.get("/confession/find", { params: { churchId } });
};
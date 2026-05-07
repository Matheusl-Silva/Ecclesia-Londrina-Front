import { restClient } from "@/services/restClient";

export const getMassByChurchId = (churchId: number) => {
    return restClient.get("/mass/find", { params: { churchId } });
};

export const getConfessionByChurchId = (churchId: number) => {
    return restClient.get("/confession/find", { params: { churchId } });
};

export const getAdorationByChurchId = (churchId: number) => {
    return restClient.get("/confession/find", { params: { churchId } });
};
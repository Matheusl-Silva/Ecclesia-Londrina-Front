import { restClient } from "@/services/restClient";

export const getMassByChurchId = (churchId: number) => {
    return restClient.get("/mass/find", { params: { churchId } });
};

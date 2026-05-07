import { restClient } from "@/services/restClient";

export const getSchedules = (churchId: number, type?: string) => {
    return restClient.private.get("/schedule/find", { params: { churchId, type } });
};

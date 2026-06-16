import { restClient } from "@/services/restClient";
import { CreateSchedulePayload } from "./types";

export const getSchedules = (churchId: number, type?: string) => {
    return restClient.private.get("/schedule/find", { params: { churchId, type } });
};

export const createSchedule = (data: CreateSchedulePayload) => {
    return restClient.private.post("/schedule/create", data);
};

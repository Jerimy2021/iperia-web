import { authHandlers } from "./auth";
import { ipercHandlers } from "./iperc";

export const handlers = [...authHandlers, ...ipercHandlers];

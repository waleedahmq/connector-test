import { Route } from "OpenApiRouter";
import { handleHello } from "operations/hello";
import { handleRocketsOne } from "operations/rocketsOne";

export interface Result {
  body?: any;
  status: number;
  headers?: Record<string, string>;
}

export const dispatch = async (route: Route): Promise<Result | null> => {
  switch (route.operation.operationId) {
    case "hello":
      return await handleHello(route);
    case "rocketsOne":
      return await handleRocketsOne(route);
    default:
      return null;
  }
};

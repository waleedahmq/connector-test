import chalk from "chalk";
import { OpenAPI, OpenAPIV3 } from "openapi-types";
import OpenApiParser from "@apidevtools/swagger-parser";
import { OpenApiRouter } from "../OpenApiRouter";

export interface RouteDetail {
  url?: string;
  method?: string;
  parameters?: string[];
}

export const getOpenApiSpec = async (specPath: string) => {
  let spec: OpenAPI.Document<{}> | undefined = undefined;
  try {
    spec = await OpenApiParser.bundle(specPath);
  } catch (error) {
    console.log(
      chalk`{dim ${new Date()
        .toTimeString()
        .substring(0, 8)}} {magenta http} {red ERROR} Missing spec.`
    );
    return;
  }
  return spec as OpenAPIV3.Document;
};

export const getOpenApiRouter = async (specPath: string) => {
  let spec: OpenAPI.Document<{}> | undefined = undefined;
  try {
    spec = await OpenApiParser.bundle(specPath);
  } catch (error) {
    console.log(
      chalk`{dim ${new Date()
        .toTimeString()
        .substring(0, 8)}} {magenta http} {red ERROR} Missing spec.`
    );
    return;
  }
  return new OpenApiRouter(spec as OpenAPIV3.Document);
};

export const getBasePathByOpenApiSpec = (spec: OpenAPIV3.Document): string => {
  if (!spec?.servers?.[0]) {
    throw new Error("Spec not valid, missing server url");
  }

  return spec.servers[0].url;
};

export const getOpenApiRouteDetail = async (specPath: string, operationId: string): Promise<RouteDetail> => {
  // Fetching openApi spec and router for spaceX
  const [spec, router] = await Promise.all([getOpenApiSpec(specPath), getOpenApiRouter(specPath)]);

  if (!router) {
    console.log(
      chalk`{dim ${new Date()
        .toTimeString()
        .substring(0, 8)}} {magenta http} {red ERROR} Missing spec.`
    );
    throw new Error('No valid spec found');
  }

  // Fetching spaceX base url and finding router of our choice
  const baseUrl = getBasePathByOpenApiSpec(spec as OpenAPIV3.Document);
  const routerResult = router.matchByOperationId(operationId);

  // Finding spaceX endpoint method and parameters
  const operation = Object.values(routerResult?.operation as OpenAPIV3.OperationObject);
  const method = operation?.[0] as OpenAPIV3.HttpMethods;

  let parameters = Object.entries(operation?.[1])?.[1]?.[1];
  parameters = parameters.map((p: OpenAPIV3.ParameterObject) => p.name);

  // Creating spaceX endpoint url
  const url = `${baseUrl}${routerResult?.route}`;
  return { method, url, parameters } as RouteDetail;
}
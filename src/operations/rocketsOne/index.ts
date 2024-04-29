import { Result } from "dispatch";
import { Route } from "OpenApiRouter";

import chalk from "chalk";
import path from "path";

import { getOpenApiRouteDetail } from "../../utils/openApi";
import { getOneRocket } from "../../externals/spaceX";

export const handleRocketsOne = async (_route: Route): Promise<Result | null> => {
  const params = Object.values(_route.pathParameters);
  try {
    // Checking params
    if (params?.length < 1) {
      console.log(
        chalk`{dim ${new Date()
          .toTimeString()
          .substring(0, 8)}} {magenta http} {red ERROR} Missing param.`
      );
      throw new Error('No valid rocketId found');
    }

    // Getting spaceX details with OpenApi spec
    const specPath = path.resolve("src/services/spaceX/spec.yml");
    const { method, url, parameters } = await getOpenApiRouteDetail(specPath, _route.operation.operationId as string);

    if (!method || !method.includes('GET')) {
      console.log(
        chalk`{dim ${new Date()
          .toTimeString()
          .substring(0, 8)}} {magenta http} {red ERROR} Missing GET spec.`
      );
      throw new Error('No valid GET spaceX spec found');
    }

    if (!url) {
      console.log(
        chalk`{dim ${new Date()
          .toTimeString()
          .substring(0, 8)}} {magenta http} {red ERROR} Missing GET route.`
      );
      throw new Error('No valid GET spaceX spec found');
    }

    // Processing spaceX endpoint with parameters
    var rocketUrl = url;
    if (parameters) {
      for (let [i, param] of Object.entries(parameters)) {
        rocketUrl = rocketUrl.replace(`{${param}}`, params[parseInt(i)]);
      }
    }

    // Getting formatted rocket information
    const rocket = await getOneRocket(rocketUrl, true);

    return {
      status: 200,
      body: rocket,
    };
  } catch (err) {
    console.log(
      chalk`{dim ${new Date()
        .toTimeString()
        .substring(0, 8)}} {magenta http} {red ERROR} ${err}.`
    );
    throw new Error(err.message || 'Internal server error');
  }
};

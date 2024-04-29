import { Route } from "OpenApiRouter";
import { handleRocketsOne } from ".";

describe("rocketsOne operation", () => {
  it("should return a 200 response", async () => {
    // GIVEN
    const route: Route = {
      route: "/space/rockets/{rocketId}",
      operation: {
        operationId: "rocketsOne",
        responses: {},
      },
      pathParameters: {
        rocketId: "falcon9"
      },
    };

    // WHEN
    const response = await handleRocketsOne(route);

    // THEN
    expect(response).toMatchObject({
      "body": {
        "id": 2,
        "company": "SPACEX",
        "country": "United States",
        "main_image": "https://farm1.staticflickr.com/929/28787338307_3453a11a77_b.jpg",
        "cost_per_launch": {
          "amount": 50000000,
          "currency": "USD"
        }
      }, "status": 200
    });

    expect(response?.body?.company).toEqual('SPACEX');
  });
});

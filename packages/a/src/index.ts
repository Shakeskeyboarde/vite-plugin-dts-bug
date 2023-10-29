import { client } from "b";

/**
 * This represents an "app" which consumes the pre-configured client
 * singleton which was exports with an implicit type from the `b` package.
 */
client.request((response) => {
  console.log(response);
});

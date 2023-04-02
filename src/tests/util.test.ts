import { isEmpty } from "../util/data-service-util";

test("return true if an object is empty", () => {
  const isEmptyObject: Boolean = isEmpty({});
  expect(isEmptyObject).toEqual(true);
});

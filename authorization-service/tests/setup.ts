import { createMockDatabase } from "./mocks/mockDatabase";

export default async function () {
  await createMockDatabase();
}

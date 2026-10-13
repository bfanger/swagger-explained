import type { Handle } from "@sveltejs/kit/hooks";

export const handle: Handle = async (input) => {
  const response = await input.resolve(input.event, {
    filterSerializedResponseHeaders: (name) => name.includes("content-type"),
  });

  return response;
};

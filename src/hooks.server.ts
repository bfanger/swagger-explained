/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
  const response = await resolve(event, {
    filterSerializedResponseHeaders: (name) =>
      name.includes("content-type") as boolean,
  });

  return response as Response;
}

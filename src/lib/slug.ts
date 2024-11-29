export function generateSlug(name: string): string {
  const timestamp = new Date().getTime().toString().slice(-4);
  return `${name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "")}-${timestamp}`;
}

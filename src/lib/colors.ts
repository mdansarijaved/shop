export const backgroundColors = [
  "bg-red-500",
  "bg-blue-500",
  "bg-yellow-500",
  "bg-cyan-500",
  "bg-purple-500",
  "bg-green-500",
  "bg-pink-500",
  "bg-indigo-500",
];

export function getRandomColor(): string {
  const randomIndex = Math.floor(Math.random() * backgroundColors.length);
  return backgroundColors[randomIndex];
}

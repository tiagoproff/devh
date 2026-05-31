export async function typewriter(
  text: string,
  onUpdate: (value: string) => void,
  speed = 300,
) {
  const words = text.split(" ");

  let current = "";

  for (const word of words) {
    current += current === "" ? word : ` ${word}`;

    onUpdate(current);

    await new Promise((resolve) => setTimeout(resolve, speed));
  }
}

import { useState } from 'preact/hooks';

export default function Greeting({ messages }) {
  const randomMessage = () => messages[Math.floor(Math.random() * messages.length)];

  const [greeting] = useState(randomMessage());

  return (
    <div>
      <h1>{greeting}! I’m Tommy Parker — a freelance illustrator based in Devon, UK.</h1>
    </div>
  );
}

import { useState } from 'preact/hooks';

export default function Greeting({ messages, className = '' }) {
  const randomMessage = () => messages[Math.floor(Math.random() * messages.length)];

  const [greeting] = useState(randomMessage());

  return (
    <h1 className={`${className} text-balance max-w-[1000px]`}>{greeting}! <span class="max-w-[12ch]">I’m Tommy Parker</span> — a freelance illustrator.</h1>
  );
}

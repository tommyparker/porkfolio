import { useState } from 'preact/hooks';

export default function Greeting({ messages, class: className = '' }) {
  const randomMessage = () => messages[Math.floor(Math.random() * messages.length)];

  const [greeting] = useState(randomMessage());

  return (
    <h1 class={`max-w-[1000px] ${className}`}>{greeting}! I’m&nbsp;Tommy&nbsp;Parker —&nbsp;a&nbsp;freelance illustrator.</h1>
  );
}

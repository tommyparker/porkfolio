import { useState } from 'preact/hooks';

export default function Greeting({ messages }) {
  const randomMessage = () => messages[Math.floor(Math.random() * messages.length)];

  const [greeting] = useState(randomMessage());

  return (
      <h1 class="max-w-[1024px]">{greeting}! I’m&nbsp;Tommy&nbsp;Parker —&nbsp;a&nbsp;freelance illustrator.</h1>
  );
}

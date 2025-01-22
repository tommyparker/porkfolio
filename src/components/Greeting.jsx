import { useState } from 'react';

export default function Greeting({ messages, className = '' }) {
  const randomMessage = () => messages[Math.floor(Math.random() * messages.length)];

  const [greeting] = useState(randomMessage());

  return (
    <h1 className={`max-w-[1000px] ${className}`}>{greeting}! I’m&nbsp;Tommy&nbsp;Parker —&nbsp;a&nbsp;freelance illustrator.</h1>
  );
}

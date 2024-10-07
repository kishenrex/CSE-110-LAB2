import React, { useState } from 'react';

export function ClickCounter() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount(count + 1);
  };

  return (
    <div>
      <p>Clicks: {count}</p>
      <button onClick={handleClick}>Click me!</button>
    </div>
  );
}


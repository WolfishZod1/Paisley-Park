"use client";

import "./style.scss";

export default function WelcomeMessage({
  text,
  emoji,
}: {
  text: string;
  emoji: string;
}) {
  return (
    <div className="container-message">
      <h3>
        {text}
        <span>{emoji}</span>
      </h3>
    </div>
  );
}

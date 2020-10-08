import React, { useState } from 'react'

const emojis = [
  '💫',
  '⚡️',
  '💌',
  '✏️',
  '📍',
  '❤️',
  '🧬',
  '🕹',
  '📸',
  '⚙️',
  '🎉',
  '🖼',
  '📈',
  '📚',
  '🃏',
  '🎨',
  '🎭',
  '🎮',
  '🎲',
  '🏅',
  '🏆',
  '🏝',
  '🎂',
  '🌏',
  '👥'
]

const totalEmojis = emojis.length

export default function EmojiHover() {
  /* -------------------------------------------------------------------------- */
  /*                          States and their Setters                          */
  /* -------------------------------------------------------------------------- */

  // Sets the emoji as the n-th item in the emojis array, where n is a random
  // number between 0 and emojis.length
  const [emoji, setEmoji] = useState(emojis[Math.floor(Math.random() * totalEmojis)])

  // Holds the interval that is set when the cursor hovers over the emoji,
  // and this is interval is cleared when the cursor stops hovering over the emoji
  const [emojiCycler, setEmojiCycler] = useState(null)

  return (
    <span
      role='img'
      aria-label='emoji'
      onMouseEnter={() => {
        setEmojiCycler(
          setInterval(() => {
            setEmoji(emojis[Math.floor(Math.random() * totalEmojis)])
          }, 200)
        )
      }}
      onMouseLeave={() => {
        clearInterval(emojiCycler)
      }}
    >
      {emoji}
    </span>
  )
}

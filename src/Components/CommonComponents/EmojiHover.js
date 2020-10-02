import React, { useState } from 'react'

export default function EmojiHover() {
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
  const [emoji, setEmoji] = useState(emojis[Math.floor(Math.random() * totalEmojis)])
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

import React, { Component } from 'react'
import TextTransition, { presets } from 'react-text-transition'

const texts = [
  'innovate',
  'inspire',
  'discover',
  'focus',
  'succeed',
  'learn',
  'give',
  'change',
  'grow'
]
const totalTexts = texts.length

export default class TextShuffle extends Component {
  constructor() {
    super()
    this.state = { index: 0 }
  }

  // Taken from https://www.npmjs.com/package/react-text-transition
  componentDidMount() {
    this.timeout = setInterval(() => {
      let currentIdx = this.state.index
      this.setState({ index: currentIdx + 1 })
    }, 2500)
  }

  componentWillUnmount() {
    clearInterval(this.timeout)
  }

  render() {
    return (
      <TextTransition
        text={texts[this.state.index % totalTexts]}
        springConfig={presets.gentle}
        direction='down'
        inline
      />
    )
  }
}

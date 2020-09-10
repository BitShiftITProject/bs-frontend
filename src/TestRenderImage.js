import { Buffer } from 'buffer/'
import React, {Component} from 'react'

const params = {
  Bucket: 'media-storage-bucket12',
  Key: 'test.jpg'
}

class TestRenderImage extends Component {
  constructor() {
    super()
    this.state = {source: null}
  }

  componentDidMount() {
    this.setImageStateBase64();
  }

  async setImageStateBase64() {
    let response = []
  
    await fetch("http://localhost:3000/buckets/media-storage-bucket12/sample.jpg/")
      .then(response => response.json())
      .then(response => {
        let buf = Buffer.from(response.Body.data);
        let base64 = buf.toString('base64');
      
        this.setState({source: "data:image/jpeg;base64," + base64})
      })
      .catch(err => {
        console.log(err)
      })
  }

  render() {
    return (
      <img src={this.state.source} width="35%" height="35%"></img>
    )
  }
}

export default TestRenderImage;
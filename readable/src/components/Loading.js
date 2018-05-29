import React from 'react'
import loading from '../images/loading.gif'
import loadingLine from '../images/loading-line.gif'

const Loading = (props) => (
  <div>
    {props.type && props.type === "line" && (
      <img src={loadingLine} alt="Loading..."/>
    )}
    {!props.type && (
      <img src={loading} alt="Loading..."/>
    )}
  </div>
)

export default Loading

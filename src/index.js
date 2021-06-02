import React, { Fragment } from "react"
import ReactDOM from "react-dom"

import "./styles.css"

const Lang = props => renderer(props)

const Translation = props => {
  const traslations = {
    en: "Hello",
    de: "Halo",
    pl: "Dzień dobry",
  }

  return renderer({
    ...props,
    hello: traslations[props.lng],
  })
}

const renderer = props =>
  typeof props.children === "undefined"
    ? props
    : typeof props.children === "function"
      ? props.children(props)
      : props.children

const PipeProps = ({ children, components, initial }) => {
  const props = components.reduce(
    (previousProps, component, index) => component(previousProps),
    initial
  )
  return children(props)
}

function App() {
  return (
    <Fragment>
      <Translation lng="en">{({ hello }) => `${hello} Ania. `}</Translation>
      <PipeProps initial={{ lng: "pl" }} components={[Lang, Translation]}>
        {({ hello }) => ` ${hello}, Otis`}
      </PipeProps>
    </Fragment>
  )
}

const rootElement = document.getElementById("root")
ReactDOM.render(<App />, rootElement)

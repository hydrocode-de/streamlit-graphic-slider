import React from "react";
import ReactDOM from "react-dom";
import { StreamlitProvider } from "streamlit-component-lib-react-hooks";
import GraphicSlider from "./GraphicSlider";

ReactDOM.render(
  <React.StrictMode>
    <StreamlitProvider>
      <GraphicSlider />
    </StreamlitProvider>
  </React.StrictMode>,
  document.getElementById("root")
)

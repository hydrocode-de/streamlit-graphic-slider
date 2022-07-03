import {
  Streamlit,
  StreamlitComponentBase,
  withStreamlitConnection,
} from "streamlit-component-lib"
import React, { ReactNode } from "react"
import ReactSlider from 'react-slider';
import { createUseStyles } from "react-jss";
import './GraphicSlider.css'

const useStyles = createUseStyles({
  wrapper: {
    width: '100%',
    '& .horizontal-slider': {
      width: '100%',
      minHeight: '100px',
      '& .track': {
        height: '100%',
        backgroundColor: 'black'
      }
    }
  }
})

/**
 * This is a React-based component template. The `render()` function is called
 * automatically when your component should be re-rendered.
 */
class GraphicSlider extends StreamlitComponentBase<{}> {
  
  public render = (): ReactNode => {
    //const classes = useStyles();  
    // Arguments that are passed to the plugin in Python are accessible
    // via `this.props.args`. 
    let bgImg = this.props.args['bgImg'];
    if (!bgImg) {
      // set defaults
      bgImg = [
        "https://www.bwagrar.de/Vorlagen/Webapp/Cache/CMS/10021/4gruenland-jok_NTgzMTQyNlo.JPG",
        "https://bioverita.ch/wp-content/uploads/Winterweizen_Graziaro_Dottenfelderhof.jpg-scaled.jpg?v=1622188883",
        "https://www.kwb.net/fileadmin/_processed_/5/f/csm_Wald-Adobe-KWB_95a21e2cd2.jpg"
      ]
    }

    // calculate the default value
    const defaults = this.props.args['default'] || [60, 20];

    // Streamlit sends us a theme object via props that we can use to ensure
    // that our component has visuals that match the active theme in a
    // streamlit app.
    const { theme } = this.props
    const { base } = theme || {base: 'light'};

    return (
      <div>
        <ReactSlider
          className="horizontal-slider"
          defaultValue={[defaults[0], defaults[0] + defaults[1]]}
          thumbClassName="thumb"
          trackClassName="track"
          renderThumb={this.renderThumb}
          onChange={this.updateValues}
          pearling
        />
      </div>
    )
  }
  private renderThumb = (props: any, sliderState: {index: number, value: number[], valueNow: number}) => {
    // switch the value
    const v = sliderState.index === 0 ? sliderState.valueNow : sliderState.value[1] - sliderState.value[0];
    return <div {...props}>{v}%</div>
  }

  private updateValues = (values: number[], index: number) => {
    // calculate the values
    const nVals = [values[0], values[1] - values[0], 100 - values[1]];
    Streamlit.setComponentValue(nVals);
  }
}

// "withStreamlitConnection" is a wrapper function. It bootstraps the
// connection between your component and the Streamlit app, and handles
// passing arguments from Python -> Component.
//
// You don't need to edit withStreamlitConnection (but you're welcome to!).
export default withStreamlitConnection(GraphicSlider)

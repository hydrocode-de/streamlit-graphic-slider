import React from "react";
import { Streamlit } from "streamlit-component-lib";
import { useRenderData } from "streamlit-component-lib-react-hooks";

import ReactSlider from 'react-slider';
import { createUseStyles } from "react-jss";
//import './GraphicSlider.css'

/**
 * This is a React-based component template. The `render()` function is called
 * automatically when your component should be re-rendered.
 */
const GraphicSlider: React.FC = () => {
  const renderData = useRenderData();

  const renderThumb = (props: any, sliderState: {index: number, value: number[], valueNow: number}) => {
    // switch the value
    const v = sliderState.index === 0 ? sliderState.valueNow : sliderState.value[1] - sliderState.value[0];
    return <div {...props}>{v}%</div>
  }

  const updateValues = (values: number[], index: number) => {
    // calculate the values
    const nVals = [values[0], values[1] - values[0], 100 - values[1]];
    Streamlit.setComponentValue(nVals);
  }


  //const classes = useStyles();  
  let bgImg = renderData.args['bgImg'];
  if (!bgImg) {
    // set defaults
    bgImg = [
      "https://upload.wikimedia.org/wikipedia/commons/3/32/7824Grasslands_in_Santa_Cruz%2C_Laguna_10.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/7/7e/Reife_Weizenaehren.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/8/89/Trees_in_Prince_William_Park_Forest_2.jpg"
    ]
  }

  // calculate the default value
  const defaults = renderData.args['default'] || [60, 20];

  // Streamlit sends us a theme object via props that we can use to ensure
  // that our component has visuals that match the active theme in a
  // streamlit app.
  const { theme } = renderData
  const base  = theme!.base || 'light';

  // get the updateOn handler
  const updateOn = renderData.args['updateOn'] || 'end';

  const useStyles = createUseStyles({
    wrapper: {
      width: '100%',
      '& .horizontal-slider': {
        width: '100%',
        minHeight: '100px',
        '& .track': {
          height: '100%',
          backgroundImage: `url("${bgImg[0]}")`,
          backgroundSize: 'cover',
          zIndex: 0,
          borderRadius: '5px'
        },
        '& .track-0': {
          backgroundImage: `url("${bgImg[1]}")`,
          backgroundSize: 'cover'
        },
        '& .track-1': {
          backgroundImage: `url("${bgImg[2]}")`,
          backgroundSize: 'cover',
        },
        '& .thumb': {
          width: '33px',
          height: '100%',
          backgroundColor: base === 'light' ? 'white' : 'black',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }
      }
    }
  })
  const classes = useStyles();


  return (
    <div className={classes.wrapper}>
      <ReactSlider
        className="horizontal-slider"
        defaultValue={[defaults[0], defaults[0] + defaults[1]]}
        thumbClassName="thumb"
        trackClassName="track"
        renderThumb={renderThumb}
        onChange={updateOn==='change' ?  updateValues : undefined}
        onAfterChange={updateOn==='end' ? updateValues : undefined}
        pearling
      />
    </div>
  )
}

export default GraphicSlider

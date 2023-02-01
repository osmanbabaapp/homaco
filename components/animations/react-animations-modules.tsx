import { bounce, pulse, fadeIn, fadeOut, zoomOut, zoomIn, fadeInRight,  } from "react-animations";
import Radium from "radium";


import { tw } from "twind/css";



interface PropsItem {
    element: any;
  }
  
  const styles = {
    bounce: {
      animation: "x 4s",
      animationName: Radium.keyframes(bounce, "bounce"),
    },
    pulse: {
      animation: "x 2s",
      animationName: Radium.keyframes(pulse, "pulse"),
    },
    fadeIn: {
      animation: "x 2s",
      animationName: Radium.keyframes(fadeIn, "fadeIn"),
    },
    fadeOut: {
      animation: "x 2s",
      animationName: Radium.keyframes(fadeOut, "fadeOut"),
    },
    zoomOut: {
      animation: "x 2s",
      animationName: Radium.keyframes(zoomOut, "zoomOut"),
    },
    zoomIn: {
      animation: "2x 2s",
      animationName: Radium.keyframes(zoomIn, "zoomIn"),
    },
    fadeInRight: {
      animation: "2x 2s",
      animationName: Radium.keyframes(fadeInRight, "fadeInRight"),
    },
  };
  
  export const Bounce = (propsItem: PropsItem) => {
    const { element } = propsItem;
    return (
      <Radium.StyleRoot>
        <div style={styles.bounce as any}>
          {element}
        </div>
      </Radium.StyleRoot>
    );
  };
  
  export const FadeOut = (propsItem: PropsItem) => {
    const { element } = propsItem;
    return (
      <Radium.StyleRoot>
        <div style={styles.fadeOut as any}>
          {element}
        </div>
      </Radium.StyleRoot>
    );
  };
  
  export const ZoomOut = (propsItem: PropsItem) => {
    const { element } = propsItem;
    return (
      <Radium.StyleRoot>
        <div style={styles.zoomOut as any}>
          {element}
        </div>
      </Radium.StyleRoot>
    );
  };

  export const ZoomIn = (propsItem: PropsItem) => {
    const { element } = propsItem;
    return (
      <Radium.StyleRoot>
        <div style={styles.zoomIn as any}>
          {element}
        </div>
      </Radium.StyleRoot>
    );
  };

  export const FadeInRight = (propsItem: PropsItem) => {
    const { element } = propsItem;
    return (
      <Radium.StyleRoot>
        <div style={styles.fadeInRight as any}>
          {element}
        </div>
      </Radium.StyleRoot>
    );
  };
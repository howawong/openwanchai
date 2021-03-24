import React, { PureComponent } from 'react';
import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile
} from "react-device-detect";




class CustomizedContent extends PureComponent {
  text(name, x, y, width, height, max, w, fontSize) {

    console.log("CC", max, w, fontSize);
    var k = w;
    var p = 2;
    if (height <= 30 || width <= 30) {
      return (<text/>);
    } 
    if (width <= (isBrowser ? 70 : 30)) {
      k = 2;
      max = 6;
    }
    if (height <= (isBrowser ? 70 : 30)) {
      k = 8;
      max = 6;
      p = 0;
    }
    if (name.length >= k) {
      if (name.length >= max) {
        name = name.substring(0, max); 
	name = name +  "..";
      }
      return (<text
              x={x + width / 2}
              y={y + height / 2 - Math.floor(name.length / k) * p}
              textAnchor="middle"
              fill="#fff"
              fontSize={fontSize}
            >
              {name.substring(0, k)}
	      <tspan x={x + width / 2} dy="1.0em">{name.substring(k, 2*k)}</tspan>
	      <tspan x={x + width / 2} dy="1.0em">{name.substring(2*k, 3*k)}</tspan>
	      <tspan x={x + width / 2} dy="1.0em">{name.substring(3*k, )}</tspan>
            </text>);

    }
    return (<text
              x={x + width / 2}
              y={y + height / 2 + 7}
              textAnchor="middle"
              fill="#fff"
              fontSize={fontSize}
            >
              {name}
            </text>);

  }
   

  render() {
    const {
      root, depth, x, y, width, height, index, payload, colors, rank, name, max, w, fontSize
    } = this.props;
    return (
      <g>
        <rect
          x={x}
          y={y}
          width={width}
          height={height}
          style={{
            fill: depth < 2 ? colors[index % colors.length] : 'none',
            stroke: '#fff',
            strokeWidth: 2 / (depth + 1e-10),
            strokeOpacity: 1 / (depth + 1e-10),
          }}
        />
        {
          depth === 1 ? (
	    this.text(name, x, y, width, height, max, w, fontSize)
          ) : null
        }
        {
          (depth === 1 && false) ? (
            <text
              x={x + 4}
              y={y + 18}
              fill="#fff"
              fontSize={fontSize}
              fillOpacity={0.9}
            >
              {index + 1}
            </text>
          ) : null
        }
      </g>
    );
  }
}

export default CustomizedContent;

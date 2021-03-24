import React from "react";
import { Treemap, ResponsiveContainer, Tooltip } from "recharts";
import { fetchTreeMap } from "./api";
import CustomizedContent from "./CustomizedContent";


class CustomTreemap extends Treemap {
  constructor(props) {
    super(props);
  }




/*
  renderTooltip() {
      const { children, nameKey } = this.props;
      const tooltipItem = findChildByType(children, Tooltip.displayName);

      if (!tooltipItem) {
        return null;
      }

      const { width, height, dataKey } = this.props;
      const { isTooltipActive, activeNode } = this.state;
      const viewBox = { x: 0, y: 0, width, height };
      const coordinate = activeNode
        ? {
            x: activeNode.x + activeNode.width / 2,
            y: activeNode.y + activeNode.height / 2,
          }
        : null;
      const payload =
        isTooltipActive && activeNode
          ? [
              {
                payload: activeNode,
                name: getValueByDataKey(activeNode, nameKey, ''),
                value: getValueByDataKey(activeNode, NODE_VALUE_KEY),
              },
            ]
          : [];

      return React.cloneElement(tooltipItem as React.DetailedReactHTMLElement<any, HTMLElement>, {
        viewBox,
        active: isTooltipActive,
        coordinate,
        label: '',
        payload,
      });
  $  }*/
}

const data = [
  {
    name: "operator",
    children: [
      {
        name: "distortion",
        children: [
          { name: "BifocalDistortion", size: 4461 },
          { name: "Distortion", size: 6314 }
        ]
      },
      { name: "IOperator", size: 1286 },
      { name: "Operator", size: 2490 },
      { name: "OperatorList", size: 5248 }
    ]
  }
];

const COLORS = ["#C94C27","#005CA5","#ECE211","#00905F","#4BA1D9","#DE9027","#000000","#5CC097","#FABBA3","#8351A1","#ED1E2E","#6DBBE8","#F37651","#6CBE45","#464DA0","#EE4297","#CBC397","#D5A7CD","#C15F97"];


const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    console.log(payload);
    return (
      <div className="custom-tooltip">
        <p className="label">{`${payload[0].payload.name} : ${payload[0].value}`}</p>
      </div>
    );
  }

  return null;
};


export default class TreeMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {result: [], organizations: [], year: -1};
  }

  changeYear(year) {
    this.setState({...this.state, year: year}, () => {
      this.getData();}
    )
  }

  getData() {
    fetchTreeMap(this.state.year).then(j => {
      this.setState({...this.state, result: j.result, organizations: j.organizations});
    });
 
  }

  componentDidMount() {
    this.getData();
  }



  render() {
    const { result } = this.state;
    return (
      <ResponsiveContainer width={this.props.width} height={this.props.height}>
        <CustomTreemap
          data={result}
          dataKey="amount"
          ratio={3 / 10}
          content={<CustomizedContent colors={COLORS} max={this.props.max ?? 12} w={this.props.w ?? 5} fontSize={this.props.fontSize ?? 14}/>}
        >
        <Tooltip  content={<CustomTooltip />} />
	</CustomTreemap>
       </ResponsiveContainer>
    );
  }
}

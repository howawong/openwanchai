import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  Label,
  LabelList
} from "recharts";

import { fetchStackedBarChart } from "./api";

const renderCustomizedLabel = (props) => {
  const { content, ...rest } = props;
  const { value, name, width } = props;
  if  ( width < 50) {
    return (<span></span>);
  }
  return <Label {...rest} fontSize="12" fill="#fff" fontWeight="Bold" />;
};

export default class StackedBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {result: [], committees: []}
  }

  componentDidMount() {
    fetchStackedBarChart().then(j => {
      console.log(j);
      this.setState({result: j.result, committees: j.committees});
    
    });
  }


  render() {
    const { result, committees } = this.state;
    result.forEach(r => {r["name"] = r["name"].toString();  });
    const colors = [
        "#999999",
	"#005CA5",
	"#ECE211",
	"#00905F",
	"#4BA1D9",
	"#DE9027",
	"#FABBA3",
	"#8351A1",
	"#ED1E2E",
	"#6DBBE8",
	"#F37651",
	"#6CBE45",
	"#D5A7CD",
	"#C15F97",

    ]
    const bars = committees.map((c, i) => (
      <Bar dataKey={c} fill={colors[i]} stackId="a">
	<LabelList dataKey={c} position="center" content={c => renderCustomizedLabel(c)} />
      </Bar>));
    console.log(result);

    return (
      <div className="content c-white">
        <ResponsiveContainer height={this.props.height} width={this.props.width}>
          <BarChart
	    margin={{left:-30}}
            layout="vertical"
            data={result}
          >
            <XAxis hide type="number" />
            <YAxis
              type="category"
              dataKey="name"
              stroke="#ffffff"
            />
            <Tooltip />
	    {bars}
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  }
}


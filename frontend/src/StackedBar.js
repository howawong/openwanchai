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
  
  return <Label {...rest} fontSize="8" fill="#FFFFFF" fontWeight="Bold" />;
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
      "#FA8072",
      "#EEE8AA", 
      "#90EE90",
      "#20B2AA",
      "#00BFFF",
      "#483D8B",
      "#9932CC",
      "#DCDCDC",
      "#32CD32",
      "#4169E1",
      "#B0C4DE",
      "#FFFFE0",
      "#BC8F8F",
      "#A0522D",
    ]
    const bars = committees.map((c, i) => (
      <Bar dataKey={c} fill={colors[i]} stackId="a">
	<LabelList dataKey={c} position="center" content={renderCustomizedLabel} />
      </Bar>));
    console.log(result);

    return (
      <div className="content c-white">
        <h1>&nbsp;&nbsp;&nbsp;&nbsp;</h1>
        <ResponsiveContainer height={250} width={800}>
          <BarChart
            layout="vertical"
            data={result}
            stackOffset="expand"
          >
            <XAxis hide type="number" />
            <YAxis
              type="category"
              dataKey="name"
              stroke="#000000"
            />
            <Tooltip />
	    {bars}
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  }
}


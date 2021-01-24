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

const renderCustomizedLabel = (props) => {
  const { content, ...rest } = props;

  return <Label {...rest} fontSize="12" fill="#FFFFFF" fontWeight="Bold" />;
};

export default class StackedBar extends React.Component {
  render() {
    const data = [
      { name: "社區參與", completed: 230, failed: 335, inprogress: 453 },
      { name: "聯誼", completed: 335, failed: 330, inprogress: 345 },
      {
        name: "教學及訓練",
        completed: 537,
        failed: 243,
        inprogress: 2110
      },
      {
        name: "小型工程",
        completed: 132,
        failed: 328,
        inprogress: 540
      },
      {
        name: "直接服務",
        completed: 530,
        failed: 145,
        inprogress: 335
      },
      { name: "研究", completed: 538, failed: 312, inprogress: 110 }
    ];

    return (
      <div className="content c-white">
        <h1>&nbsp;&nbsp;&nbsp;&nbsp;</h1>
        <ResponsiveContainer height={250} width={300}>
          <BarChart
            layout="vertical"
            data={data}
            stackOffset="expand"
          >
            <XAxis hide type="number" />
            <YAxis
              type="category"
              dataKey="name"
              stroke="#000000"
              fontSize="12"
            />
            <Tooltip />
            <Bar dataKey="failed" fill="#dd7876" stackId="a">
              <LabelList
                dataKey="failed"
                position="center"
                content={renderCustomizedLabel}
              />
            </Bar>
            <Bar dataKey="completed" fill="#82ba7f" stackId="a">
              <LabelList
                dataKey="completed"
                position="center"
                content={renderCustomizedLabel}
              />
            </Bar>
            <Bar dataKey="inprogress" fill="#76a8dd" stackId="a">
              <LabelList
                dataKey="inprogress"
                position="center"
                content={renderCustomizedLabel}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  }
}


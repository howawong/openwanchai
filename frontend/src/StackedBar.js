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
    const colors = {
        "社區建設委員會":"#999999", //gray
	"維多利亞公園農曆燈飾工程工作小組":"#005CA5", //blue
	"康樂及體育工作小組":"#ECE211", //yellow
	"衞生健康活力城推廣委員會": "#00905F", //dark green
	"發展、規劃及交通委員會":"#4BA1D9", //pink blue
	"地區工程及設施管理委員會": "#DE9027", //orange
	"開放灣仔區議會工作小組":"#FABBA3", //orange lighter
	"文化及康體事務委員會":"#8351A1", //dark purple
	"撥款及財務委員會": "#ED1E2E", //red
	"食物及環境衞生委員會": "#6DBBE8", //  blue 
	"撥款及常務委員會": "#F37651", //orange
	"社區建設及房屋事務委員會":"#6CBE45", // green light
	"藝術文化活動專項撥款工作小組":"#D5A7CD", //purple light
	"灣仔區休憩用地設施及需求研究工作小組":"#C15F97", //dark purple 2
	"灣仔區公共空間及公園研究工作小組": "#FF99FF",
	"慶祝中華人民共和國成立七十周年活動工作小組": "#FF0000",
	"製作第五屆灣仔區議會宣傳海報工作小組": "#ECE211",

    }
    const bars = committees.map((c, i) => (
      <Bar key={i} dataKey={c} fill={colors[c] ?? "#000000"} stackId="a">
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


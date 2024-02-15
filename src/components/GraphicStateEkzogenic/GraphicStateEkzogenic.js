import React, { useEffect } from "react";
import './GraphicStateEkzogenic.css';
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import am5locales_ru_RU from "@amcharts/amcharts5/locales/ru_RU";

function GraphicStateEkzogenic(props) {
  am5.addLicense("AM5C123456");

  const [data, setData] = React.useState([]);

  useEffect(() => {
    let date = new Date(props.year, props.month, 0);
    date.setHours(0, 0, 0, 0);
    let value = 0;

    let arrCount = new Array(31);

    function generateData(count) {
      am5.time.add(date, "day", 1);

      props.dayCountEkzogenic.forEach((item, i) => {
        if (Intl.DateTimeFormat('ru').format(item.date) === date.toLocaleDateString()) {
          return arrCount[count] = item.count;
        }
      })

      value = arrCount[count] === undefined ? 0 : arrCount[count];
      return {
        date: date.getTime(),
        value: Math.floor(value / 3),
      };
    }

    function generateDatas(count) {
      let data = [];
      for (let i = 0; i < count; i++) {
        data.push(generateData(i));
      }
      return data;
    }

    setData(generateDatas(31));
  }, [props.year, props.month, props.dayCountEkzogenic])

  useEffect(() => {
    let root = am5.Root.new("chart-div");

    root.locale = am5locales_ru_RU;

    root.setThemes([
      am5themes_Animated.new(root)
    ]);

    let chart = root.container.children.push(am5xy.XYChart.new(root, {
      panX: false,
      panY: false,
      wheelX: "panX",
      wheelY: "zoomX"
    }));

    let cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
      behavior: "zoomX"
    }));
    cursor.lineY.set("visible", false);

    let xAxis = chart.xAxes.push(am5xy.DateAxis.new(root, {
      maxDeviation: 0,
      baseInterval: {
        timeUnit: "day",
        count: 1
      },
      renderer: am5xy.AxisRendererX.new(root, {
        minGridDistance: 15,
      }),
      tooltip: am5.Tooltip.new(root, {})
    }));

    xAxis.get("dateFormats")["day"] = "dd";

    let yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
      min: 0,
      max: 100,
      renderer: am5xy.AxisRendererY.new(root, {})
    }));

    let series = chart.series.push(am5xy.ColumnSeries.new(root, {
      name: "Series",
      xAxis: xAxis,
      yAxis: yAxis,
      valueYField: "value",
      valueXField: "date",
      tooltip: am5.Tooltip.new(root, {
        labelText: "{valueY}"
      })
    }));

    series.columns.template.setAll({ strokeOpacity: 0 })

    chart.set("scrollbarX", am5.Scrollbar.new(root, {
      orientation: "horizontal"
    }));

    series.data.setAll(data);

    series.columns.template.adapters.add("fill", function (fill, target) {
      if (target.dataItem.get("valueY") >= 80) {
        return am5.color(0xb30000);
      } else if (target.dataItem.get("valueY") < 80 && target.dataItem.get("valueY") > 50) {
        return am5.color(0xFFA500);
      }
      return fill;
    });

    series.appear(1000);
    chart.appear(1000, 100);

    return () => {
      root.dispose();
    }
  }, [data])

  return (
    <div id="chart-div"></div>
  )
}

export default GraphicStateEkzogenic;
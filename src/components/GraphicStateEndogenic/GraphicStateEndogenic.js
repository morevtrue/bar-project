import React, { useRef, useLayoutEffect } from "react";
import './GraphicStateEndogenic.css';
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

function GraphicStateEndogenic(props) {
  useLayoutEffect(() => {
    let root = am5.Root.new("chart-div-endogenic");

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

    let date = new Date();
    date.setHours(0, 0, 0, 0);
    let value = 5;

    function generateData() {
      value = Math.round(value); //подсчет дневных значений
      am5.time.add(date, "day", 1);
      return {
        date: date.getTime(),
        value: value
      };
    }

    function generateDatas(count) {
      let data = [];
      for (let i = 0; i < count; ++i) {
        data.push(generateData());
      }
      return data;
    }

    let xAxis = chart.xAxes.push(am5xy.DateAxis.new(root, {
      maxDeviation: 0,
      baseInterval: {
        timeUnit: "day",
        count: 1
      },
      renderer: am5xy.AxisRendererX.new(root, {
        minGridDistance: 30
      }),
      tooltip: am5.Tooltip.new(root, {})
    }));

    let yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
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

    let data = generateDatas(30);
    series.data.setAll(data);

    series.appear(1000);
    chart.appear(1000, 100);

    return () => {
      root.dispose();
    }
  }, [])

  return (
    <div id="chart-div-endogenic"></div>
  )
}

export default GraphicStateEndogenic;
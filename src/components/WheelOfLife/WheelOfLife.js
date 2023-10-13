import React, { useRef, useLayoutEffect } from "react";
import './WheelOfLife.css';
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import * as am5radar from '@amcharts/amcharts5/radar';
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

function WheelOfLife(props) {
  useLayoutEffect(() => {
    let root = am5.Root.new("chartdiv");

    root.setThemes([
      am5themes_Animated.new(root)
    ]);

    let chart = root.container.children.push(am5radar.RadarChart.new(root, {
      panX: false,
      panY: false,
      wheelX: "panX",
      wheelY: "zoomX"
    }));

    let xRenderer = am5radar.AxisRendererCircular.new(root, {});
    xRenderer.labels.template.setAll({
      radius: 5
    });

    let xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
      maxDeviation: 0,
      categoryField: "category",
      renderer: xRenderer,
      tooltip: am5.Tooltip.new(root, {})
    }));

    let yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
      min: 0,
      max: 5,
      renderer: am5radar.AxisRendererRadial.new(root, {
        minGridDistance: 30
      })
    }));

    yAxis.get("renderer").labels.template.set("forceHidden", true);

    let series = chart.series.push(am5radar.RadarColumnSeries.new(root, {
      xAxis: xAxis,
      yAxis: yAxis,
      valueYField: "value",
      categoryXField: "category"
    }));

    series.columns.template.setAll({
      tooltipText: "{categoryX}: {valueY}",
      templateField: "columnSettings",
      strokeOpacity: 0,
      width: am5.p100
    });

    let data = [{
      category: "Раздражительность",
      value: props.irritabillity,
      columnSettings: {
        fill: chart.get("colors").next()
      }
    }, {
      category: "Мания",
      value: props.mania,
      columnSettings: {
        fill: chart.get("colors").next()
      }
    }, {
      category: "Тревожность",
      value: props.anxiety,
      columnSettings: {
        fill: chart.get("colors").next()
      }
    }, {
      category: "Паника",
      value: props.panic,
      columnSettings: {
        fill: chart.get("colors").next()
      }
    }, {
      category: "Уныние",
      value: props.despondency,
      columnSettings: {
        fill: chart.get("colors").next()
      }
    }, {
      category: "Депрессия",
      value: props.depression,
      columnSettings: {
        fill: chart.get("colors").next()
      }
    }];

    series.data.setAll(data);
    xAxis.data.setAll(data);

    series.appear(1000);
    chart.appear(1000, 100);

    return () => {
      root.dispose();
    }
  }, [])

  return (
    <div id="chartdiv" className={`wheel-of-life ${props.isStat ? 'wheel-of-life_type_stat' : ''}`}></div>
  )
}

export default WheelOfLife;
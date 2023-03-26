import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { useSelector, useDispatch } from "react-redux";
import styles from "./Visuals.module.css";
import "./../../App.css";
import { PieChart } from "./PieChart";
import { selectStack } from "../stack/stackSlice";

export function Visuals() {
  const Stack = useSelector(selectStack);
  const svgSize = 200;
  const sandwichHeight = 300;
  const center = svgSize / 2;
  const innerRadius = 0;
  const outerRadius = svgSize / 2 + 25;

  useEffect(() => {
    drawPie("pie");
    drawSandwich("sandwich");
  }, [Stack]);

  function drawPie(containerId) {
    // Remove the old chart
    d3.select(`#${containerId}`).select("svg").remove();

    // Remove the old tooltip
    d3.select(`#${containerId}`).select(".tooltip").remove();

    const data = [
      { label: "Anode CC", value: Stack.anodeCC.mass },
      { label: "Anode", value: Stack.anode.dryMass - Stack.anodeCC.mass },
      {
        label: "Electrolyte",
        value:
          Stack.anode.wetMass -
          Stack.anode.dryMass +
          Stack.cathode.wetMass -
          Stack.cathode.dryMass,
      },
      {
        label: "Separator",
        value: Stack.separator.massLoading * Stack.area * 1e-6,
      },
      { label: "Cathode", value: Stack.cathode.dryMass - Stack.cathodeCC.mass },
      { label: "Cathode CC", value: Stack.cathodeCC.mass },
    ];
    const margin = {
      top: 40,
      right: 40,
      bottom: 40,
      left: 40,
    };

    const yMinValue = d3.min(data, (d) => d.value);
    const yMaxValue = d3.max(data, (d) => d.value);

    const colorScale = d3
      .scaleSequential()
      .interpolator(d3.interpolateCool)
      .domain([yMinValue, yMaxValue]);

    d3.select(`#${containerId}`)
      .style("width", `${svgSize + margin.right + margin.left}px`)
      .style("height", `${svgSize + margin.top + margin.bottom}px`);

    const svg = d3
      .select(`#${containerId}`)
      .append("svg")
      .attr("width", svgSize + margin.left + margin.right)
      .attr("height", svgSize + margin.top + margin.bottom);

    const g = svg.append("g");

    g.attr("class", "sectors").attr(
      "transform",
      `translate(${center + margin.left}, ${center + margin.top})`
    );

    const arcGeneral = d3
      .arc()
      .innerRadius(innerRadius || 0)
      .outerRadius(outerRadius);

    const arcHover = d3
      .arc()
      .innerRadius(innerRadius || 0)
      .outerRadius(outerRadius + 10);

    const pie = d3
      .pie()
      .padAngle(0)
      .value((d) => d.value);

    const arc = g.selectAll("pie").data(pie(data)).enter().append("g");

    // Append tooltip
    const tooltip = d3
      .select(`#${containerId}`)
      .append("div")
      .attr("class", "tooltip")
      .style("opacity", 0)
      .style("font-size", "12px");
    // .attr("transform", `translate(${svgSize / 2}px, ${svgSize / 2}px)`);

    arc
      .append("path")
      .attr("d", arcGeneral)
      .style("fill", (d) => colorScale(d.data.value))
      .style("stroke", "#ffffff")
      .style("stroke-width", 2)
      .on("mouseover", (event, d) => {
        d3.select(event.currentTarget)
          .transition()
          .duration(300)
          .attr("d", arcHover);
        tooltip.transition().duration(300).style("opacity", 0.9);
        tooltip.html(`${d.data.label}: ${d.data.value.toPrecision(3)} mg`);
      })
      .on("mouseout", (event, d) => {
        if (event.target.parentNode !== event.relatedTarget.parentNode) {
          d3.select(event.currentTarget)
            .transition()
            .duration(300)
            .attr("d", arcGeneral);
          tooltip.transition().duration(300).style("opacity", 0);
        }
      });

    const label = d3.arc().outerRadius(outerRadius).innerRadius(0);
    const text = arc
      .append("text")
      .attr("text-anchor", "middle")
      .attr("alignment-baseline", "middle")
      .text((d) => d.data.label)
      .style("fill", "#ffffff")
      .style("font-size", "12px");
    text.attr("transform", (d) => {
      const [x, y] = label.centroid(d);
      var rotation =
        d.endAngle < Math.PI
          ? ((d.startAngle / 2 + d.endAngle / 2) * 180) / Math.PI
          : ((d.startAngle / 2 + d.endAngle / 2 + Math.PI) * 180) / Math.PI;
      return `translate(${x}, ${y}) rotate(-90) rotate(${rotation})`;
    });
    const labelsData = [];
    text.each((d, i, texts) => {
      labelsData.push({
        el: texts[i],
        centroid: label.centroid(d),
        startAngle: d.startAngle,
        endAngle: d.endAngle,
      });
    });
  }

  function drawSandwich(containerId) {
    // Remove the old chart
    d3.select(`#${containerId}`).select("svg").remove();

    // Remove the old tooltip
    d3.select(`#${containerId}`).select(".tooltip").remove();

    const data = [
      { label: "Anode CC", value: Stack.anodeCC.thickness },
      {
        label: "Anode",
        value: Stack.anode.totalThickness - Stack.anodeCC.thickness,
      },
      {
        label: "Separator",
        value: Stack.separator.thickness,
      },
      {
        label: "Cathode",
        value: Stack.cathode.totalThickness - Stack.cathodeCC.thickness,
      },
      { label: "Cathode CC", value: Stack.cathodeCC.thickness },
    ];

    const margin = {
      top: 40,
      right: 40,
      bottom: 0,
      left: 40,
    };

    const yMinValue = 0;
    const yMaxValue = d3.sum(data, (d) => d.value);

    data[0].y = 0;
    for (let i = 1; i < data.length; i++) {
      data[i].y =
        data[i - 1].y + (data[i - 1].value * sandwichHeight) / yMaxValue;
    }

    const colorScale = d3
      .scaleSequential()
      .interpolator(d3.interpolateCool)
      .domain([d3.min(data, (d) => d.value), d3.max(data, (d) => d.value)]);

    d3.select(`#${containerId}`)
      .style("width", `${svgSize + margin.right + margin.left}px`)
      .style("height", `${sandwichHeight + margin.top + margin.bottom}px`);

    const svg = d3
      .select(`#${containerId}`)
      .append("svg")
      .attr("width", svgSize + margin.left + margin.right)
      .attr("height", sandwichHeight + margin.top + margin.bottom);

    const g = svg.append("g");

    // g.attr("class", "sectors").attr(
    //   "transform",
    //   `translate(${center + margin.left}, ${center + margin.top})`
    // );

    const tooltip = d3
      .select(`#${containerId}`)
      .append("div")
      .attr("class", "tooltip")
      .style("opacity", 0)
      .style("font-size", "12px");

    const sandwich = g.selectAll().data(data).enter().append("g");

    const slice = sandwich
      .append("rect")
      .attr("x", margin.left)
      .attr("y", function (d) {
        return d.y;
      })
      .attr("width", function (d) {
        return svgSize;
      })
      .attr("height", function (d) {
        return (d.value * sandwichHeight) / yMaxValue;
      });

    slice
      .style("fill", (d) => colorScale(d.value))
      .style("stroke", "#ffffff")
      .style("stroke-width", 1)
      .on("mouseover", (event, d) => {
        d3.select(event.currentTarget)
          .transition()
          .duration(300)
          .attr("width", svgSize - 10)
          .attr("height", (d.value * sandwichHeight) / yMaxValue - 10)
          .attr("x", margin.left + 5)
          .attr("y", d.y + 5);
        tooltip.transition().duration(300).style("opacity", 0.9);
        tooltip.html(`${d.label}: ${d.value.toPrecision(3)}µm`);
      })
      .on("mouseout", (event, d) => {
        if (event.target.parentNode !== event.relatedTarget.parentNode) {
          d3.select(event.currentTarget)
            .transition()
            .duration(300)
            .attr("width", svgSize)
            .attr("height", (d.value * sandwichHeight) / yMaxValue)
            .attr("x", margin.left)
            .attr("y", d.y);
          tooltip.transition().duration(300).style("opacity", 0);
        }
      });

    const text = sandwich
      .append("text")
      .attr("text-anchor", "middle")
      .attr("alignment-baseline", "middle")
      .text((d) => d.label)
      .style("fill", "#ffffff")
      .style("font-size", "12px")
      .attr("x", margin.left + svgSize / 2)
      .attr("y", (d) => d.y + (d.value * sandwichHeight) / yMaxValue / 2);
  }

  return (
    <div>
      <div className="container">
        <div className="box-12 vertical-align-parent">
          <div id={"sandwich"} className={styles.chartBox} />
          <div id={"pie"} className={styles.chartBox} />
        </div>
      </div>
    </div>
  );
}

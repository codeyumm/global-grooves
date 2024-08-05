import React, { useLayoutEffect } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5map from "@amcharts/amcharts5/map";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import am5geodata_worldLow from "@amcharts/amcharts5-geodata/worldLow";
import { useRouter } from "next/router";
import countryList from "country-json/src/country-by-abbreviation.json";

function GlobeMap({ onCountryClick }) {
  const router = useRouter();

  const getCountryName = (code) => {
    const country = countryList.find(
      (c) => c["abbreviation"] === code.toUpperCase()
    );
    return country ? country["country"] : null;
  };

  useLayoutEffect(() => {
    let root = am5.Root.new("chartdiv");

    root.setThemes([am5themes_Animated.new(root)]);

    // Create a map chart
    let chart = root.container.children.push(
      am5map.MapChart.new(root, {
        projection: am5map.geoOrthographic(),
        mapInteractionsEnabled: true,
        panX: "rotateX",
        panY: "rotateY",
        panBehavior: "rotateLongLat",
        wheelY: "zoom",
        paddingBottom: 20,
        paddingTop: 20,
        paddingLeft: 20,
        paddingRight: 20,
      })
    );

    // Add series for water (ocean)
    let waterSeries = chart.series.push(
      am5map.MapPolygonSeries.new(root, {})
    );

    waterSeries.mapPolygons.template.setAll({
      fill: am5.color(0x29A5D0), // Light blue for water
      fillOpacity: 1,
      strokeOpacity: 0,
    });

    waterSeries.data.push({
      geometry: am5map.getGeoRectangle(90, 180, -90, -180),
    });

    // Add polygon series for countries (land)
    let polygonSeries = chart.series.push(
      am5map.MapPolygonSeries.new(root, {
        geoJSON: am5geodata_worldLow,
      })
    );

    polygonSeries.mapPolygons.template.setAll({
      tooltipText: "{name}",
      toggleKey: "active",
      interactive: true,
      stroke: am5.color(0x000000), // Black borders for clarity
      strokeWidth: 0.5,
      fill: am5.color(0x98FB98), // Pale green for land
      fillOpacity: 1,
    });

    polygonSeries.mapPolygons.template.states.create("hover", {
      fill: am5.color(0xF66742), // hover state color
    });

    polygonSeries.mapPolygons.template.events.on("click", function (ev) {
      const countryCode = ev.target.dataItem.dataContext.id;
      const countryName = getCountryName(countryCode);
      if (onCountryClick) {
        onCountryClick(countryName);
      } else {
        router.push(`/country/${countryName}`);
      }
    });

    chart.animate({
      key: "rotationX",
      from: 0,
      to: 360,
      duration: 20000,
      loops: Infinity,
    });

    return () => {
      root.dispose();
    };
  }, [router]);

  return <div className="earth-container"><div id="chartdiv" style={{ width: "50%", height: "560px" }}></div></div>;
}

export default GlobeMap;

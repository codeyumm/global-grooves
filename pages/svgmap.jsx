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

    let polygonSeries = chart.series.push(
      am5map.MapPolygonSeries.new(root, {
        geoJSON: am5geodata_worldLow,
      })
    );

    polygonSeries.mapPolygons.template.setAll({
      tooltipText: "{name}",
      toggleKey: "active",
      interactive: true,
      stroke: am5.color(0x007EA7),
      strokeWidth: 0.5,
      fill: am5.color(0x7BAFC0),
      fillOpacity: 1,
    });

    polygonSeries.mapPolygons.template.states.create("hover", {
      fill: am5.color(0xF66742)
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

    const backgroundSeries = chart.series.push(
      am5map.MapPolygonSeries.new(root, {})
    );
    backgroundSeries.mapPolygons.template.setAll({
      fill: root.interfaceColors.get("alternativeBackground"),
      fillOpacity: 0.1,
      strokeOpacity: 0,
    });
    backgroundSeries.data.push({
      geometry: am5map.getGeoRectangle(90, 180, -90, -180),
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

  return <div id="chartdiv" style={{ width: "100%", height: "560px" }}></div>;
}

export default GlobeMap;

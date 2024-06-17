import { VectorMap } from "@react-jvectormap/core";
import { worldMill } from "@react-jvectormap/world";
import { colorScale, countries } from "./Countries";
import React from "react";
import countryList from "country-json/src/country-by-abbreviation.json"; // Import countryList

function WorldMap({ onCountryClick }) {
  // Function to get full country name from country code
  const getCountryName = (code) => {
    const country = countryList.find((c) => c["abbreviation"] === code.toUpperCase());
    return country ? country["country"] : null;
  };

  return (
    <div style={{ margin: "auto", width: "700px", height: "600px" }}>
      <VectorMap
        map={worldMill}
        containerStyle={{
          width: "700px",
          height: "600px",
        }}
        backgroundColor="#282c34"
        series={{
          regions: [
            {
              scale: colorScale,
              values: countries,
            },
          ],
        }}
        onRegionClick={(event, code) => {
          const countryName = getCountryName(code);
          onCountryClick(countryName); // Pass the full country name to the callback
        }}
      />
    </div>
  );
}

export default WorldMap;

import "./App.css";
import { useEffect, useState } from "react";
import Infobox from "./Header";
import Map from "./map";
import Table from "./Table";
import { sortData, prettyPrintStat } from "./util";
import LineGraph from "./LineGraph";
import "leaflet/dist/leaflet.css";
import {
  MenuItem,
  FormControl,
  Select,
  Card,
  CardContent,
} from "@material-ui/core";
// https://disease.sh/v3/covid-19/countries
function App() {
  const [countries, seCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [mapCenter, setMapCenter] = useState({ lat: 0, lng: 0 });
  const [mapZoom, setMapZoom] = useState(2);
  const [mapCountries, setMapCountries] = useState([]);
  const [casesType, setCasesType] = useState("cases");
  useEffect(() => {
    //async Request
    const geCountriesData = async () => {
      await fetch(" https://disease.sh/v3/covid-19/countries")
        .then((respones) => respones.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }));
          console.log(mapCenter);
          const sortedData = sortData(data);
          setMapCountries(data);
          setTableData(sortedData);
          seCountries(countries);
        });
      console.log(countries);
    };
    geCountriesData();
  }, []);
  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
      });
  }, []);
  useEffect(() => {
    setMapZoom(2);
    setMapCenter({ lat: 0, lng: 0 });
  }, [country == "worldwide"]);
  const onCountryChange = async (e) => {
    const countryCode = e.target.value;

    setCountry(countryCode);
    const url =
      countryCode === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
        setMapCenter(
          data.countryInfo == undefined
            ? [0, 0]
            : [data.countryInfo.lat, data.countryInfo.long]
        );
        setMapZoom(5);
      });
  };
  return (
    <div className="App">
      <div className="app__left">
        <div className="app__header">
          <h1>COVID-19 TRACKER</h1>
          <FormControl className="app__dropdown">
            <Select
              variant="outlined"
              onChange={onCountryChange}
              value={country}
            >
              <MenuItem value="worldwide">Worldwide</MenuItem>
              {countries.map((country) => (
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))}
              {/* <MenuItem value="worldwide">Worldwide</MenuItem>
            <MenuItem value="worldwide">Worldwide</MenuItem>
            <MenuItem value="worldwide">Worldwide</MenuItem>
            <MenuItem value="worldwide">Worldwide</MenuItem> */}
            </Select>
          </FormControl>
        </div>
        <div className="app__stats">
          <Infobox
            isRed
            active={casesType === "cases"}
            onClick={(e) => setCasesType("cases")}
            title="Coronavirus Cases"
            title2="Today:"
            cases={prettyPrintStat(countryInfo.cases)}
            today={prettyPrintStat(countryInfo.todayCases)}
          />
          <Infobox
            isGreen
            active={casesType === "recovered"}
            onClick={(e) => setCasesType("recovered")}
            title="Recovered"
            title2="Today:"
            cases={prettyPrintStat(countryInfo.recovered)}
            today={prettyPrintStat(countryInfo.todayRecovered)}
          />
          <Infobox
            isRed
            active={casesType === "deaths"}
            onClick={(e) => setCasesType("deaths")}
            title="Deaths"
            title2="Today:"
            cases={prettyPrintStat(countryInfo.deaths)}
            today={prettyPrintStat(countryInfo.todayDeaths)}
          />
        </div>
        <Map
          casesType={casesType}
          countries={mapCountries}
          center={mapCenter}
          zoom={mapZoom}
        />
      </div>
      <div>
        <Card className="app__right">
          <CardContent>
            <h3>Live Cases by Country</h3>
            <Table countries={tableData}></Table>
            <h3>Worldwde New Cases</h3>
            <LineGraph />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default App;

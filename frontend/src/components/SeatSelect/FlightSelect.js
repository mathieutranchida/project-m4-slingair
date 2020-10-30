import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { themeVars } from "../GlobalStyles";

const FlightSelect = ({ handleFlightSelect }) => {
  const [flights, setFlights] = useState([]);

  useEffect(() => {
    fetch(`/flights`, {
      method: "GET",
      headers: {
        "Content-Type": "application.json"
      }
    }) 
    .then((res) => res.json())
    .then((data) => setFlights(data.flights))
  }, []);

  return (
    <Wrapper>
      <label htmlFor="flight">Flight Number :</label>
      <DropdownButton id="flight" onChange={handleFlightSelect} defaultValue="Choose">
        <DropdownMenuItem value="Choose" disabled>Choose a flight:</DropdownMenuItem>
        {flights.map((flight) => {
          return <DropdownMenuItem value={flight}>{flight}</DropdownMenuItem>
        })}
      </DropdownButton>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background: ${themeVars.cadmiumRed};
  height: 80px;
  display: flex;
  align-items: center;
  padding: ${themeVars.pagePadding};
  margin-bottom: ${themeVars.pagePadding};
`;

const DropdownButton = styled.select`
  margin-top: 10px;
  margin-left: 5px;
  background-color: transparent;
  color: white;
  padding: 10px;
  font-family: ${themeVars.headingFont};
  outline: none;
  border: none;
  font-size: 14pt;
  :hover {
    cursor: pointer;
  }
`;

const DropdownMenuItem = styled.option``;

export default FlightSelect;

import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { themeVars } from "./GlobalStyles";
import tombstone from "../assets/tombstone.png";

const Confirmation = () => {
  const [reservation, setReservation] = useState([]);

  useEffect(() => {
    fetch(`/reservation/${localStorage.reservationID}`, {
      method: "GET",
      headers: {
        "Content-Type" : "application.json"
      }
    })
    .then((res) => res.json())
    .then((data) => setReservation(data.reservation))
  })

  return (
  <Wrapper>
    <MainBlockDiv>
      <SecondBlockDiv>
        <ThirdBlockDiv>
          <ConfirmedTitle>Your flight is comfirmed!</ConfirmedTitle>
          <BodyDiv>
            <ConfirmedBody>Reservation #: {localStorage.reservationID}</ConfirmedBody>
            <ConfirmedBody>Flight #: {reservation.flight}</ConfirmedBody>
            <ConfirmedBody>Seat #: {reservation.seat}</ConfirmedBody>
            <ConfirmedBody>Name: {reservation.givenName} {reservation.surname}</ConfirmedBody>
            <ConfirmedBody>Email: {reservation.email}</ConfirmedBody>
          </BodyDiv>
        </ThirdBlockDiv>
      </SecondBlockDiv>
      <TombstoneImg src={tombstone} alt="Tombstone image"/>
    </MainBlockDiv>
  </Wrapper>
  )
};

const Wrapper = styled.div`
  height: 100%;
`;

const MainBlockDiv = styled.div`
  margin-top: 125px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-content: center;
`;

const SecondBlockDiv = styled.div`
  border: #910122 solid 2px;
  border-radius: 10px;
  width: 500px;
`;

const ThirdBlockDiv = styled.div`
  padding: 25px;
`;

const ConfirmedTitle = styled.h1`
  color: #910122;
  border-bottom: #910122 solid 2px;
  margin: 0px 15px;
  padding-bottom: 20px;
`;

const BodyDiv = styled.div`
  margin-bottom: 15px;
`;

const ConfirmedBody = styled.p`
  padding-top: 20px;
`;

const TombstoneImg = styled.img`
  max-height: 200px;
  margin-top: 30px;
  margin-bottom: 30px;
`;

export default Confirmation;

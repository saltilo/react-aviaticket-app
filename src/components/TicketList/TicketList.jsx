import React from "react";
import { useSelector } from "react-redux";
import styles from "./TicketList.module.scss";
import TicketCard from "./TicketCard/TicketCard";

const mockTickets = [
  {
    id: 1,
    price: 13400,
    airline: "S7 Airlines",
    airlineLogo:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/S7_new_logo.svg/2560px-S7_new_logo.svg.png",
    flights: [
      {
        origin: "MOW",
        destination: "NKT",
        departureTime: "2024-02-26T10:45:00",
        arrivalTime: "2024-02-26T08:00:00",
        duration: "21ч 15м",
        transfers: ["HKG", "JNB"],
      },
      {
        origin: "MOW",
        destination: "NKT",
        departureTime: "2024-02-26T11:20:00",
        arrivalTime: "2024-02-26T00:50:00",
        duration: "13ч 30м",
        transfers: ["HKG"],
      },
    ],
  },
  {
    id: 2,
    price: 8900,
    airline: "Aeroflot",
    airlineLogo:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Aeroflot_text_logo.svg/2560px-Aeroflot_text_logo.svg.png",
    flights: [
      {
        origin: "MOW",
        destination: "JFK",
        departureTime: "2024-02-26T09:30:00",
        arrivalTime: "2024-02-26T16:50:00",
        duration: "10ч 20м",
        transfers: [],
      },
    ],
  },
  {
    id: 3,
    price: 15400,
    airline: "Lufthansa",
    airlineLogo:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Lufthansa_Logo_2018.svg/2560px-Lufthansa_Logo_2018.svg.png",
    flights: [
      {
        origin: "MOW",
        destination: "LAX",
        departureTime: "2024-02-26T06:10:00",
        arrivalTime: "2024-02-26T18:45:00",
        duration: "14ч 35м",
        transfers: ["FRA"],
      },
    ],
  },
  {
    id: 4,
    price: 7400,
    airline: "Pobeda",
    airlineLogo:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Pobeda_logo.svg/2560px-Pobeda_logo.svg.png",
    flights: [
      {
        origin: "MOW",
        destination: "BER",
        departureTime: "2024-02-26T15:20:00",
        arrivalTime: "2024-02-26T18:45:00",
        duration: "3ч 25м",
        transfers: [],
      },
    ],
  },
];
const convertDurationToMinutes = (duration) => {
  const [hours, minutes] = duration.split("ч ").map((time) => parseInt(time));
  return hours * 60 + minutes;
};

const sortTickets = (tickets, sortType) => {
  switch (sortType) {
    case "cheapest":
      return [...tickets].sort((a, b) => a.price - b.price);
    case "fastest":
      return [...tickets].sort((a, b) => {
        const durationA = a.flights.reduce(
          (acc, flight) => acc + convertDurationToMinutes(flight.duration),
          0
        );
        const durationB = b.flights.reduce(
          (acc, flight) => acc + convertDurationToMinutes(flight.duration),
          0
        );
        return durationA - durationB;
      });
    case "optimal":
    default:
      return tickets;
  }
};

const filterTickets = (tickets, filters) => {
  if (filters.all) return tickets;

  return tickets.filter((ticket) => {
    return ticket.flights.some((flight) => {
      if (filters.noTransfers && flight.transfers.length === 0) return true;
      if (filters.oneTransfer && flight.transfers.length === 1) return true;
      if (filters.twoTransfers && flight.transfers.length === 2) return true;
      if (filters.threeTransfers && flight.transfers.length === 3) return true;
      return false;
    });
  });
};

const TicketList = () => {
  const sortType = useSelector((state) => state.sort.sortType);
  const filters = useSelector((state) => state.filters);

  const filteredTickets = filterTickets(mockTickets, filters);

  const sortedTickets = sortTickets(filteredTickets, sortType);

  console.log("Финальный список билетов для рендера:", sortedTickets);
  return (
    <div className={styles.ticketList}>
      {sortedTickets.length === 0 ? (
        <p>Нет билетов по выбранным фильтрам.</p>
      ) : (
        sortedTickets.map((ticket) => (
          <TicketCard key={ticket.id} ticket={ticket} />
        ))
      )}
    </div>
  );
};

export default TicketList;

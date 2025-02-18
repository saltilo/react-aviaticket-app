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
        departureTime: "10:45",
        arrivalTime: "08:00",
        duration: "21ч 15м",
        transfers: ["HKG", "JNB"],
      },
      {
        origin: "MOW",
        destination: "NKT",
        departureTime: "11:20",
        arrivalTime: "00:50",
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
        departureTime: "09:30",
        arrivalTime: "16:50",
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
        departureTime: "06:10",
        arrivalTime: "18:45",
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
        departureTime: "15:20",
        arrivalTime: "18:45",
        duration: "3ч 25м",
        transfers: [],
      },
    ],
  },
  {
    id: 5,
    price: 9700,
    airline: "Qatar Airways",
    airlineLogo:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Qatar_Airways_Logo.svg/2560px-Qatar_Airways_Logo.svg.png",
    flights: [
      {
        origin: "MOW",
        destination: "SYD",
        departureTime: "21:00",
        arrivalTime: "10:30",
        duration: "18ч 30м",
        transfers: ["DOH"],
      },
    ],
  },
  {
    id: 6,
    price: 11900,
    airline: "Turkish Airlines",
    airlineLogo:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Turkish_Airlines_logo_2019.svg/2560px-Turkish_Airlines_logo_2019.svg.png",
    flights: [
      {
        origin: "MOW",
        destination: "BKK",
        departureTime: "23:50",
        arrivalTime: "14:10",
        duration: "12ч 20м",
        transfers: ["IST"],
      },
    ],
  },
  {
    id: 7,
    price: 16800,
    airline: "Emirates",
    airlineLogo:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Emirates_logo.svg/2560px-Emirates_logo.svg.png",
    flights: [
      {
        origin: "MOW",
        destination: "MEL",
        departureTime: "05:40",
        arrivalTime: "22:15",
        duration: "23ч 35м",
        transfers: ["DXB", "SIN", "PER"],
      },
    ],
  },
  {
    id: 8,
    price: 18500,
    airline: "Singapore Airlines",
    airlineLogo:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Singapore_Airlines_Logo.svg/2560px-Singapore_Airlines_Logo.svg.png",
    flights: [
      {
        origin: "MOW",
        destination: "MEL",
        departureTime: "08:00",
        arrivalTime: "18:30",
        duration: "10ч 30м",
        transfers: ["SIN", "KUL", "SYD"],
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

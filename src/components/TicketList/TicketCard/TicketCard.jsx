import React from "react";
import { format, addMinutes } from "date-fns";
import styles from "./TicketCard.module.scss";

const parseDuration = (durationStr) => {
  if (!durationStr) return 0;

  const match = durationStr.match(/(\d+)ч\s*(\d+)?м?/);
  const hours = match ? parseInt(match[1]) : 0;
  const minutes = match && match[2] ? parseInt(match[2]) : 0;

  return hours * 60 + minutes;
};

const parseDate = (dateStr) => {
  if (!dateStr) return null;
  const parsedDate = new Date(dateStr);
  return isNaN(parsedDate) ? null : parsedDate;
};

const TicketCard = ({ ticket }) => {
  if (!ticket) {
    return <p>Ошибка: билет не передан</p>;
  }

  return (
    <div className={styles.ticketCard}>
      {}
      <div className={styles.ticketHeader}>
        <span className={styles.price}>{ticket.price} Р</span>
        <img
          className={styles.logo}
          src={ticket.airlineLogo}
          alt={ticket.airline}
        />
      </div>

      {}
      <ul className={styles.segments}>
        {ticket.flights.map((flight, index) => {
          const departureTime = parseDate(flight.departureTime);
          const arrivalTime = departureTime
            ? addMinutes(departureTime, parseDuration(flight.duration))
            : null;

          if (!departureTime || !arrivalTime) {
            return null;
          }

          const durationMinutes = parseDuration(flight.duration);
          const durationText = `${Math.floor(durationMinutes / 60)}ч ${
            durationMinutes % 60
          }м`;

          const stopsText = flight.transfers.length
            ? `${flight.transfers.length} ${
                ["пересадка", "пересадки", "пересадок"][
                  Math.min(flight.transfers.length - 1, 2)
                ]
              }`
            : "Без пересадок";

          return (
            <li key={index} className={styles.segment}>
              <span className={styles.route}>
                {flight.origin} – {flight.destination}
              </span>
              <span className={styles.durationTitle}>В ПУТИ</span>
              <span className={styles.stopsCount}>{stopsText}</span>

              <span className={styles.time}>
                {format(departureTime, "HH:mm")} –{" "}
                {format(arrivalTime, "HH:mm")}
              </span>
              <span className={styles.duration}>{durationText}</span>
              <span className={styles.stopsCities}>
                {flight.transfers.length ? flight.transfers.join(", ") : ""}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default TicketCard;

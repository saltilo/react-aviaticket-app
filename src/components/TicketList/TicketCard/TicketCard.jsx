import React from "react";
import { format, addMinutes } from "date-fns";
import styles from "./TicketCard.module.scss";

const TicketCard = ({ ticket }) => {
  if (!ticket || !ticket.segments) {
    return null;
  }

  return (
    <div className={styles.ticketCard}>
      {}
      <div className={styles.ticketHeader}>
        <span className={styles.price}>{ticket.price} Р</span>
        <img
          className={styles.logo}
          src={`https://pics.avs.io/99/36/${ticket.carrier}.png`}
          alt={ticket.carrier}
        />
      </div>

      {}
      <ul className={styles.segments}>
        {ticket.segments.map((segment, index) => {
          if (!segment) {
            return null;
          }

          const departureTime = new Date(segment.date);
          const arrivalTime = addMinutes(departureTime, segment.duration);

          const durationHours = Math.floor(segment.duration / 60);
          const durationMinutes = segment.duration % 60;

          const stopsText =
            segment.stops.length === 0
              ? "Без пересадок"
              : `${segment.stops.length} ${
                  ["пересадка", "пересадки", "пересадок"][
                    Math.min(segment.stops.length - 1, 2)
                  ]
                }`;

          return (
            <li key={index} className={styles.segment}>
              <span className={styles.route}>
                {segment.origin} – {segment.destination}
              </span>
              <span className={styles.durationTitle}>В пути</span>
              <span className={styles.stopsCount}>{stopsText}</span>
              <span className={styles.time}>
                {format(departureTime, "HH:mm")} –{" "}
                {format(arrivalTime, "HH:mm")}
              </span>
              <span className={styles.duration}>
                {durationHours}ч {durationMinutes}м
              </span>
              <span className={styles.stopsCities}>
                {segment.stops.join(", ")}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default TicketCard;

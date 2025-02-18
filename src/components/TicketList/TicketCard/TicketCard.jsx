import React from "react";
import styles from "./TicketCard.module.scss";

const TicketCard = ({ ticket }) => {
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
      {ticket.flights.map((flight, index) => (
        <div key={index} className={styles.flightInfo}>
          <div className={styles.route}>
            <span>
              {flight.origin} – {flight.destination}
            </span>
            <span className={styles.time}>
              {flight.departureTime} – {flight.arrivalTime}
            </span>
          </div>
          <div className={styles.details}>
            <span className={styles.duration}>В пути: {flight.duration}</span>
            <span className={styles.transfers}>
              {flight.transfers.length === 0
                ? "Без пересадок"
                : `${flight.transfers.length} пересадки`}
            </span>
          </div>
          <div className={styles.transferCities}>
            {flight.transfers.length > 0 && flight.transfers.join(", ")}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TicketCard;

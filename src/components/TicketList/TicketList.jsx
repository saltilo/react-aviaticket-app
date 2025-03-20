import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import styles from "./TicketList.module.scss";
import TicketCard from "./TicketCard/TicketCard";
import LoadMoreButton from "../LoadMoreButton/LoadMoreButton";

const TicketList = () => {
  const tickets = useSelector((state) => state.tickets.visibleTickets);
  const filters = useSelector((state) => state.filters);
  const sortType = useSelector((state) => state.sort.sortType);

  const filteredTickets = useMemo(() => {
    if (filters.all) return tickets;
    return tickets.filter((ticket) =>
      ticket.segments.some(
        (segment) => filters.transfers[segment.stops?.length ?? 0]
      )
    );
  }, [tickets, filters]);

  const sortedFilteredTickets = useMemo(() => {
    switch (sortType) {
      case "cheapest":
        return [...filteredTickets].sort((a, b) => a.price - b.price);
      case "fastest":
        return [...filteredTickets].sort(
          (a, b) =>
            a.segments.reduce((acc, s) => acc + s.duration, 0) -
            b.segments.reduce((acc, s) => acc + s.duration, 0)
        );
      case "optimal":
        return [...filteredTickets].sort((a, b) => {
          const aTime = a.segments.reduce((acc, s) => acc + s.duration, 0);
          const bTime = b.segments.reduce((acc, s) => acc + s.duration, 0);
          return a.price + aTime - (b.price + bTime);
        });
      default:
        return filteredTickets;
    }
  }, [filteredTickets, sortType]);

  if (!sortedFilteredTickets.length) {
    return <p>Рейсов, подходящих под заданные фильтры, не найдено</p>;
  }

  return (
    <div className={styles.ticketList}>
      {sortedFilteredTickets.map((ticket, index) => (
        <TicketCard
          key={`${ticket.carrier}-${ticket.price}-${index}`}
          ticket={ticket}
        />
      ))}
      <LoadMoreButton />
    </div>
  );
};

export default TicketList;

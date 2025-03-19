import React from "react";
import { useSelector } from "react-redux";
import styles from "./TicketList.module.scss";
import TicketCard from "./TicketCard/TicketCard";
import LoadMoreButton from "../LoadMoreButton/LoadMoreButton";

const TicketList = () => {
  const tickets = useSelector((state) => state.tickets.visibleTickets);
  const loading = useSelector((state) => state.tickets.loading);
  const error = useSelector((state) => state.tickets.error);
  const filters = useSelector((state) => state.filters);
  const sortType = useSelector((state) => state.sort.sortType);

  const filteredTickets = filters.all
    ? tickets
    : tickets.filter((ticket) =>
        ticket.segments.some(
          (segment) => filters.transfers[segment.stops?.length ?? 0]
        )
      );

  const sortTickets = (tickets, sortType) => {
    switch (sortType) {
      case "cheapest":
        return [...tickets].sort((a, b) => a.price - b.price);
      case "fastest":
        return [...tickets].sort(
          (a, b) =>
            a.segments.reduce((acc, segment) => acc + segment.duration, 0) -
            b.segments.reduce((acc, segment) => acc + segment.duration, 0)
        );
      case "optimal":
        return [...tickets].sort(
          (a, b) =>
            (a.price +
              a.segments.reduce((acc, segment) => acc + segment.duration, 0)) /
              2 -
            (b.price +
              b.segments.reduce((acc, segment) => acc + segment.duration, 0)) /
              2
        );
      default:
        return tickets;
    }
  };

  const sortedFilteredTickets = sortTickets(filteredTickets, sortType);

  if (loading) return <p>Загрузка билетов...</p>;
  if (error) return <p className={styles.error}>Ошибка загрузки: {error}</p>;
  if (!sortedFilteredTickets.length)
    return <p>Рейсов, подходящих под заданные фильтры, не найдено</p>;

  return (
    <div className={styles.ticketList}>
      {sortedFilteredTickets.map((ticket, index) => (
        <TicketCard key={index} ticket={ticket} />
      ))}
      <LoadMoreButton />
    </div>
  );
};

export default TicketList;

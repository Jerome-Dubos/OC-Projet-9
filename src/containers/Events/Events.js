import { useEffect, useState } from "react";
import EventCard from "../../components/EventCard/EventCard";
import Select from "../../components/Select/Select";
import { useData } from "../../contexts/DataContext/DataContext";
import Modal from "../Modal/Modal";
import ModalEvent from "../ModalEvent/ModalEvent";

import "./Events.css";

const PER_PAGE = 9;

const EventList = () => {
  const { data, error } = useData();
  const [type, setType] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredEvents, setfilteredEvents] = useState([])
  const [pageNumber, setPageNumber] = useState(0)

  useEffect(() => {
    const filteredEventsAll = (data?.events || []).filter((event) => !type || event.type === type)
    const paginatedEvents = filteredEventsAll.slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE)
    setfilteredEvents(paginatedEvents)
    setPageNumber(Math.ceil(filteredEventsAll.length / PER_PAGE));
  }, [data, type, currentPage])
 
  const changeType = (evtType) => {
    console.log(evtType);

    
    setCurrentPage(1); 
    setType(evtType);
  };
  
  const typeList = new Set(data?.events.map((event) => event.type));
  console.log(typeList);
  return (
    <>
      {error && <div>An error occured</div>}
      {data === null ? (
        "loading"
      ) : (
        <>
          <h3 className="SelectTitle">Catégories</h3>
          <Select
            selection={Array.from(typeList)}
            onChange={(value) => (value ? changeType(value) : changeType(null))}
          />
          <div id="events" className="ListContainer">
            {filteredEvents.map((event) => (
              <Modal key={event.id} Content={<ModalEvent event={event} />}>
                {({ setIsOpened }) => (
                  <EventCard
                    onClick={() => setIsOpened(true)}
                    imageSrc={event.cover}
                    title={event.title}
                    date={new Date(event.date)}
                    label={event.type}
                  />
                )}
              </Modal>
            ))}
          </div>
          <div className="Pagination">
            {[...Array(pageNumber || 0)].map((_, n) => (
              // eslint-disable-next-line react/no-array-index-key
              <a key={n} href="#events" onClick={() => setCurrentPage(n + 1)}>
                {n + 1}
              </a>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default EventList;
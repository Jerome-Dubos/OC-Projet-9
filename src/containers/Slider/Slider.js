import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext/DataContext";
import { getMonth } from "../../helpers/Date/Date";

import "./Slider.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  
  const byDateDesc = data?.focus?.sort((evtA, evtB) =>
    new Date(evtA.date).getTime() - new Date(evtB.date).getTime()
  );

  const handlePaginationClick = (newIndex) => {
    setIndex(newIndex);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (byDateDesc?.length) {
        setIndex(prevIndex => 
          prevIndex < byDateDesc.length - 1 ? prevIndex + 1 : 0
        );
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, [index, byDateDesc?.length]);

  if (!byDateDesc?.length) return null;

  return (
    <div className="SlideCardList">
      {byDateDesc.map((event, idx) => (
        <div key={event.id || event.title}>
          <div
            className={`SlideCard SlideCard--${index === idx ? "display" : "hide"}`}
          >
            <img src={event.cover} alt={event.title} />
            <div className="SlideCard__descriptionContainer">
              <div className="SlideCard__description">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div>{getMonth(new Date(event.date))}</div>
              </div>
            </div>
          </div>
          <div className="SlideCard__paginationContainer">
            <div className="SlideCard__pagination">
              {byDateDesc.map((paginationEvent) => (
                <input
                  key={paginationEvent.id || paginationEvent.title}
                  type="radio"
                  name="radio-button"
                  checked={index === byDateDesc.indexOf(paginationEvent)}
                  onChange={() => handlePaginationClick(byDateDesc.indexOf(paginationEvent))}
                />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Slider;
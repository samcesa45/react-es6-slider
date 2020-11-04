import React, { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight, FaQuoteRight } from "react-icons/fa";
import data from "./data";
const App = () => {
  const [people] = useState(data);
  const [index, setIndex] = useState(0);

  const prevSlide = () => {
    setIndex((oldIndex) => {
      let index = oldIndex - 1;
      if (index < 0) {
        index = people.length - 1;
      }
      return index;
    });
  };

  const nextSlide = () => {
    setIndex((oldIndex) => {
      let index = oldIndex + 1;
      if (index > people.length - 1) {
        index = 0;
      }
      return index;
    });
  };

  useEffect(() => {
    let slider = setInterval(() => {
      setIndex((oldIndex) => {
        let index = oldIndex + 1;
        if (index > people.length - 1) {
          index = 0;
        }
        return index;
      });
    }, 5000);
    return () => {
      clearInterval(slider);
    };
  }, [index, people.length]);

  return (
    <section className="slider">
      <div className="reviews">
        <h2>
          <span>/</span>reviews
        </h2>
      </div>
      <div className="slide-container">
        {people.map((person, sliderIndex) => {
          const { img, name, text, job } = person;
          let position = "next";
          if (sliderIndex === index) {
            position = "active";
          }

          if (
            sliderIndex === index - 1 ||
            (index === 0 && sliderIndex === people.length - 1)
          ) {
            position = "last";
          }

          return (
            <article className={`slide ${position}`} key={person.id}>
              <img src={img} alt={name} className="img" />
              <h4>{name}</h4>
              <p className="title">{job}</p>
              <p className="text">{text}</p>
              <div className="quote-icon">
                <FaQuoteRight />
              </div>
            </article>
          );
        })}
      </div>
      <button className="btn prev-btn" onClick={prevSlide}>
        <FaChevronLeft />
      </button>
      <button className="btn next-btn" onClick={nextSlide}>
        <FaChevronRight />
      </button>
    </section>
  );
};

export default App;

"use client";
import React, { useEffect, useRef, useState } from "react";

const Scrolldetector = ({
  className,
  children,
  before,
  after,
  threshold,
  ...params
}) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(ref.current); // optional: stop observing after reveal
        }
      },
      { threshold: threshold || 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`${className} ${isVisible ? after : before}`}
      {...params}
    >
      {children}
    </div>
  );
};

export default Scrolldetector;

// CardContainer.jsx
import { VStack } from "@chakra-ui/react";
import React, { useRef, useState, useEffect } from 'react';
import './cardContainer.css';

const CardContainer = () => {
  const containerRef = useRef(null);
  const scrollbarRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartY, setDragStartY] = useState(0);

  const callQueue = [
    { id: 1, slotNo: '506' },
    { id: 2, slotNo: '304' },
    { id: 3, slotNo: '201' },
    { id: 4, slotNo: '201' },
    { id: 5, slotNo: '201' },
    { id: 6, slotNo: '201' },
    { id: 7, slotNo: '201' },
    { id: 8, slotNo: '201' },
    { id: 9, slotNo: '201' },
  ];

  const handleScroll = () => {
    // Handle scroll event here
    // You can access the scroll position using containerRef.current.scrollTop
    // Update the state or perform any other actions based on the scroll position
    updateScrollbarPosition();
  };

  const handleScrollbarMouseDown = (e) => {
    setIsDragging(true);
    setDragStartY(e.clientY);
  };

  const handleDocumentMouseMove = (e) => {
    if (isDragging) {
      const deltaY = e.clientY - dragStartY;
      const newScrollTop = containerRef.current.scrollTop + deltaY;
      containerRef.current.scrollTop = newScrollTop;
      setDragStartY(e.clientY);
      updateScrollbarPosition();
    }
  };

  const handleDocumentMouseUp = () => {
    setIsDragging(false);
  };

  const updateScrollbarPosition = () => {
    const scrollPercentage =
      (containerRef.current.scrollTop /
        (containerRef.current.scrollHeight -
          containerRef.current.clientHeight)) *
      100;
    scrollbarRef.current.style.top = `${scrollPercentage}%`;
  };

  useEffect(() => {
    // Initialize scrollbar position
    updateScrollbarPosition();

    // Add event listeners for mouse move and mouse up on the document
    document.addEventListener('mousemove', handleDocumentMouseMove);
    document.addEventListener('mouseup', handleDocumentMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleDocumentMouseMove);
      document.removeEventListener('mouseup', handleDocumentMouseUp);
    };
  }, [isDragging]);

  return (
    <div className="card-container" ref={containerRef} onScroll={handleScroll}>
      {callQueue.map((card, index) => (
        <div key={index} className="card">
          <p>ID: {card.id}</p>
          <p>Slot No: {card.slotNo}</p>
        </div>
      ))}
      <div
        className="vertical-scrollbar"
        ref={scrollbarRef}
        onMouseDown={handleScrollbarMouseDown}
      ></div>
    </div>
  );
};

export default CardContainer;

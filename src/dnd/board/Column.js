import React from "react";
import styled from "@xstyled/styled-components";
import { colors } from "@atlaskit/theme";
import { grid, borderRadius } from "../styles/constants";
import { Draggable, Droppable } from "react-beautiful-dnd";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${colors.N20};
  border-radius: ${borderRadius}px;
  box-shadow: ${({ isDragging }) =>
    isDragging ? "0 2px 8px rgba(0, 0, 0, 0.2)" : "none"};
  transition: box-shadow 0.2s ease;
  overflow: hidden;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between; /* 左右对齐 */
  align-items: center;
  padding: ${grid}px;
  border-top-left-radius: ${borderRadius}px;
  border-top-right-radius: ${borderRadius}px;
  background-color: ${({ isDragging }) =>
    isDragging ? colors.G50 : colors.N30};
  transition: background-color 0.2s ease;
  &:hover {
    background-color: ${colors.G50};
  }
`;

const DateText = styled.div`
  font-size: 14px;
  font-weight: bold;
  color: ${colors.N800};
`;

const DayText = styled.div`
  font-size: 12px;
  color: ${colors.N500};
`;

const TodoItem = styled.div`
  padding: ${grid}px;
  margin-bottom: ${grid}px;
  background-color: ${({ isDragging }) =>
    isDragging ? colors.G50 : colors.N0};
  border-radius: ${borderRadius}px;
  box-shadow: ${({ isDragging }) =>
    isDragging ? "0 2px 8px rgba(0, 0, 0, 0.2)" : "none"};
  transition: background-color 0.2s ease, box-shadow 0.2s ease;
`;

const Column = (props) => {
  const { title, quotes, index, date } = props;

  // 格式化日期和星期
    const formatDate = (date) => {
    if (!date) return ""; // 如果 date 为 undefined，返回空字符串
    const options = { day: "numeric" };
    return date.toLocaleDateString(undefined, options);
  };
  
  const formatDay = (date) => {
    if (!date) return ""; // 如果 date 为 undefined，返回空字符串
    const options = { weekday: "short" }; // 简写星期
    return date.toLocaleDateString(undefined, options);
  };

  return (
    <Droppable droppableId={props.id} type="TODO">
      {(dropProvided, dropSnapshot) => (
        <Container
          ref={dropProvided.innerRef}
          {...dropProvided.droppableProps}
          isDragging={dropSnapshot.isDraggingOver}
        >
          <Header>
            <DateText>{formatDate(date)}</DateText>
            <DayText>{formatDay(date)}</DayText>
          </Header>
          {quotes.map((quote, quoteIndex) => (
            <Draggable
              key={quote.id}
              draggableId={quote.id}
              index={quoteIndex}
            >
              {(quoteProvided, quoteSnapshot) => (
                <TodoItem
                  ref={quoteProvided.innerRef}
                  {...quoteProvided.draggableProps}
                  {...quoteProvided.dragHandleProps}
                  isDragging={quoteSnapshot.isDragging}
                >
                  {quote.content}
                </TodoItem>
              )}
            </Draggable>
          ))}
          {dropProvided.placeholder}
        </Container>
      )}
    </Droppable>
  );
};

export default Column;
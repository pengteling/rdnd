import React from "react";
import styled from "@xstyled/styled-components";
import { colors } from "@atlaskit/theme";
import { grid, borderRadius } from "../styles/constants";
import { Draggable, Droppable } from "react-beautiful-dnd";
import Title from "../styles/title";
const Container = styled.div`
  margin: 8px; /* 列之间的间距 */
  flex: 1; /* 每列平分容器宽度 */
  display: flex;
  flex-direction: column;
  background-color: ${colors.N20};
  border-radius: ${borderRadius}px;
  box-shadow: ${({ isDragging }) =>
    isDragging ? "0 2px 8px rgba(0, 0, 0, 0.2)" : "none"};
  transition: box-shadow 0.2s ease;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
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
  const { title, quotes, index } = props;

  return (
    <Droppable droppableId={props.id} type="TODO">
      {(dropProvided, dropSnapshot) => (
        <Container
          ref={dropProvided.innerRef}
          {...dropProvided.droppableProps}
          isDragging={dropSnapshot.isDraggingOver}
        >
          <Header>
            <Title aria-label={`${title} todo list`}>{title}</Title>
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
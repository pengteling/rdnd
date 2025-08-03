import React, { useState } from "react";
import styled from "@xstyled/styled-components";
import { DragDropContext } from "react-beautiful-dnd";
import Column from "./Column";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between; /* 列之间均匀分布 */
  padding: 16px;
  gap: 16px; /* 列之间的间距 */
  width: 100%; /* 确保容器宽度适配屏幕 */
  box-sizing: border-box; /* 包括 padding 在内计算宽度 */
`;

const initialData = {
  columns: {
    "monday": {
      id: "monday",
      title: "Monday",
      quotes: [
        { id: "todo-1", content: "Plan the week" },
        { id: "todo-2", content: "Team meeting" },
      ],
    },
    "tuesday": {
      id: "tuesday",
      title: "Tuesday",
      quotes: [
        { id: "todo-3", content: "Work on project X" },
        { id: "todo-4", content: "Review PRs" },
      ],
    },
    "wednesday": {
      id: "wednesday",
      title: "Wednesday",
      quotes: [
        { id: "todo-5", content: "Write documentation" },
        { id: "todo-6", content: "Fix bugs" },
      ],
    },
    "thursday": {
      id: "thursday",
      title: "Thursday",
      quotes: [
        { id: "todo-7", content: "Prepare presentation" },
        { id: "todo-8", content: "Client call" },
      ],
    },
    "friday": {
      id: "friday",
      title: "Friday",
      quotes: [
        { id: "todo-9", content: "Deploy updates" },
        { id: "todo-10", content: "Team retrospective" },
      ],
    },
    "saturday": {
      id: "saturday",
      title: "Saturday",
      quotes: [
        { id: "todo-11", content: "Personal project" },
        { id: "todo-12", content: "Read a book" },
      ],
    },
    "sunday": {
      id: "sunday",
      title: "Sunday",
      quotes: [
        { id: "todo-13", content: "Relax" },
        { id: "todo-14", content: "Plan next week" },
      ],
    },
  },
  columnOrder: ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"],
};

const Board = () => {
  const [data, setData] = useState(initialData);

  const onDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    const sourceColumn = data.columns[source.droppableId];
    const destinationColumn = data.columns[destination.droppableId];

    if (!sourceColumn || !destinationColumn) {
      console.error("Invalid source or destination column");
      return;
    }

    const sourceQuotes = Array.from(sourceColumn.quotes);
    const [movedQuote] = sourceQuotes.splice(source.index, 1);

    const destinationQuotes = Array.from(destinationColumn.quotes);
    destinationQuotes.splice(destination.index, 0, movedQuote);

    const updatedColumns = {
      ...data.columns,
      [source.droppableId]: {
        ...sourceColumn,
        quotes: sourceQuotes,
      },
      [destination.droppableId]: {
        ...destinationColumn,
        quotes: destinationQuotes,
      },
    };

    setData({
      ...data,
      columns: updatedColumns,
    });
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Container>
        {data.columnOrder.map((columnId, index) => {
          const column = data.columns[columnId];
          return (
            <Column
              key={column.id}
              id={column.id}
              title={column.title}
              quotes={column.quotes}
              index={index}
            />
          );
        })}
      </Container>
    </DragDropContext>
  );
};

export default Board;
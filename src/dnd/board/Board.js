import React, { useState } from "react";
import { colors } from "@atlaskit/theme";
import styled from "@xstyled/styled-components";
import { DragDropContext } from "react-beautiful-dnd";
import Column from "./Column";
import { borderRadius } from "../styles/constants";

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); /* 自动适配列宽 */
  gap: 16px; /* 列之间的间距 */
  padding: 16px;
  width: 100%; /* 确保容器宽度适配屏幕 */
  box-sizing: border-box; /* 包括 padding 在内计算宽度 */
`;
const WeekendContainer = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr; /* 周六和周日平分高度 */
  gap: 8px; /* 周六和周日之间的间距 */
  height: 100%; /* 填满父容器 */
  background-color: ${colors.N20};
  border-radius: ${borderRadius}px;
  box-shadow: ${({ isDragging }) =>
    isDragging ? "0 2px 8px rgba(0, 0, 0, 0.2)" : "none"};
  transition: box-shadow 0.2s ease;
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

const Board = ({ currentDate }) => {
  const [data, setData] = useState(initialData);

  // 获取当前周的日期
  const getWeekDates = (date) => {
    const startOfWeek = new Date(date.setDate(date.getDate() - date.getDay() + 1)); // 周一
    return Array.from({ length: 7 }, (_, i) => {
      const weekDate = new Date(startOfWeek);
      weekDate.setDate(startOfWeek.getDate() + i);
      return weekDate;
    });
  };

  const weekDates = getWeekDates(new Date(currentDate)); // 动态计算当前周的日期

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
    <>
      {/* 拖拽面板 */}
      <DragDropContext onDragEnd={onDragEnd}>
        <Container>
          {data.columnOrder.map((columnId, index) => {
            if (columnId === "saturday") {
              // 渲染周六和周日共用一列
              return (
                <WeekendContainer key="weekend">
                  <Column
                    id="saturday"
                    title="Saturday"
                    quotes={data.columns["saturday"].quotes}
                    date={weekDates[5]} // 周六的日期
                  />
                  <Column
                    id="sunday"
                    title="Sunday"
                    quotes={data.columns["sunday"].quotes}
                    date={weekDates[6]} // 周日的日期
                  />
                </WeekendContainer>
              );
            }

            // 渲染其他列
            if (columnId === "sunday") {
              return null; // 周日已经在周六的逻辑中处理，跳过
            }

            const column = data.columns[columnId];
            return (
              <Column
                key={column.id}
                id={column.id}
                title={column.title}
                quotes={column.quotes}
                date={weekDates[index]} // 传递对应的日期
              />
            );
          })}
        </Container>
      </DragDropContext>
    </>
  );
};

export default Board;



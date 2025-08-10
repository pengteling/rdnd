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

const Content = styled.div`
  display: flex;
  flex-direction: column; /* 改为垂直布局 */
  gap: 0px; /* 行之间的间距 */
  flex-grow: 1;
  border-top: 1px solid ${colors.N30}; /* 第一行的顶部边框 */
`;

const Row = styled.div`
  border-bottom: 1px solid ${colors.N30}; /* 每行的下划线 */
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  min-height: 40px; /* 每行的最小高度 */
`;

const InputRow = styled.div`
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  min-height: 40px; /* 与其他行保持一致的高度 */
  border: 1px solid transparent; /* 默认无边框 */
  border-radius: ${borderRadius}px;
  transition: border-color 0.2s ease, background-color 0.2s ease, opacity 0.2s ease;
  background-color: transparent; /* 默认背景透明 */
  opacity: 0; /* 默认不可见 */

  &:hover,&:focus-within {
    border-color: ${colors.N30}; /* 鼠标悬停时显示边框 */
    background-color: ${colors.N10}; /* 鼠标悬停时背景颜色变化 */
    opacity: 1; /* 鼠标悬停时完全可见 */
  }

  input {
    width: 100%;
    border: none;
    outline: none;
    font-size: 14px;
    padding: 4px;
    background: transparent;
    color: ${colors.N800};
    opacity: 1; /* 输入框始终可见 */
  }
`;

const Column = (props) => {
  const { title, quotes, index, date, hideHeader, rows } = props;

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
        <Container isDragging={dropSnapshot.isDraggingOver}>
          {!hideHeader && (
            <Header>
              <DateText>{formatDate(date)}</DateText>
              <DayText>{formatDay(date)}</DayText>
            </Header>
          )}
          <Content
            rows={rows}
            ref={dropProvided.innerRef} // 将 ref 绑定到 Content，而不是 Container
            {...dropProvided.droppableProps}
          >
            {quotes.map((quote, quoteIndex) => (
              <Draggable
                key={quote.id}
                draggableId={quote.id}
                index={quoteIndex}
              >
                {(quoteProvided, quoteSnapshot) => (
                  <Row
                    ref={quoteProvided.innerRef}
                    {...quoteProvided.draggableProps}
                    {...quoteProvided.dragHandleProps}
                    isDragging={quoteSnapshot.isDragging}
                  >
                    {quote.content}
                  </Row>
                )}
              </Draggable>
            ))}
            {dropProvided.placeholder} {/* 确保 placeholder 在 Content 内 */}

            {/* 输入框 */}
            <InputRow>
              <input
                type="text"
                placeholder="Add a task..." // 输入框的占位符
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    console.log("New task:", e.target.value);
                    e.target.value = ""; // 清空输入框
                  }
                }}
              />
            </InputRow>
          </Content>
        </Container>
      )}
    </Droppable>
  );
};

export default Column;
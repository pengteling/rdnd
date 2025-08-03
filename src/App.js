import React, { useState } from "react";
import { Row, Col, Card, CardBody, Button } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { generateQuoteMap } from "./dnd/mockData";
import Board from "./dnd/board/Board";

export default function App() {
  const data = {
    medium: generateQuoteMap(100),
    large: generateQuoteMap(500),
  };

  // 当前日期状态
  const [currentDate, setCurrentDate] = useState(new Date());

  // 切换到上一周
  const handlePreviousWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() - 7);
    setCurrentDate(newDate);
  };

  // 切换到下一周
  const handleNextWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + 7);
    setCurrentDate(newDate);
  };

  // 格式化当前年月
  const formatDate = (date) => {
    const options = { year: "numeric", month: "long" };
    return date.toLocaleDateString(undefined, options);
  };

  return (
    <>
      {/* 顶部导航栏 */}
      <Row className="align-items-center justify-content-between p-3 bg-light border-bottom">
        <Col xs="auto">
          <h4>{formatDate(currentDate)}</h4>
        </Col>
        <Col xs="auto">
          <Button color="primary" onClick={handlePreviousWeek} className="me-2 mr-2">
            &larr; Previous Week
          </Button>
          <Button color="primary" onClick={handleNextWeek}>
            Next Week &rarr;
          </Button>
        </Col>
      </Row>

      

      {/* 拖拽面板 */}
      <Board initial={data.medium} withScrollableColumns />
    </>
  );
}

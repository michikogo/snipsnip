import { useState, useEffect } from "react";
import "./App.css";
import "antd/dist/antd.css";
import { Row, Col } from "antd";

import FormComponent from "./Component/FormComponent";
import TableComponent from "./Component/TableComponent";

function App() {
  const [URLData, setURLData] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3001/read")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setURLData(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [refresh]);

  const handleRefresh = () => {
    setRefresh(!refresh);
    // console.log(refresh);
  };
  return (
    <div className="main-container">
      <Row>
        <Col span={24}>
          <h1>URL Shortening Tool</h1>
        </Col>
      </Row>
      <Row className="main-form">
        <Col span={24}>
          <FormComponent handleRefresh={handleRefresh} />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <TableComponent URLData={URLData} handleRefresh={handleRefresh} />
        </Col>
      </Row>
    </div>
  );
}

export default App;

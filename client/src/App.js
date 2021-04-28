import "./App.css";
import "antd/dist/antd.css";
import { Row, Col, Input } from "antd";

import FormComponent from "./Component/FormComponent";
import TableComponent from "./Component/TableComponent";

function App() {
  return (
    <div className="main-container">
      <Row>
        <Col span={24}>
          <h1>URL Shortening Tool</h1>
        </Col>
      </Row>
      <Row className="main-form">
        <Col span={24}>
          <FormComponent />
          <Row style={{ padding: "15px 100px" }}>
            <Col span={24}>
              <Input
                style={{ textAlign: "center" }}
                placeholder="new url is placed here"
                bordered={false}
              />
            </Col>
          </Row>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <TableComponent />
        </Col>
      </Row>
    </div>
  );
}

export default App;

import React, { useState } from "react";
import { Row, Col, Form, Input, Button } from "antd";

const FormComponent = () => {
  const [fullURL, setFullURL] = useState("");
  const [shortURL, setShortURL] = useState("");
  const [showNewURL, setShowNewURL] = useState(false);
  const [finalURL, setFinalURL] = useState("");

  const handleSubmit = () => {
    // check if custom url is made
    var tempShortURL;
    if (shortURL === "") {
      const rand = 1 + Math.random() * (100000 - 1000);
      tempShortURL = `https://www.snipsnip.com/${Math.floor(rand)}`;
    } else {
      tempShortURL = `https://www.snipsnip.com/${shortURL}`;
    }
    const newData = { fullURL, shortURL: tempShortURL, click: 0 };
    console.log(newData);

    // Place in db
    fetch("http://localhost:3001/insert", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newData),
    })
      .then(() => {
        console.log("Insert Data");
        setShowNewURL(true);
        setFinalURL(tempShortURL);
      })
      .catch((err) => {
        throw err;
      });
  };

  return (
    <div>
      <Form
        name="customized_form_controls"
        // layout="inline"
        style={{ justifyContent: "center" }}
        onFinish={handleSubmit}
      >
        <Form.Item
          name="fullURL"
          rules={[{ required: true, message: "Not a valid URL" }]}
        >
          <Input
            value={fullURL}
            onChange={(e) => setFullURL(e.target.value)}
            placeholder="Original URL"
            style={{ width: "55vh", height: "5vh" }}
          />
        </Form.Item>
        <Form.Item name="shortURL">
          <Input
            value={shortURL}
            onChange={(e) => setShortURL(e.target.value)}
            placeholder="Custom URL Name (Optional)"
            style={{ width: "55vh", height: "5vh" }}
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            style={{ alignItems: "right" }}
          >
            Create
          </Button>
        </Form.Item>
      </Form>
      {showNewURL && (
        <div>
          <Row>
            <Col span={24}>New URL</Col>
          </Row>
          <Row style={{ margin: "1vh 14vh" }}>
            <Col
              span={24}
              style={{
                width: "50%",
                padding: "5px 15px",
                border: "1px solid #d9d9d9",
                borderRadius: "2px",
                cursor: "pointer",
              }}
            >
              {finalURL}
            </Col>
          </Row>
        </div>
      )}
    </div>
  );
};

export default FormComponent;

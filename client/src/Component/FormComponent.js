import React, { useState } from "react";
import { Form, Input, Button, Avatar } from "antd";

const FormComponent = () => {
  const formRef = React.createRef();

  const [fullURL, setFullURL] = useState("");

  const handleSubmit = (value) => {
    const rand = 1 + Math.random() * (100 - 1);
    const shortURL = Math.floor(rand);
    const newData = { fullURL, shortURL };
    // console.log(newData);

    formRef.current.resetFields();
    fetch("http://localhost:3001/insert", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newData),
    })
      .then(() => {
        console.log("Insert Data");
      })
      .catch((err) => {
        throw err;
      });
  };

  return (
    <Form
      name="customized_form_controls"
      layout="inline"
      style={{ justifyContent: "center" }}
      // onSubmit with ref to clear form
      onFinish={handleSubmit}
      ref={formRef}
    >
      {/* URL Link */}
      <Form.Item
        name="fullURL"
        rules={[
          {
            required: true,
            message: "Missing URL ",
          },
        ]}
      >
        <Input
          label="fullURL"
          value={fullURL}
          onChange={(e) => setFullURL(e.target.value)}
          style={{ width: "55vh", height: "5vh" }}
        />
      </Form.Item>
      {/* SUBMIT BUTTON */}
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          style={{ width: "9vh", height: "5vh" }}
        >
          <Avatar
            shape="square"
            size={24}
            src={require(`../Assets/paper-plane.png`).default}
          />
        </Button>
      </Form.Item>
    </Form>
  );
};

export default FormComponent;

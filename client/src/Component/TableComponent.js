import { useState } from "react";
import { Table, Tag, Modal, Input, Row, Col, Form } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const TableComponent = ({ URLData, handleRefresh }) => {
  // record passes the specific object
  const handleSpecificURL = (record) => {
    const handleClick = ++record.click;

    const updateData = {
      fullURL: record.fullURL,
      shortURL: record.shortURL,
      click: handleClick,
    };
    console.log(updateData);

    const id = record._id;
    fetch(`http://localhost:3001/update/${id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updateData),
    })
      .then((res) => {
        console.log(`Update`);
        console.log(res.json());
        handleRefresh();
      })
      .catch((err) => {
        console.log(err);
      });

    // fetch(`http://localhost:3001/update/${id}`)
    //   .then((res) => {
    //     console.log("Update");
    //     console.log(res);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };

  const [showModal, setShowModal] = useState(false);
  const [showError, setShowError] = useState(false);
  const [newShortURL, setNewShortURL] = useState(null);

  const handleNew = (record) => {
    if (newShortURL === null) {
      setShowError(true);
    } else {
      const updateData = {
        shortURL: newShortURL,
      };
      console.log(updateData);

      const id = record._id;
      fetch(`http://localhost:3001/updateShortURL/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updateData),
      })
        .then((res) => {
          console.log(`Update`);
          console.log(res.json());
          handleRefresh();
          setNewShortURL(null);
          setShowError(false);
          setShowModal(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleCancel = () => {
    setShowError(false);
    setShowModal(false);
  };

  const handleDelete = (record) => {
    const id = record._id;
    fetch(`http://localhost:3001/delete/${id}`, {
      method: "DELETE",
    }).then(() => {
      console.log("Delete");
      handleRefresh();
    });
  };

  const columns = [
    {
      title: "Short URL",
      dataIndex: "shortURL",
      render: (text, record) => (
        <a
          href={record.fullURL}
          target="_blank"
          onClick={() => handleSpecificURL(record)}
        >{`https://www.snipsnip.com${text}`}</a>
      ),
    },
    {
      title: "Full URL",
      dataIndex: "fullURL",
      render: (text) => <a href={text}>{text}</a>,
    },
    {
      title: "Click",
      dataIndex: "click",
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => (
        <div>
          <Tag color="geekblue" onClick={() => setShowModal(true)}>
            <EditOutlined /> Edit
          </Tag>
          <Modal
            title="Basic Modal"
            visible={showModal}
            onOk={() => handleNew(record)}
            onCancel={() => handleCancel()}
          >
            <Form>
              <Form.Item label="Current Short URL Name">
                <Input
                  placeholder={`https://www.snipsnip.com${record.shortURL}`}
                  disabled
                />
              </Form.Item>
              {!showError && (
                <Form.Item label="New Short URL Name">
                  <Input
                    addonBefore="https://www.snipsnip.com/"
                    value={newShortURL}
                    onChange={(e) => setNewShortURL(e.target.value)}
                  />
                </Form.Item>
              )}
              {showError && (
                <Form.Item
                  label="New Short URL Name"
                  hasFeedback
                  validateStatus="error"
                  help="Place a new URL name"
                >
                  <Input
                    addonBefore="https://www.snipsnip.com/"
                    value={newShortURL}
                    onChange={(e) => setNewShortURL(e.target.value)}
                  />
                </Form.Item>
              )}
            </Form>
          </Modal>
          <Tag color="magenta" onClick={() => handleDelete(record)}>
            <DeleteOutlined /> Delete
          </Tag>
        </div>
      ),
    },
  ];
  return (
    <div>
      <Table
        columns={columns}
        dataSource={URLData}
        pagination={{ pageSize: 5 }}
      />
    </div>
  );
};

export default TableComponent;

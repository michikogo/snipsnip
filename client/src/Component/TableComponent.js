import { Table } from "antd";
import { useState } from "react";

const TableComponent = ({ URLData }) => {
  // record passes the specific object
  const handleSpecificURL = (record) => {
    console.log(record);
    const data = {
      fullURL: record.fullURL,
      shortURL: record.shortURL,
      click: record.click,
    };

    const id = record._id;
    fetch(`http://localhost:3001/update/${id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data }),
    });
  };

  const columns = [
    {
      title: "Short URL",
      dataIndex: "shortURL",
      render: (text, record) => (
        <a
          // href={text}
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

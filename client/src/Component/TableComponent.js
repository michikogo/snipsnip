import { Table } from "antd";

const TableComponent = ({ URLData }) => {
  const columns = [
    {
      title: "Short URL",
      dataIndex: "shortURL",
      render: (text) => <a href={text}>{text}</a>,
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
        // scroll={{ y: 240 }}
      />
    </div>
  );
};

export default TableComponent;

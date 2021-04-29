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
        pagination={false}
        columns={columns}
        rowKey={(URLData) => URLData.id}
        dataSource={URLData}
      />
    </div>
  );
};

export default TableComponent;

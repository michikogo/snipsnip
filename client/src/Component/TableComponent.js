import { Table, Tag } from "antd";
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

  const handleSave = (shortURL) => {
    alert("https://www.snipsnip.com" + shortURL);
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
          <Tag color="geekblue" onClick={() => handleSave(record.shortURL)}>
            <EditOutlined /> Edit
          </Tag>
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

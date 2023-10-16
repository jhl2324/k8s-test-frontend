import React, { useEffect, useState } from "react";
import { Button, Form, Input, Divider, List, Space, Descriptions } from "antd";
import { Table, notification, Alert, Spin } from "antd";
import spinner from "../../assets/images/spinner.gif";
import axios from "axios";
import { DownloadOutlined, LoadingOutlined } from "@ant-design/icons";
const DownloadForm = (props) => {
  const columns = [
    {
      title: "FileName",
      dataIndex: "fileName",
    },
    {
      title: "Extension",
      dataIndex: "extension",
    } /*
    {
      title: "FileSize",
      dataIndex: "FileSize",
    },
    {
      title: "Preview",
      dataIndex: "",
    },*/,
  ];

  let [selectedScenarioFiles, setSelectedScenarioFiles] = useState([]);
  let [selectedFOTFiles, setSelectedFOTFiles] = useState([]);

  let scenarioRowSelection = {
    onClick: () => {},
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedScenarioFiles(selectedRows);
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === "Disabled User",
      name: record.name,
    }),
  };
  let FOTRowSelection = {
    onClick: () => {},
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedFOTFiles(selectedRows);
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === "Disabled User",
      name: record.name,
    }),
  };

  const download = () => {
    props.loading(true);
    let filepaths = [];
    selectedScenarioFiles.map((item) => {
      filepaths.push(item.filepath);
    });
    selectedFOTFiles.map((item) => {
      filepaths.push(item.filepath);
    });

    axios
      .post("/api/download-by-paths", {
        filepath: filepaths,
      })
      .then(async ({ data }) => {
        return await fetch(`/api/get-temp-file/${data.uuid}`).then(
          (response) => {
            response.blob().then((blob) => {
              const url = window.URL.createObjectURL(blob);
              console.log(url);
              const a = document.createElement("a");
              const filename =
                "SOTIF_" +
                response.headers.get("content-disposition").substring(22, 62);
              console.log(filename);
              a.href = url;
              a.download = filename;
              a.click();
            });
          }
        );
      })
      .then(() => {
        props.loading(false);
      });
  };
  return (
    <div>
      <Table
        rowSelection={{ ...scenarioRowSelection }}
        columns={columns}
        dataSource={props.scenarioResult}
      />
      <Table
        rowSelection={{ ...FOTRowSelection }}
        columns={columns}
        dataSource={props.FOTResult}
      />
      <Divider orientation="center" />

      <Button type="primary" icon={<DownloadOutlined />} onClick={download}>
        Download
      </Button>
    </div>
  );
};
export default DownloadForm;

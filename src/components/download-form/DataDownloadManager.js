import React, { useState } from "react";
import InputQuery from "./InputQuery";
import DownloadForm from "./DownloadForm";
import { Alert, Spin, Switch } from "antd";
import "./DataDownloadManager.css";
import spinner from "../../assets/images/spinner.gif";
const DataDownloadManager = () => {
  let [downloadLoading, setDownloadLoading] = useState(false);
  let [queryLoading, setQueryLoading] = useState(false);

  let [concreteScenarioQueryResult, setConcreteScenarioQueryResult] = useState(
    []
  );

  let [FOTQueryResult, setFOTQueryResult] = useState([]);

  const toggleQueryLoading = (checked) => {
    setQueryLoading(checked);
  };
  const toggleDownloadLoading = (checked) => {
    console.log(checked);
    setDownloadLoading(checked);
  };
  const processQueryResult = (scenarioResult, FOTResult) => {
    setConcreteScenarioQueryResult(scenarioResult);
    setFOTQueryResult(FOTResult);
  };

  return (
    <div>
      <div style={{ position: "relative" }}>
        {queryLoading ? (
          <div class="loading">
            <img src={spinner} class="spinner" />
          </div>
        ) : null}
        <InputQuery
          loading={toggleQueryLoading}
          queryResult={processQueryResult}
        />
      </div>

      <div style={{ position: "relative" }}>
        {downloadLoading ? (
          <div class="loading">
            <img src={spinner} class="spinner" />
          </div>
        ) : null}
        <DownloadForm
          loading={toggleDownloadLoading}
          scenarioResult={concreteScenarioQueryResult}
          FOTResult={FOTQueryResult}
        />
      </div>
    </div>
  );
};

export default DataDownloadManager;

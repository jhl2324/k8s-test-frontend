import React, { useEffect, useState } from "react";
import { Button, Form, Input } from "antd";
import { notification } from "antd";
import axios from "axios";
import {
  SearchOutlined,
  CheckCircleOutlined,
  EditOutlined,
} from "@ant-design/icons";

const InputQuery = (props) => {
  let scenarioResult = [];
  let FOTResult = [];
  let [form] = Form.useForm();

  let [registerScenarioQueryBtn, setRegisterScenarioQueryBtn] = useState(true);
  let [registerFOTQueryBtn, setRegisterFOTQueryBtn] = useState(true);

  let canSubmit = (values) => {
    if (values.concreteScenario !== undefined || values.FOT !== undefined) {
      submitQueries(values);
    } else {
      notification["warning"]({ message: "제출할 쿼리를 입력해주세요." });
    }
  };
  let setScenarioResult = (response) => {
    console.log("시나리오는성공");
    console.log(response);
    scenarioResult = [];
    response.data.concreteScenario.map((path, idx) => {
      scenarioResult.push({
        key: idx,
        fileName: path.split("\\").at(-1).replace(".xosc", ""),
        extension: "xosc",
        FileSize: "",
        filepath: path,
      });
    });
  };
  let setFOTResult = (response) => {
    console.log("FOT는 성공");
    console.log(response);
    FOTResult = [];
    response.data.FOT.map((path, idx) => {
      FOTResult.push({
        key: idx,
        fileName: path.split("\\").at(-1).replace(".mat", ""),
        extension: "mat",
        FileSize: "",
        filepath: path,
      });
    });
  };
  let submitQueries = async (values) => {
    console.log(values);
    form.resetFields();
    props.loading(true);
    await axios
      .post("/api/query/get-file-by-query", { values })

      .then(function (response) {
        if (
          response.data.concreteScenario === "잘못된 시나리오 쿼리입니다." &&
          response.data.FOT === "잘못된 FOT 쿼리입니다."
        ) {
          throw "잘못된 시나리오 및 FOT 쿼리입니다.";
        }
        if (response.data.concreteScenario === "잘못된 시나리오 쿼리입니다.") {
          setFOTResult(response);
          throw "잘못된 시나리오 쿼리입니다.";
        }
        if (response.data.FOT === "잘못된 FOT 쿼리입니다.") {
          setScenarioResult(response);
          throw "잘못된 FOT 쿼리입니다.";
        } else {
          setScenarioResult(response);
          setFOTResult(response);
        }
        props.queryResult(scenarioResult, FOTResult);
        props.loading(false);
      })
      .catch((err) => {
        console.log(err);
        if (typeof err !== Object) notification["warning"]({ message: err });
        props.queryResult(scenarioResult, FOTResult);
        props.loading(false);
      });
  };

  return (
    <div>
      <Form form={form} layout="vertical" onFinish={canSubmit}>
        <Form.Item
          label="Concrete Scenario"
          name="concreteScenario"
          rules={[
            {
              message: "Please input query for concrete scenario",
            },
          ]}
        >
          <Input
            size="large"
            placeholder="Query for concrete scenario"
            disabled={!registerScenarioQueryBtn}
          />
        </Form.Item>
        <Button
          type="default"
          icon={<CheckCircleOutlined />}
          disabled={!registerScenarioQueryBtn}
          onClick={() => setRegisterScenarioQueryBtn(!registerScenarioQueryBtn)}
        >
          Query Register
        </Button>
        <Button
          type="default"
          icon={<EditOutlined />}
          disabled={registerScenarioQueryBtn}
          onClick={() => setRegisterScenarioQueryBtn(!registerScenarioQueryBtn)}
        >
          Edit
        </Button>

        <Form.Item
          label="FOT data"
          name="FOT"
          rules={[{ message: "Please input query for FOT data" }]}
          style={{ marginTop: "3vh" }}
        >
          <Input
            size="large"
            placeholder="Query for FOT"
            disabled={!registerFOTQueryBtn}
          />
        </Form.Item>
        <Form.Item
          name="FOTCropIndex"
          rules={[{ message: "Please input Index of Cropping Event" }]}
          style={{ marginTop: "2vh" }}
        >
          <Input
            size="large"
            placeholder="Index of Cropping Event for FOT"
            disabled={!registerFOTQueryBtn}
          />
        </Form.Item>
        <Form.Item
          name="FOTCropInterval"
          rules={[{ message: "Please input Cropping Interval" }]}
          style={{ marginTop: "2vh" }}
        >
          <Input
            size="large"
            placeholder="Cropping Interval for FOT"
            disabled={!registerFOTQueryBtn}
          />
        </Form.Item>
        <Button
          type="default"
          icon={<CheckCircleOutlined />}
          disabled={!registerFOTQueryBtn}
          onClick={() => setRegisterFOTQueryBtn(!registerFOTQueryBtn)}
        >
          Query Register
        </Button>
        <Button
          type="default"
          icon={<EditOutlined />}
          disabled={registerFOTQueryBtn}
          onClick={() => setRegisterFOTQueryBtn(!registerFOTQueryBtn)}
        >
          Edit
        </Button>

        <Form.Item style={{ marginTop: "3vh" }}>
          <Button type="primary" htmlType="submit" icon={<SearchOutlined />}>
            Submit Queries
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default InputQuery;

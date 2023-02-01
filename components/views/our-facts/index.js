import {
  EditOutlined,
  CloseCircleOutlined,
  CheckOutlined,
} from "@ant-design/icons";
import { Button, Col, Row, Tooltip, Input, InputNumber } from "antd";
import FlexDiv from "components/utils/flex-div";
import Text from "components/utils/text";
import { useCallback, useState } from "react";
import styled from "styled-components";

// styles
const StyledFactItem = styled(FlexDiv)`
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  position: relative;
  > button {
    position: absolute;
    top: 20px;
    right: 20px;
  }
  > button:last-of-type {
    top: 60px;
  }
  > button:first-of-type {
    top: 20px;
  }
`;

function FactItem({ title, count }) {
  const [edit, setEdit] = useState(false);

  // functions
  const handleEditMode = useCallback(() => {
    setEdit((prev) => !prev);
  }, [edit]);

  return (
    <StyledFactItem
      padding={30}
      direction="column"
      alignItems="center"
      gap={10}
      height={130}
    >
      <Text as="h2" bold="bold">
        {edit ? <Input placeholder="Title" defaultValue={title} /> : title}
      </Text>
      <Text bold="bold">
        {edit ? (
          <InputNumber placeholder="Title" defaultValue={count} />
        ) : (
          count
        )}
      </Text>
      <Tooltip placement="top" title={edit ? "Cancel" : "Edit"}>
        <Button shape="circle" type="link" onClick={handleEditMode}>
          {edit ? <CloseCircleOutlined /> : <EditOutlined />}
        </Button>
      </Tooltip>
      {edit && (
        <Tooltip placement="top" title={"Ok"}>
          <Button shape="circle" type="link" onClick={handleEditMode}>
            <CheckOutlined />
          </Button>
        </Tooltip>
      )}
    </StyledFactItem>
  );
}

export default function OurFactsPageContent() {
  return (
    <Row gutter={[24, 24]}>
      <Col span={24}>
        <FlexDiv alignItems="center">
          <FlexDiv>
            <Text as="h1">Facts</Text>
          </FlexDiv>
          <FlexDiv></FlexDiv>
        </FlexDiv>
      </Col>
      <Col span={24}>
        <Row gutter={[24, 24]}>
          <Col span={6}>
            <FactItem count={110} title={"Companies"} />
          </Col>
          <Col span={6}>
            <FactItem count={70} title={"Team Members"} />
          </Col>
          <Col span={6}>
            <FactItem count={22} title={"Countries"} />
          </Col>
          <Col span={6}>
            <FactItem count={110} title={"Clients"} />
          </Col>
        </Row>
      </Col>
    </Row>
  );
}

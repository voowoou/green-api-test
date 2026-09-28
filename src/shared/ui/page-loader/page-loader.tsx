import { Flex, Spin } from "antd";

export const PageLoader = () => (
  <Flex align="center" className="page-loader" justify="center">
    <Spin size="large" />
  </Flex>
);

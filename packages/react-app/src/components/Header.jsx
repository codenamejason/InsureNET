import React from "react";
import { PageHeader } from "antd";

export default function Header() {
  return (
    <a href="https://github.com/codenamejason/InsureNET" target="_blank" rel="noopener noreferrer">
      <PageHeader
        title="InsureNET"
        subTitle="Parametric Hurricane Coverage When you Need it Most"
        style={{ cursor: "pointer" }}
      />
    </a>
  );
}

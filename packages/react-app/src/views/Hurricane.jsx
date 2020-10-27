import React, { useCallback, useEffect, useState } from "react";
import { Button, List, Divider, Input, Card, DatePicker, Slider, Switch, Progress, Spin, Form } from "antd";
import { SyncOutlined } from '@ant-design/icons';
import { Address, AddressInput, Balance } from "../components";
import { useContractReader, useEventListener } from "../hooks";
import { parseEther, formatEther } from "@ethersproject/units";

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

const Hurricane = ({mainnetProvider, ropstenProvider, address, userProvider, localProvider, yourLocalBalance, price, tx, readContracts, writeContracts }) => {
  const [season, setSeason] = useState(0);
  const [zipCode, setZipCode] = useState(0);
  const [policyInfo, setPolicyInfo] = useState({})


  return (
    <div style={{border:"1px solid #cccccc", padding:16, width:350, margin:"auto", marginTop:64}}>
      <h2>Hurricane Parametric Policy</h2>
      <Divider />
      <div style={{margin:8}}>
        <Form {...layout} name='purchase-policy' initialValues={{ remember: true }}>
          <Form.Item label='Season' name='season' rules={[{ required: true, message: 'Please select a season' }]} >
            <Input onChange={(e)=>{setSeason(e.target.value)}} />
          </Form.Item>
          <Form.Item label='Zip Code' name='zip-code' rules={[{ required: true, message: 'Please enter a zip code' }]}>
            <Input onChange={(e)=>{setZipCode(e.target.value)}} />
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Button onClick={()=>{
              console.log("Policy purchased => ", season, zipCode)
              /* look how you call setPurpose on your contract: */
              tx( writeContracts.Hurricane.purchasePolicy(season, zipCode, {
                value: parseEther(".5")
              }))
            }}>
              Buy Policy
            </Button>
          </Form.Item>
          
        </Form>
      </div>
    </div>
  );
}

export default Hurricane;
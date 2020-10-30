import React, { useCallback, useEffect, useState } from "react";
import { Button, Checkbox, Tabs, Switch, Progress, List, Divider, Input, Card, DatePicker, Slider, Spin, Form, Select, Row, Col, Menu, message } from "antd";
import { StepForwardOutlined, SyncOutlined, UserOutlined } from '@ant-design/icons';
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
    offset: 16,
    span: 16,
  },
};

const { TabPane } = Tabs;
const { Option } = Select;
const style = { background: '#306E7E', color: '#E7C8C0', padding: '8px', margin: '8px' };

const CheckboxGroup = Checkbox.Group;
const operations = <div><Progress percent={25} steps={4} size='default' strokeColor="#33FF21" />&nbsp;<Button>Next</Button></div>;

const Hurricane = ({mainnetProvider, ropstenProvider, address, userProvider, localProvider, yourLocalBalance, price, tx, readContracts, writeContracts }) => {
  const [season, setSeason] = useState(2021);
  const [premium, setPremium] = useState(.15);
  const [policyInfo, setPolicyInfo] = useState({});
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');  
  const [zipCode, setZipCode] = useState(12345);
  

  const onSeasonChange = (value) => {
    switch (value) {
      case '2021':
        setSeason(2021)
        return;
      case '2022':
        setSeason(2022)
        return;
      case '2023':
        setSeason(2022)
        return;    
      default:
        setSeason(2021)
        return;
    }
  }

  const success = () => {
    message
      .loading('Transaction in progress..', 5)
      .then(() => message.success('Transaction finished', 2.5))
      //.then(() => message.info('Loading finished is finished', 2.5));
  };

  const onFinish = (values) => {
    console.log(`Success => ${values}`)
  }

  const onFinishFailed = (errorInfo) => {
    console.log(`Failed => ${errorInfo}`)
  }

  return (
    <div style={style}>
      <div>
        <Tabs tabBarExtraContent={operations}>
          {/* Coverage Selection Tab */}
          <TabPane tab="Coverage" key="1">
            <h2>Select Coverage</h2>
            <Form {...layout} name='purchase-policy' initialValues={{ remember: true }} onFinish={onFinish} onFinishFailed={onFinishFailed}>
            <Row gutter={16}>
              <Col span={8}>
              <Form.Item label='Season' name='season' rules={[{ required: true, message: 'Please select a season' }]} >
                  <Select
                    placeholder="Select a season for coverage"
                    onChange={onSeasonChange}
                    allowClear
                  >
                    <Option value="2021">2021</Option>
                    <Option value="2022">2022</Option>
                    <Option value="2023">2023</Option>
                  </Select>
                  {/* <Input onChange={(e)=>{setSeason(e.target.value)}} /> */}
                </Form.Item>
              </Col>
              <Col span={8}>
              <Form.Item label='Zip Code' name='zip-code' rules={[{ required: true, message: 'Please enter a zip code' }]}>
                  <Input
                    onChange={(e)=>{ setZipCode(e.target.value); }}
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
              <Form.Item label='Premium' name='premium' rules={[{ required: true, message: 'Please enter your premium in ETH' }]}>
                  <Input
                    type='number'
                    onChange={(e) => { setPremium(e.target.value); }}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
              <Form.Item {...tailLayout}>
                  <Button
                    type='primary'
                    htmlType='submit'
                    onClick={()=>{
                      success();
                      console.log("Policy purchased => ", season, zipCode, premium)
                      tx( writeContracts.Hurricane.purchasePolicy(season, zipCode, {
                        value: parseEther(premium)
                      }))
                    }}
                  >
                    Get Rates
                  </Button>
                </Form.Item>             
              </Col>
            </Row>
            </Form>      
               
               
               
               
        </TabPane>
        {/* Insured Info */}
        <TabPane tab="Insured Info" key="2">
          <Form>
            <Row gutter={16} style={{ padding: '8px' }}>        
              <Col span={12}>              
                <Form.Item>
                   <Input size='middle' placeholder='First Name' prefix={<UserOutlined />} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item>
                  <Input size='middle' placeholder='Last Name' />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16} style={{ padding: '8px' }}>
              <Col span={12}>
                <Form.Item>
                   <Input size='middle' placeholder='Address' />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item>
                  <Input size='middle' placeholder='City' />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16} style={{ padding: '8px' }}>
              <Col span={12}>
                <Form.Item>
                   <Input size='middle' placeholder='State' />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item>
                  <Input size='middle' placeholder='Zip Code' />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={24}>
              <Form.Item {...tailLayout}>
                  <Button
                    type='primary'
                    htmlType='submit'
                    onClick={()=>{
                      success();
                      console.log("Checking address => ")
                      // ToDo: Validate the address
                    }}
                  >
                    Check Address
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </TabPane>
        {/* Confirmation Tab */}
        <TabPane tab="Confirmation" key="3">
          
        </TabPane>
        {/* Payment Tab */}
        <TabPane tab="Payment" key="4">
          
        </TabPane>
      </Tabs>
      </div>     
      <div>

      </div>
    </div>
  );
}

export default Hurricane;
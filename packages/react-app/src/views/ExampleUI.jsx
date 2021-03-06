import React, { useCallback, useEffect, useState } from "react";
import { Button, List, Divider, Input, Card, DatePicker, Slider, Switch, Progress, Spin } from "antd";
import { SyncOutlined } from '@ant-design/icons';
import { Address, AddressInput, Balance } from "../components";
import { useContractReader, useEventListener } from "../hooks";
import { parseEther, formatEther } from "@ethersproject/units";
import { local } from "web3modal";

export default function ExampleUI({address, mainnetProvider, userProvider, localProvider, yourLocalBalance, price, tx, readContracts, writeContracts }) {

  const [newPurpose, setNewPurpose] = useState("loading...");
  const [season, setSeason] = useState(0);
  const [zipCode, setZipCode] = useState(0);
  const [policyInfo, setPolicyInfo] = useState({})
  const [policyId, setPolicyId] = useState(0)
  

  // keep track of a variable from the contract in the local React state:
  // const purpose = useContractReader(readContracts,"YourContract", "purpose")
  // console.log("🤗 purpose:",purpose)

  //📟 Listen for broadcast events
  const setOutcomeEvents = useEventListener(readContracts, "Hurricane", "OutcomeReported", localProvider, 1);
  console.log("📟 OutcomeReported events:", setOutcomeEvents)

  const policyEvents = useEventListener(readContracts, "Hurricane", "PolicyCreated", localProvider, 1);
  console.log("📟 PolicyCreated events:", policyEvents)

  const nftEvents = useEventListener(readContracts, "PolicyNFT", "PolicyTokenIssued", localProvider, 1);
  console.log(`📟 NFT Events => ${nftEvents}`);

  return (
    <div>
      {/*
        ⚙️ Here is an example UI that displays and sets the purpose in your smart contract:
      */}
      <div style={{border:"1px solid #cccccc", padding:16, width:400, margin:"auto",marginTop:64}}>
        <h2>Test UI:</h2>        
     
        <Divider />
        Hurricane Contract Address:
        <Address
            value={readContracts ? readContracts.Hurricane.address : readContracts}
            ensProvider={mainnetProvider}
            fontSize={16}
        />
        <Divider />
        <div style={{margin:8}}>
          <Button onClick={()=>{
            /*
              you can also just craft a transaction and send it to the tx() transactor
              here we are sending value straight to the contract's address:
            */
            tx({
              to: writeContracts.Hurricane.address,
              value: parseEther("0.01")
            });
            /* this should throw an error about "no fallback nor receive function" until you add it */
          }}>Send Value of 0.01 ETH to Contract</Button>
        </div>

        <div style={{margin:8}}>
          <Button onClick={()=>{
            /* look how we call setPurpose AND send some value along */
            tx( writeContracts.Hurricane.purchasePolicy(2021, 32223, {
              value: parseEther("1"),
              from: '0xa0df350d2637096571F7A701CBc1C5fdE30dF76A'
            }))
            /* this will fail until you make the setPurpose function payable */
          }}>Buy Policy for 1 ETH</Button>
        </div>
        <div style={{margin:8}}>
        Policy Id:
        <Input onChange={(e) => {
            setPolicyId(e.target.value)
        }} />
        <Button onClick={()=>{
            /* look how we call setPurpose AND send some value along */
            tx( writeContracts.Hurricane.getPolicy(policyId) )
              .then((res) => {
                console.table(`${res}`);
                setPolicyInfo(res);
              })
            /* this will fail until you make the setPurpose function payable */
          }}>Get Policy</Button>
        </div>
        

      </div>
      <div style={{ width:600, margin: "auto", marginTop:32, paddingBottom:32 }}>
          Policy:
          <div>
            Owner:  {policyInfo.owner}
          </div>
         

      </div>
      {/*
        📑 Maybe display a list of events?
          (uncomment the event and emit line in YourContract.sol! )
      */}
       <div style={{ width:600, margin: "auto", marginTop:32, paddingBottom:32 }}>
        <h2>Policy Events:</h2>
        <List
          bordered
          dataSource={policyEvents}
          renderItem={item => (
            <List.Item>
              {item[0].toString()} => {item[1]} => {item[2].toString()}=> {item[3].toString()} => {formatEther(item[4])} => {item[5].toString()}
            </List.Item>
          )}
        />
      </div>
      <div style={{ width:600, margin: "auto", marginTop:32, paddingBottom:32 }}>
        <h2>NFT Events:</h2>
        <List
          bordered
          dataSource={nftEvents}
          renderItem={item => (
            <List.Item>
              <Address
                  value={item[0].toString()}
                  ensProvider={mainnetProvider}
                  fontSize={16}
                /> =>
                {item[1].toString()} => {item[2].toString()}              
            </List.Item>
          )}
        />
      </div>
       <div style={{ width:600, margin: "auto", marginTop:32, paddingBottom:32 }}>
        <h2>Outcome Events:</h2>
        <List
          bordered
          dataSource={setOutcomeEvents}
          renderItem={item => (
            <List.Item>
              <Address
                  value={item[0]}
                  ensProvider={mainnetProvider}
                  fontSize={16}
                /> =>
              {item[0].toString()}=>{item[1].toString()}=>{item[2].toString()}=>{item[3].toString()}
            </List.Item>
          )}
        />
      </div>
      {/* <div style={{ width:600, margin: "auto", marginTop:32, paddingBottom:32 }}>
        <h2>Purpose Events:</h2>
        <List
          bordered
          dataSource={setPurposeEvents}
          renderItem={item => (
            <List.Item>
              <Address
                  value={item[0]}
                  ensProvider={mainnetProvider}
                  fontSize={16}
                /> =>
              {item[1]}
            </List.Item>
          )}
        />
      </div> */}


     

    </div>
  );
}

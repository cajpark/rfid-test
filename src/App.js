import logo from './logo.svg';
import './App.css';
/* eslint-disable no-unused-vars */
import React, { useState} from 'react';

function App() {
  const [isScanning, setIsScanning] = useState(false);
  const [scanned, setScanned] = useState("");
  const ctrl = new AbortController();

  async function tryScan () {
    if(!isScanning){
      // eslint-disable-next-line no-undef
      const ndef = new NDEFReader();
      await ndef.scan({ signal: ctrl.signal });
      ndef.addEventListener("reading", ({ message, serialNumber }) => {
        const textDecoder = new TextDecoder(message.records[0].encoding);
        let s = textDecoder.decode(message.records[0].data).substring(0,10);
        const newStr2 = parseInt(s, 10);
        setScanned(newStr2);
        ctrl.abort();
      });
    }
    setIsScanning(!isScanning);
  }

  async function stopScan () {
    setIsScanning(!isScanning);
  }
  return (
    <div>
      {isScanning? 
        <div>
          <h1 >Scanning ...</h1> 
          <button onClick= {stopScan}>Stop</button>
        </div>
        :
        <div>
          <h1>Loading</h1>
          <button onClick= {tryScan}>Go!</button>
        </div>}
        {scanned?  <h1>{scanned}</h1> : <h1>not scanned</h1> 
}
    </div>
  );
}
export default App;

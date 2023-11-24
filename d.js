const axios=require('axios').default;
const crypto=require('crypto');

const base_url_smart_tbtc="https://api.bitaps.com/btc/testnet/v1/create/payment/address/distribution";
const base_url_smart_btc='https://api.bitaps.com/btc/v1/create/payment/address/distribution'
const cb_link="https://frozen-atoll-47887.herokuapp.com/api/test_cb_smartc";

const data={}
//data.forwarding_address_primary="1H2k4KVqXba7a7dZwXmhS8rr1soAEdi1Xy";//must be mine
//data.forwarding_address_secondary="1PJsmJzFgkAVWwqPvcEHvYELcCcvsFgACo";//must be client's one
//data.forwarding_address_primary_share="10%";//ctx.state.btc_percent;
//data.callback_link=cb_link;
//axios.post(base_url_smart_btc,data).then(function(d){console.log("data: ",d.data)}).catch(function(er){console.log('err: ',er)})
const url1="https://api.bitaps.com/btc/v1/create/wallet";
const url2="https://api.bitaps.com/btc/testnet/v1/create/wallet";
const url3="https://api.bitaps.com/eth/testnet/v1/create/wallet";
const url4="https://api.bitaps.com/eth/v1/create/wallet";
//data.password='1234';
//axios.post(url2,data).then(d=>{console.log("data: ",d.data)}).catch(function(er){console.log('err: ',er)})
/*
data:  {
  wallet_id: 'BTCuVrMTsR8yzfpnc34QxMmK4BPXsMWfiqDjuf7ziK6yP3Z4SnaWA',
  wallet_id_hash: 'b802085e39c2c5c5eab090f63f19024a31929db31f6969a5d13a22244f879974',
  currency: 'BTC'
}
*/
//axios.post(url3,data).then(d=>{console.log("data: ",d.data)}).catch(function(er){console.log('err: ',er.name)})
/*
 data:  {
  wallet_id: 'ETHuMg6Y931qjnCTwm7cwG8MhheDR7QWhPfdrA97MSUMTiq33Q3GC',
  currency: 'tETH'
}
*/
//axios.post(url4,data).then(d=>{console.log("data: ",d.data)}).catch(function(er){console.log('err: ',er.name)})
/*
 data:  {
  wallet_id: 'ETHvzDUBf9YX7cKCVbASC52EANBifYhKqETMoECeyp7Kizuy5unJn',
  currency: 'ETH'
}

*/
const url5="https://api.bitaps.com/btc/v1/create/wallet/payment/address";
data.wallet_id='ETHuwgjQXAJn9Up9zzbsJq9RGDFvAw9qKNe738ESo7G5KY77eLdRS';
axios.post(url5,data).then(d=>{console.log("data: ",d.data)}).catch(function(er){console.log('err: ',er.name)})
/*
 data:  {
  invoice: 'invQ957bZKbon1uvLbFfssKuiNLFfu9vDMFxiWtJ7bJN99us8fdG4',
  payment_code: 'PMTw1Jwx1a9HHcKwTAW3evB3ac27e7G6T6abHceEgqdWtZ6kjxMUS',
  address: '32N21nMkEeyGrJtAV31YE31dzjNupVWPMB',
  confirmations: 'depends on the amount',
  notification_link_domain: null,
  wallet_id_hash: 'b802085e39c2c5c5eab090f63f19024a31929db31f6969a5d13a22244f879974',
  currency: 'BTC'
}
*/
const url6="https://api.bitaps.com/btc/v1/wallet/state/"+data.wallet_id;
let hmac=crypto.createHmac('sha256', data.wallet_id);
  hmac.update(data.wallet_id+'111');
var sig=hmac.digest('hex');
//let hmac=crypto.createHmac('sha256', data.wallet_id+'111');
//let sig=hmac.update(data.wallet_id+'1234').digest('hex');
console.log(sig);
//axios.get(url6,{headers:{'Access-Nonce':'111','Access-Signature':sig}}).then(d=>{console.log("data: ",d.data)}).catch(function(er){console.log('err: ',er)})

//axios.post(url3, {}).then(d=>{console.log("data: ",d.data)}).catch(function(er){console.log('err: ',er.name)})

/*
 data:  {
 wallet_id: 'ETHuwgjQXAJn9Up9zzbsJq9RGDFvAw9qKNe738ESo7G5KY77eLdRS',
  currency: 'tETH',
  warning: 'Wallet without password is not secure'

}
*/
const url7="https://api.bitaps.com/eth/testnet/v1/create/wallet/payment/address";
data.wallet_id='ETHuwgjQXAJn9Up9zzbsJq9RGDFvAw9qKNe738ESo7G5KY77eLdRS';

//axios.post(url7, data).then(d=>{console.log("data: ",d.data)}).catch(function(er){console.log('err: ',er.name)})

/*
 data:  {
 invoice: 'invPTxry5YigbYmkvurXxcgU1XRJt5paRTnDEcTXGS9bvuStk5pUh',
  payment_code: 'PMTur7Hz8Z6G5vMPHZezzGQNWiVPvhZEukbPGLvU1LoRPzmeFee1k',
  address: '0x0C9Ea1bD4Eb304220f41d759266B5619D2e98cd7',
  confirmations: 12,
  callback_link: '',
  wallet_id: 'ETHuwgjQXAJn9Up9zzbsJq9RGDFvAw9qKNe738ESo7G5KY77eLdRS',
  currency: 'tETH'



 invoice: 'invPyrEJR3LLtUNRXcg3DAQNgHbJTi3EQ9VVmazmiGdJPHewVMXSw',
  payment_code: 'PMTvCiu8qjfTXafhh7jSf4sayVn3LSwhAYJ9CbMiikynSePzF9CVd',
  address: '0xb788EC04C0BBdBB61FbCC0E418D2590A06e64c65',
  confirmations: 12,
  callback_link: '',
  wallet_id: 'ETHuwgjQXAJn9Up9zzbsJq9RGDFvAw9qKNe738ESo7G5KY77eLdRS',
  currency: 'tETH'




}
*/
const url8="https://api.bitaps.com/eth/testnet/v1/create/payment/address";
//data.callback_link=
data.forwarding_address='0x5AE1e4b52ACc12E9dF6B236E155EE63Cdc1c5fa2'
//axios.post(url8, data).then(d=>{console.log("data: ",d.data)}).catch(function(er){console.log('err: ',er.name)})

/*
 data:  {
  invoice: 'invPouw1zS9L4hpiN1qeuBsxwHG1eoiEeVkpz6gZ7Z12XcNEbiUjW',
  payment_code: 'PMTvjXdsFGaZZPkmiVxiK7uUfRcjad8kjV1TYELwGWDoacUzVeUAi',
  address: '0x8a58C31b949B5aC7Bc45577C135916317Ae687f8',
  domain: '',
  domain_hash: '',
  confirmations: 12,
  callback_link: '',
  forwarding_address: '0x5AE1e4b52ACc12E9dF6B236E155EE63Cdc1c5fa2',
  currency: 'tETH'
}
*/
const url9="https://api.bitaps.com/eth/testnet/v1/wallet/send/payment/"+ data.wallet_id;
//data.receivers_list=[{"address":, "amount":}];
data.message={"format":"text","payload":"some text"};

//axios.post(url9, data).then(d=>{console.log("data: ",d.data)}).catch(function(er){console.log('err: ',er.name)})





var walletid= 'ETHuwgjQXAJn9Up9zzbsJq9RGDFvAw9qKNe738ESo7G5KY77eLdRS';

const url10="https://api.bitaps.com/eth/testnet/v1/wallet/state/"+walletid;

axios.get(url10 /*,{headers:{'Access-Nonce':'111','Access-Signature':sig}}*/).then(d=>{console.log("data: ",d.data)}).catch(function(er){console.log('err: ',er)})










































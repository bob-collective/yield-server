const sdk = require('@defillama/sdk');
const axios = require('axios');

const token = '0x9ba021b0a9b958b5e75ce9f6dff97c7ee52cb3e6';
const weth = '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2';

const getApy = async () => {
  const tvl =
    (await sdk.api.erc20.totalSupply({ target: token })).output / 1e18;

  const apyData = (await axios.get('https://dinero.xyz/api/apr')).data;
  const priceKey = `ethereum:${weth}`;
  const ethPrice = (
    await axios.get(`https://coins.llama.fi/prices/current/${priceKey}`)
  ).data.coins[priceKey]?.price;

  return [
    {
      pool: token,
      chain: 'ethereum',
      project: 'dinero-(pxeth)',
      symbol: 'apxeth',
      tvlUsd: tvl * ethPrice,
      apyBase: Number(apyData.apxEth),
      underlyingTokens: [weth],
    },
  ];
};

module.exports = {
  timetravel: false,
  apy: getApy,
  url: 'https://dineroismoney.com/pxeth/deposit',
};

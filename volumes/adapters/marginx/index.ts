import { SimpleVolumeAdapter } from "../../dexVolume.type";
import { getUniqStartOfTodayTimestamp } from "../../helper/getUniSubgraphVolume";
import fetchURL from "../../utils/fetchURL"

const historicalVolumeEndpoint = "https://trade.marginx.io/agg-server/api/v1/publicRankingData"

const fetch = async (timestamp: number) => {
  const dayTimestamp = getUniqStartOfTodayTimestamp(new Date(timestamp * 1000))
  const historicalVolume: any = (await fetchURL(historicalVolumeEndpoint))?.data.data;

  const totalVolume = historicalVolume.trading_volume
   
  const dailyVolume = historicalVolume.daily_trading_volume

  return {
    totalVolume: `${totalVolume}`,
    dailyVolume: dailyVolume ? `${dailyVolume}` : undefined,
    timestamp: dayTimestamp,
  };
};

const getStartTimestamp = async () => {
  const historicalVolume: any = (await fetchURL(historicalVolumeEndpoint))?.data.data
  return (new Date(historicalVolume.timestamp).getTime())
}

const adapter: SimpleVolumeAdapter = {
  volume: {
    cosmos: {
      fetch,
      runAtCurrTime: true,
      start: getStartTimestamp,
    },
  },
};

export default adapter;

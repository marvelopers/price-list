import React, { useState } from 'react';
import styled from '@emotion/styled';
import { CoinType } from 'src/model/market';
import { ModalHandler } from 'src/utils/ModalHandler';
import { ModalType } from 'src/constants/modal';
import { CurrencyType } from 'src/constants/currency';
import { useDispatch } from 'react-redux';
import { getCoinInfo, MarketPriceActions } from 'src/features/market/marketSlice';
import CoinName from '../CoinName';
import Percentage from '../Percentage';
import Price from '../Price';
import StarIcon from '../icons/StarIcon';
import { Button } from '../common/Button';

interface MarketListItemProps {
  coin: CoinType;
  currency: CurrencyType;
}
const MarketListItem = ({ coin, currency }: MarketListItemProps) => {
  const dispatch = useDispatch();
  const [selected, setSelected] = useState(false);

  const handleClickLike = () => {
    setSelected(!selected);
    dispatch(MarketPriceActions.likeCoin(coin));
  };

  const handleClickCoinName = (coinName: string) => {
    dispatch(getCoinInfo(coinName));
    ModalHandler.show(ModalType.Info, {
      title: `${coinName}`,
      contents: <CoinName text="coin" />,
    });
  };

  return (
    <Wrapper>
      <IconWrapper onClick={handleClickLike}>
        <StarIcon selected={selected} />
      </IconWrapper>
      <CoinName text={coin.id} onClickCoinName={handleClickCoinName} />
      <CoinName text={coin.symbol} />
      <Price currency={currency} num={coin.current_price} />
      <Percentage num={coin.price_change_percentage_1h_in_currency} />
      <Percentage num={coin.price_change_percentage_24h_in_currency} />
      <Percentage num={coin.price_change_percentage_7d_in_currency} />
      <Price currency={currency} num={coin.total_volume} />
    </Wrapper>
  );
};

export default MarketListItem;

const Wrapper = styled.li`
  height: 40px;
  border: 1px solid purple;
  /* display: grid; */

  div {
    display: inline-block;
    min-width: 150px;
  }
`;

const IconWrapper = styled(Button)`
  display: inline-block;
`;

// {
//   "id": "bitcoin",
//   "symbol": "btc",
//   "name": "Bitcoin",
//   "image": "https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579",
//   "current_price": 47100,
//   "market_cap": 884046810410,
//   "market_cap_rank": 1,
//   "fully_diluted_valuation": 987928057199,
//   "total_volume": 37503668110,
//   "high_24h": 47379,
//   "low_24h": 44669,
//   "price_change_24h": 2384.61,
//   "price_change_percentage_24h": 5.33282,
//   "market_cap_change_24h": 46199585882,
//   "market_cap_change_percentage_24h": 5.51408,
//   "circulating_supply": 18791837,
//   "total_supply": 21000000,
//   "max_supply": 21000000,
//   "ath": 64805,
//   "ath_change_percentage": -27.40623,
//   "ath_date": "2021-04-14T11:54:46.763Z",
//   "atl": 67.81,
//   "atl_change_percentage": 69277.50623,
//   "atl_date": "2013-07-06T00:00:00.000Z",
//   "roi": null,
//   "last_updated": "2021-08-20T13:13:04.780Z"
// },

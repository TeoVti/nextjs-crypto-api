import Link from 'next/link';
/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from 'react';
import Layout from '../../Components/Layout';

export default function Cryptos() {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [coins, setCoins] = useState([] as any[]);
  const [inputText, setInputText] = useState('');
  const [priceChanges, setPriceChanges] = useState('change_24h');

  useEffect(() => {
    setLoading(true);
    fetch('https://api.bitpanda.com/v1/masterdata')
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        setData(data);
        setCoins(data.data.attributes.cryptocoins);
      });
  }, []);

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    var lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  };

  const filteredData = coins.filter((el: any) => {
    //if no input, return the original
    if (inputText === '') {
      return el.attributes.symbol;
    }
    //return the item which contains the user input
    else {
      return el.attributes.name.toLowerCase().includes(inputText);
    }
  });

  const handleChange = (event: any) => {
    setPriceChanges(event.target.value);
  };

  if (isLoading) return <p>Loading...</p>;
  return (
    <div>
      <Layout />
      <div>
        <form>
          <select value={priceChanges} onChange={handleChange}>
            <option value="change_24h">1D</option>
            <option value="change_1w">7D</option>
            <option value="change_1m">30D</option>
          </select>
        </form>
        <input
          type="text"
          placeholder="Search Cryptocoin"
          onChange={inputHandler}
        ></input>
        <div>
          {filteredData.map((item) => (
            <div key={`crypto-${item.id}`} className="crypto-card">
              <Link href={`/crypto/${item.id}`} passHref>
                <div>
                  <div>{item.attributes.name}</div>
                  <img
                    className="card-img-top"
                    src={item.attributes.logo}
                    alt="Card image"
                  ></img>
                  <div>{item.attributes.avg_price}</div>
                  <div>{item.attributes.symbol}</div>
                  {priceChanges == 'change_24h' ? (
                    <div
                      className={
                        item.attributes.change_24h.includes('-')
                          ? 'negative-price'
                          : 'positive-price'
                      }
                    >
                      {item.attributes.change_24h}%
                    </div>
                  ) : priceChanges == 'change_1w' ? (
                    <div
                      className={
                        item.attributes.change_1w.includes('-')
                          ? 'negative-price'
                          : 'positive-price'
                      }
                    >
                      {item.attributes.change_1w}%
                    </div>
                  ) : priceChanges == 'change_1m' ? (
                    <div
                      className={
                        item.attributes.change_1m.includes('-')
                          ? 'negative-price'
                          : 'positive-price'
                      }
                    >
                      {item.attributes.change_1m}%
                    </div>
                  ) : (
                    ''
                  )}
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

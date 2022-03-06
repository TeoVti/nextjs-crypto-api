import Image from 'next/image';
import { useEffect, useState } from 'react';
import Layout from '../Components/Layout';

export default function Favorites() {
  const [data, setData] = useState(null);
  const [coinUrl, setCoinUrl] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [coins, setCoins] = useState([] as any[]);
  const [inputText, setInputText] = useState('');

  useEffect(() => {
    setLoading(true);
    fetch('https://api.bitpanda.com/v1/masterdata')
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        setData(data);
        const coins = data.data.attributes.cryptocoins;
        setCoinUrl(data.data.attributes.cryptocoins.logo);
        console.log(coinUrl);
        setCoins(coins);
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

  if (isLoading) return <p>Loading...</p>;
  return (
    <div>
      <Layout />
      <div>
        <input
          type="text"
          placeholder="Search Cryptocoin"
          onChange={inputHandler}
        ></input>
        {console.log(coins)}
        <div>
          {filteredData.map((item) => (
            <div key={item.id} className="crypto-card">
              {item.attributes.name}
              <img
                className="card-img-top"
                src={item.attributes.logo}
                alt="Card image"
              ></img>
              <div>{item.attributes.avg_price}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

import type { NextPage } from 'next';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import styles from '../styles/Home.module.css';

function Profile() {
  const [data, setData] = useState(null);
  const [commodities, setCommodities] = useState(null);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch('https://api.bitpanda.com/v1/masterdata')
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        setData(data);
        const bla = data.data.attributes.commodities;
        const map1 = bla.map((x: any) => x.attributes.name);
        console.log(typeof map1[0]);
        setCommodities(map1);
      });
  }, []);

  if (isLoading) return <p>Loading...</p>;

  return (
    <>
      <div>{commodities}</div>
      <input type="text" />
    </>
  );
}
export default Profile;

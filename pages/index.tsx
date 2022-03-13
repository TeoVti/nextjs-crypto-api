import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Layout from '../Components/Layout';
import bitcoin from '../public/bitcoin.png';
import styles from '../styles/Home.module.css';

function Profile() {
  return (
    <div className="homepage">
      <Layout />
      <div className="buy-button">
        <button className="button-29">BUY</button>
      </div>
    </div>
  );
}
export default Profile;

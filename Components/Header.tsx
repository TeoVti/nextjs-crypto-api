import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';

export default function Header() {
  const router = useRouter();

  const navRef = useRef<boolean | undefined>();

  return (
    <>
      <Link href="/">
        <a>HODL</a>
      </Link>
      <Link href="/">
        <a>HOME</a>
      </Link>
      <Link href="/crypto">
        <a>CRYPTO</a>
      </Link>
      <Link href="/favorites">
        <a>FAVORITES</a>
      </Link>
    </>
  );
}

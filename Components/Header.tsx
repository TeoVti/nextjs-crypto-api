import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';

export default function Header() {
  const router = useRouter();

  const navRef = useRef<boolean | undefined>();

  return (
    <>
      <Link href="#">
        <a>Favorites</a>
      </Link>
    </>
  );
}

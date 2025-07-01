'use client';

import Link from 'next/link';
import Image from "next/image";
import { ScrollLinked } from './ScrollLinked';
import { useRef, useState, useEffect } from 'react';

export function Nav() {
    const navRef = useRef(null);
    const [navHeight, setNavHeight] = useState(null);

    useEffect(() => {
        const onLoad = () => {
            if (navRef.current) {
                setNavHeight(navRef.current.offsetHeight);
            }
        };

        if (document.readyState === 'complete') {
            onLoad();
        } else {
            window.addEventListener('load', onLoad);
            return () => window.removeEventListener('load', onLoad);
        }
    }, []);

    return (
    <nav
        ref={navRef}
        className="sticky top-0 flex items-center space-x-10 bg-blue-100 pt-6 pb-6 w-full text-black z-30 *:z-49 overscroll-none"
    >
        {navHeight !== null && <ScrollLinked navHeight={navHeight} />}

        <Link className="hover:text-cyan-600 transition-colors pl-6 z-50" href="/">
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" />
            <span className="material-symbols-outlined" style={{ fontSize: '50px' }}>
                home
            </span>
        </Link>

        <Link href="/alt">alt</Link>

        <div className="ml-auto pr-6">
            <a
                className="rounded-full transition-colors flex items-center justify-center bg-black gap-2 hover:bg-cyan-600 
                font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto text-white"
                href="https://github.com/ktrct/ktrct.github.io"
                target="_blank"
                rel="noopener noreferrer"
            >
                <Image
                    src="/github-mark-white.svg"
                    alt="Github logomark"
                    width={20}
                    height={20}
                />
                Repo
            </a>
        </div>
    </nav>
    );
}

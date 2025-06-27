'use client';

import Link from 'next/link';
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
            className="sticky top-0 flex items-center space-x-10 bg-blue-100 pt-6 pb-6 w-full text-black *:z-49"
        >
            {navHeight !== null && <ScrollLinked navHeight={navHeight} />}

            <Link className="hover:text-cyan-600 pl-6 z-50" href="/">
                <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined"/>
                <span className="material-symbols-outlined" style={{ fontSize: '50px' }}>
                    home
                </span>
            </Link>
            <Link href="/alt">alt</Link>
        </nav>
    );
}

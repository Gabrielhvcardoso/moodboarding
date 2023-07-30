'use client'

import React from 'react';
import Link from 'next/link';
import { useState } from 'react';
import { Londrina_Solid } from 'next/font/google'

import styles from './app-logo.module.scss';

const Londrina_SolidFont = Londrina_Solid({
    weight: '400',
    subsets: ['latin']
})

export default function AppLogo() {
    const [logoAnimationActive, setLogoAnimationActive] = useState<boolean>(false);
    const [logoAnimationTimeout, setLogoAnimationTimeout] = useState<NodeJS.Timeout|null>(null);

    function handleLogoClick() {
        setLogoAnimationActive(true);
        return setTimeout(() => setLogoAnimationActive(false), 3000);
    }

    return (
        <Link
            className={`${Londrina_SolidFont.className} ${styles.appLogo} ${logoAnimationActive ? styles.appLogoActive : null}`}
            onClick={handleLogoClick}
            href="/"
        >
            Moodboarding
        </Link>
    )
}

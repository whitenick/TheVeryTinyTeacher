import React from 'react'
import '../styles/globals.css'
import Head from 'next/head';
import ModalManager from '../components/modal.service';
import './tw.css';
import Script from 'next/script';

function MyApp({Component, pageProps}) {
    return (
        <React.Fragment>
            <Head>
                <title>Tiny Teacher</title>
                <link rel="apple icon" href="/favicon.ico"/>
                <Script async src="/mailer.js"/>
            </Head>
            <ModalManager />
            <Component {...pageProps} />
        </React.Fragment>
    )
}

export default MyApp

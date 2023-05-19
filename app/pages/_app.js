import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache } from '@apollo/client';
import { PocketProvider } from '../database';
import Head from 'next/head';
import Script from 'next/script';
import React from 'react';
import ModalManager from '../components/modal.service';
import '../styles/globals.css';
import './tw.css';

const scriptFunction = () => {
    (function (w, d, e, u, f, l, n) {
        w[f] = w[f] || function () {
            (w[f].q = w[f].q || [])
                .push(arguments);
        }, l = d.createElement(e), l.async = 1, l.src = u,
            n = d.getElementsByTagName(e)[0], n.parentNode.insertBefore(l, n);
    })
        (window, document, 'script', 'https://assets.mailerlite.com/js/universal.js', 'ml');
    ml('account', '107741')
}

const httpLink = new HttpLink({
    uri: process.env.NEXT_PUBLIC_IS_LOCAL === 'true' ? 'http://localhost:8080/api/query' : '/api/query',
    credentials: 'include',
    fetchOptions: {
        mode: 'cors',
    },
  });

  
  const apolloClient = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache()
  });

function MyApp({ Component, pageProps }) {
    console.log(process.env.NEXT_PUBLIC_IS_LOCAL)
    return (
        <React.Fragment>
            <Head>
                <title>Tiny Teacher</title>
                <link rel="apple icon" href="/favicon.ico" />
                <Script
                    strategy="afterInteractive"
                    dangerouslySetInnerHTML={{
                        __html: `
                        (function (w, d, e, u, f, l, n) {
                            w[f] = w[f] || function () {
                                (w[f].q = w[f].q || [])
                                    .push(arguments);
                            }, l = d.createElement(e), l.async = 1, l.src = u,
                                n = d.getElementsByTagName(e)[0], n.parentNode.insertBefore(l, n);
                        })
                            (window, document, 'script', 'https://assets.mailerlite.com/js/universal.js', 'ml');
                        ml('account', '107741')
                        `,
                    }}
                />

            </Head>
            <ModalManager />
            <ApolloProvider client={apolloClient}>
                <PocketProvider>
                    <Component {...pageProps} />
                </PocketProvider>
            </ApolloProvider>
        </React.Fragment>
    )
}

export default MyApp

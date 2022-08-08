import React from 'react'
import '../styles/globals.css'
import Head from 'next/head';
import ModalManager from '../components/modal.service';
import './tw.css';
import Script from 'next/script';

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

function MyApp({ Component, pageProps }) {
    return (
        <React.Fragment>
            <Head>
                <title>Tiny Teacher</title>
                <link rel="apple icon" href="/favicon.ico" />
                {/* <Script src="/mailer.js" type="text/javascript"/> */}
                {/* {(typeof window !== "undefined") &&
                    <script>
                        {scriptFunction}
                    </script>
                } */}
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
            <Component {...pageProps} />
        </React.Fragment>
    )
}

export default MyApp

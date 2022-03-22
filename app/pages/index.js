import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import MyApp from './_app'
import { useRouter } from 'next/router'
import HomePage from '../pages/app/home';

export default function Home() {
  return (
    <HomePage />
  );
}

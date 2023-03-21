import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import QnAList from "./../components/QnAList";
import Link from "next/link";

export default function Home() {
  return (
    <>
    <Link href={"/qna"}>
      qna
    </Link>
    <Link href={"/list"}>
      list
    </Link>
    </>
  );
}

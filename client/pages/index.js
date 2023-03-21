import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import QnAList from "./../components/QnAList";

export default function Home() {
  return (
    <div className="flex  items-center justify-center">
      <QnAList />
    </div>
  );
}

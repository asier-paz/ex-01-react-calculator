import type { NextPage } from "next";
import Head from "next/head";
import { Calculator } from "src/components/calculator";
import { FavoriteOperations } from "src/components/favorite-operations";

const Home: NextPage = () => {
    return (
        <div className={`w-full h-screen flex flex-col`}>
            <Head>
                <title>Almighty Calculator</title>
                <meta name="description" content="The best calculator ever made (in React)" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <header className={`p-4 text-center uppercase bg-gray-dark`}>
                <span className={`text-white font-bold`}>Almighty Calculator</span>
            </header>
            <section className={`flex-1 grid grid-cols-3 gap-0.5 bg-gray-light`}>
                <div className={`col-span-2`}>
                    <Calculator />
                </div>
                <div>
                    <FavoriteOperations />
                </div>
            </section>
        </div>
    );
};

export default Home;

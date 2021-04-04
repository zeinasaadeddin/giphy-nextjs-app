import Head from 'next/head'
import Footer from '../components/Footer'

export default function About (){

    return(
        <div className="container">
        <Head> 
            <title>About</title>
            <link rel="stylesheet" href="/styles.css" />
            
        </Head>
        <h1>
          About
        </h1>
        <Footer />
        </div>
    )
}
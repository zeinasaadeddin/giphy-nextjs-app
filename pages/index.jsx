import Head from 'next/head'
import {useState, useEffect} from 'react'
import Link from 'next/link'
import Footer from '../components/Footer'
import Image from 'next/image'



//import styles from '../styles/Home.module.css'

export default function Home(initialData) {
  const [formInputs, setFormInputs] = useState({});
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect( ()=>{
    setSearchResults(initialData.catGiphys.data)
  },[initialData])

  const handleInputs = (event) =>{
    
    let {name, value} = event.target;
    setFormInputs({...formInputs,[name]: value});

  }

  const search = async (event) => {
     event.preventDefault()
     let giphys = await fetch(`https://api.giphy.com/v1/gifs/search?q=${formInputs.searchTerm}&api_key=zM32ZH53X7qsp3NiejBS0rpWuiLsjkV5&limit=5`);
     giphys = await giphys.json();
     setSearchResults(giphys.data)
     setSearchTerm(formInputs.searchTerm)
  }

  

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="/styles.css" />
      </Head>
   
      <h1>Giphy Search App</h1>
      <div className="logo-container">
        <Image
            width='30px'
            height='30px'
            //layout='responsive'
            src="/logo.png"
            alt="logo"  
            
            
        />
      </div>
      <form onSubmit={search}>
        <input name="searchTerm" type="text" onChange={handleInputs}></input>
        <button type="submit">search</button>
      </form>

      <h1>search results for: {searchTerm}</h1>
      <p>
      <Link
            href="/search/[pid]"
            as={`/search/${searchTerm}`}>
              <a> 
                {`http://localhost:3000/search/${searchTerm}`}
              </a>
      </Link>
      </p>

      <div className="search-results">
       {
         
         searchResults.map( (each,index) => {
                return(
                <div key={index}>
                <h3>{each.title}</h3>
                <img src={each.images.original.url} alt={each.title} />
                </div>
                )
         })

       }
    </div>
    <Footer />
    </div>
  )
}


export async function getStaticProps() {
  let catGiphys = await fetch('https://api.giphy.com/v1/gifs/search?q=cats&api_key=nPJNlVceWHERWCSDBW5XMo1p90l7l9ie&limit=6')
  catGiphys = await catGiphys.json()
  return {props: {catGiphys: catGiphys}}  
}

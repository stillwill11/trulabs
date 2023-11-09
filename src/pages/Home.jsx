import React from 'react'
import Main from '../components/Main'
import Row from '../components/Row'
import requests from '../components/Requests'

const Home = () => {
  return (
    <div>
        <>
        <Main/>
        <Row title='UpComing' fetchURL={requests.requestUpcoming}/>
        <Row title='Popular' fetchURL={requests.requestPopular}/>
        <Row title='Trending' fetchURL={requests.requestTrending}/>
        <Row title='Horror' fetchURL={requests.requestHorror}/>
        <Row title='TopRated' fetchURL={requests.requestTopRated}/>
        </>
    </div>
  )
}

export default Home
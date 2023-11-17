import React from 'react'
import SavedShows from '../components/SavedShows'

const Account = () => {
  return (
    <>
    <div className='w-full text-white'>
    <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/a09bb938-2d90-42ae-986e-5a3e4abf9e77/74580674-09cd-40e5-8c76-0119cc3b919e/TR-en-20231113-popsignuptwoweeks-perspective_alpha_website_medium.jpg"
          alt="/"
          className='w-full h-[400px] object-cover'
        />
        <div className='bg-black/60 fixed top-0 left-0  w-full h-[550px]'>
          <div className='absolute top-[20%] p-4 md:p-8'>
            <h1>My Shows</h1>
          </div>
        </div>

    </div>
    <SavedShows/>
    </>
  )
}

export default Account
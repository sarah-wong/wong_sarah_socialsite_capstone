import Feed from '../components/Feed'

function Home() {


  return (
    <div className="page">
      <h1>The Main Feed</h1>
      <Feed filter={null}/>
    </div>
  )
}

export default Home
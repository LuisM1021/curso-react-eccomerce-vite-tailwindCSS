import {Card} from "../../Components/Navbar/Card"
import {Layout} from "../../Components/Navbar/Layout"
import {useState,useEffect} from 'react'
function Home() {
  const [items,setItems] = useState(null)

  useEffect(()=>{
    fetch('https://api.escuelajs.co/api/v1/products')
    .then(res=>res.json())
    .then(data=>setItems(data))
  },[])
    return (
      <Layout>
        HOME
        <div className='grid gap-4 grid-cols-4 w-full max-w-screen-lg'>
          {
            items?.map((item)=>(<Card key={item.id} data={item}/>))
          }
        </div>
      </Layout>
  )
}

export {Home}

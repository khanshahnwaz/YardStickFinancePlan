import Link from "next/link"



const page = () => {
  return (
   <div>
    <button><Link href="/stage/stage1">Stage 1</Link></button>
    <button><Link href="/stage/stage2">Stage 2</Link></button>
   </div>
  )
}

export default page 
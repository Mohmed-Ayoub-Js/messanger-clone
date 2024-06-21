import getCurrentUSER from "@/actions/getCurrentUser"
import DesktopSideBar from "./DesktopSideBar"

const SideBar = async ({children} : {children : React.ReactNode}) => {
  const currentUser : any= await getCurrentUSER();
  
    return (
    <div className=" h-full">
        <DesktopSideBar currentUser={currentUser}/>
        <main className=" lg:pl-20 h-full">
        {children}            
        </main>

    </div>
  )
}

export default SideBar
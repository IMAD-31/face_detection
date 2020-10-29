import React from 'react';



const Navigation=({onchangeroute,issagnedin})=>{
    if (issagnedin) {
        return(<div>
            <nav style={{display:'flex',justifyContent:'flex-end'}}>
            <p onClick={()=> onchangeroute('signin')} className='f3 link black pointer pa3 underline dim'> SignOut</p>
            
            </nav>
            
            
            
            </div>)
        

    }
    else{
return(<nav style={{display:'flex',justifyContent:'flex-end'}}>
<p onClick={()=> onchangeroute('signin')} className='f3 link black pointer pa3 underline dim'> signin</p>
<p onClick={()=> onchangeroute('register')} className='f3 link black pointer pa3 underline dim'> register</p>
</nav>)


    }





}
export default Navigation;
import React from 'react';
import './Face.css'
const Face=({imageurl ,box})=>{
return(

<div className='center'>
<div className='absolute mt2'>
<img id='inputimage' alt='' src={imageurl} width='500px' height='auto'/>
<div className='bounding-box' 
style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}>

</div>
<div className='bounding-box' 
style={{top: box.topRow1, right: box.rightCol1, bottom: box.bottomRow1, left: box.leftCol1}}>
    
</div>
</div>


</div>

)




}
export default Face;
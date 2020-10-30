import React, {Component} from 'react';
import Navigation from './Component/Navigation/Navigation';
import Logo from './Component/Logo/Logo';
import Imagelink from './Component/Imagelink/Imagelink';
import Rank from './Component/Rank/Rank';
import './App.css';
import Particles from 'react-particles-js';
import Face from './Component/Face/Face';

import Signin from './Component/Signin/Signin';
import Register from './Component/Register/Register';


const initialisation={
  input:'',
imageurl:'',
box:{},
box1:{},
route:'signin',
issagnedin:false,
user:{

  id:'',
  name:'',
  email: '',
  
  entries:0,
  joined:''
}
}

class  App extends Component  {
  constructor(){
    super()
  
this.state=initialisation;



}

  
  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height),

     
    }
  }
  displaybox=(box)=>{
   this.setState({box:box})

  }

  onInputChange=(event)=>{

this.setState({input:event.target.value})

  }
  onSubmit=()=>{
    this.setState({imageurl:this.state.input})
    fetch('https://obscure-tundra-66565.herokuapp.com/imageurl', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        input: this.state.input
      })
    })
    .then(response => response.json())
    .then(response => {
     
       if (response) {
        fetch('https://obscure-tundra-66565.herokuapp.com/image',{
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            id:this.state.user.id
          })
        


         })
         .then(response=>response.json())
         .then(count=>{ 
          this.setState(Object.assign(this.state.user,{entries:count}))
          
         }
         
          //
          
          
          )
         
       } 
       this.displaybox(this.calculateFaceLocation(response));
     
       } )
    .catch(err=>console.log(err))

  }


onchangeroute=(route)=>{
  if (route==='signin') {
    this.setState(initialisation)

  }else if(route==='home'){
    this.setState({issagnedin:true})
  }
this.setState({route:route})

}

loaduser=(data)=>{
this.setState({user:{

  id:data.id,
  name:data.name,
  email: data.email,
  
  entries:data.entries,
  joined:data.joined


}})


}


  render(){
  const  { issagnedin, box ,imageurl ,route } = this.state;
    
    
    return (
    <div className='App'>
    <Particles className="particles"
    params={{
	    "particles": {
	        "number": {
	            "value": 200
	        },
	        "size": {
	            "value": 2
	        }
	    },
	    
	}} />
  
  
      <Navigation onchangeroute={this.onchangeroute} issagnedin={issagnedin}/>
      {  route ==='home' ?
      <div> 
      <Logo />
      <Rank name={this.state.user.name} entries={this.state.user.entries}/>
      <Imagelink onInputChange={this.onInputChange} onSubmit={this.onSubmit} />
      <Face imageurl={imageurl} box={box}/>
      
      </div>
      
      
      
      
      
      
      
      :
      (
        route === 'signin' ?
         <Signin loaduser={this.loaduser} onchangeroute={this.onchangeroute}/>
         :
         <Register loaduser={this.loaduser} onchangeroute={this.onchangeroute}/>
      )
      
      }
      
      

    </div>
   
  )}
 
}

export default App;

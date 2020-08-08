import React,{Component} from 'react';
import axios from "axios";
import './App.css';
import Heading from './Heading'

class Terrible extends Component{
    constructor(){
    super()
    this.state={
        num:0,
        wordslist:[]
    
    };
    }
     onClickHandler=(e)=>{
         var data="";
            axios
            .get("https://terriblybackend.herokuapp.com/data")
            .then((res) => {
               data =res.data;
               var myArray =data.split('↵').join(', ').split(':').join(', ').split(' ').join(', ').split('/').join(', ').split('@').join(', ').split('-').join(', ').split('.').join(', ').split('?').join(', ').split(')').join(', ').split(','); 
               var frequency={};var i;
               for(i=0;i<myArray.length;i++)
               {
                   if( myArray[i] in frequency && myArray[i]!=" " && myArray[i]!=""  )
                   {
                       frequency[myArray[i]]++;
                   }
                   else{
                       if(myArray[i]!=" " && myArray[i]!="")
                       {
                    frequency[myArray[i]]=1;
                       }
                   }

               }
               var n=Object.keys(frequency).length
               //console.log(n)
                var sortedfrequency= Object.entries(frequency).sort(function(a,b){return b[1]-a[1]})
               console.log(this.state.num)

                var t=`<table><tr><th>Word</th><th>Frequency</th></tr>`;
                if(this.state.num<=n && this.state.num>=0)
                {
        for(i=0;i<this.state.num;i++)
        {
            t+=`<tr>`+
                `<td>`+sortedfrequency[i][0]+`</td>`+
                `<td>`+sortedfrequency[i][1]+`</td>`+
                 `</tr>`;
        }
        t+='</table>';
        document.getElementById("table-wrapper").innerHTML=t;
    }
    else{
        document.getElementById("table-wrapper").innerHTML="";
        alert("Choose something in range to 0-"+n);



    }
        
                
                 

            })
            
           

       e.preventDefault()   
       }
    
          onchangeHandler=(e)=>{
            this.setState({ num: e.target.value })

          }
    

    render(){
        return (
            <div>
                <Heading />
                <form id="form-div">
                    <label>Enter any number Here :-    </label>
                    
                    <input type="text" onChange={this.onchangeHandler} required/><br />
                    <button type="submit" onClick={this.onClickHandler}>Search</button>
                </form>
                <div id="table-wrapper" style={{marginLeft:600,marginTop:100}}></div>
               
            </div>

        );
    }

    
}
export default Terrible;
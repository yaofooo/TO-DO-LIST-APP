import {Component} from 'react';
import Button from '../../Components/Button/Button';
import ListItem from '../../Components/ListItem/ListItem';
import data from'../../data';
import "./Styles.css";
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';



 class HomeScreen extends Component {
     state={
         value:'',
         list:[],
     }
    async componentDidMount(){
         try{
        
            const response = await axios.get("https://jsonplaceholder.typicode.com/posts")
            console.log(response);
            this.setState({
                list:response.data,
            });
        } catch (e) {
                console.log(e);
            }
        
        
     }
    render() {
        return (
            <div className="inner-container">
                <h1 className="page-title">
                    To Do List
                </h1>
                <section className="input-section">
                    <div className="input-box">
                    <input
                    className="add-task-input"
                    type="text"
                    placeholder="Enter a new task..."
                    onChange={(event)=>{
                        this.setState({
                        value:event.target.value
                        })
                    }}
                    
                    value={this.state.value}

                    />
                    {this.state.error? <span>{this.state.error}</span> :null}
                    </div>
                    <Button 
                    text="Add"
                    handleClick={()=>{
                        if(this.state.value){
                        const newArr= [
                            {
                                title:this.state.value,
                                id:uuidv4(),
                            },
                            ...this.state.list,]
                        this.setState({

                        
                            list:newArr,
                            value: '',
                            error: '',
                            


                        });
                        }else{
                            this.setState({
                                error: "please submit atask",
                         })}
                        }}
                    />

                    
                   

                </section>
                <section className="items-section">
                {this.state.list.length ? (
                    this.state.list.map((item) =>
                (
                <ListItem 
                    task={item.title}
                    key={item.id}
                     handleDelete={()=>{
                    const filterdItems= this.state.list.filter((filterItem) => filterItem.id != item.id);
                    this.setState({
                        list:filterdItems
                    });
                }}

                />
                ))):(<span>loading......</span>)}
                </section>
                
            </div>
        )
    }
}
export default HomeScreen;

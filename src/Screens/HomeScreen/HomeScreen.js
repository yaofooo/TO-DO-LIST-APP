import Button from '../../Components/Button/Button';
import ListItem from '../../Components/ListItem/ListItem';
import "./Styles.css";
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import {useState, useEffect} from 'react';


 function HomeScreen (){
     const [error, setError] = useState("");
     const[value, setValue] = useState("");
     const[list, setList] = useState([]);
     
         
    const fetchData = async()=>{
         try{
        
            const response = await axios.get(
                "https://jsonplaceholder.typicode.com/todos")
                setList(response.data.splice(0,20))
        } catch (e) {
                console.log(e);
            };
            
            
            
     }
     useEffect(() => {
                fetchData(); }, []);
   
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
                    onChange={(event)=>
                        
                        
                        {setValue(event.target.value)}
                        }
                        value={value}
                    />
                    {error? <span>{error}</span> :null}
                    </div>
                    <Button 
                    text="Add"
                    handleClick={()=>{
                        if(value){
                        const newArr= [
                            {
                                title:value,
                                id:uuidv4(),
                            },
                        ...list,]
                        
                        setValue('')
                        setError('')
                        setList(newArr)

                    } else {
                        setError("please submit a task")
                    }
                }}
            />

                    
                   

                </section>
                <section className="items-section">
                {list?.length ? (
                    list.map((item) =>
                (
                <ListItem 
                    task={item.title}
                    key={item.id}
                     handleDelete={()=>{
                    const filterdItems= list.filter((filterItem) => filterItem.id != item.id);
                    
                    setList(filterdItems);
                }}

                />
                ))):(<span>loading......</span>)}
                </section>
                
            </div>
        )
    }

export default HomeScreen;

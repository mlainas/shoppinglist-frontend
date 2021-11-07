
import './App.css';
import {useState, useEffect} from 'react';
import axios from 'axios';

const URL = 'http://localhost/shoppinglist/';

function App() {

  const [items, setItems] = useState([]);
  const [item, setItem] = useState('');
  const [items2, setItems2] = useState([]);
  const [item2,setItem2] = useState('');

  useEffect(() => {
    axios.get(URL)
    .then((response) => {
      setItems(response.data);
    }).catch(error => {
      alert(error.response ? error.response.data.error : error);
    })
  },[]);
  useEffect(() => {
    axios.get(URL)
    .then((response) => {
      setItems2(response.data);
    }).catch(error => {
      alert(error.response ? error.response.data.error : error);
    })
  },[]);


  function remove(id) {
    const json = JSON.stringify({ id: id })
    axios.post(URL + 'delete.php', json, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((response) => {
        const newListWithoutRemoved = items.filter((item) => item.id !== id);
        setItems(newListWithoutRemoved);
      }).catch(error => {
        alert(error.response ? error.response.data.error : error);
      });
  }


  function save(e) {
    e.preventDefault();
    const json = JSON.stringify({description:item})
    axios.post(URL + 'add.php',json,{
      headers: {
        'Content-Type' : 'application/json'
      }
    })
    .then((response) => {
      console.log(response);
      setItems(items => [...items,response.data]);
      setItem('');
    }).catch (error => {
      alert(error.response.data.error)
    });

  }
  /* function save2(e) {
    e.preventDefault();
    const json = JSON.stringify({description:item2})
    axios.post(URL + 'add.php',json,{
      headers: {
        'Content-Type' : 'application/json'
      }
    })
    .then((response) => {
      console.log(response);
      setItems2(items2 => [...items2,response.data]);
      setItem2('');
    }).catch (error => {
      alert(error.response.data.error)
    });
  } */
  return (
    <div className="container">
    <h3> Shopping list </h3>
    <form onSubmit={save}>
      <label> New item </label>
      <input value={item} onChange={e => setItem(e.target.value)} placeholder="Type description"/>
      <input value={item2} onChange={e => setItem2(e.target.value)} placeholder="Type amount"/>
      <button> Add </button>
    </form>
    <ul>
      {items?.map(item => (
        <li key={item.id}>{item.description}</li>
      ))}
    </ul>
    <ul>
      {items2?.map(item => (
        <li key={item.id}>{item.item}
          <a href="#" className="delete" onClick={() => remove(item.id)}>Delete</a>
        </li>
      ))}
    </ul>
  </div>
  );
      }
    {/* <div className="container">
      <h3>Shoppinglist</h3>
      <form onSubmit={save}>
        <label>New item</label>
        <input value={item} onChange={e => setItem(e.target.value)} placeholder="type description" />
        <input value={item2} onChange={e => setItem2(e.target.value)} placeholder="type amount" />
        <button>Add</button>
      </form>
      <ol>
        {items?.map(item => (
          <div key={item.id}>
            {item.description}&nbsp;
            <a href="#" className="delete" onClick={() => remove(item.id)}>
              Delete
              </a>
            </div>
        ))}
        </ol>
        
        <ol>
         {items2?.map(item2 => (
          <div key={item2.id}>{item2.amount}</div>
        ))}
      </ol>
    </div>
  );
} */}

export default App;
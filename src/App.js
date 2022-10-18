import { useEffect, useState } from 'react';
import { MdOutlineAddCircleOutline } from 'react-icons/md';
import './App.css';
import Template from './components/Template';
import TodoList from './components/TodoList';
import TodoInsert from './components/TodoInsert';

const App = ({ word }) => {
  const [seletedTodo, setSelectedTodo] = useState(null);
  const [insertToggle, setInsertToggle] = useState(false);
  const [todoList, setTodoList] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/todo')
      .then(response => {
        return response.json();
      })
      .then(data => {
        setTodoList(data);
  });
  }, []);

  const onInsertToggle = () => {
    if (seletedTodo) {
      setSelectedTodo(null);
    }
    setInsertToggle(prev => !prev);
  };

  const onInsertTodo = (text) => {
    let nextId = todoList.length+1
    if (text === '') {
      return alert('할 일을 입력해주세요.')
    } else {
      fetch('http://localhost:3001/todo', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: nextId,
          text,
          checked: false
        }),
      }).then(res => {
        if (res.ok) {
          alert("생성이 완료 되었습니다");
          window.location.reload()
        }
      });
    }
  }

  const onCheckToggle = (id) => {
    setTodoList(todoList => todoList.map(todo => (todo.id === id ? {...todo, checked: !todo.checked} : todo)))
  }

  const onChangeSelectedTodo = (todo) => {
    setSelectedTodo(todo)
  }

  const onRemove = (id) => {
    onInsertToggle();
    fetch(`http://localhost:3001/todo/${id}`, {
      method: 'DELETE'
    })
    window.location.reload()
  };

  const onUpdate = (id, text) => {
    onInsertToggle();
    fetch(`http://localhost:3001/todo/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body : JSON.stringify({
        ...word,
        text,
        checked: false
      }),
    }).then(res => {
      if (res.ok) {
        window.location.reload()
      }
    });
  }

  return ( 
  <Template todoLength={todoList.length}>
    <TodoList todoList={todoList} onCheckToggle={onCheckToggle} onInsertToggle={onInsertToggle} onChangeSelectedTodo={onChangeSelectedTodo}/>
    <div className='add-todo-button' onClick={onInsertToggle}>
    <MdOutlineAddCircleOutline/>
    </div>
    {insertToggle && <TodoInsert seletedTodo={seletedTodo} onInsertToggle={onInsertToggle} onInsertTodo={onInsertTodo} onRemove={onRemove} onUpdate={onUpdate}/>}
  </Template>
  );
};

export default App;

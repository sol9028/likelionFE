import React, { useState, useEffect } from 'react';
import styled, { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
* {
  box-sizing: border-box;
}

body {
  font-family: Arial, Helvetica, sans-serif;
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: #f4f4f4;
  height: 100vh;
  width: 100%;
  background: linear-gradient(to bottom,#E6E6FA 0%, #FFF0F5);
} 
`;

const Container = styled.div`
  width: 400px;
  margin: 50px;
  padding: 20px;
  background: #fff;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  min-height: auto;
  transition: min-height 0.3s;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media screen and (min-width: 375px) and (max-width: 768px) {
    height: 90vh; 
  }
`;
const Title = styled.h1`
  text-align: center;
`;
const InputWrapper = styled.div`
  display: flex;
  width: 100%;
  margin-top: 30px;
  justify-content: right;
  font-size: 15px;
`;
const TodoInput = styled.input`
  width: calc(100% - 24px);
  padding: 10px;
  margin-right: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 15px;
  &:focus {
    outline: none; /* 클릭시 파란선 제거 */
  }
`;

const TodoButton = styled.button`
  padding: 14px 14px;
  background-color: #E6E6FA;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #8f8ff3;
  }
`;
const List = styled.ul`
  width: 100%;
`;
const TodoListItem = styled.li`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  list-style: none;
  line-height: 40px;
  padding: 0 20px;
  position: relative;
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 15px;
  font-weight: 400;
  cursor: pointer;
  margin-bottom: 9px;

  &.completed {
    text-decoration: line-through;
  }

  &:hover {
    background-color: #E6E6FA;
  }
`;

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');

  
  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem('todos')) || [];
    setTodos(savedTodos);
  }, []);

  
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (!inputValue.trim()) {
      alert('할 일을 입력해주세요!');
      return;
    }
    setTodos([...todos, { text: inputValue, completed: false }]);
    setInputValue('');
  };

  const toggleCompleted = (index) => {
    const newTodos = todos.map((todo, i) => (
      i === index ? { ...todo, completed: !todo.completed } : todo
    ));
    setTodos(newTodos);
  };

  const removeTodo = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  };

  const allClearList = () => {
    if (todos.length > 0 && window.confirm('모든 할 일을 삭제하시겠습니까?')) {
      setTodos([]);
    } else if (todos.length === 0) {
      alert('삭제할 할 일이 없습니다.');
    }
  };

  return(
    <>
    <GlobalStyle/>
    <Container>
      <Title>Sol's To-do-List</Title>
      <InputWrapper>
        <TodoInput
          type="text"
          placeholder="오늘의 할일은?"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter' || e.key === 'Return') addTodo();
          }}
          autoFocus
        />
        <TodoButton onClick={addTodo}>💜</TodoButton>
      </InputWrapper>
      <List>
        {todos.map((todo, index) => (
          <TodoListItem
            key={index}
            className={todo.completed ? 'completed' : ''}
            onClick={() => toggleCompleted(index)}
          >
            {todo.text}
            <span className="remove-btn" onClick={(e) => { e.stopPropagation(); removeTodo(index); }}>❌</span>
          </TodoListItem>
        ))}
      </List>
      <TodoButton onClick={allClearList}>모두 삭제</TodoButton>
    </Container>
    </>
  );
};

export default TodoList;
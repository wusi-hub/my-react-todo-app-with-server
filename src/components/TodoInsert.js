import React, { useEffect, useState } from 'react';
import { MdLensBlur } from 'react-icons/md';
import { BsPencil, BsTrash } from "react-icons/bs";
import './TodoInsert.css'

const TodoInsert = ({ onInsertToggle, onInsertTodo, seletedTodo, onRemove, onUpdate }) => {
    const [value, setValue] = useState('');
    const onChange = e => {
        setValue(e.target.value);
    };

    const onSubmit = (e) => {
        e.preventDefault();
        onInsertTodo(value);
        setValue('');
        onInsertToggle();

    }

    useEffect(() => {
        if (seletedTodo) {
            setValue(seletedTodo.text)
        }
    }, [seletedTodo]);

    return (
        <div>
            <div className='background' onClick={onInsertToggle}></div>
            <form onSubmit={seletedTodo ? () => {onUpdate(seletedTodo.id, value)} : onSubmit}>
                <input placeholder='입력하세요.' value={value} onChange={onChange}></input>
                {seletedTodo ? (
                    <div className='reWrite'>
                        <BsPencil onClick={() => {onUpdate(seletedTodo.id, value)}}/>
                        <BsTrash onClick={() => {onRemove(seletedTodo.id)}} />
                    </div>
                ) : (
                <button type='submit'>
                    <MdLensBlur/>
                </button>
                )}
            </form>
        </div>
    );
};

export default TodoInsert;
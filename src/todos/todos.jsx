import React from 'react'

import PageHeader from '../template/pageHeader'
import TodoForm from './todosForm'
import TodoList from './todosList'

export default props => (
    <div>
        <PageHeader name='Todos' small='Cadastros'></PageHeader>
        <TodoForm />
        <TodoList />
    </div>
)
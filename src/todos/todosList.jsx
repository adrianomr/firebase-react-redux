import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import _ from "lodash";

import IconButton from '../template/iconButton'
import { markAsDone, markAsPending, remove } from './todosActions'

const TodoList = props => {
    
    const renderRows = () => {
        const list = props.list

        const todos = _.map(list, (todo, key) => {
                return (<tr key={key}>
                    <td className={todo.status ? 'markedAsDone' : ''}>{todo.description}</td>
                    <td>
                        <IconButton style='alert' icon='remove' hide={!todo.status}
                            onClick={() => props.markAsPending(key, todo)}></IconButton>
                        <IconButton style='success' icon='check' hide={todo.status} 
                            onClick={() => props.markAsDone(key, todo)}></IconButton>
                        <IconButton style='danger' icon='trash-o' hide={todo.status} 
                            onClick={() => props.remove(key)}></IconButton>
                    </td>
                </tr>)
                
        })
        return todos
    }

    return (
        <table className='table'>
            <thead>
                <tr>
                    <th>Descrição</th>
                    <th className='tableActions'>Ações</th>
                </tr>
            </thead>
            <tbody>
                {renderRows()}
            </tbody>
        </table>
    )
}

const mapStateToProps = state => ({list: state.todo.list})
const mapDispatchToProps = dispatch => 
    bindActionCreators({ markAsDone, markAsPending, remove }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(TodoList)
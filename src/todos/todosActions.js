import axios from 'axios'
import * as firebase from 'firebase';


export const changeDescription = event => ({
    type: 'DESCRIPTION_CHANGED',
    payload: event.target.value
})

export const search = () => {
    return (dispatch, getState) => {
        const description = getState().todo.description
        const search = description ? `filtro=descricao=${description}` : ''
        console.log(description)
        const db = firebase.database();
        var task = firebase.database().ref().child('task')
        .orderByChild('description')
        if(description != ""){
            task = task.startAt(description).endAt(description+'/uf8ff')
        }
        task.once('value').then( (snapshot) => {
            return dispatch({type: 'TODO_SEARCHED', payload: snapshot.val()})
        })
        
    }
}

export const add = (descricao) => {
    return dispatch => {
        const db = firebase.database();
        const task = firebase.database().ref().child('task');
        task.push({
            description: descricao,
            status : false
          }).then(dispatch(search()))
    }
}

export const markAsDone = (key, todo) => {
    return dispatch =>{ 
        const db = firebase.database();
        const task = firebase.database().ref().child('task/'+key);
        task.set({
            description: todo.description,
            status : true
            }).then(dispatch(search()))
    }
    
}

export const markAsPending = (key, todo) => {
    return dispatch => {
        const db = firebase.database();
        const task = firebase.database().ref().child('task/'+key);
        task.set({
            description: todo.description,
            status : false
            }).then(dispatch(search()))
    }
    
}

export const remove = (key) => {
    return dispatch => {
        const db = firebase.database();
        const task = firebase.database().ref().child('task/'+key);
        task.remove().then(dispatch(search()))
    }
}

export const clear = () => {
    return [{ type: 'TODO_CLEAR' }, search()]
}

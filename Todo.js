import React, { Component } from 'react';
import {observer} from 'mobx-react';
import { action } from 'mobx';


@observer
export default class TodoItem extends Component { 
    constructor(props) {
        super(props)


    }
    
    reverse(e){
        this.props.item.done = !this.props.item.done
        localStorage.list = JSON.stringify(this.props.store.todos)

    }

    dragEnd(e){
        document.documentElement.style.setProperty('--hit', '#eeeeee;');
        document.documentElement.style.setProperty('--in', '61');
    }

    dragStart(e){
        console.log(`started dragging element ${e.target.id}`)
        e.dataTransfer.setData('text/html', e.target.id)
        document.documentElement.style.setProperty('--in', '-1');
    }

    drop(e) {
        e.preventDefault();
        var data = e.dataTransfer.getData('text/html');
        console.log(e.target.parentElement)
          if (e.target.parentElement.id != 'thelist' ) {
            e.target = e.target.parentElement
            return this.drop(e)
          }
          console.log(`Place Dropped: ${parseInt(e.target.id)}`)        
        this.props.store.move(parseInt(data), parseInt(e.target.id))
        // e.target.insertAdjacentElement('afterend', document.getElementById(data));
        e.target.style.setProperty('border-bottom-color','#eeeeee')
    }

    dragOver(e) {
        e.preventDefault()
  
    }

    change(e) {
        e.target.setAttribute('contenteditable','true')

    }

    cchange(e){
        e.target.setAttribute('contenteditable','false')
        this.props.store.todos[this.props.index].name = e.target.innerText
        this.props.store.updateStorage()
    }

    exportBoard(){
        document.getElementById('thelist').childElementCount
    }

    render() {
        return(
            <div id={this.props.index} draggable="true"  onDrop={e => this.drop(e)} onDragEnter={(e) => e.target.style.setProperty('border-bottom-color','#0063ff')} onDragOver={e => this.dragOver(e)} onDragLeave={(e) => e.target.style.setProperty('border-bottom-color','#eeeeee')}  onDragEnd={e => this.dragEnd(e)} onDragStart={e => this.dragStart(e)} className='todoitem'> 
                <div id='content' title='Triple Click To Edit' onBlur={(e) => this.cchange(e)}onDoubleClick={(e) => this.change(e)}>{this.props.item.name}</div> 
                {this.props.item.done ? <div id='check' onClick={(e) => this.reverse(e)}><i className="im im-check-mark"></i></div> : <div id='xd' onClick={e => this.reverse(e)}></div>}
                {this.props.children}
            </div>
        )
    }
    
}

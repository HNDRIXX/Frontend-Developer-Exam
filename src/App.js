import React, {useState, useCallback} from 'react'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFloppyDisk, faFilter, faTrash, faChevronLeft, faChevronRight, faEllipsisV, faCircle, faClock, faChevronDown} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {useCollapse, Collapse} from 'react-collapse';

import { data } from "./ArrayOfObjects";
import './App.css'

function App()  {
    const [item, setItem] = useState(data)
    const [selectedItem, setSelectedItem] = useState()

    const handleSelect = emailSubject => {
        if (!item.find(item => item.emailSubject === emailSubject).isChecked) {
            setSelectedItem(selectedItem === emailSubject ? null : emailSubject)
        }
    }

    const handleDelete = () => {
        setItem(item.filter(item => !item.isChecked))
    }

    const handleCheckboxChange = emailSubject => {
        setItem(
            item.map(item => {
                if (item.emailSubject === emailSubject) {
                    return { ...item, isChecked: !item.isChecked }
                }

                return item
            })
        )
    }


    return (
        <div className='container'>
            <div className='top-container'>
                <div className='btnRow'>
                    <input type='checkbox' style={{cursor: 'pointer'}}/>
                    <button className='saveBtn'>SAVE <FontAwesomeIcon id='icon' icon={faFloppyDisk} /></button>
                    <button className='filterBtn'>MANAGE FILTERS <FontAwesomeIcon id='icon' icon={faFilter} /></button>
                    <button className='deleteBtn' onClick={handleDelete}>DELETE <FontAwesomeIcon id='icon'icon={faTrash} /></button>
                </div>
                
                <div className='pagination'>
                    <p><FontAwesomeIcon id='icon' icon={faChevronLeft} />&nbsp;&nbsp;100 of 100&nbsp;&nbsp;
                        <FontAwesomeIcon id='icon' icon={faChevronRight} />
                    </p>
                </div>
            </div>  
            
            <hr/>

            <div className='unread'>
                <p className='unread-text'>Unread</p>
                <p className='unread-count'>100+</p>
            </div>

            <hr/>

            <div className='main-container' style={{paddingTop: 10}}>
                {item.map(item => (
                    <div className='margin-container'>
                        <div className='item-container'  key={item.emailSubject} onClick={() => handleSelect(item.emailSubject)} >
                            <div className='item-align-left'>
                                <FontAwesomeIcon icon={faEllipsisV} />

                                <input type="checkbox"
                                    checked={item.isChecked}
                                    onChange={() => handleCheckboxChange(item.emailSubject)}
                                    style={{cursor: 'pointer'}}/>
                                
                                <FontAwesomeIcon icon={faCircle} color='green'/>

                                <p className='date'>
                                    <span id='day'>10</span><br/>
                                    <span id='month'>Feb</span>
                                </p>

                                <p id='TA'>TA</p>

                                <div className='title'>Fwd: {item.emailSubject}
                                    <span id='title-number'> &nbsp;&#123; NEW-10707 / 1715 &#125;</span><br/>

                                    <p className='sub-title'>
                                        <b>{item.sender}</b>&nbsp;
                                        {"<"}patricklofranco49@gmail.com{">"} Feb 10,2023 at 12:00 PM {"|"} Feb 10,2023 at 1:00 PM
                                    </p>
                                </div>
                            </div>

                            <div className='item-align-right'>
                                <p><FontAwesomeIcon id='icon' icon={faClock} /> 0 mins</p>
                                {selectedItem === item.emailSubject ? (
                                    <FontAwesomeIcon id='more-icon' icon={faChevronDown} color='#bbbbbb'/>
                                ) : (
                                    <FontAwesomeIcon id='more-icon' icon={faChevronRight} color='#bbbbbb'/>
                                )}  
                            </div>
                        </div>

                        <Collapse isOpened={selectedItem === item.emailSubject && !item.isChecked}>
                            <div id='more-content'>
                                <hr className='hr-collapse'/>
                                <p>
                                    <span id='name' style={{color: '#2e2e2e'}}><b>{item.sender}</b></span><br/>
                                    <span id='date'>12, Jan 2021 12:00 PM</span>
                                </p>

                                <p>Content:<br/>{item.content}</p>

                                <p className='bottom-content'>-------- Forwarded Message ---------<br/>
                                    From: <b style={{color: '#2e2e2e'}}>{item.sender} </b> 
                                    <span style={{color: 'blue'}}>{"<"}patricklofranco49@gmail.com{">"}</span><br/>

                                    Date : Mon, Feb 10, 2023 at 12:00 PM<br/>
                                    Subject : {item.emailSubject}<br/>
                                    To: Ipsum Dolor  
                                    <span style={{color: 'blue'}}> {"<"}loremipsum49@gmail.com{">"}</span>
                                </p>
                            </div>
                        </Collapse>
                    </div>
                ))}
            </div>
        </div> 
    )   
}

export default App
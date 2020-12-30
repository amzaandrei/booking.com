import React, { useState } from "react"

import {  Nav, NavItem, NavLink } from 'reactstrap';
import classnames from 'classnames';

import "./FilterButton.css"

function FilterButton(props) {

  const [activeTab, setActiveTab] = useState('1');

  const buttonPressed = tab => {
    if(activeTab !== tab) setActiveTab(tab);
    props.setFilter(props.name)
  }

  return (
    <div className="FilterButton">
        <NavItem>
          <NavLink className={classnames({ active: activeTab === '1' })}
            aria-pressed={props.isPressed}
            onClick={() => { buttonPressed('1'); }}>
            { props.name }
          </NavLink>
        </NavItem>
    </div>
  )
}

export default FilterButton

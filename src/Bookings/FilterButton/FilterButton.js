import React from "react"

import "./FilterButton.css"

function FilterButton(props) {
  return (
    <div className="FilterButton">
      <button
        type="button"
        className="btn toggle-btn"
        aria-pressed={props.isPressed}
        onClick={() => props.setFilter(props.name)}
      >
        <span> {props.name} </span>
      </button>
    </div>
  )
}

export default FilterButton

import React from 'react'

function ListItem ({ item }) {
  return (
    <p className='m-1 p-2 border-b'>
      <a className='no-underline'
        href={item.href}
        >
        {item.textContent}
      </a>
    </p>
  )
}

export default ListItem

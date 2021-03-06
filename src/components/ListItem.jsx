import React from 'preact'

function ListItem({ className, item }) {
  return (
    <p className='p-2 border-b'>
      <a className={`${className} no-underline`} href={item.href}>
        {item.textContent}
      </a>
    </p>
  )
}

export default ListItem

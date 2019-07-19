import React from 'preact'

function LabelItem({ title }) {
  return <span className='text-secondary'> / {title}</span>
}

function LinkItem({ path, title }) {
  return (
    <span>
      {' '}
      /{' '}
      <a href={path} className='no-underline'>
        {title}
      </a>
    </span>
  )
}

function Breadcrumbs({ settingButton }) {
  const location = document.location.pathname
  let items = location.split('/').filter(item => item !== '')

  let breadcrumbs = [{ path: '/', title: 'Root' }]
  let link = ''
  for (let item of items) {
    link += '/' + item
    breadcrumbs.push({
      path: decodeURIComponent(link),
      title: decodeURIComponent(item),
    })
  }

  breadcrumbs.map((item, i, arr) => {
    if (arr.length - 1 === i) {
      item.element = <LabelItem title={item.title} />
    } else {
      item.element = <LinkItem path={item.path} title={item.title} />
    }
    return item
  })

  return (
    <div className='p-2 border-b bg-secondary flex fixed w-full'>
      {breadcrumbs.map(item => item.element)}
      <span className={`flex-grow`} />
      {settingButton}
    </div>
  )
}

export default Breadcrumbs

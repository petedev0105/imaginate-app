import React from 'react'

export default function FolderFile({file}) {
  return (
    <div className="folder-file">
    <a href={file.url} target="blank" classname="btn btn-outline-dark text-truncate w-100" >
      <div><img src={file.url} style={{maxHeight:"250px", maxWidth:"250px"}}/></div>
    </a>
    </div>
  )
}

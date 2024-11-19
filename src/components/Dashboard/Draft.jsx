import React from 'react'

function Draft() {
  return (
    <div>
        
       
        <div id='draft' className="bg-white p-5 rounded-lg shadow-md">
          <div className="text-lg font-semibold">Quick Draft</div>
          <form className="space-y-3 mt-4">
            <input type="text" placeholder="Title" className="w-full p-2 bg-gray-100 rounded-lg" />
            <textarea placeholder="Your thoughts" className="w-full p-2 bg-gray-100 rounded-lg resize-none h-24"></textarea>
            <button className="bg-blue-500 text-white p-2 rounded-lg">Save</button>
          </form>
    </div>
    </div>
  )
}

export default Draft

import React, { useState } from 'react'

function Help() {
    const [help, setHelp] = useState(false)
    return (
        <>
        {help ? <div className='help'><label>-Press enter or send to send a message to the sever<br></br>-Click a message to edit it, click out of it to save the edit<br></br>-Hover or click on a message to bring up the delete button<br></br>-Click logout to log out of your google account<br></br><br></br></label><button className="closeHelp" onClick={() => {setHelp(false)}}>Close</button></div> : null}
        <button className='helpbutton' onClick={() => setHelp(!help)}>Help</button>
        </>
    )   
}

export default Help
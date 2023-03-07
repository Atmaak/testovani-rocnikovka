import React from 'react'
import { useDataContext } from  '../context/DataContext'
import { Button } from 'react-bootstrap'
const Stats = () => {
    const { DarkMode, textDarkMode, accounts, adminDeleteAccount, adminReinstateAccount, loading, getAccounts, teacher, testOnAccount } = useDataContext()
    const showStats = () => {

    }
  return (
    <div style={{minHeight: "97vh"}} className={`bg-${DarkMode} text-${textDarkMode}`}>
        {testOnAccount && <div>
              {testOnAccount.map(test => (
                <div key={test.id_test} className="border m-3">
                  <div className='display-4 text-capitalize mb-3 mx-3'>{test.name}</div>
                  <div className='m-3'>{test.invite_code}</div>
                  <div className='d-flex justify-content-end'>
                    <Button size={'sm'} className='m-3' variant={textDarkMode} onClick={showStats}>Poslat test</Button>
                    
                  </div>

                </div>
              ))}  
        </div>}
    </div>
  )
}

export default Stats
import { useEffect } from 'react'
import { useDataContext } from  '../context/DataContext'
import { Container, Table, Button } from 'react-bootstrap'
import { GrStatusDisabled, GrStatusGood } from 'react-icons/gr'

const AdminSection = () => {
  const { DarkMode, textDarkMode, accounts, adminDeleteAccount, adminReinstateAccount, loading, getAccounts, teacher } = useDataContext()
  const buttonCustomStyles = {
    "width": "1500px"
  }

  useEffect(() => {
    getAccounts()
  }, [])
  

  return (
    <>
      <div style={{minHeight: "97vh"}} className={`bg-${DarkMode} text-${textDarkMode}`}>
        <Container>
        <Table striped bordered hover variant={DarkMode}>
          <thead>
            <tr>
              <th>Id uživatele</th>
              <th>Admin</th>
              <th>Jméno</th>
              <th>E-mail</th>
              <th>Založeno</th>
              <th className='text-center'>Funkční</th>
              <th className='text-center'>Vypnout</th>
            </tr>
          </thead>
          <tbody>
            {accounts?.map((acc) => (
               <tr key={acc.id_user}>
               <th>{acc.id_user}</th>
               <th>{acc.admin == 1 ? "true" : "false"}</th>
               <th className='text-capitalize'>{acc.name}</th>
               <th>{acc.email}</th>
               <th>{new Date(acc.timestamp).toLocaleDateString() }</th>
               <th className='text-center'>{acc.isDeleted == 1 ? <GrStatusDisabled className={`bg-light rounded`} size='2rem' /> : <GrStatusGood className={`bg-light rounded-circle`} size='2rem'/>}</th>
               <th className='text-center'>{acc.isDeleted == 1 ? <button styles={buttonCustomStyles} onClick={() =>adminReinstateAccount(acc.id_user)} disabled={loading || acc.id_user == teacher.id_user} variant='light' className='rounded-circle p-0'><GrStatusGood size='2rem'/></button> : <button styles={buttonCustomStyles} onClick={() =>adminDeleteAccount(acc.id_user)} disabled={loading || acc.id_user == teacher.id_user} variant='light' className='rounded p-0'><GrStatusDisabled size='2rem'/></button>}</th>
             </tr>
            ))}
          </tbody>
        </Table>
        </Container>
      </div>
    </>
  )
}
export default AdminSection
import React from 'react'
import { useDataContext } from  '../context/DataContext'
import { Container, Table } from 'react-bootstrap'

const AdminSection = () => {
  const { DarkMode, accounts } = useDataContext()

  return (
    <>
      <div style={{minHeight: "95.5vh"}} className={`bg-${DarkMode} text-${DarkMode.toLowerCase() === 'light' ? 'dark' : 'light'}`}>
        <Container>
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>Id uživatele</th>
              <th>Admin</th>
              <th>Jméno</th>
              <th>E-mail</th>
              <th>Založeno</th>
              <th>Je smazaný</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {accounts?.map((acc) => (
               <tr key={acc.id_user}>
               <th>{acc.id_user}</th>
               <th>{acc.admin == 1 ? "true" : "false"}</th>
               <th>{acc.name}</th>
               <th>{acc.email}</th>
               <th>{new Date(acc.timestamp).toLocaleDateString() }</th>
               <th>{acc.isDeleted == 1 ? "true" : "false"}</th>
               <th>Edit</th>
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
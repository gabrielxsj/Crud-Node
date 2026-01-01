import { useEffect, useState, useRef } from 'react'
import './style.css'
import api from '../../services/api'

function Home() {
  const [users, setUsers] = useState([])

  const inputEmail = useRef()
  const inputName = useRef()
  const inputAge = useRef()

  async function getUsers() {
    const usersFromApi = await api.get('/usuarios')

    setUsers(usersFromApi.data)
  }

  async function createUsers() {
    await api.post('/usuarios', {
      email: inputEmail.current.value,
      name: inputName.current.value,
      age: inputAge.current.value
    })

    getUsers()
  }

 async function deleteUsers(id) {
   await api.delete(`/usuarios/${id}`)

   getUsers()   
  }  

  useEffect(() => {
    getUsers()
  }, [])

  return (
    <div className="container">
      <form>
        <h1>Cadastro de Usuários</h1>

        <input placeholder='E-mail' name="email" type="email" ref={inputEmail}/>
        <input placeholder='Nome' name="nome" type="text" ref={inputName}/> 
        {/*<input placeholder='Idade' name="idade" type="number" ref={inputAge}/>*/}
        <input placeholder="Idade" name="idade" type="number" ref={inputAge}/>

        <button type='button' onClick={createUsers}>Cadastrar</button>
      </form>

      {users.map((user) => (
        <div key={user.id} className="card">
          <div>
            <p>Email: <span>{user.email}</span></p>
            <p>Nome: <span>{user.name}</span></p>
            <p>Idade: <span>{user.age}</span></p>
          </div>

          <button onClick={() => deleteUsers(user.id)}>X</button>
        </div>
      ))}
    </div>
  )
}

export default Home

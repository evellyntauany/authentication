import { setupAPIClient } from '../../hooks/useApi'

type PropsList = {
  lista: Array<string | number | any>
  Nameclass?: string;
}

const List = (props: PropsList) => {
  const api = setupAPIClient()

  const onDelete = (id: number) => {
    console.log(id)
    api.delete(`/deleteChamado/${id}`)
  }

  return (
    <ul>
      {props.lista.map((chamado) => (
        <div className={props.Nameclass}>
          <li>Id chamado: {chamado.id}</li>
          <li>Id do user que criou: {chamado.UserId}</li>
          <li>Criado em: {chamado.createdAt}</li>
          <li>Descricao: {chamado.description}</li>
          <li>Status:{chamado.status}</li>
          <button onClick={() => onDelete(chamado.id)}>Excluir</button>
        </div>
      ))}
    </ul>
  )
}

export default List

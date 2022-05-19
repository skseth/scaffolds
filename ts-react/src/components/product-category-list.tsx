import React from 'react'

interface NodeHeader {
  shortName: string
  name: string
}

type NodeState = {
  nodes: NodeHeader[]
  errorMessage?: string
}

export class ProductCategoryList extends React.Component<unknown, NodeState> {
  constructor(props: unknown) {
    super(props)
    this.state = {
      nodes: [],
      errorMessage: '',
    }
  }

  async componentDidMount() {
    // Simple GET request using fetch
    const headers = { 'Content-Type': 'application/json' }
    await fetch('http://localhost:6060/nodes', { headers })
      .then(async (response) => {
        console.log(response.headers)
        const data = await response.json()

        if (!response.ok) {
          const error = (data && data.message) || response.statusText
          return Promise.reject(error)
        }

        console.log(data)

        this.setState({
          nodes: data,
          errorMessage: '',
        })
      })
      .catch((error) => {
        this.setState({
          errorMessage: error.toString(),
        })
        console.error('Error fetching nodes', error)
      })
  }

  render() {
    const { nodes } = this.state
    return (
      <div className="card text-center m-3">
        <h5 className="card-header">Categories</h5>
        {nodes.map((node) => {
          return (
            <div className="card-body" key={node.shortName}>
              {node.name}
            </div>
          )
        })}
      </div>
    )
  }
}

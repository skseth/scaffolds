import React from "react";

type NodeState = {
  firstName?: string;
  lastName?: string;
  errorMessage?: string;
};

interface NodeProps {}

export class NodeFetchAsyncAwait extends React.Component<NodeProps, NodeState> {
  constructor(props: NodeProps) {
    super(props);

    this.state = {
      firstName: "",
      lastName: "",
      errorMessage: "",
    };
  }

  async componentDidMount() {
    // Simple GET request using fetch
    const headers = { "Content-Type": "application/json" };
    await fetch("http://localhost:3000/api/nodesx")
      .then(async (response) => {
        console.log(response.headers);
        const data = await response.json();

        if (!response.ok) {
          const error = (data && data.message) || response.statusText;
          return Promise.reject(error);
        }
        this.setState({
          firstName: data["firstName"],
          lastName: data["lastName"],
        });
      })
      .catch((error) => {
        this.setState({
          errorMessage: error.toString(),
        });
        console.error("Error fetching nodes", error);
      });
  }

  render() {
    const { firstName, lastName, errorMessage } = this.state;
    return (
      <div className="card text-center m-3">
        <h5 className="card-header">Node</h5>
        <div className="card-body">
          First Name: {firstName}
          Last Name: {lastName}
          Error: {errorMessage}
        </div>
      </div>
    );
  }
}

import React from "react";

type NodeState = {
  firstName: string;
  lastName: string;
};

interface NodeProps {}

export class NodeFetch extends React.Component<NodeProps, NodeState> {
  constructor(props: NodeProps) {
    super(props);

    this.state = {
      firstName: "",
      lastName: "",
    };
  }

  componentDidMount() {
    // Simple GET request using fetch
    fetch("http://localhost:3000/api/nodes")
      .then((response) => response.json())
      .then((data) =>
        this.setState({
          firstName: data["firstName"],
          lastName: data["lastName"],
        })
      );
  }

  render() {
    const { firstName, lastName } = this.state;
    return (
      <div className="card text-center m-3">
        <h5 className="card-header">Node</h5>
        <div className="card-body">
          First Name: {firstName}
          Last Name: {lastName}
        </div>
      </div>
    );
  }
}

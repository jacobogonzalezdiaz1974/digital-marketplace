const completionSpec: Fig.Spec = {
  name: "my-cli",
  description: "",
  subcommands: [{
    name: "my_subcommand",
    description: "Example subcommand",
    subcommands: [{
      name: "my_nested_subcommand",
      description: "Nested subcommand, example usage: 'my-cli my_subcommand my_nested_subcommand'"
    }],
  }],
  options: [{
    name: ["--help", "-h"],
    description: "Show help for my-cli",
  }],
  // Only uncomment if my-cli takes an argument
  // args: {}
};
export default completionSpec;
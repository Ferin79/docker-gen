import { State } from "../store";
import { askPorts } from "./../questions/askPorts";
import { basename } from "./basename";

export const PortReplace = async (finalBuild: string, askPort: boolean) => {
  const ports = {
    projectPort: State.PROJECT_PORT,
    clientPort: State.CLIENT_PORT,
  };
  if (askPort) {
    const { clientPort, projectPort } = await askPorts();

    ports.clientPort = clientPort;
    ports.projectPort = projectPort;

    State.setPorts(clientPort, projectPort);
  }
  finalBuild = finalBuild.replace(/PROJECT_NAME/g, basename);
  finalBuild = finalBuild.replace(/CLIENT_PORT/g, ports.clientPort.toString());
  finalBuild = finalBuild.replace(
    /PROJECT_PORT/g,
    ports.projectPort.toString()
  );

  return finalBuild;
};

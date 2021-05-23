/* eslint-disable prefer-const */

export class State {
  static CLIENT_PORT = 80;
  static PROJECT_PORT = 80;
  static PROJECT_NAME = "";

  getClientPort() {
    return State.CLIENT_PORT;
  }

  getProjectPort() {
    return State.PROJECT_PORT;
  }

  static setPorts(cp: number, pp: number) {
    State.CLIENT_PORT = cp;
    State.PROJECT_PORT = pp;
  }

  static setProjectName(name: string) {
    this.PROJECT_NAME = name;
  }
}

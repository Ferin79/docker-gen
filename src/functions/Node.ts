import { buildCode, withTypeScript } from "./../config/nodejs/Docker";
import { askBuildQues } from "./../questions/askBuildQues";
import { PortReplace } from "./../utils/portReplace";

export const NodeDockerFile = async () => {
  let finalBuild = "";
  const {
    languageType,
    makeBuildMain,
    buildCmdMain,
    buildOtpMain,
    startScript,
  } = await askBuildQues();

  if (languageType === "TypeScript" && makeBuildMain) {
    finalBuild += withTypeScript + buildCode;
    finalBuild = finalBuild.replace(/BUILD_SCRIPT/g, buildCmdMain);
    finalBuild = finalBuild.replace(
      /COPY_FOLDER/g,
      `--from=build ${buildOtpMain}`
    );
  } else {
    finalBuild = buildCode;
    finalBuild = finalBuild.replace(/COPY_FOLDER/g, ".");
  }
  const cmds = JSON.stringify(startScript.split(" "));
  finalBuild = finalBuild.replace(/START_SCRIPT/g, cmds);

  const finalCode = await PortReplace(finalBuild, true);

  return finalCode;
};

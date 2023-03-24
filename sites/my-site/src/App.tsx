import { objFunc } from "./LogicHolder";
import { App } from "my-lib";
import { Schema } from "./UiSchema/Schema";
import { UiSchema } from "./UiSchema/UiSchema";
import { useEffect, useState } from "react";
import axios from "axios";

function Apple() {
  return <App UiSchemaJson={UiSchema} SchemaJson={Schema} objFunc={objFunc} />;
}

export default Apple;







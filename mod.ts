// Version bumps:
// console/install.deno
// docs/webpack.config.js
// .travis.yml
// README.md
// REQUIREMENTS.md

// Core
import env_var from "./src/core/env_var.ts";

// Compilers
// TODO(crookse) use docable when docable has TypeScript types developed
import doc_blocks_to_json from "./src/compilers/doc_blocks_to_json.ts";

// Dictionaries
import * as log_levels from "./src/dictionaries/log_levels.ts";
import mime_db from "https://raw.githubusercontent.com/jshttp/mime-db/v1.39.0/db.json";

// Exceptions
import http_exception from "./src/exceptions/http_exception.ts";
import http_middleware_exception from "./src/exceptions/http_middleware_exception.ts";
import http_response_exception from "./src/exceptions/http_response_exception.ts";

// Http
import middleware from "./src/http/middleware.ts";
import resource from "./src/http/resource.ts";
import response from "./src/http/response.ts";
import server from "./src/http/server.ts";

// Loggers
import base_logger from "./src/loggers/logger.ts";
import console_logger from "./src/loggers/console_logger.ts";
import file_logger from "./src/loggers/file_logger.ts";

// Services
import http_service from "./src/services/http_service.ts";

// Util
import util_object_parser from "./src/util/object_parser.ts";
import * as util_members from "./src/util/members.ts";

////////////////////////////////////////////////////////////////////////////////
// FILE MARKER: NAMESPACE - DRASH //////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
//
// Usage: import Drash from "/path/to/drash/mod.ts";
//

namespace Drash {
  export namespace Core {
    export type EnvVar = env_var;
    export const EnvVar = env_var;
  }

  export namespace Compilers {
    export type DocBlocksToJson = doc_blocks_to_json;
    export const DocBlocksToJson = doc_blocks_to_json;
  }

  export namespace Dictionaries {
    export const LogLevels = log_levels.LogLevels;
    export const MimeDb = mime_db;
    // export namespace Enums {
    //   export const LogLevel = log_levels.LogLevel;
    // }
  }

  export namespace Exceptions {
    export type HttpException = http_exception;
    export const HttpException = http_exception;
    export type HttpMiddlewareException = http_middleware_exception;
    export const HttpMiddlewareException = http_middleware_exception;
    export type HttpResponseException = http_response_exception;
    export const HttpResponseException = http_response_exception;
  }

  export namespace Loggers {
    export type ConsoleLogger = console_logger;
    export const ConsoleLogger = console_logger;
    export type FileLogger = file_logger;
    export const FileLogger = file_logger;
    export type Logger = base_logger;
    export const Logger = base_logger;
  }

  export namespace Http {
    export type Middleware = middleware;
    export let Middleware = middleware;
    export type Resource = resource;
    export const Resource = resource;
    export type Response = response;
    export let Response = response;
    export type Server = server;
    export const Server = server;
  }

  export namespace Services {
    export type HttpService = http_service;
    export const HttpService = new http_service();
  }

  export namespace Util {
    export type ObjectParser = util_object_parser;
    export const ObjectParser = util_object_parser;
    export const Exports = util_members;
  }

  /**
   * A property to hold all members added via `Drash.addMember()`. This property
   * allows users to access members via `Drash.Members.SomeMember` and acts like
   * a namespace for members that are external to Drash.
   *
   * @property Drash.Members Members
   */
  export const Members: any = {};

  /**
   * Add an app to the Members namespace. After adding an app, you can use the
   * app via `Drash.Members.YourApp.doSomething()`.
   *
   * @param string name
   *     The app's name which can be accessed via `Drash.Members[name]`.
   * @param any app
   *     The app.
   */
  export function addMember(name: string, app: any) {
    this.Members[name] = app;
  }

  /**
   * Set an environment variable in `Deno.env()`.
   *
   * @param string variableName
   *     The variable name.
   *
   * @return Drash.Core.EnvVar
   *     Returns a new EnvVar object with helper functions. For example, if
   *     the value of the environment variable is a JSON string, you can call
   *     `.toArray().value` to turn it into a parsable JSON array before
   *     retrieving the actual value.
   */
  export function getEnvVar(variableName: string): Drash.Core.EnvVar {
    let exists = Deno.env().hasOwnProperty(variableName);
    let value;

    value = exists ? Deno.env()[variableName] : undefined;

    return new Drash.Core.EnvVar(variableName, value);
  }

  /**
   * Set an environment variable in `Deno.env()`.
   *
   * @param string variableName
   *     The variable name which can be accessed via
   *     `Drash.getEnvVar(variableName)`.
   * @param string value
   *     The value of the variable. `Deno.env()` only accepts strings. See
   *     https://deno.land/typedoc/index.html#env for more info.
   */
  export function setEnvVar(variableName: string, value: string) {
    if (!Deno.env()[variableName]) {
      Deno.env()[variableName] = value;
    }
  }
}

export default Drash;

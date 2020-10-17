import bunyan from "bunyan";
import config from "../../config";

const options = {
  ...config.log,
  serializers: bunyan.stdSerializers,
};
const logger = bunyan.createLogger(options);
export default logger;

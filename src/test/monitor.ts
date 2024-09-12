import logger from '../logger';

export const transformBytes = (bytes: any, unity: any) => {
  switch (unity.toLowerCase()) {
    case 'kl':
      return Math.round((bytes * 100) / 1e3) / 100;
    case 'mb':
      return Math.round((bytes * 100) / 1e6) / 100;
    case 'gb':
      return Math.round((bytes * 100) / 1e9) / 100;
    case 't':
      return Math.round((bytes * 100) / 1e12) / 100;
    default:
      return bytes;
  }
};

export const formatBytes = (bytes: any, unity: any) => {
  switch (unity.toLowerCase()) {
    case 'kl':
      return `${transformBytes(bytes, unity)} K`;
    case 'mb':
      return `${transformBytes(bytes, unity)} MB`;
    case 'gb':
      return `${transformBytes(bytes, unity)} MB`;
    case 't':
      return `${transformBytes(bytes, unity)} MB`;
    default:
      return `${bytes} b`;
  }
};

export const validateMemory = () => {
  const memoryData = process.memoryUsage();
  const unity = 'MB';
  const limit = 400;
  const currentMemory = transformBytes(memoryData.heapUsed, unity);
  try {
    if (currentMemory > limit) {
      throw new Error(`🔴🔴🔴 Memory exceeded, please contact your administrator 🔴🔴🔴`);
    }
  } catch (error) {
    logger.error(error);
    logger.error(`current memory: ${currentMemory} ${unity}`);
    logger.error(`momory limit: ${limit} ${unity}`);
    process.exit(1);
  }
};

export const getMonitoringProcess = () => {
  const memoryData = process.memoryUsage();

  logger.info();
  logger.info();
  logger.info();
  logger.info(`<========== 🟡 MEMORY USAGE 🟡 ==========>`);
  logger.info();
  logger.info(
    `⚪ rss: ${formatBytes(memoryData.rss, 'mb')} -> Resident Set Size - total memory allocated for the process execution`
  );
  logger.info(`⚪ heapTotal: ${formatBytes(memoryData.heapTotal, 'mb')} -> total size of the allocated heap`);
  logger.info(`🟡 heapUsed: ${formatBytes(memoryData.heapUsed, 'mb')} -> actual memory used during the execution`);
  logger.info(`⚪ external: ${formatBytes(memoryData.external, 'mb')} -> V8 external memory`);
  logger.info();
  logger.info(`<========================================>`);
  logger.info();
  logger.info();
  logger.info();
};

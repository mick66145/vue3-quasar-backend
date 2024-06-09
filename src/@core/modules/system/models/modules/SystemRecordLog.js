import Base from '@/@core/models/modules/Base2'

const SystemRecordLog = {
  ...Base,
  id: "",
  created_at: "",
  user: "",
  description: "",
  sourceip: "",
}

const SystemRecordLogFactory = (item = null) => {
  const factory = (item) => {
    return {
      id: item?.id || "",
      created_at : item?.created_at ? convertDateTime(item?.created_at) : convertDateTime() ,
      user: item?.user || "",
      description: item?.description || "",
      sourceip: item?.sourceip || "",
    };
  };

  return factory(item || SystemRecordLog);
}

export default SystemRecordLogFactory

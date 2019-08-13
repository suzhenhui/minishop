import {fetchEndpoint} from "../server/network";

export const searchKeywordList = () => fetchEndpoint(
  '/search/getDefaultKey',
  'get'
)

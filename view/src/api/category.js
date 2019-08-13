import {fetchEndpoint} from "../server/network";

export const categoryList = () => fetchEndpoint('/category/list','get')

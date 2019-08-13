import {fetchEndpoint} from "../server/network";

export const bannerList = () => fetchEndpoint('/home/banner','get')
